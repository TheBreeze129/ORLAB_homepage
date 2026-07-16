import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_SERVICE_ROLE_KEY
);

const publicationColumns = "id, type, Authors, Title, venue, order";

export async function GET(req) {
  try {
    const searchParams = new URL(req.url).searchParams;
    const pagination = getPagination(searchParams);
    const type = normalizeType(searchParams.get("type") || req.headers.get("type"));

    let query = supabase
      .from("publications")
      .select(publicationColumns, pagination ? { count: "exact" } : undefined)
      .order("order", { ascending: false, nullsFirst: false });

    if (type) {
      query = query.eq("type", type);
    }

    if (pagination) {
      query = query.range(pagination.from, pagination.to);
    }

    const { data, error, count } = await query;

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    const results = (data || []).map(normalizePublication);

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

const normalizeType = (value = "") =>
  value.trim().toLowerCase().replace(/-/g, " ");

const normalizePublication = (row) => ({
  id: row.id,
  category: normalizeType(row.type),
  authors: row.Authors ?? "",
  title: row.Title ?? "",
  venue: row.venue ?? "",
  order: row.order ?? 0,
});
