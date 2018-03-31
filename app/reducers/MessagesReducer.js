export default function messages_reducer(state={retrieving: false, messages:{}}, action){
        if(action.type === "RETRIEVING_MESSAGES"){
            state = {...state, retrieving: true};
        }else if(action.type === "DONE_RETRIEVING_MESSAGES"){
            state = {...state, retrieving: false, messages: action.messages};
        }
        return state;
}