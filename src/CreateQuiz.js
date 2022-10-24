import React, {useEffect, useState} from "react";
import axios from 'axios';
import CreateQuestion from "./CreateQuestion";

export default function CreateQuiz(props) {

    const [input, setInput] = useState({
        title: '',
        question: ''
    })

    const [numOfQuestions, setNumOfQuestions] = useState(0)

    useEffect(() => {

    }, [numOfQuestions])

    function handleChange(event) {
        const {name, value} = event.target;
        console.log(input)
        setInput(prevInput => {
            return {
                ...prevInput, [name]: value
            }
        })
    }

    function createQuiz(event) {
        event.preventDefault()

        const newQuiz = {
            title: input.title
        }

        

        axios.post('http://localhost:5000/quizzes/create', newQuiz)
            .then(res => {
                console.log(res)
                const newQuestion = {
                    quiz: res.data._id,
            question: 'just testing this question'
                }
                axios.post('http://localhost:5000/quizzes/createquestion', newQuestion)
            })
            .then(res => console.log('quiz created', res))
            .catch(err => console.log('Error with quiz creation', err))
    }

    function addQuestion(event) {
        event.preventDefault()
        setNumOfQuestions(numOfQuestions + 1)
        console.log(numOfQuestions)
    }


    return (
        <div>
            <form>
                <label for="title">Quiz Title</label>
                <input onChange={handleChange} name="title" type='text' value={input.title} />
                <br />
                <br />
                { Array(numOfQuestions).fill(<CreateQuestion onChange={handleChange} value={input.question} />) }
            <button name="question" onClick={addQuestion}>Add Question</button>
            <br />
            <br />
            <button onClick={createQuiz}>Create Quiz</button>
            </form>
            
        </div>
    )
}