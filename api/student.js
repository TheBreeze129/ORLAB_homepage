import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_SERVICE_ROLE_KEY // 서버라면 SERVICE_ROLE_KEY 사용 권장
);

export async function GET(req) {
  try {
    const stdType = req.headers.get("stdtype");
    if (!stdType) {
      return Response.json({ error: "Missing stdType header" }, { status: 400 });
    }

    // stdType → Supabase 조건 매핑
    let categoryOptions = [];
    let is_current = true;

    if (stdType === "phd") {
      categoryOptions = ["PhD", "Ph.D.", "Ph. D.", "Ph. D"];
      is_current = true;
    } else if (stdType === "ms") {
      categoryOptions = ["MS", "M.S.", "M. S.", "M. S"];
      is_current = true;
    } else if (stdType === "intern") {
      categoryOptions = ["Intern"];
      is_current = true;
    } else if (stdType === "alumni_phd") {
      categoryOptions = ["PhD", "Ph.D.", "Ph. D.", "Ph. D"];
      is_current = false;
    } else if (stdType === "alumni_ms") {
      categoryOptions = ["MS", "M.S.", "M. S.", "M. S"];
      is_current = false;
    } else if (stdType === "pd") {
      categoryOptions = ["PD", "Post Doc.", "PostDoc"]
    }

    if (categoryOptions.length === 0) {
      return Response.json({ error: "Invalid stdType" }, { status: 400 });
    }

    // Supabase에서 데이터 조회
    const { data, error } = await supabase
      .from("member")
      .select("*")
      .in("category", categoryOptions)
      .eq("is_current", is_current)
      .order("N", { ascending: false });

    if (error) {
      console.error(error);
      return Response.json({ error: error.message, results: [] }, { status: 500 });
    }

    // alumni 여부에 따라 다른 parsing
    let results;
    if (is_current) {
      results = data.map((row) => ({
        id: row.id,
        Name: row.Name || "No Name",
        Email: row.Email || "No Email",
        interests: row.Interests || "No Interests",
        image: row.picture,
      }));
    } else {
      results = data.map((row) => ({
        id: row.id,
        Name: (row.Name || "").toUpperCase(),
        Email: row.Email || "",
        outdate: row.OutDate || "",
        To_go: row.To || "TBD",
        image: row.picture,
      }));
    }

    return Response.json({ results });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
