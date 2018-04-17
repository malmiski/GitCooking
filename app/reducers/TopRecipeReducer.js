export default function top_recipe_reducer(state={retrieving: false, recipes:[]}, action){
    if(action.type === "RETRIEVING_TOP_RECIPES"){
        state = {...state, retrieving: true};
    }else if(action.type === "DONE_RETRIEVING_TOP_RECIPES"){
        state = {...state, retrieving: false, recipes: action.recipes};
    }
    return state;
}