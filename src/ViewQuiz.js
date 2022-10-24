import React, {useState, useEffect} from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";

export default function ViewQuiz() {

    const params = useParams()
    const [quiz, setQuiz] = useState(null)
    const [answers, setAnswers] = useState(null)
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        getOneQuiz()
        console.log('component loaded')
    }, [])

    const getOneQuiz = () => {
        axios.get(`http://localhost:5000/quizzes/${params._id}`)
        .then(res => {
            setQuiz(res)
            setAnswers([res.data.answers])
            setLoading(false)
            if(res.data.title) {console.log(res.data.title)}
            if(answers) {console.log(answers)}
            if(res.data.answers) {console.log(res.data.answers)}
        })
        .catch(err => {
            console.log(err)
        })
    }

    const checkAnswer = (answer) => {
        if (answer === true) {
            alert('correct!')
        } else {
            alert('try again')
        }
    }

    if (isLoading) {
        return
    }

    return (
        <div>
            <h1>{quiz && quiz.data.title}</h1>
            {quiz && quiz.data.question != null ? 
            <div>
                <h2>{quiz && quiz.data.question}</h2>
                <ul>
                {answers && answers[0].map(answer => {return <li><button onClick={() => checkAnswer(answer.correct)}>{answers && answer.answer}</button></li>})}
                </ul>
            </div> : 
            <div>No questions here!</div>}
        </div>
    )
}