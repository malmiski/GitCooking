import {debugging, address} from "../debugging"
export default function retrieveNewRecipes(userid=100){
    // Thunk will place the dispatch variable here for us
    return (dispatch) =>{
            dispatch(notifyRetrieving());
        //fetch(`https://jsonplaceholder.typicode.com/users`).
        if(debugging){
            new Promise(resolve => {setTimeout(resolve, 1650)}).
            // then(response => response.json(), error => console.log("wassup", error)).then( json => {
            then( ()=>{
                dispatch(notifyDoneRetrieving([
                    {key: 16, name: "Scrambled Eggs", url: "https://www.incredibleegg.org/wp-content/uploads/Scrambled-with-Milk-930x620.jpg"}, 
                    {key:89, name: "Basic Omelette", url: "https://img.sndimg.com/food/image/upload/w_896,h_504,c_fill,fl_progressive,q_80/v1/img/recipes/82/53/8/RkND79iJRAytDrkaoSdE_easy-omelette-3784.jpg"}, 
                    {key:9, name: "Deviled Eggs", url: "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2008/6/9/0/CI0103_Classic-Deviled-Eggs.jpg.rend.hgtvcom.616.462.suffix/1479929974560.jpeg"},
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
    type: "RETRIEVING_NEW_RECIPES",
}
}

function notifyDoneRetrieving(json=[]){
return {
    type: "DONE_RETRIEVING_NEW_RECIPES",
    recipes: json
}
}

