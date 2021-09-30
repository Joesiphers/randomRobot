/*     const init=()=> {
        let init=[];
        for (let i=0;i<=3;i++){
            init.push({[`robot${i}`]:{active:false,position:[],direction:0}})
        }
        return init;
    }; */

const init=0;
const activeReducer=(state=init,action)=>{
    let newState=state;
    switch(action.type){
        case "turn": 
            return newState;
        case "active": 
            newState=action.data;
            return newState;
        default: return state;
    }

}
export default activeReducer;