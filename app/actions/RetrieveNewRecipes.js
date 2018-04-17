export default function retrieveNewRecipes(userid=100){
    // Thunk will place the dispatch variable here for us
    return (dispatch) =>{
            dispatch(notifyRetrieving());
        //fetch(`https://jsonplaceholder.typicode.com/users`).
        new Promise(resolve => {resolve()}).
        // then(response => response.json(), error => console.log("wassup", error)).then( json => {
        then( ()=>{
            dispatch(notifyDoneRetrieving([
                {key: 16, name: "Pancakes", url: "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2009/6/17/2/FNM080109Cover021_pink_s4x3.jpg.rend.hgtvcom.616.462.suffix/1383254816256.jpeg"}, 
                {key:89, name: "Spaghetti", url: "https://www.cookingclassy.com/wp-content/uploads/2018/01/instant-pot-spaghetti-7-768x1152.jpg"}, 
                {key:9, name: "Tiramisu", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Tiramisu_with_blueberries_and_raspberries%2C_July_2011.jpg/1280px-Tiramisu_with_blueberries_and_raspberries%2C_July_2011.jpg"},
            ]))
            });
        };

    }

function notifyRetrieving(){
return {
    type: "RETRIEVING_NEW_RECIPES",
}
}

function notifyDoneRetrieving(json=[]){
return {
    type: "DONE_RETRIEVING_NEW_RECIPES",
    recipes: json
}
}

