// /api/student.js

export async function GET(req) {
  try {
    const stdType = req.headers.get("stdtype");
    if (!stdType) {
      return Response.json(
        { error: "Missing stdType header" },
        { status: 400 }
      );
    }
    let token = "";
    if (stdType === "phd") {
      token = process.env.REACT_APP_STUDENTS_PHD;
    } else if (stdType === "ms") {
      token = process.env.REACT_APP_STUDENTS_MS;
    } else if (stdType === "intern") {
      token = process.env.REACT_APP_STUDENTS_INTERN;
    } else if (stdType === "alumni_phd") {
      token = process.env.REACT_APP_ALUMNI_PHD;
    } else if (stdType === "alumni_ms") {
      token = process.env.REACT_APP_ALUMNI_MS;
    } else {
      token = "";
    }
    const notionResponse = await fetch(
      `https://api.notion.com/v1/databases/${token}/query`,
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
              property: "N",
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
          results: [],
        },
        { status: notionResponse.status }
      );
    }

    const data = await notionResponse.json();
    if (stdType === "phd" || stdType === "ms" || stdType === "intern") {
      return Response.json({ results: parseStd(data) });
    } else {
      return Response.json({ results: parseAlumni(data) });
    }
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

function parseStd(results) {
  const reversedResults = results.results.slice().reverse();

  const parsedMs = reversedResults.map((page) => {
    const name = page.properties?.Name?.title?.[0]?.plain_text || "No Name";
    const email =
      page.properties?.Email?.rich_text?.[0]?.plain_text || "No Email";
    const interests =
      page.properties?.interests?.rich_text?.[0]?.plain_text || "No Interests";

    const filesArray = page.properties?.["picture"]?.files || [];
    const firstFile = filesArray[0];
    const imageUrl = firstFile?.file?.url || "";

    return {
      id: page.id,
      Name: name,
      Email: email,
      interests,
      image: imageUrl,
    };
  });

  return parsedMs;
}

function parseAlumni(results) {
  // notionData.results를 뒤집어 필요한 순서로 만들기
  const reversedResults = results.results.slice();

  const parsedAlumni = reversedResults.map((page) => {
    const name = page.properties?.Name?.title?.[0]?.plain_text || "";
    const email = page.properties?.Email?.rich_text?.[0]?.plain_text || "";
    const outdate = page.properties?.OutDate?.rich_text?.[0]?.plain_text || "";
    const To_go = page.properties?.To?.rich_text?.[0]?.plain_text || "TBD";

    const filesArray = page.properties?.["picture"]?.files || [];
    const firstFile = filesArray[0];
    const imageUrl = firstFile?.file?.url || "";

    return {
      id: page.id,
      Name: name.toUpperCase(),
      Email: email,
      outdate,
      To_go,
      image: imageUrl,
    };
  });

  return parsedAlumni;
}
