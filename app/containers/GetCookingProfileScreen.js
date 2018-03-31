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

export default class GetCookingProfileScreen extends React.Component {
    componentWillMount(){
        this.props.screenProps.onRefresh();
    }
    render() {
        // console.log(this.props.navigation);
        const log = this.props.screenProps.profile.log;
        const image = this.props.screenProps.profile.userimage;
        return (
            <ScrollView style={{ flex: 1, marginTop: 0, backgroundColor: "lightgray" }}
                scrollEnabled={false}
                refreshControl={<RefreshControl refreshing={this.props.screenProps.retrieving}
                    onRefresh={this.props.screenProps.onRefresh} />}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={{ alignItems: "center", margin: 10 }}>
                        <Image source={{ uri: image == "" ? "https://pc-tablet.com/wp-content/uploads/2016/12/New-Year-2017-images-videos.jpg" : image }} style={{ width: 120, height: 120, borderRadius: 75, }} />
                        <Text >user-id</Text>
                    </View>
                    <View>
                        <View style={{ flexDirection: "row", }}>
                            <View style={{ backgroundColor: "red", width: 100, height: 100 }}>
                                <Text>Recipes</Text>
                            </View>
                            <View style={{ backgroundColor: "yellow", width: 100, height: 100 }}>
                                <Text>Ratings</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", }}>
                            <View style={{ backgroundColor: "orange", width: 100, height: 100 }}>
                                <Text>Saved</Text>
                            </View>
                            <View style={{ backgroundColor: "green", width: 100, height: 100 }}>
                                <Text>Friends</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ borderBottomColor: "black", borderBottomWidth: 2, margin: 10, alignContent: "center" }} />

                {
                    log.map((prop) => {
                        return <View key={prop.mealid} style={{ width: 150, backgroundColor: "orange", flexDirection: "row" }}>
                            <Text> {prop.date} </Text>
                            <View>{
                                prop.meals.map(({ mealid, name }) => <Text key={mealid}>{name}</Text>)
                            }</View>
                        </View>
                    })
                }
            </ScrollView>
        );

    }


}
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