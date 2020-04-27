import {combineReducers} from "redux";
import {authReducer} from "./reducers/auth";
import {errorReducer} from "./reducers/error";

export default combineReducers({
    auth: authReducer,
    error: errorReducer
});