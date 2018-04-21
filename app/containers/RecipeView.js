import React from "react";
import { StyleSheet, Text, View, StatusBar, Image, ScrollView, RefreshControl, FlatList, TouchableHighlight} from 'react-native';
import {Card, Button,} from "react-native-elements";
import retrieveRecipes from "../actions/RetrieveRecipeList";
var styles = StyleSheet.create({

    container: {
      flex: 1,
      alignItems: 'center',
    },

    recipe: {
        flex: 1,
      height: 52
    },


});
export default class RecipeView extends React.Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){
    }

    render(){
        return (
            <ScrollView contentContainerStyle={{justifyContent: "space-around" }}>
                <View style={{flex: 1}}>
                <Image source={{uri:this.props.navigation.state.params.uri}} style={{margin: 0, height: 450, width: "100%"}} />
                <View style={{flexDirection: "row", position: "absolute", top: 350,}}>
                <View style={{width: 100, height: 100}}>
                     <Button onPress={()=>{}} title="Update" style={{width: 100, height: 100}}>Saved</Button>
                  </View>
                  <View style={{width: 100, height: 100 }}>
                        <Button onPress={()=>{}} title="Rate" style={{width: 100, height: 100}}>Saved</Button>
                    </View> 
                   <View style={{width: 100, height: 100 }}>
                       <Button onPress={()=>{}} title="Save" style={{width: 100, height: 100}}>Saved</Button>
                    </View> 
                    </View>
                </View>
              </ScrollView>
        );
    }
}
