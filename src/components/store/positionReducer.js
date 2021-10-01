let init=[];
/* [0,0],[0,1],[0,2],[0,3]
action={type:"postion",data:{id:[x,y]}}*/
const positionReducer=(state=init,action)=>{
    let newState;
    //console.log("action received",action)
    switch(action.type){
        case "position": 
            let data=action.data;
            newState=[...state];
            newState[data.id]=data.position;
           // console.log(newState,"update go")
             return newState
         // setPosition([nextX,nextY]);
            default:return state;
    }
}
export default positionReducer;
/*  let init={};
const positionReducer=(state=init,action)=>{
    let newState;
    switch(action.type){
        case "position": 
            let data=action.data;
            newState={...state};
            newState[data.id]=data.position;
             return newState
            default:return state;
    }
}
export default positionReducer; */