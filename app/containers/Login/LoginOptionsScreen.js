import React from "react";
import { StyleSheet, Text, View, StatusBar, Image, ScrollView, RefreshControl} from 'react-native';
import {Button,} from "react-native-elements";
import Amplify, {Auth} from "aws-amplify";
import aws_exports from "../../aws-exports";
export default class LoginOptionsScreen extends React.Component{  
    constructor(props){
        super(props);
    }
    componentWillMount(){
        Amplify.configure(aws_exports)
    }

      // rest of code
    render(){
        return (
            <View style={this.styles.container}>
                <View style={this.styles.textContainer}>
                    <Text style={this.styles.text}>Welcome to GetCooking!</Text>
                </View>
                <Button title="Sign in" buttonStyle={this.styles.button} onPress={()=>this.props.navigation.navigate('Login')} />
                <Button title='Sign Up' buttonStyle={this.styles.button} onPress={()=>this.props.navigation.navigate('Signup')} />                
            </View>
        );
    }

    styles = StyleSheet.create({
        button: {
            borderBottomColor: "orange",
            borderBottomWidth: 5,
            
        },
        textContainer: {
            position: "absolute",
            top: "25%",
            width: "100%",
        },
        text: {
            textAlign: "center",
            fontSize: 35,
            fontFamily: "Roboto",
            color: "white",
            
        },
        container: {
            paddingTop: 50,
            backgroundColor: "#00f00f",
            width: "100%",
            height: "100%",
            justifyContent: "center",

        }


    });
}