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
  export const getProfile = `
    query getProfile($id: ID!){
        getUser(id: $id){
            id
            username
            name
            profile_pic
${/*            reviews{
                id
                recipe{
                    name
                    pic
                    stars
                }
                stars
            }
        */''}
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
                name
                profile_pic
            }
        }
    }
  `;

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