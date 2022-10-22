import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Quizzes from "./Quizzes";
import CreateQuiz from './CreateQuiz'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/quizzes" element={<Quizzes />} />
        <Route path="/quizzes/create" element={<CreateQuiz />} />
      </Routes>
    </div>
  );
}

export default App;
