import React, {useState} from "react";
import axios from 'axios';

export default function CreateQuiz() {

    const [input, setInput] = useState({
        title: '',
        question: '',
        answer: []
    })

    function handleChange(event) {
        const {name, value} = event.target;
        console.log(input)
        setInput(prevInput => {
            return {
                ...prevInput, [name]: value
            }
        })
        console.log(input.answer.correct)
    }

    function handleClick(event) {
        event.preventDefault()

        const newQuiz = {
            title: input.title,
            question: input.question,
        }

        axios.post('http://localhost:5000/quizzes/create', newQuiz)
            .then(res => console.log('quiz created', res))
            .catch(err => console.log('Error with quiz creation', err))
    }
    return (
        <div>
            <form>
                <label for="title">Quiz Title</label>
                <input onChange={handleChange} name="title" type='text' value={input.title} />
                <br />
                <label for="question">Quiz Question</label>
                <input onChange={handleChange} name="question" type="text" value={input.question} />
                <br />
                <label for="answer">Quiz Answer</label>
                <input onChange={handleChange} name="answer" type="text" value={input.answer.text}/>
                <br />
                <button onClick={handleClick}>Create Quiz</button>
            </form>
        </div>
    )
}