import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Landing from "./pages/Landing";
import Professor from "./pages/members/Professor.js";
import Student from "./pages/members/Student.js";
import ResearchArea from "./pages/ResearchArea.js";
import Alumni from "./pages/members/Alumni.js";
import Seminar from "./pages/board/Seminar.js";
import Publication from "./pages/Publication.js";
import Photo from "./pages/board/Photo.js";
import Lecture from "./pages/Lecture.js";
import Workshop from "./pages/board/Workshop.js";
import DPRL from "./pages/lectures/DPRL.js";
import Project from "./pages/projects/Project.js";
import SubProject from "./pages/projects/Subproject.js";
import ADPRL from "./pages/lectures/ADPRL.js";
import TestBoard from "./pages/test/TestBoard.js";
import PhotoDetail from "./pages/test/PhotoDetail.js";
import TestMember from "./pages/test/TestMember.js";
import TestResearch from "./pages/test/TestResearch.js";
import TestAbout from "./pages/test/TestAbout.js";
import TestLanding from "./pages/test/TestLanding.js";
import TestSubProject from "./pages/test/TestSubProject.js";
import ProjectDetail from "./pages/test/ProjectDetail.js";

const App = () => {
  return (
    <BrowserRouter>
      <Analytics />
      <SpeedInsights />
      <Routes>
        <Route path="/" element={<TestLanding />} />
        <Route path="/board" element={<TestBoard />} />
        <Route path="/board/photo/:notionId" element={<PhotoDetail />} />
        <Route path="/about" element={<TestAbout />} />
        <Route path="/member" element={<TestMember />} />
        <Route path="/research" element={<TestResearch />} />
        <Route path="/subproject" element={<TestSubProject />} />
        <Route
          path="/research/project/:notionId"
          element={<ProjectDetail />}
        />
        <Route path="/wordpress" element={<Navigate to="/" replace />} />
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
          path="/publications"
          element={<Navigate to="/research?tab=publication" replace />}
        />
        <Route
          path="/project"
          element={<Navigate to="/research?tab=project" replace />}
        />
        <Route path="/board/seminar" element={<Navigate to="/board" replace />} />
        <Route
          path="/board/workshop"
          element={<Navigate to="/board?board=workshop" replace />}
        />
        <Route
          path="/board/photo"
          element={<Navigate to="/board?board=album" replace />}
        />
        <Route
          path="/academic_curriculum"
          element={<Navigate to="/test/academic_curriculum" replace />}
        />
        <Route path="/test" element={<Landing />} />
        <Route path="/test/wordpress" element={<Landing />} />
        <Route path="/test/members/professor" element={<Professor />} />
        <Route path="/test/members/researchers" element={<Student />} />
        <Route path="/test/research" element={<ResearchArea />} />
        <Route path="/test/members/alumni" element={<Alumni />} />
        <Route path="/test/board/seminar" element={<Seminar />} />
        <Route path="/test/publications" element={<Publication />} />
        <Route path="/test/board/photo" element={<Photo />} />
        <Route path="/test/project" element={<Project />} />
        <Route path="/test/subproject" element={<SubProject />} />
        <Route path="/test/academic_curriculum" element={<Lecture />} />
        <Route path="/test/board/workshop" element={<Workshop />} />
        <Route
          path="/academic_curriculum/dynamic_programming_and_reinforcement_learning_2022"
          element={
            <Navigate
              to="/test/academic_curriculum/dynamic_programming_and_reinforcement_learning_2022"
              replace
            />
          }
        />
        <Route
          path="/academic_curriculum/advanced_dynamic_programming_and_reinforcement_learning_2023"
          element={
            <Navigate
              to="/test/academic_curriculum/advanced_dynamic_programming_and_reinforcement_learning_2023"
              replace
            />
          }
        />
        <Route
          path="/test/academic_curriculum/dynamic_programming_and_reinforcement_learning_2022"
          element={<DPRL />}
        />
        <Route
          path="/test/academic_curriculum/advanced_dynamic_programming_and_reinforcement_learning_2023"
          element={<ADPRL />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
