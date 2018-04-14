export default function retrieveFriendList(userid=100){
    // Thunk will place the dispatch variable here for us
    return (dispatch) =>{
            dispatch(notifyRetrieving());
        //fetch(`https://jsonplaceholder.typicode.com/users`).
        new Promise(resolve => {resolve()}).
        // then(response => response.json(), error => console.log("wassup", error)).then( json => {
        then( ()=>{
            dispatch(notifyDoneRetrieving([
                        {name: "John", status: "offline", key:123, imageURI:"https://static01.nyt.com/images/2017/03/24/dining/24COOKING-CLASSICPANCAKES/24COOKING-CLASSICPANCAKES-articleLarge.jpg"},
                        {name: "Ben", status: "offline", key:234, imageURI:"https://mykitchenkohl.files.wordpress.com/2011/07/100_8674.jpg?w=768"},
                        {name: "Sarah", status: "online", key:345, imageURI:"https://x9wsr1khhgk5pxnq1f1r8kye-wpengine.netdna-ssl.com/wp-content/uploads/Scrambled-with-Milk-930x620.jpg" },
                        {name: "Julie", status: "offline", key:456, imageURI:"https://x9wsr1khhgk5pxnq1f1r8kye-wpengine.netdna-ssl.com/wp-content/uploads/Scrambled-with-Milk-930x620.jpg" }


            ]))
            });
        };

    }

function notifyRetrieving(){
return {
    type: "RETRIEVING_FRIEND_LIST",
}
}

function notifyDoneRetrieving(json=[]){
return {
    type: "DONE_RETRIEVING_FRIEND_LIST",
    friends: json
}
}