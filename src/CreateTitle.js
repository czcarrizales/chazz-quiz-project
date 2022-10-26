import React, {useState} from "react";

export default function CreateTitle(props) {

    return (
        <div>
            <input onClick={props.onClick} onChange={props.onChange} id={props.id} placeholder="Insert Title Here" name="title" type="text" value={props.value} />
        </div>
    )
}