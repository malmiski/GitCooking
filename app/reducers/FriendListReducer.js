export default function friend_list_reducer(state={retrieving: false, friends:[]}, action){
    if(action.type === "RETRIEVING_FRIEND_LIST"){
        state = {...state, retrieving: true};
    }else if(action.type === "DONE_RETRIEVING_FRIEND_LIST"){
        state = {...state, retrieving: false, friends: action.friends};
    }
    return state;
}