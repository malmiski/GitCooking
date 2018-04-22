export default function rating_reducer(state={rating:0}, action){
    if(action.type === "UPDATE_RATING"){
        state = {...state, rating: action.rating};
    }
    return state;
}