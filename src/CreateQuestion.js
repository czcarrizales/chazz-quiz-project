import React, {useState} from "react";
import CreateAnswer from "./CreateAnswer";

export default function CreateQuestion(props) {

    return (
        <div>
            <input onChange={props.onChange} id={props.id} placeholder="Insert question here" name="question" type="text" value={props.value} />
        </div>
    )
}