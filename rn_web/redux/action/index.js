import {CHANGE_RING,CHANGE_SHOCK,CHANGE_REPEAT} from "../ActionType";

export function ring_action(obj){
    return {
        type:CHANGE_RING,
        payload:obj
    };
}
export function shock_action(obj){
    return {
        type:CHANGE_SHOCK,
        payload:obj
    }
}
export function repeat_action(obj){
    return {
        type:CHANGE_REPEAT,
        payload:obj
    }
}