import { StyleSheet, Text, View, TouchableHighlight, StatusBar, Image} from 'react-native';
import {createStackNavigator} from 'react-navigation';
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
import FontAwesome from '../../node_modules/@expo/vector-icons/FontAwesome';
const navigators = {};

/**
 * These are the various screens for each view in the tab bar
 */
navigators.HomeNav = createStackNavigator({
  Home: {screen:  GetCookingHomeScreen,
    navigationOptions: {
      title: `Home`,
    headerTitle: ()=>{return  <Text style={{color: "#dfdfdf", fontSize: 24, marginLeft:5, fontWeight:"bold"}}>GetCooking</Text>},//<Image source={require('../assets/tmobile-logo.png')} style={{width: 100, height: 58}}/>},
    headerStyle: {backgroundColor: "blue", borderColor: "white", borderBottomWidth: 2},
    },
},
  RecipeView: {screen: RecipeView, navigationOptions: ({navigation}) => {
    return {
    headerTitle: ()=>{return <Text style={{alignContent: "center", color: "white", fontSize:24,fontWeight: "900"}}>{navigation.state.params.title}</Text>},
    headerStyle: {backgroundColor: "blue", borderColor: "white", borderBottomWidth: 2},
    headerRight: (
      <TouchableHighlight onPress={navigation.getParam('toggleFavorite')}>
        <FontAwesome style={{fontSize: 28, marginRight: 5, marginRight: 5}} name={navigation.getParam("isFavorite") ? "star" : "star-o"}/>
      </TouchableHighlight>
    ),
}
  }},


});

navigators.DiscoverNav = createStackNavigator(
  {
    Home: {
      screen:  GetCookingDiscoverScreen,
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
      headerStyle: {backgroundColor: "blue", borderColor: "white", borderBottomWidth: 2},
      headerRight: (
        <TouchableHighlight onPress={navigation.getParam('toggleFavorite')}>
          <FontAwesome style={{fontSize: 28, marginRight: 5}} name={navigation.getParam("isFavorite") ? "star" : "star-o"}/>
        </TouchableHighlight>
      ),
  }
    },},
    FriendView: {screen: FriendView, navigationOptions: {
      title: ``,
      headerTitle: ()=>{return <Text style={{alignContent: "center", color: "white", fontSize:24,fontWeight: "900"}}></Text>},
      headerStyle: {backgroundColor: "blue", borderColor: "white", borderBottomWidth: 2},
    },
  }
});

navigators.RecipeLogNav = createStackNavigator({
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
navigators.ProfileNav = createStackNavigator(
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
    FriendList: {screen: FriendList, navigationOptions: ({navigation}) => {
      return {
      title: ``,
      headerTitle: ()=>{return <Text style={{alignContent: "center", color: "white", fontSize:24,fontWeight: "900"}}>Your Friends</Text>},
      headerStyle: {backgroundColor: "blue", borderColor: "white", borderBottomWidth: 2},
      headerRight: (
      <TouchableHighlight onPress={navigation.navigate("FriendSearchView")}>
        <Text>Search</Text>
      </TouchableHighlight>
      ),
    }},
  },
    RecipeView: {screen: RecipeView, navigationOptions: ({navigation}) => {
      return {
      headerTitle: ()=>{return <Text style={{alignContent: "center", color: "white", fontSize:24,fontWeight: "900"}}>{navigation.state.params.title}</Text>},
      headerStyle: {backgroundColor: "blue", borderColor: "white", borderBottomWidth: 2},
      headerRight: (
        <TouchableHighlight onPress={navigation.getParam('toggleFavorite')}>
          <FontAwesome style={{fontSize: 28, marginRight: 5}} name={navigation.getParam("isFavorite") ? "star" : "star-o"}/>
        </TouchableHighlight>
      ),
  }
    },},
    FriendSearchView: {screen: FriendView, navigationOptions: {
      title: ``,
      headerTitle: ()=>{return <Text style={{alignContent: "center", color: "white", fontSize:24,fontWeight: "900"}}></Text>},
      headerStyle: {backgroundColor: "blue", borderColor: "white", borderBottomWidth: 2},
    },
  }
  });

export default navigators;