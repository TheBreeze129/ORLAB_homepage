import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_SERVICE_ROLE_KEY
);

const seminarColumns = "id, Date, Name, Title, file, is_workshop";

export async function GET(req) {
  try {
    const searchParams = new URL(req.url).searchParams;
    const pagination = getPagination(searchParams);
    const dbToken = req.headers.get("dbtoken");
    const dbType = req.headers.get("dbtype");

    if (!dbToken) {
      return Response.json({ error: "Missing dbtoken header" }, { status: 400 });
    }

    if (!dbType) {
      return Response.json({ error: "Missing dbtype header" }, { status: 400 });
    }

    let isWorkshop = null;
    if (dbType === "seminar") {
      isWorkshop = false;
    } else if (dbType === "workshop") {
      isWorkshop = true;
    } else {
      return Response.json({ error: "Invalid dbtype header" }, { status: 400 });
    }

    let query = supabase
      .from("seminar")
      .select(seminarColumns, pagination ? { count: "exact" } : undefined)
      .eq("is_workshop", isWorkshop)
      .gte("Date", `${dbToken}-01-01`)
      .lt("Date", `${Number(dbToken) + 1}-01-01`)
      .order("Date", { ascending: false })
      .order("id", { ascending: true });

    if (pagination) {
      query = query.range(pagination.from, pagination.to);
    }

    const { data, error, count } = await query;

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    const results = (data || []).map((row) => ({
      id: row.id,
      date: row.Date,
      name: row.Name ?? "",
      title: row.Title ?? "",
      link: row.file ?? "#",
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
