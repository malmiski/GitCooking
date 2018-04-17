export default function retrieveTimeline(){
    // Thunk will place the dispatch variable here for us
    return (dispatch) =>{
            dispatch(notifyRetrieving());
        //fetch(`https://jsonplaceholder.typicode.com/users`).
        new Promise(resolve => {resolve()}).
        // then(response => response.json(), error => console.log("wassup", error)).then( json => {
        then( ()=>{
            dispatch(notifyDoneRetrieving({
                key: 100, 
                userid: 100, 
                username: "Jack",
                userimage:"http://cdn.lightgalleries.net/4bd5ec190c893/images/Rutgers_University_student_portrait_865-1.jpg",
                log:[
                    {
                        key: 1,
                        date: "09/03",
                        meals: [
                            {key: 56, keywords:["breading", "fried", "chicken", "meat", "protein"], 
                            friendImage: "https://itechway.net/wp-content/uploads/2017/09/geek-boys-whatsapp-dp-1.jpg", 
                            friend:"Jared", image:"https://food.fnr.sndimg.com/content/dam/images/food/fullset/2009/5/27/0/0125629_03_chicken-in-skillet_s4x3.jpg.rend.hgtvcom.616.462.suffix/1371589386937.jpeg", 
                            rating: 3.5, ingredients:[], name:"Fried Chicken"}, 
                        {key: 57, keywords: ["lime", "pie", "citrus", "crust"], 
                            friendImage: "https://sguru.org/wp-content/uploads/2017/06/cool-fb-profile-pictures-Anonymous-facbook-profile-picture.jpg", 
                            friend: "Anon", image: "https://www.twopeasandtheirpod.com/wp-content/uploads/2010/05/4592139475_5da1d9dba1.jpg", 
                            rating: 5, ingredients:[], name:"Key Lime Pie"} ,
                        {key: 58, keywords:["dinner", "oven", "classic"],
                            friendImage:"https://www.mills.edu/uniquely-mills/students-faculty/student-profiles/images/student-profile-gabriela-mills-college.jpg",
                            friend: "Casey", image:"https://cdn3.tmbi.com/secure/RMS/attachments/37/1200x1200/Southwestern-Casserole_EXPS_THN16_15969_D06_22_2b.jpg",
                            rating: 2, ingredients:["oregano"], name:"Casserole"}],
                        visible: true,
                    },
                {
                    key: 2,
                    date: "09/04",
                    meals: [
                        {key: 56, keywords:["breading", "fried", "chicken", "meat", "protein"], 
                        friendImage: "https://itechway.net/wp-content/uploads/2017/09/geek-boys-whatsapp-dp-1.jpg", 
                        friend:"Jared", image:"https://food.fnr.sndimg.com/content/dam/images/food/fullset/2009/5/27/0/0125629_03_chicken-in-skillet_s4x3.jpg.rend.hgtvcom.616.462.suffix/1371589386937.jpeg", 
                        rating: 3.5, ingredients:[], name:"Fried Chicken"}, 
                    {key: 57, keywords: ["lime", "pie", "citrus", "crust"], 
                        friendImage: "https://sguru.org/wp-content/uploads/2017/06/cool-fb-profile-pictures-Anonymous-facbook-profile-picture.jpg", 
                        friend: "Anon", image: "https://www.twopeasandtheirpod.com/wp-content/uploads/2010/05/4592139475_5da1d9dba1.jpg", 
                        rating: 5, ingredients:[], name:"Key Lime Pie"} ,
                    {key: 58, keywords:["dinner", "oven", "classic"],
                        friendImage:"https://www.mills.edu/uniquely-mills/students-faculty/student-profiles/images/student-profile-gabriela-mills-college.jpg",
                        friend: "Casey", image:"https://cdn3.tmbi.com/secure/RMS/attachments/37/1200x1200/Southwestern-Casserole_EXPS_THN16_15969_D06_22_2b.jpg",
                        rating: 2, ingredients:["oregano"], name:"Casserole"}],
                    visible: true,
                },
                {
                    key: 3,
                    date: "09/06",
                    meals: [
                        {key: 56, keywords:["breading", "fried", "chicken", "meat", "protein"], 
                        friendImage: "https://itechway.net/wp-content/uploads/2017/09/geek-boys-whatsapp-dp-1.jpg", 
                        friend:"Jared", image:"https://food.fnr.sndimg.com/content/dam/images/food/fullset/2009/5/27/0/0125629_03_chicken-in-skillet_s4x3.jpg.rend.hgtvcom.616.462.suffix/1371589386937.jpeg", 
                        rating: 3.5, ingredients:[], name:"Fried Chicken"}, 
                    {key: 57, keywords: ["lime", "pie", "citrus", "crust"], 
                        friendImage: "https://sguru.org/wp-content/uploads/2017/06/cool-fb-profile-pictures-Anonymous-facbook-profile-picture.jpg", 
                        friend: "Anon", image: "https://www.twopeasandtheirpod.com/wp-content/uploads/2010/05/4592139475_5da1d9dba1.jpg", 
                        rating: 5, ingredients:[], name:"Key Lime Pie"} ,
                    {key: 58, keywords:["dinner", "oven", "classic"],
                        friendImage:"https://www.mills.edu/uniquely-mills/students-faculty/student-profiles/images/student-profile-gabriela-mills-college.jpg",
                        friend: "Casey", image:"https://cdn3.tmbi.com/secure/RMS/attachments/37/1200x1200/Southwestern-Casserole_EXPS_THN16_15969_D06_22_2b.jpg",
                        rating: 2, ingredients:["oregano"], name:"Casserole"}],
                    visible: true,
                },]
            }));
        });

    }

}

function notifyRetrieving(){
return {
    type: "RETRIEVING_TIMELINE",
}
}

function notifyDoneRetrieving(json={}){
return {
    type: "DONE_RETRIEVING_TIMELINE",
    timeline: json
}
}

