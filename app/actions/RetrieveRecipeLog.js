import {Auth, API, graphqlOperation  } from "aws-amplify";
import {getLog} from "../graphql-queries";

export default function retrieveRecipeLog(id=""){
    // Thunk will place the dispatch variable here for us
    return (dispatch) =>{
        // dispatch()
        dispatch(notifyRetrieving());

        /*
        //fetch(`https://jsonplaceholder.typicode.com/users`).
        new Promise(resolve => {resolve()}).
        // then(response => response.json(), error => console.log("wassup", error)).then( json => {
        then( ()=>{
                dispatch(notifyDoneRetrieving([
                            {breakfast: {name: "Pancakes", cookTime: 15, key:104, imageURI:"https://static01.nyt.com/images/2017/03/24/dining/24COOKING-CLASSICPANCAKES/24COOKING-CLASSICPANCAKES-articleLarge.jpg"},
                             dinner: {},
                             dessert:{},
                        },
                        {
                            breakfast: {name: "Falafel", cookTime: 15, key:540, imageURI:"https://mykitchenkohl.files.wordpress.com/2011/07/100_8674.jpg?w=768"},
                            dinner: {name: "Scrambled Eggs", cookTime: 15, key: 132, imageURI:"https://x9wsr1khhgk5pxnq1f1r8kye-wpengine.netdna-ssl.com/wp-content/uploads/Scrambled-with-Milk-930x620.jpg" },
                            dessert: {name: "Scrambled Eggs", cookTime: 15, key: 132, imageURI:"https://x9wsr1khhgk5pxnq1f1r8kye-wpengine.netdna-ssl.com/wp-content/uploads/Scrambled-with-Milk-930x620.jpg" }
                        },
                ]))
            });
        };*/
        // It's over we doing this big time
        Auth.currentAuthenticatedUser()
            .then(user =>{
                    API.graphql(graphqlOperation(getLog, {id: user.signInUserSession.idToken.payload.sub}))
                    .then(result =>{
                        // A little data processing of the result because I don't know how to effectively use
                        // graphql and AppSync
                        var days = {};
                        for(var i = 1; i<=7; i++){
                            var log = result.data.getUser.userLog;
                            var byDay = log.filter( (item) => item.day == i);
                            var currentOrganization = {};
                            // Go through each of the three meals and generate a new
                            // object
                            for(var j = 0; j<3; j++){
                                if(byDay[j].meal == "BREAKFAST"){
                                    currentOrganization["breakfast"] = byDay[j];
                                }else if(byDay[j].meal == "LUNCH"){
                                    currentOrganization["lunch"] = byDay[j];
                                }else if(byDay[j].meal == "DINNER"){
                                    currentOrganization["dinner"] = byDay[j];
                                }
                            }
                            days[i] = currentOrganization;
                        }
                        console.log(days);
                        dispatch(notifyDoneRetrieving(days))
                    })
            })
    }
}

function notifyRetrieving(){
return {
    type: "RETRIEVING_RECIPE_LOG",
}
}

function notifyDoneRetrieving(json={1:{breakfast: {id:"", name: "", cost:0, contents:[]}, lunch: {id:"", name: "", cost:0, contents:[]}, dinner: {id:"", name: "", cost:0, contents:[]}},
                                    2:{breakfast: {id:"", name: "", cost:0, contents:[]}, lunch: {id:"", name: "", cost:0, contents:[]}, dinner: {id:"", name: "", cost:0, contents:[]}}, 
                                    3:{breakfast: {id:"", name: "", cost:0, contents:[]}, lunch: {id:"", name: "", cost:0, contents:[]}, dinner: {id:"", name: "", cost:0, contents:[]}}, 
                                    4:{breakfast: {id:"", name: "", cost:0, contents:[]}, lunch: {id:"", name: "", cost:0, contents:[]}, dinner: {id:"", name: "", cost:0, contents:[]}}, 
                                    5:{breakfast: {id:"", name: "", cost:0, contents:[]}, lunch: {id:"", name: "", cost:0, contents:[]}, dinner: {id:"", name: "", cost:0, contents:[]}},
                                    6:{breakfast: {id:"", name: "", cost:0, contents:[]}, lunch: {id:"", name: "", cost:0, contents:[]}, dinner: {id:"", name: "", cost:0, contents:[]}},
                                    7:{breakfast: {id:"", name: "", cost:0, contents:[]}, lunch: {id:"", name: "", cost:0, contents:[]}, dinner: {id:"", name: "", cost:0, contents:[]}}}){
return {
    type: "DONE_RETRIEVING_RECIPE_LOG",
    recipes: json
}
}