import {Auth, API, graphqlOperation} from "aws-amplify";
import { updateLogEntryForDay } from "../graphql-queries";
// import {updteLog} from ""
export default function updateLog(breakfast, lunch, dinner){
    return (dispatch) => {
        // Immediately update the log with the new stuff on the
        // front end, and notify that we are now currently updating
            dispatch(notifyImmediateUpdate(breakfast, lunch, dinner))
            API.graphql(graphqlOperation(updateLogEntryForDay, {breakfastObj: breakfast, lunchObj: lunch, dinnerObj: dinner}))
            .then(result =>{
                    // If it is a success then we can just notify the UI that we
                    // have successfully updated the log entries
                    // TODO: Add error handling in the future
                    dispatch(doneUpdating(result))
            })
    };
}


function notifyImmediateUpdate(breakfast, lunch, dinner){
    return {
        type: "UPDATING_LOG",
        breakfast,
        lunch,
        dinner,
    }
}


function doneUpdating(result){
    return {
            type: "UPDATED_LOG"
    }
}