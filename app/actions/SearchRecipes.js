import { debugging, address } from "../debugging";
export default function searchRecipes(query=""){
    // Thunk will place the dispatch variable here for us
    return (dispatch) =>{
            dispatch(notifyRetrieving());
        if(debugging){
        //fetch(`https://jsonplaceholder.typicode.com/users`).
        new Promise(resolve => {setTimeout(resolve, 1650)}).
        // then(response => response.json(), error => console.log("wassup", error)).then( json => {
        then( ()=>{
            dispatch(notifyDoneRetrieving([
                        {name: "Plain Pancakes", cookTime: 15, key:104, url:"https://static01.nyt.com/images/2017/03/24/dining/24COOKING-CLASSICPANCAKES/24COOKING-CLASSICPANCAKES-articleLarge.jpg"},
                        {name: "Chocolate Pancakes", cookTime: 15, key:540, url:"https://bakerbynature.com/wp-content/uploads/2017/02/untitled-66-of-84-3-2.jpg"},
                        {name: "Strawberry Pancakes", cookTime: 15, key: 132, url:"https://www.pumpkinnspice.com/wp-content/uploads/2016/11/strawberry-greek-yogurt-pancakes-4-1024x683.jpg" }
            ]))
            });
        }else{
            fetch(`${address}\\recommended`)
            .then(response => response.json(), error => console.log("wassup", error))
            .then( json => {
                notifyDoneRetrieving(json);
            })
        }
        };

    }

function notifyRetrieving(){
return {
    type: "SEARCHING_FOR_RECIPES",
}
}

function notifyDoneRetrieving(json=[]){
return {
    type: "DONE_SEARCHING",
    recipes: json
}
}

