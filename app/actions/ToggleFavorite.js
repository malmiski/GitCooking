import {Auth, API, graphqlOperation} from "aws-amplify";
import { updateFavorites } from "../graphql-queries";
export default function toggleFavorite(isFavorite, id, favorites, refresh=null){
    return (dispatch) => {
        dispatch(notifyRetrieving());
        Auth.currentAuthenticatedUser()
        .then(user =>{
            // We have to create the review if it does not exist already
            var graphOperation = updateFavorites;
            if(isFavorite){
                favorites = favorites.filter(e => e!=id)
            }else{
                favorites.push(id);
            }
            var variables = {userID: user.signInUserSession.idToken.payload.sub, 
                             favorites:favorites};
            API.graphql(graphqlOperation(graphOperation, variables))
            .then(result => {
                console.log(result);
                if(refresh) refresh();
                dispatch(done({favorites: result.data.updateUser.favorites}));
            })
            .catch(error => console.log(error))
    })
    }
}


function notifyRetrieving(){
 return {
        type: "TOGGLING_FAVORITE"
    }
}

function done(result={}){
    return {
        type: "TOGGLED_FAVORITE",
        review: result
    }
}