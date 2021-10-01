const init=[0,0,0,0]
const directionReducer=(state=init,action)=>{
    let newState=state;
    switch(action.type){
        case "turn":
            if (newState[action.data]<3) {newState[action.data]+=1}
            else{newState[action.data]=0};
            return newState;

        default: return newState;
    }
}
export default directionReducer;