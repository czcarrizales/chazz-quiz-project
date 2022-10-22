import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div>
        <p><Link to="/quizzes">All Quizzes</Link></p>
        <p><Link to='/quizzes/create'>Create Quiz</Link></p>
      </div>
    )
}