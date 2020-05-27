import {combineReducers} from "redux";
import {authReducer} from "./reducers/auth";
import {errorReducer} from "./reducers/error";
import {newTestReducer} from "./reducers/newTest";
import {answersReducer} from "./reducers/answers";
import {resultReducer} from "./reducers/result";

export default combineReducers({
    auth: authReducer,
    error: errorReducer,
    newTest: newTestReducer,
    answers: answersReducer,
    result: resultReducer
});