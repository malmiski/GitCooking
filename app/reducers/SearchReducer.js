export default function search_reducer(state={retrieving: false, recipes:[]}, action){
    if(action.type === "SEARCHING_FOR_RECIPES"){
        state = {...state, retrieving: true};
    }else if(action.type === "DONE_SEARCHING"){
        state = {...state, retrieving: false, recipes: action.recipes};
    }
    return state;
}