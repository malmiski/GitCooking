export const topRecipes = `
    query getTop($nextToken: String){
        searchTopRecipes(nextToken: $nextToken){
        recipes
        n
    }

`
export const getRecipe = `query GetRecipe($id:ID!){
    getRecipe(id: $id){
      id
      cost
      name
      pic
    }
  }`

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
            friends{
                name
                profile_pic
            }
            userLog{
                day

                mealType
            }
        */''}
            favorites{
                id
                name
                pic
                stars
                instructions
            }
        }
    }
  `;