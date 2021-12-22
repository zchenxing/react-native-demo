import React from 'react';
import {Text, TouchableHighlight, View,Alert,FlatList} from "react-native";
import {Header} from 'react-native-elements';
import { NavigateProps } from "../../interface";
// import Icon from "react-native-vector-icons/FontAwesome";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Test3 from "../test/test3";
import Icon from "react-native-vector-icons/FontAwesome";
const Tab = createMaterialTopTabNavigator();


function ProfileScreen() {
    // This hook returns `true` if the screen is focused, `false` otherwise
    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'First Item',
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Second Item',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Third Item',
        },
    ];

    const Item = ({ title }: any) => {
        return (
            <View >
                <Text >{title}</Text>
            </View>
        );
    }
    const renderItem = ({ item }: any) => (
        <Item title={item.title} />
    );
    return (
        <FlatList
            data={DATA}
            removeClippedSubviews={true}
            renderItem={renderItem}
            keyExtractor={item => item.id}
        />
    );
}


const Entrust: React.FC<NavigateProps> = (props: NavigateProps) => {



    return (
        <View style={{flex: 1}}>



            <Header
                backgroundColor="#fff"
                leftComponent={
                    <TouchableHighlight
                        underlayColor={'none'}
                        onPress={props.navigation.goBack}>
                        <View style={{width: 100, paddingLeft: 10}}>
                            <Icon
                                name={'angle-left'}
                                style={{fontSize: 30, color: '#aaa'}}
                            />
                        </View>
                    </TouchableHighlight>
                }
                centerComponent={
                    <View style={{flexDirection:'row'}}>
                        <TouchableHighlight
                            underlayColor={'none'}
                            onPress={() => {Alert.alert(
                                "Alert Title",
                                "My Alert Msg",
                                [
                                    {
                                        text: "Cancel",
                                        onPress: () => console.log("Cancel Pressed"),
                                        style: "cancel"
                                    },
                                    { text: "OK", onPress: () => console.log("OK Pressed") }
                                ]
                            )}}
                        >
                            <View style={{paddingRight: 20}}>
                                <Text>我的委托</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor={'none'}
                            onPress={() => {Alert.alert(
                                "Alert Title",
                                "My Alert Msg",
                                [
                                    {
                                        text: "Cancel",
                                        onPress: () => console.log("Cancel Pressed"),
                                        style: "cancel"
                                    },
                                    { text: "OK", onPress: () => console.log("OK Pressed") }
                                ]
                            )}}
                        >
                            <View>
                                <Text>接受的委托</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                }
            >
            </Header>
            <Tab.Navigator tabBarPosition="top" >
                <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Home' }}/>
                <Tab.Screen name="Test3" component={Test3} />
                <Tab.Screen name="Test4" component={Test3} />
            </Tab.Navigator>

        </View>

    );
};

export default Entrust;
