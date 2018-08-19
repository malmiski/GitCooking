import React from "react";
import { StyleSheet, Text, TextInput, View, StatusBar, Image, ScrollView, KeyboardAvoidingView, FlatList, TouchableHighlight} from 'react-native';
import {Card, Button,} from "react-native-elements";
import retrieveRecipes from "../actions/RetrieveRecipeList";
import StarRating from "react-native-star-rating";
import {connect} from "react-redux";
import updateRating from "../actions/UpdateRating";
import retrieveRecipe from "../actions/RetrieveRecipe";
import retrieveReview from "../actions/RetrieveRecipeReview";
import toggleFavorite from "../actions/ToggleFavorite"
import Toaster, { ToastStyles } from 'react-native-toaster';
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
    state={message: null, dirty: false, stars: this.props.review == null ? 0 : this.props.review.stars, text: (this.props.review == null || this.props.review.comment==null) ? "" : this.props.review.commment}
    componentWillMount(){
        console.log(this.props.navigation.state.params);
        this.props.getRecipe(this.props.navigation.state.params.id);
        this.props.retrieveReview(this.props.navigation.state.params.id, this.props.userID);
    }
    componentDidMount(){
        var isFavorite = false;
        console.log(this.props.profile.favorites)
        console.log(this.props.navigation.state.params.id)
        this.props.profile.favorites.forEach(fav => {
            if(fav.id == this.props.navigation.state.params.id){
                isFavorite = true;
                console.log(`This recipe is a favorite: ${isFavorite}`)
                return;
            }
        })
        this.props.navigation.setParams({...this.props.navigation.state.params, 
            toggleFavorite: ()=>{
                var refresh = this.props.navigation.state.params.refresh;
                refresh = refresh ? refresh : null;
                this.props.toggleFavorite(isFavorite, this.props.navigation.state.params.id, this.props.profile.favorites.map(e => e.id), refresh);
                this.props.navigation.setParams({...this.props.navigation.state.params, isFavorite:!this.props.navigation.getParam("isFavorite")})
            }, 
            isFavorite})
    }
    componentDidUpdate(){
        if(this.props.retrievingReview){ 
            this.blink = true;
        }
        if(this.props.updatingReview){
            this.updateBlink = true;
        }
        if(this.updateBlink && !this.props.updatingReview){
            this.updateBlink = false;
            this.setState({...this.state, message: {text:"Successfully saved", styles: ToastStyles.success, onHide: ()=>{
                this.setState({...this.state, message: null})
            }}});
            this.props.getRecipe(this.props.navigation.state.params.id);
        }
        if(this.blink && !this.props.retrievingReview){
            console.log(this.props.review)
            var stars = this.props.review == null ? 0 : this.props.review.stars;
            var text = this.props.review == null || this.props.review.comment==null ? "" : this.props.review.comment;
            this.blink = false;
            this.setState({...this.state, stars, text});
        }
    }

    render(){
        const ingredients = this.props.recipe.ingredients;
        const directions = this.props.recipe.instructions;
        return (
            <KeyboardAvoidingView
            behavior="padding"
          >      
            <Toaster message={this.state.message}/>
            <ScrollView contentContainerStyle={{justifyContent: "space-around" }}>
                <View style={{flex: 1}}>
                <Image source={{uri:this.props.navigation.state.params.uri}} style={{margin: 0, height: 450, width: "100%"}} />
                    <View>
                    <StarRating
                            disabled={true}
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
                            return(
                            <Text key={item} style={{marginLeft: 5, fontSize: 20, color: "#233", marginBottom: 15}}>{item.quantity + " "+(item.ingredient.measurement=="unit"? "" : item.ingredient.measurement)+" " + item.ingredient.name + (item.quantity > 1 ? 's' : '')}</Text>
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
                    <View>
                    <Text style={{fontSize: 24}}>How did you like this recipe?</Text>
                    <Text style={{fontSize: 18}}>Please provide a review and an optional comment as well</Text>
                    <StarRating
                            disabled={false}
                            maxStars={5}
                            rating={this.state.stars}
                            selectedStar={(stars) => this.setState({...this.state, stars, dirty: true})}
                            />
                    <TextInput 
                        onChangeText={(text) => this.setState({...this.state, text, dirty: true})}
                        editable={true}
                        style={{
                            height: 75, 
                            fontSize: 18, 
                            fontFamily: "Roboto", 
                            borderColor: "black", 
                            borderRadius: 2,
                            margin: 5,
                            backgroundColor: "#ddd"
                        }}
                        placeholder={"Enter your comment here"}
                        value={this.state.text}
                    />
                    <Button 
                        disabled={!this.state.dirty}
                        onPress={
                            ()=>{
                                var review = {
                                    id: this.props.review.id, 
                                    userID: this.props.userID, 
                                    recipeID: this.props.navigation.state.params.id, 
                                    stars: this.state.stars, 
                                    comment: (this.state.text == "") ? null : this.state.text,
                                    pic: null
                                }
                                console.log(this.props.review)
                                this.setState({...this.state, dirty: false});
                                // If we haven't created a rating yet the review will be null
                                this.props.updateRating(review, this.props.review.stars == undefined)
                            }
                        }
                        buttonStyle={{backgroundColor: "lightgreen"}}
                        title="Submit"
                    />
                    </View>
                    <View>
                    <Text style={{fontSize: 24}}>Comments on this recipe</Text>
                        <FlatList
                            data={this.props.recipe.reviews}
                            renderItem={({item})=>{
                                return( <View style={{margin: 2, backgroundColor: "#e4e4e4"}}>
                                            <View style={{flexDirection: "row", justifyContent: "space-evenly"}}>
                                                <Image source={{uri: item.user.profile_pic}} style={{ width: 40, height: 40, borderRadius: 20, }} />
                                                <Text>{item.user.name}</Text>
                                                <StarRating
                                                    disabled={true}
                                                    maxStars={5}
                                                    rating={item.stars}
                                                />
                                            </View>
                                            {item.comment == "" || item.comment == null ? null : <Text>{item.comment}</Text>}
                                        </View>
                                    );
                            }}
                            ListEmptyComponent={()=><Text> Sorry but no one has reviewed this recipe yet</Text>}
                            keyExtractor={(item)=>item.id}
                            />
                            
                    </View>
                    </View>
                </View>
              </ScrollView>
              </KeyboardAvoidingView>
        );
    }
}

const mapStateToProps = (state) =>{ return {recipe: state.recipe_reducer.recipe,
                                            review: state.rating_reducer.review,
                                            userID: state.profile_reducer.profile.id,
                                            retrievingReview: state.rating_reducer.retrieving,
                                            updatingReview: state.rating_reducer.updating,
                                            profile: state.profile_reducer.profile
                                        }};
const mapDispatchToProps = (dispatch) =>{ return {
        updateRating: (review, isNew)=>{dispatch(updateRating(review, isNew))},
        getRecipe: (id) => {dispatch(retrieveRecipe(id))},
        retrieveReview: (recipeID, userID) => dispatch(retrieveReview(recipeID, userID)),
        toggleFavorite: (isFavorite, id, favoriteIDs, refresh=null) => {
                dispatch(toggleFavorite(isFavorite, id, favoriteIDs, refresh))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeView);