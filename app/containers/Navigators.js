import { StyleSheet, Text, View, StatusBar, Image} from 'react-native';
import {StackNavigator} from 'react-navigation';
import GetCookingHomeScreen from "./GetCookingHomeScreen";
import GetCookingDiscoverScreen from "./GetCookingDiscoverScreen";
import GetCookingRecipeLogScreen from "./GetCookingRecipeLogScreen";

import GetCookingProfileScreen from "./GetCookingProfileScreen";
import RecipeView from "./RecipeView";
import FriendView from "./FriendView";
import React from "react";
import RecipeList from "./RecipeList";
import FriendList from "./FriendList";
import {Feather} from "@expo/vector-icons";
const navigators = {};

/**
 * These are the various screens for each view in the tab bar
 */
navigators.HomeNav = StackNavigator({
  Home: {screen:  GetCookingHomeScreen,
    navigationOptions: {
      title: `Home`,
    headerTitle: ()=>{return  <Text style={{color: "#dfdfdf", fontSize: 24, marginLeft:5, fontWeight:"bold"}}>GetCooking</Text>},//<Image source={require('../assets/tmobile-logo.png')} style={{width: 100, height: 58}}/>},
    headerStyle: {backgroundColor: "blue", borderColor: "white", borderBottomWidth: 2},
    },
},
  RecipeView: {screen: RecipeView, navigationOptions: {
    headerTitle: ()=>{return  <Text style={{color: "#dfdfdf", fontSize: 24, marginLeft:5, fontWeight:"bold"}}></Text>},//<Image source={require('../assets/tmobile-logo.png')} style={{width: 100, height: 58}}/>},
    headerStyle: {backgroundColor: "blue", borderColor: "white", borderBottomWidth: 2},    
  }},


});

navigators.DiscoverNav = StackNavigator({Home: {screen:  GetCookingDiscoverScreen,
    navigationOptions: {
      title: `Back`,
    headerTitle: ()=>{return <Text style={{color: "white", fontSize:24, fontWeight: "900"}}>Discover new recipes</Text>},
    headerStyle: {backgroundColor: "blue", borderColor: "white", borderBottomWidth: 2},
    },
    RecipeView: {screen: RecipeView, navigationOptions: {
      headerTitle: ()=>{return  <Text style={{color: "#dfdfdf", fontSize: 24, marginLeft:5, fontWeight:"bold"}}></Text>},//<Image source={require('../assets/tmobile-logo.png')} style={{width: 100, height: 58}}/>},
      headerStyle: {backgroundColor: "blue", borderColor: "white", borderBottomWidth: 2},    
    }},
  }});

navigators.RecipeLogNav = StackNavigator({
  Home: {screen:  GetCookingRecipeLogScreen,
    navigationOptions: {
      headerTitle: ()=>{return <Text style={{alignContent: "center", color: "white", fontSize:24,fontWeight: "900"}}>My Log</Text>},
      headerStyle: {backgroundColor: "blue", borderColor: "white", borderBottomWidth: 2},
  },
  },
  RecipeView: {screen: RecipeView, navigationOptions: ({navigation}) => {
    console.log(Object.keys(navigation.state.params));
    return {
      title: `Is the way`,
      headerTitle: ()=>{return <Text style={{color: "white", fontSize:24,fontWeight: "900"}}>{navigation.state.params.title}</Text>},
      headerStyle: {backgroundColor: "blue", borderColor: "white", borderBottomWidth: 2},
    }},
} 

});
navigators.ProfileNav = StackNavigator(
  {
    Home: {
      screen:  GetCookingProfileScreen,
      navigationOptions: {
        title: ``,
        headerTitle: ()=>{return <Text style={{alignContent: "center", color: "white", fontSize:24,fontWeight: "900"}}>Profile</Text>},
        headerStyle: {backgroundColor: "blue", borderColor: "white", borderBottomWidth: 2},
      },
    },
    RecipeList: {screen: RecipeList, navigationOptions: {
      title: ``,
      headerTitle: ()=>{return <Text style={{alignContent: "center", color: "white", fontSize:24,fontWeight: "900"}}>Your Recipes</Text>},
      headerStyle: {backgroundColor: "blue", borderColor: "white", borderBottomWidth: 2},
    },},
    FriendList: {screen: FriendList, navigationOptions: {
      title: ``,
      headerTitle: ()=>{return <Text style={{alignContent: "center", color: "white", fontSize:24,fontWeight: "900"}}>Your Friends</Text>},
      headerStyle: {backgroundColor: "blue", borderColor: "white", borderBottomWidth: 2},
    },},
    RecipeView: {screen: RecipeView, navigationOptions: ({navigation}) => {
      return {
      headerTitle: ()=>{return <Text style={{alignContent: "center", color: "white", fontSize:24,fontWeight: "900"}}>{navigation.state.params.title}</Text>},
      headerStyle: {backgroundColor: "blue", borderColor: "white", borderBottomWidth: 2},}
    },},
    FriendView: {screen: FriendView, navigationOptions: {
      title: ``,
      headerTitle: ()=>{return <Text style={{alignContent: "center", color: "white", fontSize:24,fontWeight: "900"}}></Text>},
      headerStyle: {backgroundColor: "blue", borderColor: "white", borderBottomWidth: 2},
    },
  }
  });

export default navigators;