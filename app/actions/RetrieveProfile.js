export default function retrieveProfile(){
        // Thunk will place the dispatch variable here for us
        return (dispatch) =>{
                dispatch(notifyRetrieving());
            //fetch(`https://jsonplaceholder.typicode.com/users`).
            new Promise(resolve => {resolve()}).
            // then(response => response.json(), error => console.log("wassup", error)).then( json => {
            then( ()=>{
                dispatch(notifyDoneRetrieving({
                    userid: 100, 
                    username: "Jack", 
                    userimage:"https://upload.wikimedia.org/wikipedia/commons/9/9f/Red_Onion_on_White.JPG",
                    log:[{
                        date: "2017-09-03",
                        meals: [{mealid: 56, name:"fried-chicken"}, {mealid: 57, name:"turkey"} ,{mealid: 58, name:"casserole"}],
                        visible: true,
                    },
                    {
                        date: "2017-09-04",
                        meals: [{mealid: 56, name:"fried-chicken"}, {mealid: 57, name:"turkey"} ,{mealid: 58, name:"casserole"}],
                        visible: true,
                    },
                    {
                        date: "2017-09-06",
                        meals: [{mealid: 56, name:"fried-chicken"}, {mealid: 57, name:"turkey"} ,{mealid: 58, name:"casserole"}],
                        visible: true,
                    }]
                }));
            });

        }

}

function notifyRetrieving(){
    return {
        type: "RETRIEVING_PROFILE",
    }
}

function notifyDoneRetrieving(json={}){
    return {
        type: "DONE_RETRIEVING_PROFILE",
        profile: json
    }
}

