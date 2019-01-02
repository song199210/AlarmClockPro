import {ADD_CLOCK,UPDATE_CLOCK,DELETE_CLOCK} from "../ActionType";
import {initState} from "../InitState";

export default function clockReducer(state=initState['clockList'],action){
    let newArr=[].concat(state);
    let obj={};
    switch(action['type']){
        case ADD_CLOCK:
            Object.assign(obj,action['payload']);
            newArr.push(obj);
            return newArr;
        case UPDATE_CLOCK:
            Object.assign(obj,action['payload']);
            var i=0,len=newArr.length;
            for(;i<len;i++){
                if(newArr[i]['key'] == obj['key']){
                    newArr[i]=obj;
                    break;
                }
            }
            return newArr;
        case DELETE_CLOCK:
            Object.assign(obj,action['payload']);
            var i=0,len=newArr.length;
            for(;i<len;i++){
                if(newArr[i]['key'] == obj['key']){
                    newArr.splice(i,1);
                    break;
                }
            }
            return newArr;
        default:
            return newArr;
    }
}