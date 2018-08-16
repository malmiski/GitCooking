export default function profile_reducer(state={retrieving: false, profile:{id:0, username:"", profile_pic:"", userLog:[], favorites: [], name: ""}, togglingFavorite: false}, action){
        if(action.type === "RETRIEVING_PROFILE"){
            state = {...state, retrieving: true};
        }else if(action.type === "DONE_RETRIEVING_PROFILE"){
            var profile = action.profile.data.getUser;
            // console.log(profile);
            var reviews = profile.reviews.sort((b, a) => {return new Date(a.date) - new Date(b.date)});
            state = {...state, retrieving: false, profile: {id: profile.id,
                                                            name: profile.name,
                                                            username: profile.username,
                                                            profile_pic: profile.profile_pic,
                                                            favorites: profile.favorites,
                                                            friends: profile.friends,
                                                            userLog: [],
                                                            reviews
                                                           }
                    };
        }else if(action.type === "TOGGLING_FAVORITE"){
            state = {...state, togglingFavorite: true}
        }else if(action.type === "TOGGLED_FAVORITE"){
            var profile = {...state.profile, favorite: action.favorites};
            state = {...state, togglingFavorite: false, profile}
        }else if(action.type === "ADDING_FRIEND"){
            state = {...state, addingFriend: true}
        }else if(action.type === "ADDEDED_FRIEND"){
            var profile = {...state.profile, friends: action.friends};
            state = {...state, addingFriend: false, profile}
        }
        return state;
}