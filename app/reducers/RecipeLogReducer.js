export default function recipe_log_reducer(state={retrieving: false, recipes:[]}, action){
    if(action.type === "RETRIEVING_RECIPE_LOG"){
        state = {...state, retrieving: true};
    }else if(action.type === "DONE_RETRIEVING_RECIPE_LOG"){
        state = {...state, retrieving: false, recipes: action.recipes};
    }
    return state;
}