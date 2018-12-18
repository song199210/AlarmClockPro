import {CHANGE_SHOCK} from "../ActionType";
import {initState} from "../InitState";

export default function cShock(state=initState['ShockType'],action){
    switch(action['type']){
        case CHANGE_SHOCK:
            let obj={};
            Object.assign(obj,state,action.payload);
            return obj;
        default:
            return state;
    }
}