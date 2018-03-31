import React from "react";
import { StyleSheet, Text, ListView, StatusBar, Image, ScrollView, View, Button,   TouchableHighlight
} from 'react-native';
export default class GetCookingMoreScreen extends React.Component{
    render(){
        // console.log(this.props.navigation);
        const list = [{name: "Info", screen: "InfoScreen"}, {name: "Rules", screen: "RulesScreen"},
         {name: "Settings", screen: "SettingsScreen"}, {name: true ? "Log In" : "Log Out", screen: "LoginToggleScreen"}];
        return (
            <ScrollView style={{flex: 1, marginTop: 0, backgroundColor: "lightgray"}} scrollEnabled={false}>
                {
                    list.map((prop, key) => {
                        return <TouchableHighlight key={key} underlayColor="gray" onPress={()=>{
                                if(prop.screen !== "LoginToggleScreen"){
                                    this.props.navigation.navigate(prop.screen)
                                }
                            }}>
                            <View style={{borderBottomColor: "black", borderBottomWidth: StyleSheet.hairlineWidth, backgroundColor: "#eee", height: 80, alignContent: "center"}} >
                                <Text style={{fontSize: 35, fontWeight: "400"}}>{prop.name}</Text>
                            </View>
                        </TouchableHighlight>
                    })
                }
            </ScrollView>
        );

    }


}