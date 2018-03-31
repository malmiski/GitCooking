export default function home_reducer(state = {refreshing:false, json:{}}, action){
    if(action.type !== "REFRESH_HOME"){
        return state;
    }
        state = {...state, refreshing: action.refreshing};
        if(action.refreshing){
            state = {...state, refreshing: action.refreshing, json: action.json};
        }

    return state;
}