import {createStore,applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducer/index";

// const createStoreWithMiddleware=applyMiddleware(thunkMiddleware)(createStore);
const createStoreWithMiddleware=applyMiddleware(thunkMiddleware)(createStore);

export default function configureStore(initState){
    const store=createStoreWithMiddleware(rootReducer,initState);
    // const store=createStore(rootReducer);
    return store;
}