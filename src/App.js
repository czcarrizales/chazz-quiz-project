import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Quizzes from "./Quizzes";
import CreateQuiz from './CreateQuiz'
import ViewQuiz from './ViewQuiz'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/quizzes" element={<Quizzes />} />
        <Route path="/quizzes/create" element={<CreateQuiz />} />
        <Route path="/quizzes/:_id" element={<ViewQuiz />} />
      </Routes>
    </div>
  );
}

export default App;
