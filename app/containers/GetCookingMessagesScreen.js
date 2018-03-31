import React from "react";
import { StyleSheet, Text, ListView, View, StatusBar, Image, ScrollView, RefreshControl, TouchableHighlight} from 'react-native';
import {Entypo} from "@expo/vector-icons";
const ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 })
export default class GetCookingMessagesScreen extends React.Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.screenProps.onRefresh();
    }
    render(){
        const total = this.props.screenProps.messages.length;
        return (
            <ListView style={{backgroundColor: "black"}}
                      dataSource={ds.cloneWithRows(this.props.screenProps.messages)}
                      renderRow={(rowData, sectionId, rowId, highlighRow)=>{
                          return(
                              <TouchableHighlight underlayColor="gray" onPress={()=>{
                                    this.props.navigation.navigate("Message", {messageData: rowData, title: `${parseInt(rowId)+1} out of ${total}`});
                                  }}>
                                 <View style={{flex: 1, flexDirection:"row", justifyContent: 'flex-start', borderBottomColor: "gray", borderBottomWidth: 1, padding: 15 }}>
                                     <View style={{flex: 1, flexDirection: "column"}}>
                                    <Text style={{ color: "hotpink", fontWeight: "bold", fontSize:30}}>{rowData.name}</Text>
                                    <Text style={{color: "hotpink", fontWeight: "bold"}}>{new Date().toLocaleDateString("en-US")}</Text>
                                    <Text style={{color: "hotpink", fontWeight: "bold"}}>{rowData.company.catchPhrase}</Text>
                                    </View>
                                    <View style={{justifyContent: "center", alignItems: "center"}}>
                                    <Entypo name="chevron-thin-right" size={24} color="white" style={{}} />
                                    </View>
                                </View>
                                </TouchableHighlight>)
                      }
                      }
                      refreshControl={<RefreshControl refreshing={this.props.screenProps.retrieving}
                                                      onRefresh={this.props.screenProps.onRefresh}/>}
enableEmptySections={true}                                                      
            >
                </ListView>
        );

    }
}