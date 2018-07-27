export default function recipe_reducer(state={retrieving: false, recipe:{id: '100', name:"", cost:"", pic:"", ingredients:[], instructions:[], stars:0}}, action){
    if(action.type === "RETRIEVING_RECIPE"){
        state = {...state, retrieving: true};
    }else if(action.type === "DONE_RETRIEVING_RECIPE"){
        state = {...state, retrieving: false, recipe: action.recipe};
    }
    return state;
}