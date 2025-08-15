// /api/reserch.js

export async function GET(req) {
  try {
    const pageCode = req.headers.get("pageCode");
    if (!pageCode) {
      return Response.json(
        { error: "Missing pageCode header" },
        { status: 400 }
      );
    }
    const notionResponse = await fetch(
      `https://api.notion.com/v1/blocks/${pageCode}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_NOTION_API_KEY}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
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
    const title = data.child_page.title;
    return Response.json({ title: title });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
