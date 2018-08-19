import {Auth, API, graphqlOperation} from "aws-amplify";
import { updateLogEntryForDay } from "../graphql-queries";
// import {updteLog} from ""
export default function updateLog(day, breakfast, lunch, dinner, onFinish){
    return (dispatch) => {
        // Immediately update the log with the new stuff on the
        // front end, and notify that we are now currently updating
            dispatch(notifyImmediateUpdate(day, breakfast, lunch, dinner))
            console.log(dinner);
            API.graphql(graphqlOperation(updateLogEntryForDay, {breakfastObj: breakfast, lunchObj: lunch, dinnerObj: dinner}))
            .then(result =>{
                    // If it is a success then we can just notify the UI that we
                    // have successfully updated the log entries
                    // TODO: Add error handling in the future
                    dispatch(doneUpdating(result, day, breakfast, lunch, dinner))
                    onFinish(day);
            })
            .catch(err =>{
                console.log(err);
                dispatch(doneUpdating(result, day, breakfast, lunch, dinner));
                onFinish(day, err)
            })
    };
}


function notifyImmediateUpdate(){
    return {
        type: "UPDATING_LOG",
    }
}


function doneUpdating(result, day, breakfast, lunch, dinner){
    return {
            type: "UPDATED_LOG",
            day,
            breakfast,
            lunch,
            dinner,
        }
}