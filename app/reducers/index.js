import {combineReducers} from "redux";
import tab_reducer from "./TabReducer";
import home_reducer from "./HomeReducer";
import profile_reducer from "./ProfileReducer";
import stuff_reducer from "./StuffReducer";
import recipe_list_reducer from "./RecipeListReducer.js";
import friend_list_reducer from "./FriendListReducer.js";
export default combineReducers({tab_reducer, home_reducer, profile_reducer, stuff_reducer, recipe_list_reducer, friend_list_reducer});