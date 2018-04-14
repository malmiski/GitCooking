import React from "react";
import { StyleSheet, Text, View, StatusBar, Image, ScrollView, RefreshControl} from 'react-native';
export default class GetCookingHomeScreen extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <ScrollView style={{flex: 1, marginTop: 0, backgroundColor: "#EFEFEF"}} 
            refreshControl={
                <RefreshControl
                refreshing={this.props.screenProps.refreshing}
                onRefresh={this.props.screenProps.onRefresh}>
                </RefreshControl>}>
                <Image source={{uri : "https://pc-tablet.com/wp-content/uploads/2016/12/New-Year-2017-images-videos.jpg"}} 
                style={{ flex: 1, height: 400}} />
                <View style={{backgroundColor: "yellow", margin: 30, height: 400}} />
                <View style={{backgroundColor: "red", margin: 30, height: 400}} />
                {/*<Image source={{uri: "https://pc-tablet.com/wp-content/uploads/2016/12/New-Year-2017-images-videos.jpg"}} />*/}
            </ScrollView>
        );

    }
}