import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_SERVICE_ROLE_KEY
);

const photoColumns = "id, Subject, Date, thumbnail, notion_id, Order";

export async function GET(req) {
  try {
    const searchParams = new URL(req.url).searchParams;
    const notionId = searchParams.get("notion_id");
    const pagination = getPagination(searchParams);

    if (notionId) {
      const { data, error } = await supabase
        .from("photo")
        .select(photoColumns)
        .eq("notion_id", notionId)
        .maybeSingle();

      if (error) {
        return Response.json({ error: error.message }, { status: 500 });
      }

      if (!data) {
        return Response.json({ error: "Photo not found" }, { status: 404 });
      }

      return Response.json({ result: normalizePhoto(data) });
    }

    let query = supabase
      .from("photo")
      .select(photoColumns, pagination ? { count: "exact" } : undefined)
      .order("Order", { ascending: false, nullsFirst: false });

    if (pagination) {
      query = query.range(pagination.from, pagination.to);
    }

    const { data, error, count } = await query;

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    const results = (data || []).map(normalizePhoto);

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

const normalizePhoto = (row) => ({
  id: row.id,
  subject: row.Subject ?? "",
  date: row.Date ?? "",
  thumbnail: row.thumbnail ?? "",
  notionId: row.notion_id ?? "",
  order: row.Order ?? 0,
});
