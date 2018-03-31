export default function tabReducer(state ={selected:"HOME"}, action){
    if(action.payload === undefined || action.type !== "CHANGE_TAB"){
        return state;
    }
    switch(action.payload){
        case "HOME":
            state = {...state, selected:"HOME"};
            break;
        case "MYSTUFF":
            state = {...state, selected:"MYSTUFF"};
            break;
        case "MESSAGES":
            state = {...state, selected:"MESSAGES"};
            break;
        case "MORE":
            state = {...state, selected:"MORE"};
            break;
    }
    return state;
}