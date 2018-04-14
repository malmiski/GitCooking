import { StyleSheet, Text, View, StatusBar, Image} from 'react-native';
import {StackNavigator} from 'react-navigation';
import GetCookingHomeScreen from "./GetCookingHomeScreen";
import GetCookingDiscoverScreen from "./GetCookingDiscoverScreen";
import GetCookingRecipeLogScreen from "./GetCookingRecipeLogScreen";
import InfoScreen from "./InfoScreen";
// import 
import GetCookingProfileScreen from "./GetCookingProfileScreen";
import RecipeView from "./RecipeView";
import React from "react";
import RecipeList from "./RecipeList"
import FriendList from "./FriendList"
import {Feather} from "@expo/vector-icons";
const navigators = {};
/**
 * These are the various screens for each view in the tab bar
 */
navigators.HomeNav = StackNavigator({Home: {screen:  GetCookingHomeScreen,
    navigationOptions: {
      title: `Home`,
    headerTitle: ()=>{return  <Text style={{color: "#dfdfdf", fontSize: 24, marginLeft:5, fontWeight:"bold"}}>GetCooking</Text>},//<Image source={require('../assets/tmobile-logo.png')} style={{width: 100, height: 58}}/>},
    headerStyle: {backgroundColor: "blue", borderColor: "white", borderBottomWidth: 2},
    },
}});

navigators.DiscoverNav = StackNavigator({Home: {screen:  GetCookingDiscoverScreen,
    navigationOptions: {
      title: `Back`,
    headerTitle: ()=>{return <Text style={{color: "white", fontWeight: "900"}}>My Stuff</Text>},
    headerStyle: {backgroundColor: "black", borderColor: "white", borderBottomWidth: 2},
    },
}});

navigators.RecipeLogNav = StackNavigator({
  Home: {screen:  GetCookingRecipeLogScreen,
    navigationOptions: {
      title: `Messages`,
    headerTitle: ()=>{return <Text style={{color: "white", fontWeight: "900"}}>Messages</Text>},
    headerStyle: {backgroundColor: "black", borderColor: "white", borderBottomWidth: 2},
    },
  },
  Message: {screen: RecipeView, navigationOptions: ({navigation}) => {
    console.log(Object.keys(navigation.state.params));
    return {
      title: `Is the way`,
      headerTitle: ()=>{return <Text style={{color: "white", fontWeight: "900"}}>{navigation.state.params.title}</Text>},
      headerStyle: {backgroundColor: "black", borderColor: "white", borderBottomWidth: 2},
  }},
} 

});
navigators.ProfileNav = StackNavigator(
  {
    Home: {
      screen:  GetCookingProfileScreen,
      navigationOptions: {
        title: ``,
        headerTitle: ()=>{return <Text style={{alignContent: "center", color: "white", fontWeight: "900"}}>Profile</Text>},
        headerStyle: {backgroundColor: "black", borderColor: "white", borderBottomWidth: 2},
      },
    },
    RecipeList: {screen: RecipeList, navigationOptions: {},},
    FriendList: {screen: FriendList, navigationOptions: {},},
    RecipeView: {screen: RecipeView, navigationOptions: {},}
  });
export default navigators;
