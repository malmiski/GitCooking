import React from "react";
import { StyleSheet, Text, View, StatusBar, Image, ScrollView, RefreshControl, FlatList, TouchableHighlight} from 'react-native';
import { connect } from "react-redux";
import {Entypo} from "@expo/vector-icons"
import retrieveFriends from "../actions/RetrieveFriendList";
import retrieveProfile from "../actions/RetrieveProfile";
class FriendList extends React.Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        console.log(this.props.navigation.state.friends)
        // this.props.onRefresh(this.props.screenProps.id)();
        this.props.navigation.setParams({headerTitle: ()=>{return <Text style={{color: "black", fontWeight: "900"}}>My</Text>}});
    }
    render(){
        return (
            <FlatList
            ItemSeparatorComponent={() => {return <View style={{marginLeft:"14%", width: "86%", height: 1, backgroundColor: "#CED0CE", }} />}}
            data={this.props.navigation.state.params.friends}
                renderItem={({item}) => {
                    return (
                    <TouchableHighlight
                    underlayColor="black">
                    <View style={{flexDirection:"row", backgroundColor: "white"}} > 
                            <Image key={item.profile_pic} source={{uri:item.profile_pic}} style={{marginTop: 15, marginBottom:10, width: 80, height: 80, borderRadius:40}} />
                            <View style={{marginTop:10, marginLeft: 5}}>
                            <Text style={{fontSize: 20, color: "#1F1F1F"}}>{item.name}</Text> 
                            <Text style={{fontSize: 15, color: "#BBB", fontStyle:"italic"}}>Status: {item.status}</Text>
                            </View> 
                            <View style={{position: "absolute", right: 0, top: 40,justifyContent: "center", alignItems: "center"}}>
                            </View>
                    </View>
                    </TouchableHighlight>)}}
                refreshing={this.props.retrieving}
                onRefresh={this.props.onRefresh}
            />
        );

    }
}

const mapStateToProps = (state) =>{ 
    return {retrieving: state.friend_list_reducer.retrieving,
                                            friends: state.profile_reducer.profile.friends}};
const mapDispatchToProps = (dispatch) =>{ return {
    onRefresh: ()=> dispatch(retrieveProfile())
}};

export default connect(mapStateToProps, mapDispatchToProps)(FriendList);