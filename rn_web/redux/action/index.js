import {CHANGE_RING,CHANGE_SHOCK,CHANGE_REPEAT,ADD_CLOCK,UPDATE_CLOCK,DELETE_CLOCK} from "../ActionType";
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
//闹钟增删改查
export function add_clock(obj){
    return {
        type:ADD_CLOCK,
        payload:obj
    };
}
export function update_clock(obj){
    return {
        type:UPDATE_CLOCK,
        payload:obj
    };
}
export function del_clock(obj){
    return {
        type:DELETE_CLOCK,
        payload:obj
    };
}