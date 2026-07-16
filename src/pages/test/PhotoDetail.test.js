import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import PhotoDetail from "./PhotoDetail.js";

const mockNavigate = jest.fn();
let mockLocationState = null;

jest.mock(
  "react-router-dom",
  () => {
    const ReactModule = require("react");

    return {
      Link: ({ to, state, children, ...props }) =>
        ReactModule.createElement("a", { href: to, ...props }, children),
      useLocation: () => ({ state: mockLocationState }),
      useNavigate: () => mockNavigate,
      useParams: () => ({ notionId: "notion-photo-11" }),
    };
  },
  { virtual: true }
);

const originalFetch = global.fetch;
const originalScrollTo = window.scrollTo;

beforeEach(() => {
  mockLocationState = null;
  window.scrollTo = jest.fn();
  global.fetch = jest.fn(async (url) => {
    if (url.startsWith("/api/photo")) {
      return {
        ok: true,
        status: 200,
        json: async () => ({
          result: {
            id: 1,
            subject: "2026 Spring Conference",
            date: "2026.06.04.~2026.06.05",
            thumbnail: "https://example.com/thumbnail.jpg",
            notionId: "notion-photo-11",
            order: 11,
          },
        }),
      };
    }

    return {
      ok: true,
      status: 200,
      json: async () => ({
        results: [
          {
            type: "image",
            url: "https://example.com/detail.jpg",
            caption: "Conference photo",
          },
          { type: "paragraph", text: "Notion photo description" },
        ],
      }),
    };
  });
});

afterEach(() => {
  jest.restoreAllMocks();
  global.fetch = originalFetch;
  window.scrollTo = originalScrollTo;
});

test("loads photo metadata and Notion content from the route notion id", async () => {
  render(<PhotoDetail />);

  expect(
    await screen.findByRole("heading", { name: "2026 Spring Conference" })
  ).toBeInTheDocument();
  expect(screen.getByText("2026.06.04.~2026.06.05")).toBeInTheDocument();
  expect(
    screen.getByRole("img", { name: "2026 Spring Conference" })
  ).toHaveAttribute(
    "src",
    "https://example.com/thumbnail.jpg"
  );
  expect(screen.getByText("Notion photo description")).toBeInTheDocument();

  expect(global.fetch).toHaveBeenCalledWith(
    "/api/photo?notion_id=notion-photo-11",
    expect.objectContaining({ method: "GET" })
  );
  expect(global.fetch).toHaveBeenCalledWith(
    "/api/page",
    expect.objectContaining({
      method: "GET",
      headers: { pageCode: "notion-photo-11" },
    })
  );
});

test("uses routed album metadata while Notion content is still loading", async () => {
  mockLocationState = {
    photo: {
      subject: "Routed album title",
      date: "2026.05.15",
      thumbnail: "https://example.com/routed.jpg",
      notionId: "notion-photo-11",
    },
  };

  let resolvePhotoRequest;
  let resolvePageRequest;
  const photoRequest = new Promise((resolve) => {
    resolvePhotoRequest = resolve;
  });
  const pageRequest = new Promise((resolve) => {
    resolvePageRequest = resolve;
  });

  global.fetch = jest.fn((url) => {
    if (url.startsWith("/api/photo")) {
      return photoRequest;
    }

    return pageRequest;
  });

  render(<PhotoDetail />);

  expect(
    screen.getByRole("heading", { name: "Routed album title" })
  ).toBeInTheDocument();
  expect(screen.getByText("2026.05.15")).toBeInTheDocument();
  expect(screen.getByRole("img", { name: "Routed album title" })).toHaveAttribute(
    "src",
    "https://example.com/routed.jpg"
  );
  expect(screen.getByRole("status")).toBeInTheDocument();

  resolvePhotoRequest({
    ok: true,
    status: 200,
    json: async () => ({
      result: {
        id: 1,
        subject: "Fetched album title",
        date: "2026.05.16",
        thumbnail: "https://example.com/fetched.jpg",
        notionId: "notion-photo-11",
        order: 11,
      },
    }),
  });

  expect(
    await screen.findByRole("heading", { name: "Fetched album title" })
  ).toBeInTheDocument();
  expect(screen.getByRole("status")).toBeInTheDocument();
  expect(screen.getByRole("img", { name: "Fetched album title" })).toHaveAttribute(
    "src",
    "https://example.com/fetched.jpg"
  );

  resolvePageRequest({
    ok: true,
    status: 200,
    json: async () => ({
      results: [{ type: "paragraph", text: "Loaded Notion body" }],
    }),
  });

  expect(await screen.findByText("Loaded Notion body")).toBeInTheDocument();
});

test("shows an error state and retries both detail requests", async () => {
  jest.spyOn(console, "error").mockImplementation(() => {});
  global.fetch = jest
    .fn()
    .mockResolvedValueOnce({ ok: false, status: 404 })
    .mockResolvedValueOnce({ ok: true, status: 200 })
    .mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({
        result: {
          id: 1,
          subject: "Recovered album",
          date: "2026.06.05",
          notionId: "notion-photo-11",
          order: 11,
        },
      }),
    })
    .mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({
        results: [{ type: "paragraph", text: "Recovered Notion content" }],
      }),
    });

  render(<PhotoDetail />);

  expect(await screen.findByRole("alert")).toHaveTextContent(
    "Unable to load this album."
  );
  fireEvent.click(screen.getByRole("button", { name: "Retry" }));

  expect(
    await screen.findByRole("heading", { name: "Recovered album" })
  ).toBeInTheDocument();
  expect(screen.getByText("Recovered Notion content")).toBeInTheDocument();
  expect(global.fetch).toHaveBeenCalledTimes(4);
});
