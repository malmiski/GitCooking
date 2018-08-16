export default function search_friend_reducer(state={retrieving: false, friends:[]}, action){
    if(action.type === "SEARCHING_FOR_FRIENDS"){
        state = {...state, retrieving: true};
    }else if(action.type === "DONE_FRIEND_SEARCHING"){
        state = {...state, retrieving: false, friends: action.friends};
    }
    return state;
}