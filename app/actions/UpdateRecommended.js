
import {Auth, API, graphqlOperation} from "aws-amplify";
import { updateLogEntryForDay } from "../graphql-queries";
// import {updteLog} from ""
export default function updateRecommended(contentTags){
    return (dispatch) => {
        // Immediately update the log with the new stuff on the
        // front end, and notify that we are now currently updating
            dispatch(notifyUpdate())
            // Build the recommmendation search
            var graphqlOp =  graphqlOperation(buildGraphQLQuery(contentTags), 
            // Create the variables from it
            contentTags.reduce((r, element, index) => {r[`query${index+1}`] = element.join(" "); return r}, {}));

            console.log(graphqlOp);

            // Execute
            API.graphql(graphqlOp)
            .then(result =>{
                    console.log(result);
                    // Update result to merge into one giant array
                    result = Object.keys(result.data).reduce( (r, key) => {r = [...r, ...result.data[key]]; return r;}, []);
                    // Update the recommendations with the search results 
                    dispatch(doneUpdating(result))
            })
    };
}


function notifyUpdate(){
    return {
        type: "UPDATING_RECOMMENDATIONS",
    }
}


function doneUpdating(recommendations){
    return {
            type: "UPDATED_RECOMMENDATIONS",
            recommendations
    }
}

function buildGraphQLQuery(contentTags){
    // Build up a massive query to get the recommended
    // recipes for the user, by doing multiple searches
    // at once using the content tags
    if(contentTags === undefined || contentTags.length == 0)
        return '';
    var query = `query search($query1: String!,`
    for(var i = 2; i<=contentTags.length; i++){
        if(i != contentTags.length){
            query += ` $query${i} : String!,`
        }else{
            query += ` $query${i}: String!){\n`
        }
    }

    for(var i = 1; i<=contentTags.length; i++){
        query += `_${i}: search(query: $query${i}){
            id
            name
            ingredients{
            ingredient{
            name
            cost
            }
            quantity
        }
            stars
            pic
            tags
        }\n`;
    }
    query += `}`;
    
    return query;
}
