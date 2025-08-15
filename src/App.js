import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Landing from "./pages/Landing";
import Professor from "./pages/members/Professor.js";
import Student from "./pages/members/Student.js";
import Research_Area from "./pages/Research_Area.js";
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

const App = () => {
  return (
    <BrowserRouter>
      <SpeedInsights />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/wordpress" element={<Landing />} />
        <Route path="/members/professor" element={<Professor />} />
        <Route path="/members/student" element={<Student />} />
        <Route path="/research" element={<Research_Area />} />
        <Route path="/members/alumni" element={<Alumni />} />
        <Route path="/board/seminar" element={<Seminar />} />
        <Route path="/publications" element={<Publication />} />
        <Route path="/board/photo" element={<Photo />} />
        <Route path="/project" element={<Project />} />
        <Route path="/subproject" element={<SubProject />} />
        <Route path="/lecture" element={<Lecture />} />
        <Route path="/board/workshop" element={<Workshop />} />
        <Route
          path="/lectures/dynamic_programming_and_reinforcement_learning_2022"
          element={<DPRL />}
        />
        <Route
          path="/lectures/advanced_dynamic_programming_and_reinforcement_learning_2023"
          element={<ADPRL />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
