import React from "react";
import { StyleSheet, Text, Dimensions, View, StatusBar, Alert, Image, ScrollView, RefreshControl, TouchableHighlight} from 'react-native';
import {Entypo} from "@expo/vector-icons";
import t from "tcomb-form-native";
import {Pages} from "react-native-pages";
import {connect} from "react-redux";
import retrieveRecipeLog from "../actions/RetrieveRecipeLog";
import updateLog from "../actions/UpdateLog"
import Toaster, { ToastStyles } from 'react-native-toaster';
import {Button} from "react-native-elements";
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

 const  Device_Width = Dimensions.get('window').width ;

  const options = {};
  var styles = StyleSheet.create({
    MainContainer :{

        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    
      },
    container: {
      justifyContent: 'center',
      backgroundColor: '#ffffff',
      width: Device_Width,
      flexDirection: 'row',

    },
    title: {
      fontSize: 30,
      alignSelf: 'center',
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
    },
    swipeTip:{
        fontSize: 16,
        alignSelf: 'center',
        marginBottom: 30
    }
  });
  
class GetCookingRecipeLogScreen extends React.Component{
    constructor(props){
        super(props);
    }
    state = {message: null, canPress:true}
    componentWillMount(){
        console.log("Mounted");
        this.props.getLog( this.props.id);
    }
    componentDidUpdate(){
        console.log("Updated");
    }
    onFinish(date, err){
        var _this = this;
        if(!err)
            this.setState({...this.state, message: {text: "Successfully updated day " + date, styles: ToastStyles.success, onHide: ()=>{
                _this.setState({..._this.state, message: null})
                this.canPress = true;
            }}})
        else
            this.setState({...this.state, message: {text: "Could not update " + date, styles: ToastStyles.error, onHide: ()=>{
                _this.setState({..._this.state, message: null})
                this.canPress = true;
            }}})
    }
    onPress(formNumber){
        // this.setState({message: {text:"Updating", }})
        // Update the specified day, with the new log information
        return ()=>{
            if(!this.canPress) return;
            var value = this.refs[`form${formNumber}`].getValue();
            // console.log(value);
            var breakfast = {...this.props.log[formNumber].breakfast};
            breakfast.contents = value.breakfastIngredients != null ? value.breakfastIngredients.split(" ") : [];
            breakfast.cost = value.breakfastCost;
            breakfast.name = value.breakfast != null && value.breakfast != "" ? value.breakfast : " ";
            breakfast.userID = this.props.id;
    
            var lunch = {...this.props.log[formNumber].lunch};
            lunch.contents = value.lunchIngredients != null ? value.lunchIngredients.split(" ") : [];
            lunch.cost = value.lunchCost;
            lunch.name = value.lunch != null && value.lunch != "" ? value.lunch : " ";
            lunch.userID = this.props.id;
    
            var dinner = {...this.props.log[formNumber].dinner};
            dinner.contents = value.dinnerIngredients != null ? value.dinnerIngredients.split(" ") : [];
            dinner.cost = value.dinnerCost;
            dinner.name = value.dinner != null && value.dinner != ""? value.dinner : " ";
            dinner.userID = this.props.id;
            // console.log(lunch, breakfast, dinner);
            // this.setState({...this.state, update: [breakfast, lunch, dinner]});
            this.props.updateLog(formNumber, breakfast, lunch, dinner, this.onFinish.bind(this));
            this.canPress = false;
            }
    }
    render(){
        var list = [1,2,3,4,5,6,7];
        var log = this.props.log;
        // console.log(log);
        return (
            <View style={styles.MainContainer}>
            <Toaster message={this.state.message}/>
                <ScrollView
                horizontal = { true } 
                showsHorizontalScrollIndicator = {false}
                pagingEnabled = { true } >
            
                {
                list.map( (item) => {
                    var onPress = this.onPress(item).bind(this);
                    return (
                            <View key={item} style={styles.container}>
                                <View style={{height:"100%", width:"100%"}}>
                                <ScrollView  
                                    refreshControl={         
                                    <RefreshControl
                                        refreshing={this.props.retrieving || this.props.updating}
                                    />}>
                                        <Text style={styles.title}> Day {item} </Text>
                                        <Text style={styles.swipeTip}>{item == 1?"(Swipe left to view other days)" : ""}</Text>
                                        <Form
                                        ref={`form${item}`}
                                        type={Recipe}
                                        value={{breakfast: log[item].breakfast.name, breakfastIngredients: log[item].breakfast.contents.join(" "), breakfastCost: log[item].breakfast.cost,
                                                lunch: log[item].lunch.name, lunchIngredients: log[item].lunch.contents.join(" "), lunchCost: log[item].lunch.cost, 
                                                dinner: log[item].dinner.name, dinnerIngredients: log[item].dinner.contents.join(" "), dinnerCost: log[item].dinner.cost}}
                                        options={options}/>
                                        <View style={{marginBottom: 50}}/>
                                </ScrollView>
                                        <Button buttonStyle={styles.button} 
                                                onPress={onPress} underlayColor='#99d9f4'
                                                title="Save" textStyle={styles.buttonStyle}/>
                                </View>
                            </View>
                                )
                    }
                )
                }
                </ScrollView>
            </View>
        )
    }
}
const mapStateToProps = (state) =>{ return {log: state.recipe_log_reducer.recipes, 
                                            id: state.profile_reducer.profile.id, 
                                            retrieving: state.recipe_log_reducer.retrieving, 
                                            updating: state.recipe_log_reducer.updating}};
const mapDispatchToProps = (dispatch) =>{ return {
    getLog: (id)=>{ dispatch(retrieveRecipeLog(id))},
    updateLog: (day, breakfast, lunch, dinner, onFinish)=>{dispatch(updateLog(day, breakfast, lunch, dinner, onFinish))},
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(GetCookingRecipeLogScreen);