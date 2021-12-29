import React from 'react';
import {
    Text,
    TouchableHighlight,
    View,
    Alert,
    FlatList,
    RefreshControl,
    DeviceEventEmitter,
    StyleSheet
} from "react-native";
import {Header} from 'react-native-elements';
import { NavigateProps } from "../../../../interface";
// import Icon from "react-native-vector-icons/FontAwesome";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Test3 from "../../../test/test3";
import Icon from "react-native-vector-icons/FontAwesome";
import {useSetState} from "ahooks";
import {EventEmitterName, screenWidth} from "../../../../config/contant";
import Test4 from "../../../test/test4";
import EntrustAll from "./all";
const Tab = createMaterialTopTabNavigator();



const EntrustListScreen: React.FC<NavigateProps> = (props: NavigateProps) => {

    const [state, setState] = useSetState<any>({
        entrustType: 'me',
        loading: false,
    });

    const changeEntrustType = (type:string) => {
        setState({entrustType:type})
        props.navigation.navigate('All')
    }

    const setLoading = () => {
        setState({loading:true})
    }

    console.log(state.entrustType)

    return (
        <View style={{flex: 1}}>



            <Header
                backgroundColor='#AAE3E9'
                // leftComponent={
                //     <TouchableHighlight
                //         underlayColor={'none'}
                //         onPress={props.navigation.goBack}>
                //         <View style={{width: 100, paddingLeft: 10}}>
                //             <Icon
                //                 name={'angle-left'}
                //                 style={{fontSize: 30, color: '#aaa'}}
                //             />
                //         </View>
                //     </TouchableHighlight>
                // }
                centerComponent={
                    <View style={{flexDirection:'row',justifyContent:"space-between",alignItems:"center",}}>
                        <TouchableHighlight
                            underlayColor={'none'}
                            onPress={() => {changeEntrustType('me')}}
                        >
                            <View style={{...styles.entrustTypeBtnLeft,borderColor: state.entrustType === 'me' ? '#71C3CF' : 'white',borderWidth:2,marginRight:5}}>
                                <Text style={{color: state.entrustType === 'me' ? '#5ABFCB' : '#B3B3B3',fontSize:15}}>quest for me</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor={'none'}
                            onPress={() => {changeEntrustType('accepted')}}
                        >
                            <View style={{...styles.entrustTypeBtnRight,borderColor:state.entrustType === 'accepted' ? '#71C3CF' : 'white',borderWidth:2,marginLeft:5}}>
                                <Text style={{color: state.entrustType === 'accepted' ? '#5ABFCB' : '#B3B3B3',fontSize:15}}>quest from me</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                }
            >
            </Header>
            {
                state.entrustType === 'me'
                ? <Tab.Navigator tabBarPosition="top" screenOptions={{tabBarActiveTintColor:'#69BECB',tabBarInactiveTintColor:'black',tabBarIndicatorStyle: {backgroundColor:'#B9EDF4',height:2},tabBarLabelStyle:{textTransform:"capitalize"}}}>
                        <Tab.Screen name="All" component={EntrustAll}/>
                        <Tab.Screen name="Pending" component={Test3}  />
                        <Tab.Screen name="Ongoing" component={Test3} />
                        <Tab.Screen name="Ended" component={Test4} />
                    </Tab.Navigator>
                    : <Tab.Navigator tabBarPosition="top" screenOptions={{tabBarActiveTintColor:'#69BECB',tabBarInactiveTintColor:'black',tabBarIndicatorStyle: {backgroundColor:'#B9EDF4',height:2},tabBarLabelStyle:{textTransform:"capitalize"}}}>
                        <Tab.Screen name="All" component={EntrustAll}/>
                        <Tab.Screen name="Pending" component={Test3}  />
                    </Tab.Navigator>
            }



        </View>

    );
};

const styles = StyleSheet.create({
    entrustTypeBtnLeft:{
        backgroundColor:'white',
        paddingLeft:8.5,
        paddingRight:8.5,
        paddingTop:16,
        paddingBottom:16,
        borderRadius:20,
    },
    entrustTypeBtnRight:{
        backgroundColor:'white',
        paddingLeft:5.5,
        paddingRight:5.5,
        paddingTop:16,
        paddingBottom:16,
        borderRadius:20,
    }
});

export default EntrustListScreen;
