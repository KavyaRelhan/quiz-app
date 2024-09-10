import React from "react"

export default function Que(props){

    const optionElements= (props.options).map((opt)=>{

        const styles={
            backgroundColor: opt.isSelected ? "aqua":"whitesmoke" 
        }

        return(
            <div onClick={opt.handleClick} style={styles} className="option">{opt.text}</div>
        )
    })
    return(
        <div className="mcq" id={props.id} key={props.key}>
            <h3 className="que">{props.ques}</h3>
            <div className="options" id={props.id}>
                {optionElements}
            </div>
        </div>

    )
}