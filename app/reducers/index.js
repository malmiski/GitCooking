import {combineReducers} from "redux";
import tab_reducer from "./TabReducer";
import home_reducer from "./HomeReducer";
import messages_reducer from "./MessagesReducer";
import stuff_reducer from "./StuffReducer";
export default combineReducers({tab_reducer, home_reducer, messages_reducer, stuff_reducer});