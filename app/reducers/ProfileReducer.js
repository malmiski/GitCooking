export default function profile_reducer(state={retrieving: false, profile:{userid:0, username:"", userimage:"", log:[]}}, action){
        if(action.type === "RETRIEVING_PROFILE"){
            state = {...state, retrieving: true};
        }else if(action.type === "DONE_RETRIEVING_PROFILE"){
            state = {...state, retrieving: false, profile: action.profile};
        }
        return state;
}