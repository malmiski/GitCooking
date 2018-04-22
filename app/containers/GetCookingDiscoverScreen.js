import React from "react";
import { StyleSheet, Text, FlatList, View, StatusBar, Image, ScrollView, RefreshControl, TouchableHighlight} from 'react-native';
import {Entypo, FontAwesome} from "@expo/vector-icons";
import {Card, SearchBar} from 'react-native-elements';
import { connect } from "react-redux"
import retrieveNewRecipes from "../actions/RetrieveNewRecipes";
import retrieveTopRated from "../actions/RetrieveTopRated";
import searchRecipes from "../actions/SearchRecipes";
import updateRecommended from "../actions/UpdateRecommended";
class GetCookingDiscoverScreen extends React.Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.screenProps.onRefresh();
        this.props.retrieveNew();
        this.props.retrieveTop();
    }
    render(){
        return (<ScrollView>
      <SearchBar
        onChangeText={() => this.props.search()}
        height={50}
        placeholder={'Search For Recipes...'}
        autoCorrect={true}
        padding={5}
        returnKeyType={'search'}
        showLoading={this.props.searching}
      />

            <FlatList
                horizontal
                data={this.props.results}
                renderItem={({item}) =>{
                    return (
                    <Card  image={{uri: item.url}} containerStyle={{padding: 0, width:160}}
                        onPress={()=>{this.props.navigation.navigate("RecipeView", {url: item.url})}}
                    >
                        <Text style={{marginBottom: 15, }}>{item.name}</Text>
                    </Card>
                    )
                }}
            />
            <Text style={{fontSize: 28, fontWeight: "bold"}}>Top Rated Recipes <FontAwesome style={{fontSize: 28}} name="long-arrow-right"/> </Text>
            <FlatList
                horizontal
                data={this.props.top_recipes}
                renderItem={({item}) =>{
                    return (
                    <Card onPress={()=>{console.log("pressed")}} image={{uri: item.url}} containerStyle={{padding: 0, width:160}}>
                        <Text style={{marginBottom: 15, }}>{item.name}</Text>
                    </Card>
                    )
                }}
            >
                </FlatList>
                <Text style={{fontSize: 28, fontWeight: "bold"}}>Recommended for you <FontAwesome style={{fontSize: 28}} name="long-arrow-right"/> </Text>
                
                {
                    this.props.recommended === undefined ||this.props.recommended.length == 0 ? 
                        <Text>Please enter at least one item into your recipe log</Text>
                    :
                <FlatList
                horizontal
                data={this.props.new_recipes}
                renderItem={({item}) =>{
                    return (
                    <Card  image={{uri: item.url}} containerStyle={{padding: 0, width:160}}>
                        <Text style={{marginBottom: 15, }}>{item.name}</Text>
                    </Card>
                    )
                }}
            >
                </FlatList>
                }
        </ScrollView>);

    }
}
const mapStateToProps = (state) =>{ return {
                        results: state.search_reducer.recipes,
                        searching: state.search_reducer.retrieving,
                        top_recipes: state.top_recipe_reducer.recipes, 
                        new_recipes: state.new_recipe_reducer.recipes,
                        recommended: state.recommender_reducer.log
                        }};
const mapDispatchToProps = (dispatch) =>{ return {
    search: (query)=> {dispatch(searchRecipes(query))},
    retrieveTop: ()=>{dispatch(retrieveTopRated())},
    retrieveNew: ()=>{dispatch(retrieveNewRecipes())},
    updateRecommended: ()=>{dispatch(updateRecommended())}
    }}

export default connect(mapStateToProps, mapDispatchToProps)(GetCookingDiscoverScreen);