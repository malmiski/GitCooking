export default function retrieveFriendList(userid=100){
    // Thunk will place the dispatch variable here for us
    return (dispatch) =>{
            dispatch(notifyRetrieving());
        //fetch(`https://jsonplaceholder.typicode.com/users`).
        new Promise(resolve => {resolve()}).
        // then(response => response.json(), error => console.log("wassup", error)).then( json => {
        then( ()=>{
            dispatch(notifyDoneRetrieving([
                        {name: "John", status: "offline", key:123, imageURI:"https://images.pexels.com/photos/936099/pexels-photo-936099.jpeg"},
                        {name: "Ben", status: "offline", key:234, imageURI:"https://images.pexels.com/photos/769768/pexels-photo-769768.jpeg"},
                        {name: "Sarah", status: "online", key:345, imageURI:"https://images.pexels.com/photos/41533/beautiful-face-female-girl-41533.jpeg" },
                        {name: "Julie", status: "offline", key:456, imageURI:"https://images.pexels.com/photos/746808/pexels-photo-746808.jpeg" }


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