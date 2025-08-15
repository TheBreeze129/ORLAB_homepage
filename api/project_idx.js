// /api/project_idx.js

export async function GET(req) {
  try {
    const pjType = req.headers.get("pjType");
    if (!pjType) {
      return Response.json({ error: "Missing pjType header" }, { status: 400 });
    }
    let dbToken = "";
    if (pjType == "Ongoing") {
      dbToken = process.env.REACR_APP_PROJECTS;
    } else if (pjType == "Finished") {
      dbToken = process.env.REACT_APP_PROJECT_FINISHED;
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
        // sorts 옵션 추가
        body: JSON.stringify({
          sorts: [
            {
              timestamp: "created_time",
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
    const Results = data.results.slice();
    const parsedResults = Results.map((page) => {
      const pagename = page.properties?.Name?.title?.[0]?.plain_text || "";
      const url = page.url || "";
      const id = url.slice(-32);

      return {
        Name: pagename,
        url: id,
      };
    });
    return Response.json({ results: parsedResults });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
