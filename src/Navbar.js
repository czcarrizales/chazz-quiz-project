import React from "react";
import { Link } from "react-router-dom";
import './Navbar.module.css'

export default function Navbar() {
    return (
        <div className="nav">
        <p><Link to="/quizzes">All Quizzes</Link></p>
        <p><Link to='/quizzes/create'>Create Quiz</Link></p>
      </div>
    )
}