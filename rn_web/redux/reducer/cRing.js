import {CHANGE_RING} from "../ActionType";
import {initState} from "../InitState";

export default function cRingReducer(state=initState['RingType'],action){
    switch(action['type']){
        case CHANGE_RING:
            let obj={};
            Object.assign(obj,state,action['payload']);
            return obj;
        default:
            return state;
    }
}