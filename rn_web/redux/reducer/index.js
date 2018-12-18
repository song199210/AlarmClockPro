import {combineReducers} from "redux";
import cRingReducer from "./cRing";
import cShockReducer from "./cShock";
import cRepeatReducer from "./cRepeat";

const rootReducer=combineReducers({
    cRingReducer:cRingReducer,
    cShockReducer:cShockReducer,
    cRepeatReducer:cRepeatReducer
});
export default rootReducer;