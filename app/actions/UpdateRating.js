import {Auth, API, graphqlOperation} from "aws-amplify";
import { updateRatingForUser, createRatingForUser } from "../graphql-queries";
export default function updateRating(review={}, isNewRating){
    return (dispatch) => {
        dispatch(notifyRetrieving());
        // We have to create the review if it does not exist already
        var graphOperation = isNewRating ? createRatingForUser : updateRatingForUser;
        var variables = {userID: review.userID, recipeID:review.recipeID, stars:review.stars, comment:review.comment};
        console.log(isNewRating);
        if(!isNewRating) variables["reviewID"] = review.id;
        API.graphql(graphqlOperation(graphOperation, variables))
        .then(result => {
            var json = {};
            if(isNewRating) json = result.data.createReview;
            else json = result.data.updateReview;
            console.log(json);
            dispatch(done(json)); 

        })
        .catch(error => console.log(error))
    }
}


function notifyRetrieving(){
 return {
        type: "UPDATING_RATING"
    }
}

function done(result={}){
    return {
        type: "UPDATED_RATING",
        review: result
    }
}