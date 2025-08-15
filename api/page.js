// /api/page.js

export async function GET(req) {
  try {
    const pageCode = req.headers.get("pageCode");
    if (!pageCode) {
      return Response.json(
        { error: "Missing pageCode header" },
        { status: 400 }
      );
    }
    let allResults = [];
    let next_cursor = undefined;
    let has_more = true;

    while (has_more) {
      // next_cursor가 있으면 쿼리 파라미터로 추가합니다.
      const url = `https://api.notion.com/v1/blocks/${pageCode}/children${
        next_cursor ? `?start_cursor=${next_cursor}` : ""
      }`;

      const notionResponse = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_NOTION_API_KEY}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
      });

      if (!notionResponse.ok) {
        return Response.json(
          {
            error: `Fetch error: ${notionResponse.status} ${notionResponse.statusText}`,
            results: [],
          },
          { status: notionResponse.status }
        );
      }

      const data = await notionResponse.json();
      allResults = allResults.concat(data.results);
      next_cursor = data.next_cursor;
      has_more = data.has_more;
    }

    return Response.json({ results: parseNotionBlocks(allResults) });
  } catch (error) {
    return Response.json(
      { error: error.message, results: [] },
      { status: 500 }
    );
  }
}

function parseNotionBlocks(blocks) {
  return blocks.map((block) => {
    if (block.type === "divider") {
      return { type: "divider" };
    } else if (block.type === "heading_2") {
      return {
        type: "heading_2",
        title: block.heading_2?.rich_text?.[0]?.plain_text || "",
      };
    } else if (block.type === "paragraph") {
      const text = (block.paragraph?.rich_text || [])
        .map((rt) => rt.plain_text)
        .join("");
      return {
        type: "paragraph",
        text,
      };
    } else if (block.type === "bulleted_list_item") {
      const text = (block.bulleted_list_item?.rich_text || [])
        .map((rt) => rt.plain_text)
        .join("");
      const href = (block.bulleted_list_item?.rich_text || [])
        .map((rt) => rt.href)
        .join("");
      return {
        type: "bulleted_list_item",
        text,
        href,
      };
    } else if (block.type === "image") {
      // 이미지 타입은 file 또는 external로 올 수 있음
      let url = "";
      const caption = block.image.caption?.[0]?.plain_text;
      if (block.image.file && block.image.file.url) {
        url = block.image.file.url;
      } else if (block.image.external && block.image.external.url) {
        url = block.image.external.url;
      }
      return { type: "image", url: url, caption: caption };
    }
    return { type: "unsupported" };
  });
}
