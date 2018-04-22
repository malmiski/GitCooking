function requestRefreshHome(){
        
        return {
            type: "REFRESH_HOME",
            refreshing: true
        }

}

function doneRefreshing(json={}){
        return {
            type: "REFRESH_HOME",
            refreshing: false,
            json
        }
}

function requestRefreshHome(){
        
        return {
            type: "REFRESH_HOME",
            refreshing: true
        }

}
export default function refreshHome(){
        return (dispatch)=>{
            dispatch(requestRefreshHome());
            fetch(`https://jsonplaceholder.typicode.com/posts/1`).then(response => response.json(), error => console.log("wassup", error)).then( json => {
                dispatch(doneRefreshing(json));
            });
        }

}
