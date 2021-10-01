import {isEqual} from 'lodash';

export const checkPositionAvaliable=(next,positions)=>{
    const values=positions;
    return !values.find(i=>isEqual(i,next));
};

export const coordinate=(size,position)=>{
        let xy=[]
        for (let c=0;c<=size; c++){
            let y=[];
            for (let r=0; r<=size;r++){
                y.push([c*30,r*30] )
            }
            xy.push(y);
        }
        return xy[position[0]][position[1]];
    };

