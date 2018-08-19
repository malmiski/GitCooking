import {API, graphqlOperation, Auth} from "aws-amplify";
import {searchForFriends} from "../graphql-queries";
export default function searchFriends(query="", friendList=[]){
    // Thunk will place the dispatch variable here for us
    return (dispatch) =>{
            dispatch(notifyRetrieving());
            query = query.toLowerCase();
            Auth.currentAuthenticatedUser()
            .then(user =>{
                API.graphql(graphqlOperation(searchForFriends, {query, id:user.signInUserSession.idToken.payload.sub}))
                .then(result => {
                    var friends = friendList.map(e => e.id)
                    var friendsFound = result.data.searchFriends.map(e => {
                        e.friended = friends.indexOf(e.id) >= 0;
                        return e;
                    })
                    
                    dispatch(notifyDoneRetrieving(friendsFound));
                })
                .catch(err => console.log(err));
            });
    }
}

function notifyRetrieving(){
return {
    type: "SEARCHING_FOR_FRIENDS",
}
}

function notifyDoneRetrieving(json=[]){
    return {
        type: "DONE_FRIEND_SEARCHING",
        friends: json
    }
}