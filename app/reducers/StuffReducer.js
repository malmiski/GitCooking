export default function stuff_reducer(state={retrievingStuff: false, stuff:{}}, action){
        if(action.type === "RETRIEVING_STUFF"){
            state = {...state, retrievingStuff: true};
        }else if(action.type === "DONE_RETRIEVING_STUFF"){
            state = {...state, retrievingStuff: false, stuff: action.stuff};
        }
        return state;
}