import React from "react";

export default function CreateAnswer(props) {
    return (
        <div className={props.className}>
        <input onClick={props.onClick} onChange={props.onChange} id={props.id} value={props.value} name="answer" type="text" placeholder="Insert Answer Here" />
        </div>
    )
}