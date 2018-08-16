import React from "react";
import { FlatList, StyleSheet, Text, View, StatusBar, Image, ScrollView, RefreshControl, TouchableHighlight} from 'react-native';
import {connect} from "react-redux";
import retrieveTimeline from "../actions/RetrieveTimeline";
import {Card} from "react-native-elements";
import StarRating from "react-native-star-rating";
class GetCookingHomeScreen extends React.Component{
    constructor(props){
        super(props)
    }
    componentWillMount(){
        this.props.getTimeline(this.props.id);

    }
    render(){
        var timeline = this.props.timeline;
        return (
            <View style={{height: "100%"}}>
            <Text style={{fontSize: 28, fontWeight: "bold", textAlign: "center"}}>What your friends have reviewed and made recently</Text>
            <FlatList 
                style={{flex: 1, marginTop: 0, backgroundColor: "#EFEFEF"}}
                keyExtractor={(item)=>item.id}
                onRefresh={()=>this.props.getTimeline(this.props.id)}
                refreshing={this.props.refreshing}
                data={timeline}
                ListEmptyComponent={<Text >Looks like there's nothing so far</Text>}
                renderItem={({item}) => {
                    var date = new Date(item.date);
                    return (
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{fontSize:  28, fontWeight: "900", width: 56}}> {(date.getMonth() + 1) + '/' + date.getDate()/*date.toLocaleDateString("en-US")*/} </Text>
                        <View style={{width: 1, backgroundColor: "black"}}/>
                        <View>
                            <View>
                                <Image source={{uri: item.user.profile_pic}} style={{ width: 40, height: 40, borderRadius: 20, }} />
                                <Text> {item.user.name} </Text>
                                <TouchableHighlight onPress={()=>this.props.navigation.navigate("RecipeView", {id: item.recipe.id, uri: item.pic, title: item.recipe.name})}>
                                <Card image={{uri: item.pic? item.pic : item.recipe.pic}}
                                        containerStyle={{padding: 0, width:280}}>
                                <StarRating
                                    style={{width: 100}}
                                    disabled={true}
                                    maxStars={5}
                                    rating={item.stars}
                                />
                                    <Text style={{fontSize: 20}}>{item.recipe.name}</Text>
                                    <Text>
                                        {item.comment ? item.comment : ''}                                
                                    </Text>
                                </Card>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                    )
                }}
                />
                </View>
        );

    }
}
const mapStateToProps = (state) =>{ return {refreshing: state.timeline_reducer.retrieving, timeline: state.timeline_reducer.timeline, id:state.profile_reducer.profile.id}};
const mapDispatchToProps = (dispatch) =>{ return {
    getTimeline: (id)=>{ dispatch(retrieveTimeline(id))}
}};

export default connect(mapStateToProps, mapDispatchToProps)(GetCookingHomeScreen);

/**
 




 */