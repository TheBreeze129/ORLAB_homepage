import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
        <Route path="/" element={<Landing />} />
        <Route path="/wordpress" element={<Landing />} />
        <Route path="/members/professor" element={<Professor />} />
        <Route path="/members/researchers" element={<Student />} />
        <Route path="/research" element={<ResearchArea />} />
        <Route path="/members/alumni" element={<Alumni />} />
        <Route path="/board/seminar" element={<Seminar />} />
        <Route path="/publications" element={<Publication />} />
        <Route path="/board/photo" element={<Photo />} />
        <Route path="/project" element={<Project />} />
        <Route path="/subproject" element={<SubProject />} />
        <Route path="/academic_curriculum" element={<Lecture />} />
        <Route path="/board/workshop" element={<Workshop />} />
        <Route path="/test" element={<TestLanding />} />
        <Route path="/test/board" element={<TestBoard />} />
        <Route path="/test/board/photo/:notionId" element={<PhotoDetail />} />
        <Route path="/test/about" element={<TestAbout />} />
        <Route path="/test/member" element={<TestMember />} />
        <Route path="/test/research" element={<TestResearch />} />
        <Route path="/test/subproject" element={<TestSubProject />} />
        <Route
          path="/test/research/project/:notionId"
          element={<ProjectDetail />}
        />
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
