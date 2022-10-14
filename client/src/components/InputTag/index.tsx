import React from "react";

const tagStyle  = {
    display: "inline-block",
    backgroundColor: "yellow",
    fontSize: "0.9em",
    margin: "5px",
    border: "1px solid lightblue",
    padding: "2px"
}
interface InputTypes {
    onDeleteTag: Function;
    value : string;
}
const InputTag: React.FC <InputTypes> = ({ onDeleteTag, value }) => {
        const onDeleting = (e:any, value:any) => {
            console.log(e);
            onDeleteTag(value);
        }
        
    return (
        <React.Fragment>
            <span onClick = {(e) => onDeleting(e, value)} style={tagStyle}>
                &#x2716; {" "}
                {value}
            </span>
        </React.Fragment>
    )
    
};

export default InputTag;
