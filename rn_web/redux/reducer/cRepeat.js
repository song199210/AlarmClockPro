import {CHANGE_REPEAT} from "../ActionType";
import {initState} from "../InitState";

export default function cRepeat(state=initState['RepeatType'],action){
    switch(action['type']){
        case CHANGE_REPEAT:
            let obj={};
            Object.assign(obj,state,action.payload);
            return obj;
        default:
            return state;
    }
}