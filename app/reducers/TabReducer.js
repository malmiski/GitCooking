export default function tabReducer(state ={selected:"HOME"}, action){
    if(action.payload === undefined || action.type !== "CHANGE_TAB"){
        return state;
    }
    switch(action.payload){
        case "HOME":
            state = {...state, selected:"HOME"};
            break;
        case "DISCOVER":
            state = {...state, selected:"DISCOVER"};
            break;
        case "RECIPELOG":
            state = {...state, selected:"RECIPELOG"};
            break;
        case "PROFILE":
            state = {...state, selected:"PROFILE"};
            break;
    }
    return state;
}