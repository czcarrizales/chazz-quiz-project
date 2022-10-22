import React, {useState} from "react";
import axios from 'axios';

export default function CreateQuiz() {

    const [input, setInput] = useState({
        title: ''
    })

    function handleChange(event) {
        const {name, value} = event.target;

        setInput(prevInput => {
            return {...prevInput, [name]: value}
        })
    }

    function handleClick(event) {
        event.preventDefault()

        const newQuiz = {
            title: input.title
        }

        axios.post('http://localhost:5000/quizzes/create', newQuiz)
            .then(res => console.log('quiz created', res))
            .catch(err => console.log('Error with quiz creation', err))
    }
    return (
        <div>
            <form>
                <input onChange={handleChange} name="title" type='text' value={input.title} />
                <button onClick={handleClick}>Create Quiz</button>
            </form>
        </div>
    )
}