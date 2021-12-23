import React from 'react';
import {Text, TouchableHighlight, View, Alert, FlatList, RefreshControl, DeviceEventEmitter} from "react-native";
import {Header} from 'react-native-elements';
import { NavigateProps } from "../../interface";
// import Icon from "react-native-vector-icons/FontAwesome";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Test3 from "../test/test3";
import Icon from "react-native-vector-icons/FontAwesome";
import {useSetState} from "ahooks";
import {EventEmitterName} from "../../config/contant";
import Test4 from "../test/test4";
const Tab = createMaterialTopTabNavigator();


function ProfileScreen() {
    const [state, setState] = useSetState<any>({
        refreshing: false,
    });

    React.useEffect(() => {
        setState({
            refreshing: false,

        });

    }, [state.refreshing]);

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
    /**
     * 下拉刷新数据
     */
    const onRefreshData = () => {
        setState({
            refreshing: true,
        });
    };
    return (
        <FlatList
            data={DATA}
            removeClippedSubviews={true}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            refreshControl={
                <RefreshControl
                    refreshing={state.refreshing}
                    onRefresh={onRefreshData}
                />
            }
        />
    );
}


const Entrust: React.FC<NavigateProps> = (props: NavigateProps) => {

    const [state, setState] = useSetState<any>({
        entrustType: 'me',
        loading: false,
    });

    const changeEntrustType = (type:string) => {
        setState({entrustType:type})
    }

    const setLoading = () => {
        setState({loading:true})
    }

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
                            onPress={() => {changeEntrustType('me')}}
                        >
                            <View style={{paddingRight: 20,}}>
                                <Text style={{color: state.entrustType === 'me' ? 'green' : 'black'}}>我的委托</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor={'none'}
                            onPress={() => {changeEntrustType('accepted')}}
                        >
                            <View>
                                <Text style={{color: state.entrustType === 'accepted' ? 'green' : 'black'}}>接受的委托</Text>
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
                <Tab.Screen name="Test5" component={Test4} />
            </Tab.Navigator>


        </View>

    );
};

export default Entrust;
