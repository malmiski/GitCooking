export default function rating_reducer(state={id:"",review:{}}, action){
    if(action.type === "RETRIEVING_RATING"){
        state = {...state, retrieving: true, review:{}}
    }else if(action.type === "RETRIEVED_RATING"){
        state = {...state, retrieving: false, review: action.review}
    }else if(action.type === "UPDATING_RATING"){
        state = {...state, updating: true};
    }else if(action.type === "UPDATED_RATING"){
        state = {...state, updating: false, review: action.review}
    }
    return state;
}