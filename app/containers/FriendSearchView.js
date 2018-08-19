import React from "react";
import {Text, FlatList, View, Image, ScrollView, RefreshControl, TouchableHighlight} from 'react-native';
import {FontAwesome} from "@expo/vector-icons";
import {SearchBar} from 'react-native-elements';
import { connect } from "react-redux"
import retrieveRecipeLog from "../actions/RetrieveRecipeLog";
import retrieveTopRated from "../actions/RetrieveTopRated";
import updateRecommended from "../actions/UpdateRecommended";
import searchFriends from "../actions/SearchFriends";
import addFriend from "../actions/UpdateFriend";
import Toaster, { ToastStyles } from 'react-native-toaster';
 class FriendSearchView extends React.Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.navigation.setParams({headerTitle: ()=>{return <Text style={{color: "white", fontWeight: "900"}}>{this.props.navigation.params.title}</Text>}});
    }
    state={message:null}
    render(){
        searchText = ()=> {
            if(this.props.results.length > 0){        
                return (<Text style={{fontSize: 28, fontWeight: "bold"}}> Search Results <FontAwesome style={{fontSize: 28}} name="long-arrow-right"/> </Text>)
            }
        };
        var friends = this.props.friends;
        return (
            <ScrollView>
            <Toaster message={this.state.message}/>
            <SearchBar
                onChangeText={(text) => {
                    if(this.timeout) 
                        clearTimeout(this.timeout);
                    this.timeout = setTimeout(()=>this.props.search(text, friends), 500)}}
                height={50}
                placeholder={'Search For Friends...'}
                autoCorrect={true}
                padding={5}
                returnKeyType={'search'}
                showLoading={this.props.searching}
            />
            {
                searchText()
            }
            <FlatList
                ItemSeparatorComponent={() => {return <View style={{marginLeft:"14%", width: "86%", height: 1, backgroundColor: "#CED0CE", }} />}}
                data={this.props.results}
                renderItem={({item}) => {
                    return (
                    <TouchableHighlight
                    underlayColor="black"
                    onPress={()=>{
                            if(!item.friended){
                                this.props.addFriend(item.id, friends)
                                item.friended = true;
                                this.setState({...this.state, message: {text: "Added friend", styles: ToastStyles.success, onHide: ()=>{
                                    this.setState({...this.state, message:null})
                                    this.props.navigation.state.params.refresh();
                                }}})
                            }
                        }
                    }
                    >
                    <View style={{flexDirection:"row", backgroundColor: "white"}} > 
                            <Image key={item.profile_pic} source={{uri:item.profile_pic}} style={{marginTop: 15, marginBottom:10, width: 80, height: 80, borderRadius:40}} />
                            <View style={{marginTop:10, marginLeft: 5}}>
                            <Text style={{fontSize: 20, color: "#1F1F1F"}}>{item.name}</Text> 
                            </View>
                            {
                                item.friended ? 
                            <View style={{width:20, height: 20, borderRadius: 5, backgroundColor: "red",
                                            position: "absolute", right: 0, top: 40,justifyContent: "center", alignItems: "center"}}>
                            </View>
                            :null
                            }
                    </View>
                    </TouchableHighlight>)}}
                keyExtractor={(item) => item.id}
            />
            </ScrollView>
        )
    }
}
const mapStateToProps = (state) =>{ 
    return {
        searching: state.search_friend_reducer.retrieving,
        results: state.search_friend_reducer.friends,
        friends: state.profile_reducer.profile.friends
    }
};
const mapDispatchToProps = (dispatch) =>{
    return {
        search: (query, friendsList)=> {dispatch(searchFriends(query, friendsList))},
        retrieveTop: ()=>{dispatch(retrieveTopRated())},
        updateRecommended: (contentTags)=>{dispatch(updateRecommended(contentTags))},
        getLog: ()=>{ dispatch(retrieveRecipeLog())},
        addFriend: (id, friends)=>dispatch(addFriend(id, friends))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendSearchView);