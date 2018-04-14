import React from "react";
import { StyleSheet, Text, View, StatusBar, Image, ScrollView, RefreshControl} from 'react-native';
export default class RecipeView extends React.Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.navigation.setParams({headerTitle: ()=>{return <Text style={{color: "white", fontWeight: "900"}}>{this.props.navigation.params.title}</Text>}});
    }
    render(){
        return (
            <View style={{}}>
                <Image source={this.props.image}/>
            </View>
        );

    }
}