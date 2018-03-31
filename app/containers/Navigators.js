import { StyleSheet, Text, View, StatusBar, Image} from 'react-native';
import {StackNavigator} from 'react-navigation';
import GetCookingHomeScreen from "./GetCookingHomeScreen";
import GetCookingMoreScreen from "./GetCookingMoreScreen";
import GetCookingMessagesScreen from "./GetCookingMessagesScreen";
import InfoScreen from "./InfoScreen";
import GetCookingMyStuffScreen from "./GetCookingMyStuffScreen";
import MessageView from "./MessageView";
import React from "react";
import {Feather} from "@expo/vector-icons";
const navigators = {};
navigators.HomeNav = StackNavigator({Home: {screen:  GetCookingHomeScreen,
    navigationOptions: {
      title: `Home`,
    headerTitle: ()=>{return <Image source={require('../assets/tmobile-logo.png')} style={{width: 100, height: 58}}/>},
    headerStyle: {backgroundColor: "black", borderColor: "white", borderBottomWidth: 2},
    },
}});
navigators.MyStuffNav = StackNavigator({Home: {screen:  GetCookingMyStuffScreen,
    navigationOptions: {
      title: `Back`,
    headerTitle: ()=>{return <Text style={{color: "white", fontWeight: "900"}}>My Stuff</Text>},
    headerStyle: {backgroundColor: "black", borderColor: "white", borderBottomWidth: 2},
    },
}});
navigators.MessagesNav = StackNavigator({
  Home: {screen:  GetCookingMessagesScreen,
    navigationOptions: {
      title: `Messages`,
    headerTitle: ()=>{return <Text style={{color: "white", fontWeight: "900"}}>Messages</Text>},
    headerStyle: {backgroundColor: "black", borderColor: "white", borderBottomWidth: 2},
    },
  },
  Message: {screen: MessageView, navigationOptions: ({navigation}) => {
    console.log(Object.keys(navigation.state.params));
    return {
      title: `Is the way`,
      headerTitle: ()=>{return <Text style={{color: "white", fontWeight: "900"}}>{navigation.state.params.title}</Text>},
      headerStyle: {backgroundColor: "black", borderColor: "white", borderBottomWidth: 2},
  }},
} 

});
navigators.MoreNav = StackNavigator(
  {
    Home: {
      screen:  GetCookingMoreScreen,
      navigationOptions: {
        title: `More`,
        headerTitle: ()=>{return <Text style={{color: "white", fontWeight: "900"}}>More</Text>},
        headerStyle: {backgroundColor: "black", borderColor: "white", borderBottomWidth: 2},
      },
    },
    InfoScreen: {screen: InfoScreen,      navigationOptions: ({navigation}) => ({
        title: `Info`,
        headerTitle: ()=>{return <Text style={{color: "white", fontWeight: "900"}}>Info</Text>},
        headerStyle: {backgroundColor: "black", borderColor: "white", borderBottomWidth: 2},
        headerLeft: <Feather style={{marginLeft: 10}} name="arrow-left" size={30} color="white" onPress={() => {navigation.goBack(undefined)}} />
      }),
},
    RulesScreen: {screen: View,       navigationOptions: ({navigation}) => ({
        title: `Rules`,
        headerTitle: ()=>{return <Text style={{color: "white", fontWeight: "900"}}>Rules</Text>},
        headerStyle: {backgroundColor: "black", borderColor: "white", borderBottomWidth: 2},
        headerLeft: <Feather style={{marginLeft: 10}} name="arrow-left" size={30} color="white" onPress={() => {navigation.goBack(undefined)}} />
      }),
},
    SettingsScreen: {screen: View,       navigationOptions: ({navigation}) => ({
        title: `Settings`,
        headerTitle: ()=>{return <Text style={{color: "white", fontWeight: "900"}}>Settings</Text>},
        headerStyle: {backgroundColor: "black", borderColor: "white", borderBottomWidth: 2},
        headerLeft: <Feather style={{marginLeft: 10}} name="arrow-left" size={30} color="white" onPress={() => {navigation.goBack(undefined)}} />
      }),
},
    LoginToggleScreen: {screen: View,       navigationOptions: ({navigation}) => ({
        title: `More`,
        headerTitle: ()=>{return <Text style={{color: "white", fontWeight: "900"}}>More</Text>},
        headerStyle: {backgroundColor: "black", borderColor: "white", borderBottomWidth: 2},
      }),
}
  });
export default navigators;
