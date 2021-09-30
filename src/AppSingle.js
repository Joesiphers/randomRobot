
import { useState,useEffect } from 'react';
import styled from 'styled-components';
import './App.css';
import Robot, {ClassRobot} from './components/robot';
import Inputbox from './components/input';
function App() {
  const [position,setPosition]=useState([1,5]);
  const [direction, setDirection]=useState(0);
  const x=position[0];const y=position[1];
  const size=[5,5];
  const directionMap= ["NORTH","EAST","SOUTH","WEST"];
  let col=[];
  for (let i=1; i<=size[1];i++){
    let row=[];
    for (let r=1; r<=size[0];r++){
      if (r===x&&i===y){
        row.push(<Unit id={`${i}${r}`} key={`${i}${r}`} className="Unitbox"
        ><Robot id={1} face={direction}/>
        </Unit>)
      }else{
        row.push(<Unit id={`${i}${r}`} key={`${i}${r}`} className="Unitbox"
        ></Unit>)}  
      }
    col.push(<Row key={i} id={`r${i}`}>{row}</Row>)
  }
  const [command,setcommand]=useState("");
  const step=[[0,-1],[1,0],[0,1],[-1,0],];
  const go=()=>{
    let [x,y]= step[direction];
    let nextX=position[0]+x;
    let nextY=position[1]+y;
    if (0<nextX & nextX<6& 0<nextY &nextY<6){
      setPosition([nextX,nextY])};
    }
  const turn=()=>{
    if(direction===3){setDirection(0)}
    else{setDirection(direction+1)}
  }
  const readCommand=(val)=>{
    setcommand(val);
  };
  const sumit=(e)=>{
    e.preventDefault();
    parseCommand(command);
  }
 useEffect(() => {
    console.log(command);
  }, [command])
/* word command*/
  const parseCommand=(input)=>{
    let command=input.toString();
    command=command.replace(/(^\s*)|(\s*$)/ig,"").toUpperCase();
   command=command.toUpperCase();
   // command=command.replace(/(\s*)/g,"");
    command=command.split(" ");
    switch(command[0]){
        case "PLACE" :
            {console.log(command[1],"Place");
            setPosition([Number(command[1]),Number(command[2])]);
            let fa=directionMap.findIndex((i)=>i===command[3]);
            console.log(fa,"fa");
            setDirection(fa);
            return {action:"place",
            position:[Number(command[0]),Number(command[1])],
            direction:command[3]} }
        case "MOVE":go();  return {action:"GO"}
        case "TURN": turn();  return
        case "REPORT":console.log(position,direction) ;return {action:"REPORT"}
    }
  };

  return (
    <div className="center">
      {col}  
      <form onSubmit={sumit }>   
      <Inputbox onInput={readCommand} />
      <label>My Postion: {position[0]},{position[1]} 
      Face: {directionMap[direction]} </label>
      </form>
    <button onClick={go} >Go</button>
    <button onClick={turn} >Turn</button>
    <ClassRobot/>
    </div>
  );
}

export default App;
const Unit=styled.div`
  width:50px;
  height:50px;
  border:1px solid lightgray ;
  display:flex;
  justify-content: center;
  align-items: center;

  `;
  const Row=styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  `;