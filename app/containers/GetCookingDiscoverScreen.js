import React from "react";
import { StyleSheet, Text, FlatList, View, StatusBar, Image, ScrollView, RefreshControl, TouchableHighlight} from 'react-native';
import {Entypo, FontAwesome} from "@expo/vector-icons";
import {Card, SearchBar} from 'react-native-elements';
import { connect } from "react-redux"
import retrieveRecipeLog from "../actions/RetrieveRecipeLog";
import retrieveTopRated from "../actions/RetrieveTopRated";
import searchRecipes from "../actions/SearchRecipes";
import updateRecommended from "../actions/UpdateRecommended";
class GetCookingDiscoverScreen extends React.Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.screenProps.onRefresh();
        this.props.retrieveTop();
        this.props.getLog();
        this.setState({updated: false})
    }

    componentDidUpdate(prevProps){
        if((this.state.updated == false && !this.props.updatingRecommendations) || this.props.logUpdating){
            console.log("Updating")
            var merged_log =         Object.keys(this.props.log)
            .reduce((r, e)=>{r.push(this.props.log[e].breakfast, this.props.log[e].lunch, this.props.log[e].dinner); return r}, []);
            var filled_out_days = merged_log.filter((item) => item.contents.length > 0);
            // Check the log to see if there are any entries
            // If there are then call the recommmendation reducer
            if(filled_out_days.length > 0){
                // Call recommend function on these content tags
                console.log("There is at least one element in your log");
                this.props.updateRecommended(filled_out_days.map((item) => item.contents));
                this.setState({updated: true})
            }
        }
    }
    navigate(){
        this.props.navigation.navigate("RecipeView");
    }
    render(){
        searchText = ()=> {
            if(this.props.results.length > 0)            
                return (<Text style={{fontSize: 28, fontWeight: "bold"}}> Search Results <FontAwesome style={{fontSize: 28}} name="long-arrow-right"/> </Text>)
            };

        return (
        <ScrollView>
            <SearchBar
                onChangeText={(text) => {if(this.timeout) clearTimeout(this.timeout); this.timeout = setTimeout(()=>this.props.search(text), 500)}}
                height={50}
                placeholder={'Search For Recipes...'}
                autoCorrect={true}
                padding={5}
                returnKeyType={'search'}
                showLoading={this.props.searching}
            />
            {
                searchText()
            }
            <FlatList
                horizontal
                data={this.props.results}
                renderItem={({item}) =>{
                    return (
                    <TouchableHighlight 
                    onPress={()=>{this.props.navigation.navigate("RecipeView", {uri:item.pic, title: item.name, id: item.id})}}
                    >
                        <Card image={{uri: item.pic}} containerStyle={{padding: 0, width:160}}>
                        <Text style={{marginBottom: 15, }}>{item.name}</Text>
                    </Card>
                    </TouchableHighlight>
                    )
                }}
                keyExtractor={(item) => item.id}
            />
            <Text style={{fontSize: 28, fontWeight: "bold"}}>Top Rated Recipes <FontAwesome style={{fontSize: 28}} name="long-arrow-right"/> </Text>
            <FlatList
                horizontal
                data={this.props.top_recipes}
                renderItem={({item}) =>{
                    return (
                    <TouchableHighlight 
                    onPress={()=>{this.props.navigation.navigate("RecipeView", {uri:item.pic, title: item.name, id: item.id})}}
                    >
                    <Card image={{uri: item.pic}} containerStyle={{padding: 0, width:160}}>
                        <Text style={{marginBottom: 15, }}>{item.name}</Text>
                    </Card>
                    </TouchableHighlight>
                    )
                }
            }
            keyExtractor={(item) => item.id}
            >
                </FlatList>

                <Text style={{fontSize: 28, fontWeight: "bold"}}>Recommended for you <FontAwesome style={{fontSize: 28}} name="long-arrow-right"/> </Text>
                
                {
                    this.props.recommended === undefined ||this.props.recommended.length == 0 ? 
                        <Text>Please enter at least one item into your recipe log</Text>
                    :
                <FlatList
                horizontal
                data={this.props.recommended}
                renderItem={({item}) =>{
                    return (
                        <TouchableHighlight 
                        onPress={()=>{this.props.navigation.navigate("RecipeView", {uri:item.pic, title: item.name, id: item.id})}}
                        >
                        <Card  
                           image={{uri: item.pic}} 
                           containerStyle={{padding: 0, width:160}}>
                        <Text style={{marginBottom: 15, }}>{item.name}</Text>
                    </Card>
                    </TouchableHighlight>
                    )
                }
            }
            keyExtractor={(item)=>item.id}
            >
                </FlatList>
                }
        </ScrollView>)
        ;

    }
}
const mapStateToProps = (state) =>{ return {
                        results: state.search_reducer.recipes,
                        searching: state.search_reducer.retrieving,
                        top_recipes: state.top_recipe_reducer.recipes, 
                        log: state.recipe_log_reducer.recipes,
                        logUpdating: state.recipe_log_reducer.updating,
                        recommended: state.recommender_reducer.recommendations,
                        updatingRecommendations: state.recommender_reducer.updating
                        }};
const mapDispatchToProps = (dispatch) =>{ return {
        search: (query)=> {dispatch(searchRecipes(query))},
        retrieveTop: ()=>{dispatch(retrieveTopRated())},
        updateRecommended: (contentTags)=>{dispatch(updateRecommended(contentTags))},
        getLog: ()=>{ dispatch(retrieveRecipeLog())},
        }
    }

export default connect(mapStateToProps, mapDispatchToProps)(GetCookingDiscoverScreen);