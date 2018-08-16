import { debugging, address } from "../debugging";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { getProfile } from "../graphql-queries";

export default function retrieveProfile(){
        // Thunk will place the dispatch variable here for us
        return (dispatch) =>{
            dispatch(notifyRetrieving());
        Auth.currentAuthenticatedUser()
            .then(user =>{
                    API.graphql(graphqlOperation(getProfile, {id: user.signInUserSession.idToken.payload.sub}))
                    .then(result => {dispatch(notifyDoneRetrieving(result))})
            })
            .catch(error => console.error(error))
    };

}

function notifyRetrieving(){
    return {
        type: "RETRIEVING_PROFILE",
    }
}

function notifyDoneRetrieving(json={}){
    return {
        type: "DONE_RETRIEVING_PROFILE",
        profile: json
    }
}
