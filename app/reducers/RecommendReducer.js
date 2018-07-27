export default function recommender_reducer(state={updating: false, recommendations:[]}, action){
        if(action.type === "UPDATING_RECOMMENDATIONS"){
            state = {...state, updating: true};
        }else if(action.type === "UPDATED_RECOMMENDATIONS"){
            state = {...state, updating: false, recommendations: action.recommendations};
        }
    
        return state;
    }