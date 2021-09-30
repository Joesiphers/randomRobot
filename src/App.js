
import React, { useState,useEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import './App.css';
import { forEach } from 'lodash';
import Robot from './components/robot';
import Background from './components/background';
import Inputbox from './components/input';
import store from './components/store/store';
import styled from 'styled-components';
function App() {
  const [position,setPosition]=useState([1,1]);
  const [direction, setDirection]=useState(0);
  const [reportMessage, setReportMessage]=useState([]);
  const directionMap= ["NORTH","EAST","SOUTH","WEST"];
  const [command,setcommand]=useState("");
  const active=useSelector(state=>state.active);
  const positions=useSelector(state=>state.position)
  const report=()=>{
    //const positions=store.getState().position;
    let msg=[]; 
    console.log("report");
    forEach (positions, (value,key) =>
      msg.push (<p key={key}> Robot{key} in [{value}] </p>)
    )
  setReportMessage(msg);}
  useEffect(() => {
    console.log("place",direction,position)
  },[position,direction])
  useEffect(() => {
    report()
  },[positions])
  const go=()=>{ setcommand([active,"go"]);
    }
  const turn=()=>{
    setcommand([active,"turn"])
  } 
  const readCommand=(val)=>{
    setcommand(val);
  };
  const sumit=(e)=>{
    e.preventDefault();
    parseCommand(command);
  }
/* word command*/
  const parseCommand=(input)=>{
    let command=input.toString();
    command=command.replace(/(^\s*)|(\s*$)/ig,"");
   command=command.toUpperCase().split(" ");
 //   command=command;

    switch(command[0]){
        case "PLACE" :
            const [x,y,f,n]=command[1].split(",");
            console.log(command[1],"robot");
            setPosition([Number(x),Number(y)]);
            let dir=directionMap.findIndex((i)=>i===f);
            console.log(dir,"find dir");
            setDirection(dir);
            return ;
        case "MOVE":go();  break;
        case "TURN": turn(); break;
        case "REPORT": report();break
        default: console.log("not found");return
    }
  };

const Robots=()=>{let list=[]; 
  for(let i=0;i<=3;i++){
    list.push(
  <Robot id={i} key={i}
  position={[0,i]} 
  direction={directionMap[i]} 
  command={command}
  />);  
  };
  return list;}

  return (
   <div className="center"> 
      <Background>
        {Robots()}
      
      </Background>   
      <MessageBoard><label>positions: {reportMessage}</label>  </MessageBoard>      
      <form onSubmit={sumit }>   
      <Inputbox onInput={readCommand} />
      </form>
    <button onClick={go} >Go</button>
    <button onClick={turn} >Turn</button>
    </div>
  );
}

export default App;
const MessageBoard=styled.div`
  position: absolute;
  top: 1rem;
  left: 6rem;
  `;
