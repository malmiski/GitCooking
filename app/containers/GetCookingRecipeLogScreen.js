import React from "react";
import { StyleSheet, Text, ListView, View, StatusBar, Alert, Image, ScrollView, RefreshControl, TouchableHighlight} from 'react-native';
import {Entypo} from "@expo/vector-icons";
import t from "tcomb-form-native";
import {Pages} from "react-native-pages";
import {connect} from "react-redux";
import retrieveRecipeLog from "../actions/RetrieveRecipeLog";
import updateRecommended from "../actions/UpdateRecommended"
const Form = t.form.Form;
var Recipe = t.struct({
    breakfast: t.maybe(t.String),              // a optional string
    breakfastIngredients: t.maybe(t.Array),  // an optional string
    breakfastCost: t.maybe(t.Number),               // a optional number
    dinner: t.maybe(t.String),              // a optional string
    dinnerIngredients: t.maybe(t.Array),  // an optional string
    dinnerCost: t.maybe(t.Number),               // a optional number
    dessert: t.maybe(t.String),              // a optional string
    dessertIngredients: t.maybe(t.Array),  // an optional string
    dessertCost: t.maybe(t.Number),               // a optional number
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
    componentWillMount(){
        this.props.getLog();
    }

    onPress(formNumber){
        return ()=>{
        var value = this.refs[`form${formNumber}`].getValue();
        this.props.recommend([value]);
        Alert.alert(`Updated Log for Day ${formNumber}`)
        }

    }
    render(){
        var list = [1,2,3,4,5,6,7];
        return (
            <Pages
            indicatorColor={"black"}
            >
            {
            list.map( (item) => {
                return (
           <ScrollView key={item} containerStyle={styles.container}>
                <Text style={styles.title}> Day {item}</Text>
                <Form
                ref={`form${item}`}
                type={Recipe}
                options={options}/>
                <TouchableHighlight style={styles.button} onPress={this.onPress(item)} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableHighlight>
            </ScrollView>
                )
            }
            )
            }
            </Pages>
        )
    }
}
const mapStateToProps = (state) =>{ return {log: state.recipe_log_reducer.recipes}};
const mapDispatchToProps = (dispatch) =>{ return {
    getLog: ()=>{ dispatch(retrieveRecipeLog())},
    recommend: (value)=>{dispatch(updateRecommended(value))},
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(GetCookingRecipeLogScreen);