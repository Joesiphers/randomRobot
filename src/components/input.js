import styled from "styled-components";
import { useState } from "react";

const Inputbox=(props)=>{
    const [inputValue,setInputValue]=useState("");
    const Input=(e)=>{setInputValue(e.target.value)
    props.onInput(e.target.value) };
    const keyPress=(e)=>{if (e.key==='Enter'){setInputValue("")}};
    return <Wrapper> 
        <input type="text" 
            value={inputValue}
            onChange={Input}
            onKeyPress={keyPress}
            placeholder="Waiting for command"
            /></Wrapper>
}
export default Inputbox;
const Wrapper=styled.div`
    margin:1rem;
`;
