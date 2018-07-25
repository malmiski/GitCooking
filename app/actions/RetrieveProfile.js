import { debugging, address } from "../debugging";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { getProfile } from "../graphql-queries";

export default function retrieveProfile(){
    console.log("calling");
        // Thunk will place the dispatch variable here for us
        return (dispatch) =>{
            console.log("Dispatching all the time!")
            dispatch(notifyRetrieving());
        Auth.currentAuthenticatedUser()
            .then(user =>{
                    API.graphql(graphqlOperation(getProfile, {id: user.signInUserSession.idToken.payload.sub}))
                    .then(result => {console.log(result); dispatch(notifyDoneRetrieving(result))})
            })
            .catch(error => console.error(error))
    };

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

            /*
            if(debugging){
            //fetch(`https://jsonplaceholder.typicode.com/users`).
            new Promise(resolve => {resolve()}).
            // then(response => response.json(), error => console.log("wassup", error)).then( json => {
            then( ()=>{
                dispatch(notifyDoneRetrieving({
                    userid: 100,
                    username: "Jack", 
                    userimage:"http://cdn.lightgalleries.net/4bd5ec190c893/images/Rutgers_University_student_portrait_865-1.jpg",
                    log:[{
                        key: 1,
                        date: "09-03",
                        meals: [
                            {key: 56, keywords:["breading", "fried", "chicken", "meat", "protein"], 
                            friendImage: "https://itechway.net/wp-content/uploads/2017/09/geek-boys-whatsapp-dp-1.jpg", 
                            friend:"Me", image:"https://static01.nyt.com/images/2017/03/24/dining/24COOKING-CLASSICPANCAKES/24COOKING-CLASSICPANCAKES-articleLarge.jpg", 
                            rating: 3.5, directions: ["In a large bowl, mix flour, sugar, baking powder and salt. Make a well in the center, and pour in milk, egg and oil. Mix until smooth.", "Heat a lightly oiled griddle or frying pan over medium high heat. Pour or scoop the batter onto the griddle, using approximately 1/4 cup for each pancake. Brown on both sides and serve hot."], 
                            ingredients:["1 cup all-purpose flour", "2 tablespoons white sugar", "2 teaspoons baking powder", "1 teaspoon salt", "1 egg, beaten", "1 cup milk", "2 tablespoons vegetable oil"], name:"Plain Pancakes"}, 
                        {key: 57, keywords: ["lime", "pie", "citrus", "crust"], 
                            friendImage: "https://sguru.org/wp-content/uploads/2017/06/cool-fb-profile-pictures-Anonymous-facbook-profile-picture.jpg", 
                            friend: "Me", image: "https://mykitchenkohl.files.wordpress.com/2011/07/100_8674.jpg?w=768", 
                            rating: 5, directions: [], ingredients:[], name:"Falafel"} ,
                        {key: 58, keywords:["dinner", "oven", "classic"],
                            friendImage:"https://www.mills.edu/uniquely-mills/students-faculty/student-profiles/images/student-profile-gabriela-mills-college.jpg",
                            friend: "Me", image:"https://www.incredibleegg.org/wp-content/uploads/Scrambled-with-Milk-930x620.jpg",
                            rating: 2, directions: [], ingredients:["oregano"], name:"Scrambled Eggs"}],
                        visible: true,
                    },
                    {
                        key: 2,
                        date: "09-04",
                        meals: [
                            {key: 56, keywords:["breading", "fried", "chicken", "meat", "protein"], 
                            friendImage: "https://itechway.net/wp-content/uploads/2017/09/geek-boys-whatsapp-dp-1.jpg", 
                            friend:"Me", image:"https://food.fnr.sndimg.com/content/dam/images/food/fullset/2009/5/27/0/0125629_03_chicken-in-skillet_s4x3.jpg.rend.hgtvcom.616.462.suffix/1371589386937.jpeg", 
                            rating: 3.5, ingredients:[], name:"Fried Chicken"}, 
                        {key: 57, keywords: ["lime", "pie", "citrus", "crust"], 
                            friendImage: "https://sguru.org/wp-content/uploads/2017/06/cool-fb-profile-pictures-Anonymous-facbook-profile-picture.jpg", 
                            friend: "Me", image: "https://www.twopeasandtheirpod.com/wp-content/uploads/2010/05/4592139475_5da1d9dba1.jpg", 
                            rating: 5, ingredients:[], name:"Key Lime Pie"} ,
                        {key: 58, keywords:["dinner", "oven", "classic"],
                            friendImage:"https://www.mills.edu/uniquely-mills/students-faculty/student-profiles/images/student-profile-gabriela-mills-college.jpg",
                            friend: "Me", image:"https://cdn3.tmbi.com/secure/RMS/attachments/37/1200x1200/Southwestern-Casserole_EXPS_THN16_15969_D06_22_2b.jpg",
                            rating: 2, ingredients:["oregano"], name:"Casserole"}],
                        visible: true,
                    },
                    {
                        key: 3,
                        date: "09-06",
                        meals: [
                            {key: 56, keywords:["breading", "fried", "chicken", "meat", "protein"], 
                            friendImage: "https://itechway.net/wp-content/uploads/2017/09/geek-boys-whatsapp-dp-1.jpg", 
                            friend:"Me", image:"https://food.fnr.sndimg.com/content/dam/images/food/fullset/2009/5/27/0/0125629_03_chicken-in-skillet_s4x3.jpg.rend.hgtvcom.616.462.suffix/1371589386937.jpeg", 
                            rating: 3.5, ingredients:[], name:"Fried Chicken"}, 
                        {key: 57, keywords: ["lime", "pie", "citrus", "crust"], 
                            friendImage: "https://sguru.org/wp-content/uploads/2017/06/cool-fb-profile-pictures-Anonymous-facbook-profile-picture.jpg", 
                            friend: "Me", image: "https://www.twopeasandtheirpod.com/wp-content/uploads/2010/05/4592139475_5da1d9dba1.jpg", 
                            rating: 5, ingredients:[], name:"Key Lime Pie"} ,
                        {key: 58, keywords:["dinner", "oven", "classic"],
                            friendImage:"https://www.mills.edu/uniquely-mills/students-faculty/student-profiles/images/student-profile-gabriela-mills-college.jpg",
                            friend: "Me", image:"https://cdn3.tmbi.com/secure/RMS/attachments/37/1200x1200/Southwestern-Casserole_EXPS_THN16_15969_D06_22_2b.jpg",
                            rating: 2, ingredients:["oregano"], name:"Casserole"}],
                        visible: true,
                    }]
                }));
            });

        }else{
            fetch(`${address}\\recommended`)
            .then(response => response.json(), error => console.log("wassup", error))
            .then( json => {
                notifyDoneRetrieving(json);
            })
        }*/
