import styled from "styled-components";
import React ,{ useState,useEffect }from "react";
import { useSelector,useDispatch } from "react-redux";
import {coordinate} from './utils/utils';
import { checkPositionAvaliable } from "./utils/utils";
const Robot=(props)=>{
    let {command,id,size}=props;
    const [bgColor,setColor]=useState("pink");
    const dispatch = useDispatch();
    const active=useSelector(state=>state.active);
    const positions=useSelector(state=>state.position);
    const [position,setPosition]=useState(positions[id]||props.position);
  //  const position=positions[id];
    const [col,row]=coordinate(size,position);
   // console.log("id",id,position);
    const dir=useSelector(state=>state.direction);
    const [direction, setDirection]=useState(dir[id]||props.direction);
    const directionMap= ["NORTH","EAST","SOUTH","WEST"];
    useEffect(() => {
        props.readMessage(id,{id,position,direction});
        dispatch({type:"position",data:{id,position}});
    }, [dispatch,position,id,direction]);

    useEffect(() => {
        if(active===id){setColor("lightgreen")}
        else{setColor("pink") }
    }, [active,id])

/*     const positionTaken=(nextPosition)=>{
        //const values=Object.values(positions);
        const values=positions;
        return !values.find(i=>isEqual(i,nextPosition));
    } */
    const go=()=>{
        const step=[[1,0],[0,1],[-1,0],[0,-1],];
        let [x,y]= step[direction];
        let nextX=position[0]+x;
        let nextY=position[1]+y;
//        console.log("next:",nextX,nextY);
        if (-1<nextX & nextX<size& -1<nextY &nextY<size&
            checkPositionAvaliable([nextX,nextY],positions))
        {
          setPosition([nextX,nextY]);
          dispatch({type:"go",data:{[id]:[nextX,nextY]}})      
        }}

        
    const turn=()=>{
        if(direction===3){setDirection(0)}
        else{setDirection(direction+1)}
    }
    const clickActive=()=>{
        dispatch({type:"active",data:id})
    }
    const place=()=>{
//        console.log(command[2],command[3]);
        setPosition(command[2]);
        setDirection(command[3]);
     }
    useEffect(() => {
      //      console.log(command)
        if (command[0]===id){
        switch (command[1]){
        case "place":place(command);break
        case "turn":turn();break
        case "go": go();break
//        case "report":report();break;
            default:return ;
    }}    
    }, [command,id])
    
    return <Bot className={directionMap[direction]||props.direction} 
                id={id}
                onClick={clickActive} 
            style={{
                bottom:`${col+size/3}px`,
                left:`${row+size+4}px`,
                "backgroundColor":bgColor,
            }}>
                {id}
            </Bot>
};/*    */
export default Robot;
const Bot=styled.div`
    position: absolute;
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    justify-content: center;
    z-index: 5;
    &.NORTH{border-top:5px solid red}
    &.SOUTH{border-bottom:5px solid red}
    &.WEST{border-left:5px solid red}
    &.EAST{border-right:5px solid red}
    `;