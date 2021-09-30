import { useSelector } from "react-redux";
export const parseCommand=(input)=>{
    let command=input.toString();
    command=command.replace(/(^\s*)|(\s*$)/ig,"").toUpperCase();
   command=command.toUpperCase();
   // command=command.replace(/(\s*)/g,"");
    command=command.split(" ");
    switch(command[0]){
        case "PLACE" :
            {console.log(command[1],"Place");
            return {action:"place",
            position:[command[0].toNumber(),command[1].toNumber()],
            direction:command[3]} }
        case "MOVE":  return {action:"GO"}
        case "REPORT":return {action:"REPORT"}
        default: return
    }}
    export const coordinate=(position)=>{
        let xy=[]
        for (let c=0;c<=4; c++){
            let y=[];
            for (let r=0; r<=4;r++){
                y.push([c*30,r*30] )
            }
            xy.push(y);
        }
        return xy[position[0]][position[1]];
    };

