import React from "react";

export default function CreateAnswer(props) {
    return (
        <div>
        <input onClick={props.onClick} onChange={props.onChange} id={props.id} value={props.value} name="answer" type="text" placeholder="Add Answer Here" />
        <button onClick={props.onClick}>Add Answer</button>
        </div>
    )
}