import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Landing from "./pages/Landing";
import Lecture from "./pages/Lecture.js";
import DPRL from "./pages/lectures/DPRL.js";
import SubProject from "./pages/projects/Subproject.js";
import ADPRL from "./pages/lectures/ADPRL.js";
import TestBoard from "./pages/test/TestBoard.js";
import PhotoDetail from "./pages/test/PhotoDetail.js";
import TestMember from "./pages/test/TestMember.js";
import TestResearch from "./pages/test/TestResearch.js";
import TestAbout from "./pages/test/TestAbout.js";
import TestLanding from "./pages/test/TestLanding.js";

const App = () => {
  return (
    <BrowserRouter>
      <Analytics />
      <SpeedInsights />
      <Routes>
        <Route path="/" element={<TestLanding />} />
        <Route path="/wordpress" element={<Landing />} />
        <Route path="/about" element={<TestAbout />} />
        <Route path="/member" element={<TestMember />} />
        <Route path="/research" element={<TestResearch />} />
        <Route path="/board" element={<TestBoard />} />
        <Route path="/board/photo/:notionId" element={<PhotoDetail />} />
        <Route
          path="/publications"
          element={<Navigate to="/research?tab=publication" replace />}
        />
        <Route
          path="/project"
          element={<Navigate to="/research?tab=project" replace />}
        />
        <Route
          path="/members/professor"
          element={<Navigate to="/member?tab=professor" replace />}
        />
        <Route
          path="/members/researchers"
          element={<Navigate to="/member?tab=researchers" replace />}
        />
        <Route
          path="/members/alumni"
          element={<Navigate to="/member?tab=alumni" replace />}
        />
        <Route
          path="/board/seminar"
          element={<Navigate to="/board?board=seminar" replace />}
        />
        <Route path="/board/photo" element={<Navigate to="/board" replace />} />
        <Route
          path="/board/workshop"
          element={<Navigate to="/board?board=workshop" replace />}
        />
        <Route path="/subproject" element={<SubProject />} />
        <Route path="/academic_curriculum" element={<Lecture />} />
        <Route
          path="/academic_curriculum/dynamic_programming_and_reinforcement_learning_2022"
          element={<DPRL />}
        />
        <Route
          path="/academic_curriculum/advanced_dynamic_programming_and_reinforcement_learning_2023"
          element={<ADPRL />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
