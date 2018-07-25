import { debugging, address} from "../debugging";
import { API, graphqlOperation } from "aws-amplify";
import { topRecipes } from "../graphql-queries";

export default function retrieveTopRated(nextToken=""){
    // Thunk will place the dispatch variable here for us
    return (dispatch) =>{
        dispatch(notifyRetrieving());
        /*
        if(debugging){
        //fetch(`https://jsonplaceholder.typicode.com/users`).
        new Promise(resolve => {resolve()}).
        // then(response => response.json(), error => console.log("wassup", error)).then( json => {
        then( ()=>{
            dispatch(notifyDoneRetrieving([
                {key: 16, name: "Steak", url: "https://www.omahasteaks.com/gifs/990x594/pr_ts004.jpg"}, 
                {key:89, name: "Spaghetti and Meatballs", url: "https://hips.hearstapps.com/del.h-cdn.co/assets/17/39/2048x1365/gallery-1506456062-delish-spaghetti-meatballs.jpg"}, 
                {key:9, name: "Tiramisu", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Tiramisu_with_blueberries_and_raspberries%2C_July_2011.jpg/1280px-Tiramisu_with_blueberries_and_raspberries%2C_July_2011.jpg"},
                {key:19, name: "Cheesburger", url: "https://www.kingsford.com/wp-content/uploads/2014/11/kfd-howtohamburger-Burgers_5_0391-1024x621.jpg"},
            ]))
            });
        }else{
            fetch(`${address}\\topRated`)
            .then(response => response.json(), error => console.log("wassup", error))
            .then( json => {
                notifyDoneRetrieving(json);
            })
        }
        */
        // Use the nextToken to get the next top recipes
        API.graphql(graphqlOperation(topRecipes, {query: ""}))
        .then(result => {console.log(result); dispatch(notifyDoneRetrieving(result))})

        };

    }

function notifyRetrieving(){
return {
    type: "RETRIEVING_TOP_RECIPES",
}
}

function notifyDoneRetrieving(json=[]){
return {
    type: "DONE_RETRIEVING_TOP_RECIPES",
    recipes: json.data.searchByRating
}
}

