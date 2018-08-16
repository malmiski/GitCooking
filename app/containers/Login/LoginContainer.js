import React from "react";
import { StyleSheet, Text, View, StatusBar, Image, ScrollView, RefreshControl} from 'react-native';
import LoginScreen from "./LoginScreen";
import LoginOptionsScreen from "./LoginOptionsScreen";
import SignupScreen from "./SignupScreen";
import { connect } from "react-redux";
import successfulLogin from "../../actions/Login"
import {StackNavigator} from "react-navigation";
import GetCookingTabs from "../GetCookingTabs";
class LoginContainer extends React.Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
    }
    render(){
        const _this = this;
        const LoginScreenNav = createStackNavigator({
            Home: {
              screen:  LoginOptionsScreen,
            },
            Login:{
            screen: (props) => {return(<LoginScreen {..._this.props} />)},
            },
            Signup: {
                screen: SignupScreen,
            }
          }, {
            headerMode: 'none',
            navigationOptions: {
              headerVisible: false,
            }
           }
          );
        return (
            this.props.logged_in?
            
            <GetCookingTabs/>
            :
            <LoginScreenNav />
        );
    }

      // The navigator for the login prompt
}
const mapStateToProps = (state)=>{
    return {
        logged_in: state.login_reducer.logged_in
    }
  }
  const mapDispatchToProps = (dispatch)=>{
    return {
        notifySuccessfulLogin: (user)=>{dispatch(successfulLogin(user))}
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
