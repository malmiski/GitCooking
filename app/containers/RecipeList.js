import React from "react";
import { StyleSheet, Text, View, StatusBar, Image, ScrollView, RefreshControl, FlatList, TouchableHighlight} from 'react-native';
import { connect } from "react-redux";
import {Entypo} from "@expo/vector-icons"
import retrieveProfile from "../actions/RetrieveProfile";
class RecipeList extends React.Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.navigation.setParams({headerTitle: ()=>{return <Text style={{color: "black", fontWeight: "900"}}>My</Text>}});
        this.props.onRefresh();
    }
    render(){
        return (
            <FlatList
            ItemSeparatorComponent={() => {return <View style={{marginLeft:"14%", width: "86%", height: 1, backgroundColor: "#CED0CE", }} />}}
            data={this.props.favorites}
                renderItem={({item}) => {
                    return (
                    <TouchableHighlight
                    onPress={() => {this.props.navigation.navigate("RecipeView", {uri:item.pic, id: item.id, title: item.name, refresh: this.props.onRefresh})}}
                    underlayColor="black"
                    key={item.id}
                    >
                    <View style={{flexDirection:"row", backgroundColor: "white"}} > 
                            <Image source={{uri:item.pic}} style={{marginTop: 15, marginBottom:10, width: 80, height: 80, borderRadius:40}} />
                            <View style={{marginTop:10, marginLeft: 5}}>
                            <Text style={{fontSize: 20, color: "#1F1F1F"}}>{item.name}</Text> 
                            </View> 
                            <View style={{position: "absolute", right: 0, top: 40, justifyContent: "center", alignItems: "center"}}>
                                    <Entypo name="chevron-thin-right" size={24} color="black" style={{}} />
                            </View>
                    </View>
                    </TouchableHighlight>)}}
                refreshing={this.props.retrieving}
                onRefresh={this.props.onRefresh}
                keyExtractor={(item) => item.id}
            />
        );

    }
}

const mapStateToProps = (state) =>{ return {retrieving: state.profile_reducer.retrieving,
                                            rowData: state.recipe_list_reducer.recipes,
                                            favorites: state.profile_reducer.profile.favorites
                                        }};
const mapDispatchToProps = (dispatch) =>{ return {
    onRefresh: ()=>{ dispatch(retrieveProfile())}
}};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList);
