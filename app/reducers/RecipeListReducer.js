export default function recipe_list_reducer(state={retrieving: false, recipes:[]}, action){
    if(action.type === "RETRIEVING_RECIPE_LIST"){
        state = {...state, retrieving: true};
    }else if(action.type === "DONE_RETRIEVING_RECIPE_LIST"){
        state = {...state, retrieving: false, recipes: action.recipes};
    }
    return state;
}