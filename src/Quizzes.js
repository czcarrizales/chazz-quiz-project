import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Quizzes() {

    

    const [quizzes, setQuizzes] = useState(null)
    const [quizTitle, setQuizTitle] = useState({})

    useEffect(() => {
        getAllQuizzes()
    }, [])

    const handleChange = (e) => {
        setQuizTitle({title: e.target.value})
    }

    const getAllQuizzes = () => {
        axios.get('http://localhost:5000/quizzes')
        .then(res => {
            const quizTitles = res.data.map(x => {
                return x
            })
            setQuizzes(quizTitles)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const deleteOneQuiz = (id) => {
        axios.delete(`http://localhost:5000/quizzes/delete/${id}`)
        .then(res => {
            getAllQuizzes()
            console.log('Quiz Deleted', res)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const updateOneQuiz = (id, data) => {
        console.log(id)
        axios.patch(`http://localhost:5000/quizzes/update/${id}`, data)
        .then(res => {
            getAllQuizzes()
            console.log('Quiz Updated', res)
        })
    }

    const displayAllQuizzes = () => {
        return (
                quizzes.map(quiz => {
                    return (
                        <div>
                            <h1><Link to={`/quizzes/${quiz._id}`} state={{from: quiz}}>{quiz.title}</Link></h1>
                            <input type="text" id="title" name="title" placeholder="Edit title here" onChange={handleChange} />
                            <button onClick={() => updateOneQuiz(quiz._id, quizTitle)}>Update Quizz</button>
                            <button onClick={() => deleteOneQuiz(quiz._id)}>Delete Quiz</button>
                        </div>
                    )
                })
        )
    }

    return (
        <div>
            <h1>Quizzes here</h1>
            {quizzes && displayAllQuizzes()}
        </div>
    )
}