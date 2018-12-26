import {combineReducers} from "redux";
import cRingReducer from "./cRing";
import cShockReducer from "./cShock";
import cRepeatReducer from "./cRepeat";
import clockReducer from "./clockReducer";

const rootReducer=combineReducers({
    cRingReducer:cRingReducer,
    cShockReducer:cShockReducer,
    cRepeatReducer:cRepeatReducer,
    clockReducer:clockReducer
});
export default rootReducer;