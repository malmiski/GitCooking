export default function profile_reducer(state={retrieving: false, profile:{id:0, username:"", profile_pic:"", userLog:[], favorites: [], name: ""}}, action){
        if(action.type === "RETRIEVING_PROFILE"){
            state = {...state, retrieving: true};
        }else if(action.type === "DONE_RETRIEVING_PROFILE"){
            var profile = action.profile.data.getUser;
            console.log(profile);
            state = {...state, retrieving: false, profile: {id: profile.id,
                                                            name: profile.name,
                                                            username: profile.username,
                                                            profile_pic: profile.profile_pic,
                                                            favorites: profile.favorites,
                                                            userLog: []}};
        }
        return state;
}