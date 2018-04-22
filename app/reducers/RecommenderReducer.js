export default function recommender_reducer(state={}, action){
    if(action.type === "UPDATE_RECOMMENDED"){
        state = {...state, log: action.log};
    }
    return state;
}