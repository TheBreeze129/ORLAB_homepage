# ORLAB Homepage

Operations Research Lab homepage for Yonsei University.

This repository contains a React frontend and Vercel serverless API routes used by the homepage. The current redesigned pages live under `/test` while the existing production routes are preserved for migration.

## Stack

- React with Create React App
- React Router
- Styled Components
- Vercel serverless functions under `api/`
- Supabase-backed data for members, board, publications, and projects
- Notion-backed rich content for selected detail pages

## Local Development

```bash
npm install
npm start
```

The app runs at [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

The production build is generated in `build/`.

## Main Routes

- `/` existing homepage
- `/test` redesigned homepage
- `/test/about`
- `/test/member`
- `/test/research`
- `/test/board`
- `/test/board/photo/:notionId`

## Environment Variables

Configure these in Vercel and in a local `.env` file when needed:

```bash
REACT_APP_SUPABASE_URL=
REACT_APP_SUPABASE_SERVICE_ROLE_KEY=
REACT_APP_NOTION_API_KEY=
REACT_APP_KAKAO_MAP_API_KEY=
```

Legacy pages may also depend on page-specific `REACT_APP_*` Notion IDs such as `REACT_APP_PROFESSOR`, `REACT_APP_PUBLICATION`, and lecture/photo database IDs.

## Deployment

The project is deployed through Vercel. The Vercel project should point to this GitHub repository and build with:

```bash
npm run build
```

API routes are served from `api/`, and `vercel.json` rewrites application routes back to the React app.
