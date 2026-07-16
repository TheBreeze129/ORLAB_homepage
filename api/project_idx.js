import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_SERVICE_ROLE_KEY
);

export async function GET(req) {
  try {
    const searchParams = new URL(req.url).searchParams;
    const pagination = getPagination(searchParams);
    const status = searchParams.get("status");

    let query = supabase
      .from("projects")
      .select(
        "id, Name, notion_id, created_at, is_ongoing, thumbnail, organization, date",
        pagination ? { count: "exact" } : undefined
      )
      .order("id", { ascending: false });

    if (status === "ongoing") {
      query = query.eq("is_ongoing", true);
    } else if (status === "finished") {
      query = query.eq("is_ongoing", false);
    }

    if (pagination) {
      query = query.range(pagination.from, pagination.to);
    }

    const { data, error, count } = await query;

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    const results = (data || []).map((row) => ({
      id: row.id,
      Name: row.Name ?? "",
      name: row.Name ?? "",
      url: row.notion_id,
      notionId: row.notion_id ?? "",
      created_at: row.created_at,
      is_ongoing: row.is_ongoing,
      thumbnail: row.thumbnail ?? "",
      organization: row.organization ?? "",
      date: row.date ?? "",
    }));

    if (!pagination) {
      return Response.json({ results });
    }

    return Response.json({
      results,
      total: count ?? results.length,
      page: pagination.page,
      pageSize: pagination.pageSize,
      pageCount: Math.max(
        1,
        Math.ceil((count ?? results.length) / pagination.pageSize)
      ),
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

const getPagination = (searchParams) => {
  const page = Number.parseInt(searchParams.get("page") || "", 10);
  const pageSize = Number.parseInt(searchParams.get("page_size") || "", 10);

  if (!Number.isFinite(page) || !Number.isFinite(pageSize)) {
    return null;
  }

  const safePage = Math.max(1, page);
  const safePageSize = Math.min(50, Math.max(1, pageSize));
  const from = (safePage - 1) * safePageSize;

  return {
    page: safePage,
    pageSize: safePageSize,
    from,
    to: from + safePageSize - 1,
  };
};
