import React from "react";
import { StyleSheet, TextInput, View, StatusBar, Image, ScrollView, RefreshControl} from 'react-native';
import {Button,} from "react-native-elements";
import Amplify, {Auth} from "aws-amplify";
import aws_exports from "../../aws-exports"
export default class SignupScreen extends React.Component{
    state = { // 1
        authCode: ''
    }
    onChangeText(authCode) { // 2
        this.setState({ authCode })
    }

    signIn(){
    }
    signUp() {
    Auth.signUp({ // 3
        username: 'malmiski',
        password: 'Passwort#123',
        attributes: {
        phone_number: '+17039448982',
        email: 'malmiski@live.com'
        }
    })
    .then(res => {
        console.log('successful signup: ', res)
    })
    .catch(err => {
        console.log('error signing up: ', err)
    })
    }
    confirmUser() { // 4
    const { authCode } = this.state
    const _this = this;
    Auth.confirmSignUp('malmiski', authCode)
        .then(res => {
        console.log('successful confirmation: ', res);
            _this.props.navigation.navigate('Login');
        })
        .catch(err => {
        console.log('error confirming user: ', err)
        })
    }
     
    constructor(props){
        super(props);
    }
    componentWillMount(){
        Amplify.configure(aws_exports)
    }

      // rest of code
    render(){
        return (
            <View style={{}}>
                <Button title="Sign in" onPress={this.confirmUser.bind(this)} />
                <Button title='Sign Up' onPress={this.signUp.bind(this)} />                
            </View>
        );
    }

    styles = StyleSheet.create({
        input: {
            marginBottom: 10,
            borderBottomColor: "orange",
            borderBottomWidth: 5

        }


    });
}