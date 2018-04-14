import React from "react";
import { StyleSheet, Text, View, StatusBar, Image, ScrollView, RefreshControl, FlatList, TouchableHighlight} from 'react-native';
import { connect } from "react-redux";
import {Entypo} from "@expo/vector-icons"
import retrieveFriends from "../actions/RetrieveFriendList";
class FriendList extends React.Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.onRefresh(this.props.screenProps.id)();
        this.props.navigation.setParams({headerTitle: ()=>{return <Text style={{color: "black", fontWeight: "900"}}>My</Text>}});
    }
    render(){
        return (
            <FlatList
            ItemSeparatorComponent={() => {return <View style={{marginLeft:"14%", width: "86%", height: 1, backgroundColor: "#CED0CE", }} />}}
            data={this.props.rowData}
                renderItem={({item}) => {
                    return (
                    <TouchableHighlight
                    onPress={() => {this.props.navigation.navigate("RecipeView", {uri:item.imageURI})}}
                    underlayColor="black">
                    <View style={{flexDirection:"row", backgroundColor: "white"}} > 
                            <Image key={item.imageURI} source={{uri:item.imageURI}} style={{marginTop: 15, marginBottom:10, width: 80, height: 80, borderRadius:40}} />
                            <View style={{marginTop:10, marginLeft: 5}}>
                            <Text style={{fontSize: 20, color: "#1F1F1F"}}>{item.name}</Text> 
                            <Text style={{fontSize: 15, color: "#BBB", fontStyle:"italic"}}>Status: {item.status}</Text>
                            </View> 
                            <View style={{justifyContent: "center", alignItems: "center"}}>
                                    <Entypo name="chevron-thin-right" size={24} color="black" style={{}} />
                            </View>
                    </View>
                    </TouchableHighlight>)}}
                refreshing={this.props.retrieving}
                onRefresh={this.props.onRefresh(this.props.screenProps.id)}
            />
        );

    }
}

const mapStateToProps = (state) =>{ return {retrieving: state.friend_list_reducer.retrieving,
                                            rowData: state.friend_list_reducer.friends}};
const mapDispatchToProps = (dispatch) =>{ return {
    onRefresh: (id)=>()=>{ dispatch(retrieveFriends(id))}
}};

export default connect(mapStateToProps, mapDispatchToProps)(FriendList);