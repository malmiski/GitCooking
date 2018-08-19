export default function recipe_log_reducer(state={retrieving: false, updating: false, 
recipes:{
1:{breakfast: {id: "", name: "", cost:0, contents:[]}, lunch: {id: "", name: "", cost:0, contents:[]}, dinner: {id: "", name: "", cost:0, contents:[]}},
2:{breakfast: {id: "", name: "", cost:0, contents:[]}, lunch: {id: "", name: "", cost:0, contents:[]}, dinner: {id: "", name: "", cost:0, contents:[]}}, 
3:{breakfast: {id: "", name: "", cost:0, contents:[]}, lunch: {id: "", name: "", cost:0, contents:[]}, dinner: {id: "", name: "", cost:0, contents:[]}}, 
4:{breakfast: {id: "", name: "", cost:0, contents:[]}, lunch: {id: "", name: "", cost:0, contents:[]}, dinner: {id: "", name: "", cost:0, contents:[]}}, 
5:{breakfast: {id: "", name: "", cost:0, contents:[]}, lunch: {id: "", name: "", cost:0, contents:[]}, dinner: {id: "", name: "", cost:0, contents:[]}},
6:{breakfast: {id: "", name: "", cost:0, contents:[]}, lunch: {id: "", name: "", cost:0, contents:[]}, dinner: {id: "", name: "", cost:0, contents:[]}},
7:{breakfast: {id: "", name: "", cost:0, contents:[]}, lunch: {id: "", name: "", cost:0, contents:[]}, dinner: {id: "", name: "", cost:0, contents:[]}}}}, action){
    if(action.type === "RETRIEVING_RECIPE_LOG"){
        state = {...state, retrieving: true};
    }else if(action.type === "DONE_RETRIEVING_RECIPE_LOG"){
        state = {...state, retrieving: false, recipes: action.recipes};
    }else if(action.type === "UPDATING_LOG"){
        state = {...state, updating: true};
    }else if(action.type === "UPDATED_LOG"){
        console.log(action.dinner);
        // Update the changed recipes
        var recipes = state.recipes;
        recipes[action.day] = {breakfast: action.breakfast, lunch: action.lunch, dinner: action.dinner};
        console.log(recipes[action.day])
;        state = {...state, recipes, updating: false};
    }

    return state;
}