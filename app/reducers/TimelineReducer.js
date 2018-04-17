export default function timeline_reducer(state={retrieving: false, timeline:{userid:0, username:"", userimage:"", log:[]}}, action){
    if(action.type === "RETRIEVING_TIMELINE"){
        state = {...state, retrieving: true};
    }else if(action.type === "DONE_RETRIEVING_TIMELINE"){
        state = {...state, retrieving: false, timeline: action.timeline};
    }
    return state;
}