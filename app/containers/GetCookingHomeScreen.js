import React from "react";
import { StyleSheet, Text, View, StatusBar, Image, ScrollView, RefreshControl} from 'react-native';
import {connect} from "react-redux";
import retrieveTimeline from "../actions/RetrieveTimeline";
import {Card} from "react-native-elements";
import StarRating from "react-native-star-rating";
class GetCookingHomeScreen extends React.Component{
    constructor(props){
        super(props)
        this.props.timeline();
    }
    componentWillMount(){
        this.props.timeline();

    }
    render(){
        var log = this.props.log;
        return (
            <ScrollView style={{flex: 1, marginTop: 0, backgroundColor: "#EFEFEF"}}>
            {
                log.map((prop) => {
                    return (
                    <View  key={prop.key} style={{ flexDirection: "row" }}>
                        <Text style={{fontSize:  28, fontWeight: "900", width: 56}}> {prop.date} </Text>
                        <View style={{width: 1, backgroundColor: "black"}}/>
                        <View>
                        {
                            prop.meals.map((item) =>{
                                return ( 
                                    <View key={item.key}>
                                        <View style={{flexDirection: "row"}}>
                                            <Image source={{uri: item.friendImage}} style={{ width: 40, height: 40, borderRadius: 20, }} />
                                            <Text>{item.friend}</Text>
                                        </View> 
                                        <Text> {item.name} </Text>
                                        <Card image={{uri: item.image}}
                                              containerStyle={{padding: 0, width:280}}
                                              onPress={ ()=>this.props.navigation.navigate("RecipeView", {uri: item.image, name: item.name})}>
                                        <StarRating
                                            style={{width: 100}}
                                            disabled={false}
                                            maxStars={5}
                                            rating={item.rating}
                                            selectedStar={(rating) => console.log(rating)}
                                        />

                                        </Card>
                                    </View>
                                )
                            }
                            )
                        }
                        </View>
                    </View>)
                })
            }
        </ScrollView>
        );

    }
}
const mapStateToProps = (state) =>{ return {log: state.timeline_reducer.timeline.log}};
const mapDispatchToProps = (dispatch) =>{ return {
    timeline: ()=>{ dispatch(retrieveTimeline())}
}};

export default connect(mapStateToProps, mapDispatchToProps)(GetCookingHomeScreen);

/**
 




 */