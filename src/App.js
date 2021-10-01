import {random} from "lodash";
import { checkPositionAvaliable } from "./components/utils/utils";
import React, { useState, useRef } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import './App.css';
import Robot from './components/robot';
import Background from './components/background';
import Inputbox from './components/input';
import styled from 'styled-components';
function App() {
  const [reportMessage, setReportMessage]=useState([]);
  const countRef=useRef();
  const directionMap= ["NORTH","EAST","SOUTH","WEST"];
  const [command,setcommand]=useState("");
  const [robots,setRobots]=useState(10);
  const [size,setSize]=useState(10);
  const active=useSelector(state=>state.active);
  const positions=useSelector(state=>state.position)
 /*start to place*/
  const place=(position,direction)=>{
    setcommand([active,"place",position,direction])
  }
  const go=(id)=>{
    if ( typeof(id)==="number") {setcommand([id,"go"])}
    else{setcommand([active,"go"])};
  }
  const turn=(id)=>{
    if ( typeof(id)==="number") {setcommand([id,"turn"])}
    else{setcommand([active,"turn"])};  } 
  const readCommand=(val)=>{
   parseCommand(val)
  };
  const readMessage=(id,msg)=>{
    let message=reportMessage;
    message[id]=msg;
    setReportMessage(message)
  }

/* word command*/
  const parseCommand=(input)=>{
    let command=input.toString();
    command=command.replace(/(^\s*)|(\s*$)/ig,"");
   command=command.toUpperCase().split(" ");
    switch(command[0]){
        case "PLACE" :
            const [x,y,f]=command[1].split(",");
            console.log(command[1],"robot");
            let position=[Number(x),Number(y)];
            let dir=directionMap.findIndex((i)=>i===f);
            place(position,dir);
            return ;
        case "MOVE":go(active);  break;
        case "TURN": turn(active); break;
       // case "REPORT": report();break
        case "REPORT": readMessage();break
        case "ROBOTS": setRobots(Number(command[1]));break
        default: 
       command =command.toString().split("=");
        command[0]==="ROBOTS" ||command[0]==="ROBOT" ?
        setRobots(Number(command[1])):console.log("not found");
        if(command[0]==="SIZE" ||command[0]==="SIZES"){
        //  let s=command[1].split(","); 
         // setSize([Number(s[0]),Number(s[1])])};
         setSize(Number(command[1]))}
         else{console.log("not found");}
        return
    }
  };

const createRobots=(r)=>{let list=[]; 
  for(let i=0;i<=r-1;i++){
    let location=[];
    //spread robots randomly;
    const positioning=()=>{
      do{  
        let a=random(0,size-1);
        let b=random(0,size-1);
        if (checkPositionAvaliable([a,b],positions)){
          return [a,b]
        } 
      }while( true)
    }
    location=positioning();
/*   location=i<size?[0,i]:[1,i-size]; //spead robots on bottom*/
    list.push(
    <Robot id={i} key={i}
      position={location}
      direction={random(0,3)} 
      command={command}
      size={size}
      readMessage={readMessage}
    />);
   };
  return list;
}
  const dispatch=useDispatch();
  const delay=ms=>new Promise (res=>setTimeout(res,ms))
  const randomTest=async ()=>{
  //  console.log(x);
 
    const active=(id)=>{
        dispatch ({type:"active",data:id})
    }
    let x=random(0,6);
    let y=random(0,3);
  active(x);
    await delay (150)
    for (let i=0;i<=x;i++){
            for (let j=0;j<=y;j++){
              go(x);
              }
              for (let j=0;j<=y;j++){  
              await delay(50);
              turn(x)
            };//await delay(50);
       go(x);await delay(50)
    }
  }  
     const Test=async()=>{
    for (let i=0;i<=100;i++){
      randomTest();
      await delay (1000)
      countRef.current.innerHTML=`${100-i}`
      }
    }  
  
return (
  <Wrapper className="center"> 
    <Container>
       <MessageBoard>
          <label>Robot Position Facing
          {  reportMessage.map((i)=>{
            return <p key={i.id}> 
            Robot{i.id} {i.position} {directionMap[i.direction] } 
            </p>})      }
          </label>  
        </MessageBoard>   
      <div className="center">
      <Background size={size}>
        {createRobots(robots)}
      </Background>   
      <div>  <br/>
    <label>please enter command</label>
    <Inputbox onInput={readCommand} />

    <button onClick={go } >Go</button>
    <button onClick={turn} >Turn</button>
    <button onClick={Test} >Test</button>
    <button onClick={randomTest} >oneTest</button>
    </div></div>
      <MessageBoard> 
          <p>Test Round: <label ref={countRef}></label></p> 
          <br/><div>
          <p>command examples: </p> 
          <p>size=6; robots=5;</p> 
          <p>click a robot to active;</p>
          <p>place x,y,f or move,turn </p>
          </div> 
      </MessageBoard>
    </Container>

</Wrapper>
  );
}

export default App;
const MessageBoard=styled.div`
  width: 33%;
  text-align: start;
  top: 1rem;
  left: 6rem;
  margin:0 0 0 1rem;

  `;
const Wrapper=styled.div`
  margin-top:2rem ;
  line-height: 0.5rem;
  `;
const Container=styled.div`
  display:flex;
  justify-content: space-around;
margin:0 auto;
text-align: start;
top: 1rem;
left: 6rem;
`;