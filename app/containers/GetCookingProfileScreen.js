import React from 'react';
import {
    Button,
    Image,
    ListView,
    RefreshControl,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';
import { connect } from "react-redux"
import retrieveProfile from "../actions/RetrieveProfile";

class GetCookingProfileScreen extends React.Component {
    componentWillMount(){
        this.props.screenProps.onRefresh();
    }
    render() {
        // console.log(this.props.navigation);
        const log = this.props.screenProps.profile.log;
        const image = this.props.screenProps.profile.userimage;
        const name = this.props.screenProps.profile.username;
        const userid = this.props.screenProps.profile.userid;
        console.log(this.props.log);
        return (
            <ScrollView style={{ flex: 1, marginTop: 0, backgroundColor: "seashell" }}
                scrollEnabled={true} 
                refreshControl={<RefreshControl refreshing={this.props.screenProps.retrieving}
                    onRefresh={this.props.screenProps.onRefresh} />}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={{ alignItems: "center", margin: 10 }}>
                        <Image source={{ uri: image == "" ? "https://pc-tablet.com/wp-content/uploads/2016/12/New-Year-2017-images-videos.jpg" : image }} style={{ width: 120, height: 120, borderRadius: 75, }} />
                        <Text >{name}</Text>
                    </View>
                    <View>
                        <View style={{ flexDirection: "row", }}>
                            <View style={{width: 100, height: 100 }}>
                                <Button onPress={()=>{this.props.navigation.navigate("RecipeList", {id: userid})}} title="Recipes" style={{width: 100, height: 100}}>Recipes</Button>
                            </View>
                            <View style={{width: 100, height: 100 }}>
                                <Button onPress={()=>{}} title="Ratings" style={{width: 100, height: 100}}>Ratings</Button>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", }}>
                            <View style={{width: 100, height: 100 }}>
                                <Button onPress={()=>{}} title="Saved" style={{width: 100, height: 100}}>Saved</Button>
                            </View>
                            <View style={{width: 100, height: 100 }}>
                                <Button onPress={()=>{}} title="Friends" style={{alignSelf: "stretch", width: 100, height: 100}}>Friends</Button>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ borderBottomColor: "black", borderBottomWidth: 2, margin: 10, alignContent: "center" }} />

                {
                    log.map((prop) => {
                        return <View key={prop.date} style={{ flexDirection: "row" }}>
                            <Text> {prop.date} </Text>
                            <View style={{width: 1, backgroundColor: "black"}}/>
                            <View style={{height:150}}>{
                                prop.meals.map(({ mealid, name }) => <Text key={mealid}>{name}</Text>)
                            }</View>
                        </View>
                    })
                }
            </ScrollView>
        );

    }


}
const mapStateToProps = (state) =>{ return {fudge:"k", log: state.profile_reducer.profile}};
const mapDispatchToProps = (dispatch) =>{ return {
    onPress: ()=>{ dispatch(retrieveProfile())}

}};

export default connect(mapStateToProps, mapDispatchToProps)(GetCookingProfileScreen);

/**
 * prop = {
 *      userid,
 *      username,
 *      userimage,
 *      log = [
 *          {
 *              date,
 *              meals = [],
 *              mealid,
 *              visible,
 *          }
 *      ]
 * 
 * 
 * }
 * 
 * 
 * 
 */