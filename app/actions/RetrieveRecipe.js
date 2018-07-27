import { graphqlOperation, API } from "../../node_modules/aws-amplify";
import { getRecipe } from "../graphql-queries";

export default function retrieveRecipe(recipeID=100){
    // Thunk will place the dispatch variable here for us
    return (dispatch) =>{
            dispatch(notifyRetrieving());
        /*
        //fetch(`https://jsonplaceholder.typicode.com/users`).
        new Promise(resolve => {resolve()}).
        // then(response => response.json(), error => console.log("wassup", error)).then( json => {
        then( ()=>{
            dispatch(notifyDoneRetrieving([
                        {name: "Pancakes", directions: ["In a large bowl, mix flour, sugar, baking powder and salt. Make a well in the center, and pour in milk, egg and oil. Mix until smooth.", "Heat a lightly oiled griddle or frying pan over medium high heat. Pour or scoop the batter onto the griddle, using approximately 1/4 cup for each pancake. Brown on both sides and serve hot."], 
                        ingredients:["1 cup all-purpose flour", "2 tablespoons white sugar", "2 teaspoons baking powder", "1 teaspoon salt", "1 egg, beaten", "1 cup milk", "2 tablespoons vegetable oil"], cookTime: 25, key:104, imageURI:"https://static01.nyt.com/images/2017/03/24/dining/24COOKING-CLASSICPANCAKES/24COOKING-CLASSICPANCAKES-articleLarge.jpg"},
                        {name: "Falafel",directions: ["In a large bowl, mix flour, sugar, baking powder and salt. Make a well in the center, and pour in milk, egg and oil. Mix until smooth.", "Heat a lightly oiled griddle or frying pan over medium high heat. Pour or scoop the batter onto the griddle, using approximately 1/4 cup for each pancake. Brown on both sides and serve hot."], 
                        ingredients:["1 cup all-purpose flour", "2 tablespoons white sugar", "2 teaspoons baking powder", "1 teaspoon salt", "1 egg, beaten", "1 cup milk", "2 tablespoons vegetable oil"], cookTime: 55, key:540, imageURI:"https://mykitchenkohl.files.wordpress.com/2011/07/100_8674.jpg?w=768"},
                        {name: "Scrambled Eggs", directions: ["In a large bowl, mix flour, sugar, baking powder and salt. Make a well in the center, and pour in milk, egg and oil. Mix until smooth.", "Heat a lightly oiled griddle or frying pan over medium high heat. Pour or scoop the batter onto the griddle, using approximately 1/4 cup for each pancake. Brown on both sides and serve hot."], 
                        ingredients:["1 cup all-purpose flour", "2 tablespoons white sugar", "2 teaspoons baking powder", "1 teaspoon salt", "1 egg, beaten", "1 cup milk", "2 tablespoons vegetable oil"], cookTime: 10, key: 132, imageURI:"https://x9wsr1khhgk5pxnq1f1r8kye-wpengine.netdna-ssl.com/wp-content/uploads/Scrambled-with-Milk-930x620.jpg" }


            ]))
            });
        };*/
        API.graphql(graphqlOperation(getRecipe, {id: recipeID}))
        .then(result =>{
            console.log(result);
                dispatch(notifyDoneRetrieving(result.data.getRecipe));
        })
        }

    }

function notifyRetrieving(){
return {
    type: "RETRIEVING_RECIPE",
}
}

function notifyDoneRetrieving(json=[]){
return {
    type: "DONE_RETRIEVING_RECIPE",
    recipe: json
}
}

