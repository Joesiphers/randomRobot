import styled from "styled-components";
import store from './store/store'
import React ,{ useState,useEffect }from "react";
import { useSelector,useDispatch } from "react-redux";
import {isEqual} from 'lodash';
import {coordinate} from './utils/utils';
export class ClassRobot extends React.Component{
    constructor(face,position,id){
        super();
        this.id=id;
        this.face=face;
        this.coordinate=position;
        this.state={position:[0,0],
                    direction:0 }
    }
    go() {
        const step=[[1,0],[0,1],[-1,0],[0,-1],];
        let [x,y]= step[this.state.direction];
        let nextX=this.state.position[0]+x;
        let nextY=this.state.position[1]+y;
        if (-1<nextX & nextX<5& -1<nextY &nextY<5){
          this.setState([nextX,nextY])};
    }
    turn(){
        if(this.state.direction===3){this.setState(0)}
        else{this.setState(this.state.direction+1)}
    }
    report(){return [this.state.position,this.state.direction]}
    render (){
        return <div>robot</div>
    }
}


const Robot=(props)=>{
    const [bgColor,setColor]=useState("pink");
    const [position,setPosition]=useState(props.position);
    const [col,row]=coordinate(position);
    const [direction, setDirection]=useState(0);
    const dispatch = useDispatch();
    const active=useSelector(state=>state.active);
    const positions=useSelector(state=>state.position)
    const directionMap= ["NORTH","EAST","SOUTH","WEST"];
    const {command,id}=props;
    useEffect(() => {
            dispatch({type:"position",data:{id,position}});
    }, [position])
    useEffect(() => {
        if(active===id){setColor("lightgreen")}
        else{setColor("pink") }
    }, [active])

    const positionTaken=(nextPosition)=>{
      //  const positions=store.getState().position;
        const values=Object.values(positions);
        return !values.find(i=>isEqual(i,nextPosition));
    }
    const go=()=>{
        const step=[[1,0],[0,1],[-1,0],[0,-1],];
        let [x,y]= step[direction];
        let nextX=position[0]+x;
        let nextY=position[1]+y;
//        console.log("next:",nextX,nextY);
        if (-1<nextX & nextX<5& -1<nextY &nextY<5&positionTaken([nextX,nextY]))
        {
          setPosition([nextX,nextY]);
 //         dispatch({type:"go",data:{[id]:position}})      
        }}
    const turn=()=>{
        if(direction===3){setDirection(0)}
        else{setDirection(direction+1)}
    }
    const clickActive=()=>{
        dispatch({type:"active",data:id})
    }
    const report=()=>{

    }
    useEffect(() => {
        if (command[0]===id){
        switch (command[1]){
        case "turn":turn();break
        case "go": go();break
        case "report":report();break;
            default:return ;
    }}    
    }, [command])
    
    return <Bot className={directionMap[direction]||props.direction} 
                id={id}
                onClick={clickActive} 
            style={{
                bottom:`${col+3}px`,
                left:`${row+9}px`,
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
    justify-content: center;
    z-index: 5;
    &.NORTH{border-top:5px solid red}
    &.SOUTH{border-bottom:5px solid red}
    &.WEST{border-left:5px solid red}
    &.EAST{border-right:5px solid red}
    `;