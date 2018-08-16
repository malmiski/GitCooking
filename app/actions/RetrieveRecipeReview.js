import { debugging, address } from "../debugging";
import { Auth, API, graphqlOperation } from "aws-amplify";
import {getReviewByRecipeUser } from "../graphql-queries";

export default function retrieveReview(recipeID="", userID=""){
        // Thunk will place the dispatch variable here for us
        return (dispatch) =>{
            dispatch(notifyRetrieving());
        Auth.currentAuthenticatedUser()
            .then(user =>{
                    API.graphql(graphqlOperation(getReviewByRecipeUser, {userID: user.signInUserSession.idToken.payload.sub, recipeID}))
                    .then(result => {console.log(result); dispatch(notifyDoneRetrieving(result.data.getReviewByRecipeUser))})
                    .catch(error => {
                        dispatch(notifyDoneRetrieving({}))
                    })        
            })
            .catch(error => {
                dispatch(notifyDoneRetrieving({}))
            })
    };

}

function notifyRetrieving(){
    return {
        type: "RETRIEVING_RATING",
    }
}

function notifyDoneRetrieving(json={}){
    return {
        type: "RETRIEVED_RATING",
        review: json
    }
}