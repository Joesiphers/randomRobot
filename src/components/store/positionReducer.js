/* let init=[];
const positionReducer=(state=init,action)=>{
    let newState;
    switch(action.type){
        case "position": 
            let data=action.data;
            newState=state;
            newState[data.id]=data.position;
             return newState
            default:return state;
    }
}
export default positionReducer; */
 let init={};
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
export default positionReducer;