import React from "react"


export default function Que(props){

    const options = props.options.map((option,index)=>{

        let bgColor
        if(props.isSubmitted){
            if(option===props.correctAnswer){
                bgColor="#0080004d"
            }else if(option===props.selected && option!=props.correctAnswer){
                bgColor="#ff000054"
            }else{
                bgColor="whitesmoke"
            }
        }else{
            if(props.selected===option){
                bgColor="#0800ff4e"
            }
        }
        
        return(
            <div className="option" key={index} >
                <input
                type="radio"
                id={`${props.id}-${index}`}
                value={option}
                name={props.id}
                onChange={props.handleChange}
            />
            <label style={{backgroundColor:bgColor}} htmlFor={`${props.id}-${index}`}>{option}</label>
            </div>
        )
    })

    return(
        <div className="mcq" id={props.id}>
            <fieldset className="field">
                <h3 className="que">{props.ques}</h3>
                <div className="options">
                    {options}
                </div>
            </fieldset>
        </div>
    )
}
