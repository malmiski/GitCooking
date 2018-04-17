export default function loading_reducer(state={loaded: false}, action){
    if(action.type === "DONE_LOADING"){
        return {...state, loaded: true};
    }
    else
        return state;

} 