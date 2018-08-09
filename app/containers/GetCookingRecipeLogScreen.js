import React from "react";
import { StyleSheet, Text, ActivityIndicator, View, StatusBar, Alert, Image, ScrollView, RefreshControl, TouchableHighlight} from 'react-native';
import {Entypo} from "@expo/vector-icons";
import t from "tcomb-form-native";
import {Pages} from "react-native-pages";
import {connect} from "react-redux";
import retrieveRecipeLog from "../actions/RetrieveRecipeLog";
import updateLog from "../actions/UpdateLog"
const Form = t.form.Form;
// Create the recipe form view
var Recipe = t.struct({
    breakfast: t.maybe(t.String),              // a optional string
    breakfastIngredients: t.maybe(t.String),  // an optional string
    breakfastCost: t.maybe(t.Number),               // a optional number
    lunch: t.maybe(t.String),              // a optional string
    lunchIngredients: t.maybe(t.String),  // an optional string
    lunchCost: t.maybe(t.Number),               // a optional number
    dinner: t.maybe(t.String),              // a optional string
    dinnerIngredients: t.maybe(t.String),  // an optional string
    dinnerCost: t.maybe(t.Number),               // a optional number
  });


  const options = {};
  var styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      marginTop: 50,
      padding: 20,
      paddingBottom: 60,
      marginBottom: 40,
      backgroundColor: '#ffffff',
    },
    title: {
      fontSize: 30,
      alignSelf: 'center',
      marginBottom: 30
    },
    buttonText: {
      fontSize: 18,
      color: 'white',
      alignSelf: 'center'
    },
    button: {
      height: 36,
      backgroundColor: '#48BBEC',
      borderColor: '#48BBEC',
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 10,
      alignSelf: 'stretch',
      justifyContent: 'center'
    }
  });
  
class GetCookingRecipeLogScreen extends React.Component{
    constructor(props){
        super(props);
    }
    state = {}
    componentWillMount(){
        this.props.getLog( this.props.id);
        /*
        console.log(                <Form
            ref={`form${}`}
            type={Recipe}
            options={options}/>
        )*/
            }
    componentDidUpdate(){
        console.log("Updated");/*
        console.log(this.state.update);
        if(this.state.update){
            this.props.updateLog(...this.state.update);
            this.setState({...this.state, update: null})
        }*/
    }
    onPress(formNumber){
        // Update the specified day, with the new log information
        return ()=>{
        if(this.props.updating || this.props.retrieving) return;
        var value = this.refs[`form${formNumber}`].getValue();
        // console.log(value);
        var breakfast = {...this.props.log[formNumber].breakfast};
        breakfast.contents = value.breakfastIngredients != null ? value.breakfastIngredients.split(" ") : [];
        breakfast.cost = value.breakfastCost;
        breakfast.name = value.breakfast;
        breakfast.userID = this.props.id;

        var lunch = {...this.props.log[formNumber].lunch};
        lunch.contents = value.lunchIngredients != null ? value.lunchIngredients.split(" ") : [];
        lunch.cost = value.lunchCost;
        lunch.name = value.lunch;
        lunch.userID = this.props.id;

        var dinner = {...this.props.log[formNumber].dinner};
        dinner.contents = value.dinnerIngredients != null ? value.dinnerIngredients.split(" ") : [];
        dinner.cost = value.dinnerCost;
        dinner.name = value.dinner;
        dinner.userID = this.props.id;
        // console.log(lunch, breakfast, dinner);
        console.log(dinner);
        // this.setState({...this.state, update: [breakfast, lunch, dinner]});
        this.props.updateLog(formNumber, breakfast, lunch, dinner);
        // Alert.alert(`Updated Log for Day ${formNumber}`)
        }
    }
    render(){
        var list = [1,2,3,4,5,6,7];
        var log = this.props.log;
        // console.log(log);
        return (
            <ScrollView>
            {
            list.map( (item) => {
                return (
           <ScrollView key={item} containerStyle={styles.container}
                    refreshControl={         
                    <RefreshControl
                        refreshing={this.props.retrieving || this.props.updating}
                      />
            }
           >
                <Text style={styles.title}> Day {item}</Text>
                <Form
                ref={`form${item}`}
                type={Recipe}
                value={{breakfast: log[item].breakfast.name, breakfastIngredients: log[item].breakfast.contents.join(" "), breakfastCost: log[item].breakfast.cost,
                        lunch: log[item].lunch.name, lunchIngredients: log[item].lunch.contents.join(" "), lunchCost: log[item].lunch.cost, 
                        dinner: log[item].dinner.name, dinnerIngredients: log[item].dinner.contents.join(" "), dinnerCost: log[item].dinner.cost}}
                options={options}/>
                <TouchableHighlight style={styles.button} onPress={this.onPress(item)} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableHighlight>
                <View style={{marginBottom: 50}}/>
            </ScrollView>
                )
            }
            )
            }
            </ScrollView>
        )
    }
}
const mapStateToProps = (state) =>{ return {log: state.recipe_log_reducer.recipes, 
                                            id: state.profile_reducer.profile.id, 
                                            retrieving: state.recipe_log_reducer.retrieving, 
                                            updating: state.recipe_log_reducer.updating}};
const mapDispatchToProps = (dispatch) =>{ return {
    getLog: (id)=>{ dispatch(retrieveRecipeLog(id))},
    updateLog: (day, breakfast, lunch, dinner)=>{dispatch(updateLog(day, breakfast, lunch, dinner))},
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(GetCookingRecipeLogScreen);