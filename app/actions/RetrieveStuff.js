export default function retrieveStuff(){
        // Thunk will place the dispatch variable here for us
        return (dispatch) =>{
                dispatch(notifyRetrieving());
            fetch(`https://jsonplaceholder.typicode.com/users`).
            then(response => response.json(), error => console.log("wassup", error)).then( json => {
                dispatch(notifyDoneRetrieving(json));
            });

        }

}

function notifyRetrieving(){
    return {
        type: "RETRIEVING_STUFF",
    }
}

function notifyDoneRetrieving(json={}){
    return {
        type: "DONE_RETRIEVING_STUFF",
        stuff: json
    }
}

