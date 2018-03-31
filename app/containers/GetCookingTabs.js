import React from 'react';
import { StyleSheet, Text, View, StatusBar, Image} from 'react-native';
// import Icon from 'react-native-vector-icons/Foundation';
import { Foundation, Ionicons, Feather, Oticons} from '@expo/vector-icons';
import TabNavigator from 'react-native-tab-navigator';
import {Platform} from 'react-native';
import styled from 'styled-components/native';
import navigators from "./Navigators";
import { connect } from "react-redux"
import switchTab from "../actions/SwitchTabs";
import refreshHome from "../actions/RefreshHome";
import retrieveMessages from "../actions/RetrieveMessages";
import retrieveStuff from "../actions/RetrieveStuff";
const Icon = <Foundation name="home" size={24} color="white"/>;

class GetCookingTabs extends React.Component{
  constructor(props){
    super(props);
  }
    displayText(text){
      if(this.props.tab === text){
        return text;
      }
      return "";
    }
    render(){
      // if(Platform.OS === 'ios'){

        const selected = 1;

        return(
        <TabNavigator
        tabBarStyle={style.tabBar}>
        
          <TabNavigator.Item
            title={this.props.tab === "HOME" ?  "HOME": " "}
            renderIcon={() => <Feather name="home" size={24} color="white" />}
            renderSelectedIcon={() => <Foundation name="home" size={24} color="hotpink" />}
            onPress={this.props.onPress('HOME')}
            selected={this.props.tab === "HOME"}
            >
            <navigators.HomeNav screenProps={ {refreshing: this.props.refreshing, onRefresh:this.props.onRefresh}}/>
          </TabNavigator.Item>

          <TabNavigator.Item
            title={this.props.tab === "MYSTUFF" ?  "MY STUFF": " "}
            renderIcon={() => <Foundation name="anchor" size={24} color="white" />}
            renderSelectedIcon={() => <Foundation name="anchor" size={24} color="hotpink" />}
            onPress={this.props.onPress("MYSTUFF")}
            selected={this.props.tab==="MYSTUFF"}>
            <navigators.MyStuffNav screenProps={{retrieving: this.props.retrievingStuff, onRefresh: this.props.onStuffRefresh, stuff:this.props.stuff}}/>
          </TabNavigator.Item>

           <TabNavigator.Item
            title={this.props.tab === "MESSAGES" ?  "MESSAGES": " "}
            renderIcon={() => <Foundation name="mail" size={24} color="white" />}
            renderSelectedIcon={() => <Foundation name="mail" size={24} color="hotpink" />}
            badgeText="1"
            onPress={this.props.onPress("MESSAGES")}
            selected={this.props.tab==="MESSAGES"}>
            <navigators.MessagesNav screenProps={ {retrieving: this.props.retrieving, onRefresh:this.props.onMessageRefresh, messages:this.props.messages}}/>
          </TabNavigator.Item>

          <TabNavigator.Item
            title={this.props.tab === "MORE" ?  "MORE": " "}
            renderIcon={() => <Feather name="more-horizontal" size={24} color="white" />}
            renderSelectedIcon={() => <Ionicons name="ios-more" size={24} color="hotpink" />}
            onPress={this.props.onPress("MORE")}
            selected={this.props.tab==="MORE"}>
            <navigators.MoreNav/>            
          </TabNavigator.Item>

       </TabNavigator>
        );
    }


};

const style = StyleSheet.create({
  tabBar:{
  backgroundColor: "black",
  borderTopWidth: 1,
  borderColor: "gray"
  },

});

const mapStateToProps = (state) =>{
      return {
        tab: state.tab_reducer.selected,
        refreshing: state.home_reducer.refreshing,
        retrieving: state.messages_reducer.retrieving,
        messages: state.messages_reducer.messages,
        stuff: state.stuff_reducer.stuff,
        retrievingStuff: state.stuff_reducer.retrievingStuff,
      }

};
const mapDispatchToProps = (dispatch) =>{
      return {
        onPress: (name)=>()=>{
            dispatch({type: "CHANGE_TAB", payload:name})
        },
        onRefresh: () => {
            dispatch(refreshHome());
        },
        onMessageRefresh: ()=>{
          dispatch(retrieveMessages());
        },
        onStuffRefresh: ()=>{
          dispatch(retrieveStuff());
        }

      }

};
export default connect(mapStateToProps, mapDispatchToProps)(GetCookingTabs);