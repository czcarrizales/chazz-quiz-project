import React, {useState} from "react";
import CreateAnswer from "./CreateAnswer";

export default function CreateQuestion(props) {

    return (
        <div>
            <input onClick={props.onClick} onChange={props.onChange} id={props.id} placeholder="Insert Question Here" name="question" type="text" value={props.value} />
        </div>
    )
}