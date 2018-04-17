export default function new_recipe_reducer(state={retrieving: false, recipes:[]}, action){
    if(action.type === "RETRIEVING_NEW_RECIPES"){
        state = {...state, retrieving: true};
    }else if(action.type === "DONE_RETRIEVING_NEW_RECIPES"){
        state = {...state, retrieving: false, recipes: action.recipes};
    }
    return state;
}