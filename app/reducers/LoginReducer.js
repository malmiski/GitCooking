export default function login_reducer(state={logged_in: false, user: {}}, action){
    if(action.type === "SUCCESSFUL_LOGIN"){
        console.log(action.user);
        console.log(state);
        return {...state, logged_in:true, user: action.user};
    }
    else
        return state;

} 