import React from "react";
import { StyleSheet, Text, View, StatusBar, Image, ScrollView, RefreshControl, FlatList, TouchableHighlight, Button} from 'react-native';
import retrieveRecipes from "../actions/RetrieveRecipeList";
export default class RecipeView extends React.Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.navigation.setParams({headerTitle: ()=>{return <Text style={{color: "white", fontWeight: "900"}}>{this.props.navigation.params.title}</Text>}});
    }
    render(){
        return (
                <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                  <View style={{width: 100, height: 100 }}>
                     <Button onPress={()=>{}} title="Update" style={{width: 100, height: 100}}>Saved</Button>
                  </View>
                  <View style={{width: 100, height: 100 }}>
                        <Button onPress={()=>{}} title="Rate" style={{width: 100, height: 100}}>Saved</Button>
                    </View>
                   <View style={{width: 100, height: 100 }}>
                       <Button onPress={()=>{}} title="Save" style={{width: 100, height: 100}}>Saved</Button>
                    </View>            
               </View>
        );
    }
}