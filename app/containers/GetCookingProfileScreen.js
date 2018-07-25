import React from 'react';
import {
    Image,
    ListView,
    RefreshControl,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { connect } from "react-redux"
import retrieveProfile from "../actions/RetrieveProfile";
import {    Button,    Card} from "react-native-elements";
import StarRating from "react-native-star-rating";
import {Auth} from "aws-amplify";
import {ImagePicker} from "expo";
import {API,    graphqlOperation} from "aws-amplify";
import { getRecipe } from '../graphql-queries';
class GetCookingProfileScreen extends React.Component {
    state = {user: {username: ''}}
    componentWillMount(){
        this.props.onPress();
    }
    render() {
        
        // console.log(this.props.navigation);
        const log = this.props.profile.userLog;
        const image = this.props.profile.profile_pic;
        const name = this.props.profile.name;
        const userid = this.props.profile.userid;
        var username = this.props.profile.username;
        var favorites = this.props.profile.favorites;
        console.log(favorites);
        return (
            <ScrollView style={{ flex: 1, marginTop: 0, backgroundColor: "seashell" }}
                scrollEnabled={true} 
                refreshControl={<RefreshControl refreshing={this.props.screenProps.retrieving}
                    onRefresh={this.props.screenProps.onRefresh} />}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <TouchableWithoutFeedback onPressIn={()=>{
                        // TODO: Complete this so that a new image is saved in S3 for
                        // the image picked by the user, also update the user profile

                        // Create a image picker to replace the image
                        ImagePicker.launchImageLibraryAsync({
                            allowsEditing: true,
                            aspect: [4, 3],
                        }).then(result => {
                    
                        console.log(result);
                    
                        if (!result.cancelled) {
                            this.setState({ image: result.uri });
                        }
                        });
                    }}>
                    <View style={{ alignItems: "center", margin: 10 }} >
                        <Image source={{ uri: image == "" ? "https://pc-tablet.com/wp-content/uploads/2016/12/New-Year-2017-images-videos.jpg" : image }} style={{ width: 120, height: 120, borderRadius: 75, }} />
                        <Text >{username}</Text>
                    </View>
                    </TouchableWithoutFeedback>
                    <View style={{marginTop: 50, marginRight: 40}}>
                        <View style={{ flexDirection: "row", }}>
                            <View style={{width: 200, height: 100 }}>
                                <Button backgroundColor= "blue" onPress={()=>{this.props.navigation.navigate("RecipeList", {favorites})}} title="Recipes" style={{width: 100, height: 100}}>Recipes</Button>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", }}>
                            <View style={{width: 200, height: 100 }}>
                                <Button backgroundColor= "blue" onPress={()=>{this.props.navigation.navigate("FriendList", {friends: this.props.screenProps.profile.friends})}} title="Friends" style={{alignSelf: "stretch", width: 100, height: 100}}>Friends</Button>
                            </View>
                        </View>
                        <Button style={{borderRadius: 25}} backgroundColor= "blue" onPress={()=>{Auth.signOut().then(success => console.log(success))}} title="Log out" style={{alignSelf: "stretch", width: 100, height: 100}}>Log out</Button>
                    </View>
                </View>

                <View style={{ borderBottomColor: "black", borderBottomWidth: 2, margin: 10, alignContent: "center" }} />
                
                
                <View>
                                        {
                log.map((prop) => {
                    return (
                    <View  key={prop.key} style={{ flexDirection: "row" }}>
                        <Text style={{fontSize:  28, fontWeight: "900", width: 56}}> {prop.date} </Text>
                        <View style={{width: 1, backgroundColor: "black"}}/>
                        <View>
                        {
                            prop.meals.map((item) =>{
                                var rating = item.rating;
                                if(item.key == 56 && this.props.rating){rating = this.props.rating}
                                return ( 
                                    <View key={item.key}>
                                        <View style={{flexDirection: "row"}}>
                                            <Image source={{uri: image}} style={{ width: 40, height: 40, borderRadius: 20, }} />
                                            <Text>{name}</Text>
                                        </View> 
                                        <Text> {item.name} </Text>
                                        <Card image={{uri: item.image}} containerStyle={{padding: 0, width:280}}>
                                        <StarRating
                                            disabled={true}
                                            maxStars={5}
                                            rating={rating}
                                            selectedStar={(rating) => console.log(rating)}
                                        />

                                        </Card>
                                    </View>
                                )
                            }
                            )
                        }
                        </View>
                    </View>)
                })
            }

                        </View>

            </ScrollView>
        );

    }


}
const mapStateToProps = (state) =>{ return {
                                            log: state.profile_reducer.profile,
                                            rating: state.rating_reducer.rating,
                                            user: state.login_reducer.user,
                                            profile: state.profile_reducer.profile
                                        }
                                           };
const mapDispatchToProps = (dispatch) =>{ return {
    onPress: ()=>{ dispatch(retrieveProfile())}

}};

export default connect(mapStateToProps, mapDispatchToProps)(GetCookingProfileScreen);