import React from "react";
import { StyleSheet, Text, View, StatusBar, Image, ScrollView, RefreshControl, FlatList, TouchableHighlight} from 'react-native';
import {Card, Button,} from "react-native-elements";
import retrieveRecipes from "../actions/RetrieveRecipeList";
import StarRating from "react-native-star-rating";
import {connect} from "react-redux";
import updateRating from "../actions/UpdateRating";
import retrieveRecipe from "../actions/RetrieveRecipe";
var styles = StyleSheet.create({

    container: {
      flex: 1,
      alignItems: 'center',
    },

    recipe: {
        flex: 1,
      height: 52
    },


});
class RecipeView extends React.Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){
        this.props.getRecipe(this.props.navigation.state.params.id);
    }

    render(){
        const ingredients = this.props.recipe.ingredients;
        console.log(this.props.recipe);
        const directions = this.props.recipe.instructions;
        return (
            <ScrollView contentContainerStyle={{justifyContent: "space-around" }}>
                <View style={{flex: 1}}>
                <Image source={{uri:this.props.navigation.state.params.uri}} style={{margin: 0, height: 450, width: "100%"}} />
                    <View>
                    <StarRating
                            disabled={false}
                            maxStars={5}
                            rating={this.props.recipe.stars}
                            selectedStar={(rating) => this.props.updateRating(rating)}
                            />

                    </View>
                    <View style={{flexDirection: "column"}}>
                    <View>
                        <Text style={{fontSize: 24}}>Ingredients:</Text>
                    {
                        ingredients.map((item) => {
                            console.log(item.ingredient.name);
                            return(
                            <Text key={item} style={{fontSize: 20, color: "#233", marginBottom: 15}}>{item.quantity + " " + item.ingredient.name + (item.quantity > 1 ? 's' : '')}</Text>
                            )
                        })

                    }
                    </View>
                    <View>
                    <Text style={{fontSize: 24}}>Directions:</Text>
                        {
                            directions.map((item, index) => {
                                return (
                                <Text key={item} style={{fontSize: 20, color: "#233", marginBottom: 18}}><Text style={{fontWeight:"bold", marginRight: 8, color:"#444", fontSize: 28}}>{index + 1}.</Text>{item}</Text>
                                )
                            })
                        }
                    </View>
                    </View>
                </View>
              </ScrollView>
        );
    }
}

const mapStateToProps = (state) =>{ return {rating: state.rating_reducer.rating, recipe: state.recipe_reducer.recipe}};
const mapDispatchToProps = (dispatch) =>{ return {
    updateRating: (value)=>{dispatch(updateRating(value))},
    getRecipe: (id) => {dispatch(retrieveRecipe(id))}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeView);