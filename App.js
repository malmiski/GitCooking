import React from 'react';
import { StyleSheet, Text, View, Button, StatusBar} from 'react-native';
import {Platform} from 'react-native';
import styled from 'styled-components/native';
import GetCookingTabs from "./app/containers/GetCookingTabs";
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import reducers from "./app/reducers";
import thunkMiddleware from 'redux-thunk';

import {
  StackNavigator,
} from 'react-navigation';
// Create a <Title> react component that renders an <h1> which is
// centered, palevioletred and sized at 1.5em

const store = createStore(reducers, applyMiddleware(thunkMiddleware));
import {Font, AppLoading} from "expo";
import FontAwesome from './node_modules/@expo/vector-icons/fonts/FontAwesome.ttf';


import MaterialIcons from './node_modules/@expo/vector-icons/fonts/MaterialIcons.ttf';


export default class App extends React.Component {
  state = {    fontLoaded: false  };
  async componentWillMount() {
    try {
      await Font.loadAsync({
        FontAwesome,
        MaterialIcons
      });
      this.setState({ fontLoaded: true });
    } catch (error) {
      console.log('error loading icon fonts', error);
    }
  }  
  render() {
    const Title = styled.Text`
      font-size: 20;
      text-align: center;
      color: palevioletred;
    `;

    // Create a <Wrapper> react component that renders a <section> with
    // some padding and a papayawhip background
    const Wrapper = styled.View`
    flex:1;
      background: white;
      justify-content: center;
    `;

    if (!this.state.fontLoaded) {
      return <AppLoading />;
    }
    return (
        <Wrapper>
        <StatusBar barStyle="light-content" />
          <Provider store={store}>
            <GetCookingTabs/>
          </Provider>
        </Wrapper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    ...Platform.select({
    android:{
    alignItems: 'center'
    },
}),
    justifyContent: 'center',
  },
});
