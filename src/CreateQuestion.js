import React, {useState} from "react";
import CreateAnswer from "./CreateAnswer";

export default function CreateQuestion(props) {

    const [propsinput, setPropsInput] = useState({
        title: '',
        question: ''
    })

    function handleChange(event) {
        const {name, value} = event.target;
        setPropsInput(prevInput => {
            return {
                ...prevInput, [name]: value
            }
        })
    }

    return (
        <div>
            <input onChange={handleChange} placeholder="Insert question here" name="question" type="text" value={props.value} />
            <CreateAnswer />
        </div>
    )
}