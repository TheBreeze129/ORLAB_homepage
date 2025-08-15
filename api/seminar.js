// /api/student/seminar.js

export async function GET(req) {
  try {
    // 요청 헤더에서 "dbtoken" 값 추출
    const dbToken = req.headers.get("dbtoken");
    if (!dbToken) {
      return Response.json(
        { error: "Missing dbtoken header" },
        { status: 400 }
      );
    }

    const notionResponse = await fetch(
      `https://api.notion.com/v1/databases/${dbToken}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_NOTION_API_KEY}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sorts: [
            {
              property: "Date", // notion 데이터베이스 내 해당 텍스트 컬럼 이름
              direction: "descending",
            },
          ],
        }),
      }
    );

    if (!notionResponse.ok) {
      return Response.json(
        {
          error: `Fetch error: ${notionResponse.status} ${notionResponse.statusText}`,
        },
        { status: notionResponse.status }
      );
    }
    const data = await notionResponse.json();

    const parsed = data.results.map((page) => {
      const getText = (prop) => {
        if (!prop || (!prop.rich_text && !prop.title)) return "";
        if (prop.rich_text) {
          return prop.rich_text.map((rt) => rt.plain_text).join("");
        }
        if (prop.title) {
          return prop.title.map((t) => t.plain_text).join("");
        }
        return "";
      };
      return {
        date: getText(page.properties.Date),
        name: getText(page.properties.Name),
        title: getText(page.properties.Title),
        link:
          page.properties.file?.files?.[0]?.file?.url ??
          page.properties.file?.files?.[0]?.external.url ??
          "#",
      };
    });

    return Response.json({ results: parsed });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
