import React, { useState } from 'react';
import Tag from '../InputTag/index';

const postionStyle = {
    position: 'relative',
 } as React.CSSProperties;

const cStyle = {
    ...postionStyle,
    display: "inline-block",
    width: "300px",
    border: "1px solid lightblue",
    overflow: "auto"
}

const iStyle = {
    display: "inline-block",
    fontSize: "0.9em", 
    margin: "5px",
    width: "90%",
    border: "0"
}

interface inputTagProps {
    placeholder: string
}


const InputTag: React.FC<inputTagProps> = ({ placeholder }) => { 
    const [tags, setTags] = useState([])

    const onKeyUp = (e) => {
        // Space -> 32 and enter is 13
        if (e.which === 32 || e.which === 13) {
            let input = e.target.value.trim().split(" ");

            if (input.length === 0 || input[0] === "") return;  // empty tags
            let inputTags:any = [...tags, input];  
            setTags(inputTags);
            e.target.value = "";

        }
    }

    const onDeleteTag = (tag) => {
        const fillteredTags = tags.filter ((t) => (t !== tag));
        console.log("tags: ", fillteredTags);
        setTags(fillteredTags);
    }

    const mappedTags = tags.map((tag) => <Tag onDeleteTag = {onDeleteTag} key={tag} value={tag} /> );

    return (
        <div style={cStyle}>
            {mappedTags}
            <input style={iStyle} onKeyUp= {(e) => onKeyUp(e) }  type="text" placeholder= {placeholder} />    
        </div>

    )
}



export default InputTag;