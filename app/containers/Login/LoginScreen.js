import React from "react";
import { StyleSheet, TextInput, View, StatusBar, Image, ScrollView, RefreshControl} from 'react-native';
import {Button,} from "react-native-elements";
import {Auth} from "aws-amplify";
export default class LoginScreen extends React.Component{
    state = {
        username: '',
        password: '',
        accessCode: '',
        user: {},
    }
    onChangeText(key, value) {
            this.setState({[key]: value})
    }

    signIn(){
        var _this = this;
        new Promise((resolve, reject) => {
            resolve({username: this.state.username, password: this.state.password, session: "AEWSWEJEKL23"});
        })
        // Auth.signIn(this.state.username, this.state.password)
        .then( user => {console.log("Successful request: ", user); _this.setState({user}); })
        .catch(error => {console.log(this); console.log("Something went wrong:", error)})
    }

    confirmSignIn(){
        const _this = this;
        console.log(this.state)
        new Promise((resolve, reject) =>{
            if(_this.state.user != {})
            resolve({success: "it succeeded"})
            else
                reject()

        })
        // Auth.confirmSignIn(this.state.user, this.state.accessCode)
        .then( success => {
            console.log("Successful log in: ", success);
            _this.props.notifySuccessfulLogin(success);
        })
        .catch(error => {console.log(this); console.log("Something went wrong:", error)})
    }
     
    constructor(props){
        super(props);
    }
    componentWillMount(){
        console.log(this.props)
    }

      // rest of code
    render(){
        return (
            <View style={this.styles.container}>
                <TextInput 
                    onChangeText={value => this.onChangeText("username", value)}
                    style={this.styles.input}
                    placeholder={"username"}
                />
                <TextInput 
                    onChangeText={value => this.onChangeText("password", value)}
                    style={this.styles.input}
                    placeholder={"password"}
                />
                <Button title="Send Access Code" buttonStyle={this.styles.button} onPress={this.signIn.bind(this)} />
                <TextInput
                    onChangeText={value => this.onChangeText("accessCode", value)}
                    style={this.styles.input}
                    placeholder={"access code"}
                />
                <Button title="Sign In" buttonStyle={this.styles.button} onPress={this.confirmSignIn.bind(this)} />
            </View>
        );
    }

    styles = StyleSheet.create({
        input: {
            marginBottom: 10,
            borderBottomColor: "orange",
            borderBottomWidth: 5

        },
        button: {
            width: 350,
            height: 40,
            backgroundColor: "orange"

        },
        container:{
            width: "100%",
            height: "100%",
            backgroundColor: "#2020f0",
            justifyContent: "center",
        }

    });
}