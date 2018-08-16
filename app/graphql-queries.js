export const topRecipes = `
    query searchTopRecipes($query: String!){
        searchByRating(query: $query, minRating: 3, maxRating: 5){
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
        }
    }
`
export const getRecipe = `query GetRecipe($id:ID!){
    getRecipe(id: $id){
      id
      cost
      name
      pic
      ingredients{
          ingredient{
              name
              cost
          }
          quantity
      }
      reviews{
          id
          user{
              name
              profile_pic
          }
          stars
          comment
      }
      stars
      instructions
    }
  }`
export const searchForRecipe = `
    query search($query: String!){
        search(query: $query){
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
        }
    }
`
export const updateFavorites = `
    mutation updateFavorites($userID: ID!, $favorites: [ID!]!){
        updateUser(input: {id: $userID, favoriteIDs:$favorites}){
            favorites{
                id
                name
                pic
                stars
                instructions
            }
        }
    }
`
export const updateFriends = `
mutation updateFriends($id: ID!, $friends: [ID!]!){
    updateUser(input: {id: $id, friendIDs:$friends}){
        friends{
            id
            name
            profile_pic
        }
    }
}
`;

export const searchForFriends = `
    query search($query: String!, $id: String!){
        searchFriends(query: $query, id: $id){
            id
            name
            profile_pic
        }
    }
`
  export const getProfile = `
    query getProfile($id: ID!){
        getUser(id: $id){
            id
            username
            name
            profile_pic
           reviews{
                id
                recipe{
                    id
                    name
                    pic
                    stars
                }
                stars
                comment
                pic
                date
            }
            userLog{
                day
                name
                contents
                cost
            }
            favorites{
                id
                name
                pic
                stars
                instructions
            }
            friends{
                id
                name
                profile_pic
            }
            timeline{
                user{
                    id
                    profile_pic
                    name
                }
                recipe{
                    id
                    pic
                    name
                }
                date
                comment
                stars
                pic
            }
            goals{
                successful
                finished
                numberRecipesMade
                numberRecipesClaimed
                startDate
                durationInDays
            }
        }
    }
  `;

export const getTimeline = `
query getProfile($id: ID!){
    getUser(id: $id){
        timeline{
            id
            user{
                id
                profile_pic
                name
            }
            recipe{
                id
                pic
                name
            }
            date
            comment
            stars
            pic
        }
    }
}`;
export const getGoals = `
query getProfile($id: ID!){
    getUser(id: $id){
        goals{
            successful
            finished
            numberRecipesMade
            numberRecipesClaimed
            startDate
            durationInDays
        }
    }
}`;

export const getLog = `
    query getLog($id: ID!){
            getUser(id: $id){
                userLog{
                    id
                    day
                    name
                    contents
                    cost    
                    meal
                }
            }
        }
`;

export const updateLogEntryForDay = `
            mutation updateBreakfast($breakfastObj:UpdateLogEntryInput!, $lunchObj : UpdateLogEntryInput!,$dinnerObj : UpdateLogEntryInput! ){
                    breakfast: updateLogEntry(input: $breakfastObj){
                        id
                    }
                    lunch: updateLogEntry(input: $lunchObj){
                        id
                    },
                    dinner: updateLogEntry(input: $dinnerObj){
                        id
                    }
            }

`
export const getReviewByRecipeUser = `
                query getReviewByRecipeUser($userID: ID!, $recipeID: ID!){
                    getReviewByRecipeUser(recipeID: $recipeID, userID: $userID){
                        id
                        date
                        recipeID
                        userID
                        stars
                        comment
                        pic
                    }
                }
`;

export const createRatingForUser = `
            mutation createRating($userID: ID!, $recipeID : ID!, $stars: Int!, $comment : String, $pic: String){
                createReview(
                    input: {
                        userID: $userID, 
                        recipeID: $recipeID, 
                        stars: $stars, 
                        pic: $pic,
                        comment: $comment
                    }){
                        id
                        date
                        recipeID
                        userID
                        stars
                        comment
                        pic
                    }
            }
`;

export const updateRatingForUser = `
            mutation updateRating($reviewID : ID!, $userID: ID!, $recipeID : ID!, $stars: Int!, $comment : String, $pic: String){
                    updateReview(input:{
                        id: $reviewID,
                        userID: $userID,
                        recipeID: $recipeID, 
                        stars: $stars, 
                        pic: $pic,
                        comment: $comment
                    }){
                        id
                        date
                        recipeID
                        userID
                        stars
                        comment
                        pic
                    }
            }

`