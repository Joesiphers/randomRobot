import {random, set} from "lodash";
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
  const commandMsg=useRef();
  const directionMap= ["NORTH","EAST","SOUTH","WEST"];
  const [command,setcommand]=useState("");
  const [robots,setRobots]=useState(12);
  const [size,setSize]=useState(12);
  const active=useSelector(state=>state.active);
  //const positions=useSelector(state=>state.position)
  const dispatch=useDispatch();
  const delay=ms=>new Promise (res=>setTimeout(res,ms))
  let locationPot=[];
  for (let u=0;u<=size-1;u++){
    for (let v=0;v<=size-1;v++){
      locationPot.push([u,v])
    }
  }
  let locationt =[];
  for (let z=0;z<=robots-1;z++){
    let ind=random(0,locationPot.length-1);
    locationt.push(locationPot[ind]);
    locationPot.splice(ind,1);
//    console.log(locationt.length,locationPot.length,"length")
  } 
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
  const parseCommand= async (input)=>{
    let command=input.toString();
    command=command.replace(/(^\s*)|(\s*$)/ig,"");
    command=command.toUpperCase().split(" ");
    commandMsg.current.innerHTML=` `

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
       if( command[0]==="ROBOTS" ||command[0]==="ROBOT" ) {
        setRobots(0);
        await delay(50);
        let robotNumber=Number(command[1]);
        if (robotNumber>size*size){
          commandMsg.current.innerHTML=` Message: fail, robot number over size`
          ;return }
        setRobots(robotNumber);
        
      }
        if(command[0]==="SIZE" ||command[0]==="SIZES"){
        //  let s=command[1].split(","); 
         // setSize([Number(s[0]),Number(s[1])])};
         setRobots(0);
         await delay(50);
         setSize(Number(command[1]))}
         else{console.log("not found");}
        return
    }

  };

const createRobots= (r)=>{
  let list=[]; 
      //spread robots randomly;
    /* const positioning=()=>{   
      do{  
        let a=random(0,size-1);
        let b=random(0,size-1);
        if (checkPositionAvaliable([a,b],positions)){
          return [a,b]
        } 
      }while( true) }; */
  console.log(robots,size,"r",r,"createRobot")
   for(let i=0;i<=r-1;i++){
  // let locationu=i<size?[0,i]:[1,i-size]; //spead robots on bottom*/
  let location=locationt[i] //positioning();  
  list.push(
    <Robot id={i} key={i}
      position={location}
      direction={random(0,3)} 
      command={command}
      size={size}
      readMessage={readMessage}
    />);
   console.log(i,location)};
   
  return list;
}
let bort=false;
  const randomTest=async ()=>{
    const active=(id)=>{
        dispatch ({type:"active",data:id})
    }
    
    let x=random(0,robots-1);
    let z=random(0,8);
    active(x);
    await delay(50);
    for (let i=0;i<=z;i++){
    let y=random(0,3);
       go(x);
       await delay(30);      
       for (let j=0;j<=y;j++){
            turn(x) 
              }
            for (let j=0;j<=y;j++){  
              await delay(30);
               go(x);
            };await delay(20);
      turn(x)
    }
  }  
   const Test=async ()=>{
     bort=false;
    for (let i=0;i<=100;i++){
      countRef.current.innerHTML=`${100-i}`;
      await delay (50);
      console.log("running abort is", bort,i);
      if (bort===false){
 //       console.log("waiting");
//        await delay (500);
 //       console.log("working");
      await  randomTest();
  //      console.log("waiting");
  //      await delay (500);
      }else{console.log("abort");return }
      }
    }   
 
/*   const abortTest=()=>{
    bort=true;
    console.log("bort is set to",bort)
  } */
  
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
    <label>please enter command. </label>
    <label ref={commandMsg} style={{"color":"red"}}></label>
    <Inputbox onInput={readCommand} />

    <button onClick={go } >Go</button>
    <button onClick={turn} >Turn</button>
    <button onClick={Test} >Run 100 Step</button>
    <button onClick={randomTest} >Single Step</button>
    </div></div>
      <MessageBoard> 
          <p>Test Round: <label ref={countRef}></label></p> 
          <br/><div>
          <p>command examples: </p> 
          <p>size=6; robots=5;</p> 
          <p>click a robot to active;</p>
          <p>place x,y,north or move,turn </p>
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
  & label p {line-height: 0.6rem;} 
  `;
const Wrapper=styled.div`
  margin-top:2rem ;
  `;
const Container=styled.div`
  display:flex;
  justify-content: space-around;
margin:0 auto;
text-align: start;
top: 1rem;
left: 6rem;
`;