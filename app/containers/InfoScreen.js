import React from "react";
import { StyleSheet, Text, ListView, StatusBar, Image, ScrollView, View, Button,   TouchableHighlight
} from 'react-native';
export default class GetCookingMoreScreen extends React.Component{
    render(){
        // console.log(this.props.navigation);
        const list = [{name: "How it works", screen: "InfoScreen"}, {name: "Privacy Policy", screen: "RulesScreen"},
         {name: "Terms & conditions", screen: "SettingsScreen"}];
        return (
            <ScrollView style={{flex: 1, marginTop: 0, backgroundColor: "lightgray"}} scrollEnabled={false}>
                {
                    list.map((prop, key) => {
                        return <TouchableHighlight key={key} underlayColor="gray" onPress={()=>{
                                this.props.navigation.navigate(prop.screen)
                            }}>
                            <View style={{borderBottomColor: "black", borderBottomWidth: 1, backgroundColor: "#eee", height: 80, alignContent: "center"}} >
                                <Text style={{fontSize: 15, fontWeight: "400"}}>{prop.name}</Text>
                            </View>
                        </TouchableHighlight>
                    })
                }
            </ScrollView>
        );

    }


}