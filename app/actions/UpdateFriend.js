import {Auth, API, graphqlOperation} from "aws-amplify";
import { updateFriends } from "../graphql-queries";
export default function addFriend(id, friends){
    return (dispatch) => {
        dispatch(notifyRetrieving());
        Auth.currentAuthenticatedUser()
        .then(user =>{
            // We have to create the review if it does not exist already
            var graphOperation = updateFriends;
            var friendIDs = friends.map(e => e.id);
            friendIDs.push(id);
            var variables = {id: user.signInUserSession.idToken.payload.sub, 
                             friends:friendIDs};
            API.graphql(graphqlOperation(graphOperation, variables))
            .then(result => {
                dispatch(done({friends: result.data.updateUser.friends}));
            })
            .catch(error => console.log(error))
    })
    }
}


function notifyRetrieving(){
 return {
        type: "ADDING_FRIEND"
    }
}

function done(result={}){
    return {
        type: "ADDED_FRIEND",
        friends: result.friends
    }
}