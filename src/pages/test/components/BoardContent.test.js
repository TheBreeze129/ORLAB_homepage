import React from "react";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import BoardContent from "./BoardContent.js";

jest.mock(
  "react-router-dom",
  () => {
    const ReactModule = require("react");

    return {
      Link: ({ to, state, children, ...props }) =>
        ReactModule.createElement(
          "a",
          { href: to, "data-router-state": JSON.stringify(state), ...props },
          children
        ),
    };
  },
  { virtual: true }
);

const originalFetch = global.fetch;
const originalIntersectionObserver = global.IntersectionObserver;
let intersectionCallbacks = [];

beforeEach(() => {
  intersectionCallbacks = [];
  global.IntersectionObserver = class MockIntersectionObserver {
    constructor(callback) {
      intersectionCallbacks.push(callback);
    }

    observe = jest.fn();
    disconnect = jest.fn();
  };

  global.fetch = jest.fn(async (url, options) => ({
    ok: true,
    json: async () => ({
      results: [
        {
          date: `${options.headers.dbtoken}-07-08`,
          name: "Backend Author",
          title: `${options.headers.dbtype}-${options.headers.dbtoken}`,
          link: "#",
        },
      ],
    }),
  }));
});

afterEach(() => {
  jest.restoreAllMocks();
  global.fetch = originalFetch;
  global.IntersectionObserver = originalIntersectionObserver;
});

const triggerLatestIntersection = () => {
  const callback = intersectionCallbacks[intersectionCallbacks.length - 1];
  if (!callback) {
    throw new Error("No intersection observer was registered");
  }

  act(() => {
    callback([{ isIntersecting: true }]);
  });
};

test("fetches only the selected board year and caches its response", async () => {
  const { rerender } = render(<BoardContent activeBoard="seminar" />);

  expect(await screen.findByText("seminar-2026")).toBeInTheDocument();
  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toHaveBeenLastCalledWith(
    "/api/seminar?page=1&page_size=6",
    expect.objectContaining({
      method: "GET",
      headers: { dbtoken: "2026", dbtype: "seminar" },
    })
  );

  rerender(<BoardContent activeBoard="workshop" />);

  expect(await screen.findByText("workshop-2023")).toBeInTheDocument();
  expect(global.fetch).toHaveBeenCalledTimes(2);
  expect(global.fetch).toHaveBeenLastCalledWith(
    "/api/seminar?page=1&page_size=6",
    expect.objectContaining({
      method: "GET",
      headers: { dbtoken: "2023", dbtype: "workshop" },
    })
  );

  rerender(<BoardContent activeBoard="seminar" />);

  await waitFor(() => {
    expect(screen.getByText("seminar-2026")).toBeInTheDocument();
  });
  expect(global.fetch).toHaveBeenCalledTimes(2);
});

test("retries a failed request for the selected year", async () => {
  jest.spyOn(console, "error").mockImplementation(() => {});
  global.fetch = jest
    .fn()
    .mockResolvedValueOnce({ ok: false, status: 500 })
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        results: [
          {
            date: "2026-07-08",
            name: "Backend Author",
            title: "Recovered seminar",
            link: "#",
          },
        ],
      }),
    });

  render(<BoardContent activeBoard="seminar" />);

  expect(await screen.findByRole("alert")).toHaveTextContent(
    "Unable to load board posts."
  );
  fireEvent.click(screen.getByRole("button", { name: "Retry" }));

  expect(await screen.findByText("Recovered seminar")).toBeInTheDocument();
  expect(global.fetch).toHaveBeenCalledTimes(2);
});

test("does not render seminar pagination controls", async () => {
  render(<BoardContent activeBoard="seminar" />);

  expect(await screen.findByText("seminar-2026")).toBeInTheDocument();
  expect(
    screen.queryByRole("navigation", { name: "Pagination" })
  ).not.toBeInTheDocument();
});

test("loads additional seminar pages through infinite scroll", async () => {
  global.fetch = jest.fn(async (url, options) => ({
    ok: true,
    json: async () => ({
      results: Array.from({ length: 25 }, (_, index) => ({
        date: `${options.headers.dbtoken}-07-${String(index + 1).padStart(2, "0")}`,
        name: "Backend Author",
        title: `${options.headers.dbtype}-${index + 1}`,
        link: "#",
      })),
    }),
  }));

  render(<BoardContent activeBoard="seminar" />);

  expect(await screen.findByText("seminar-1")).toBeInTheDocument();
  expect(
    screen.queryByRole("navigation", { name: "Pagination" })
  ).not.toBeInTheDocument();

  await waitFor(() => {
    expect(intersectionCallbacks.length).toBeGreaterThan(0);
  });
  triggerLatestIntersection();

  expect(await screen.findByText("seminar-7")).toBeInTheDocument();
  expect(screen.getByText("seminar-1")).toBeInTheDocument();
  expect(global.fetch).toHaveBeenLastCalledWith(
    "/api/seminar?page=2&page_size=6",
    expect.objectContaining({
      method: "GET",
      headers: { dbtoken: "2026", dbtype: "seminar" },
    })
  );

  triggerLatestIntersection();

  expect(await screen.findByText("seminar-13")).toBeInTheDocument();
  expect(global.fetch).toHaveBeenLastCalledWith(
    "/api/seminar?page=3&page_size=6",
    expect.objectContaining({
      method: "GET",
      headers: { dbtoken: "2026", dbtype: "seminar" },
    })
  );
});

test("renders Supabase photo cards linked to their Notion detail", async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      results: [
        {
          id: 2,
          subject: "Second album",
          date: "2026.05.15",
          thumbnail: "https://example.com/second.jpg",
          notionId: "notion-photo-10",
          order: 10,
        },
        {
          id: 1,
          subject: "2026 Spring Conference",
          date: "2026.06.04.~2026.06.05",
          thumbnail: "https://example.com/thumbnail.jpg",
          notionId: "notion-photo-11",
          order: 11,
        },
        {
          id: 3,
          subject: "Third album",
          date: "2026.04.17",
          thumbnail: "https://example.com/third.jpg",
          notionId: "notion-photo-9",
          order: 9,
        },
      ],
    }),
  });

  render(<BoardContent activeBoard="album" />);

  const cardLink = await screen.findByRole("link", {
    name: /2026 Spring Conference/,
  });
  expect(cardLink).toHaveAttribute(
    "href",
    "/test/board/photo/notion-photo-11"
  );
  expect(cardLink).toHaveAttribute(
    "data-router-state",
    JSON.stringify({
      photo: {
        subject: "2026 Spring Conference",
        date: "2026.06.04.~2026.06.05",
        thumbnail: "https://example.com/thumbnail.jpg",
        notionId: "notion-photo-11",
      },
    })
  );
  expect(screen.getByRole("img", { name: "2026 Spring Conference" })).toHaveAttribute(
    "src",
    "https://example.com/thumbnail.jpg"
  );
  expect(
    screen.getAllByRole("heading", { level: 2 }).map((heading) => heading.textContent)
  ).toEqual(["2026 Spring Conference", "Second album", "Third album"]);
  expect(
    screen.queryByRole("navigation", { name: "Pagination" })
  ).not.toBeInTheDocument();
  expect(global.fetch).toHaveBeenCalledWith(
    "/api/photo?page=1&page_size=9",
    expect.objectContaining({ method: "GET" })
  );
});
