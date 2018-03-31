import {combineReducers} from "redux";
import tab_reducer from "./TabReducer";
import home_reducer from "./HomeReducer";
import profile_reducer from "./ProfileReducer";
import stuff_reducer from "./StuffReducer";
export default combineReducers({tab_reducer, home_reducer, profile_reducer, stuff_reducer});