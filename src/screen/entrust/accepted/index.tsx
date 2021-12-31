import React from 'react';
import {ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {Header} from "react-native-elements";
import {screenWidth} from "../../../config/contant";
import ListItem from "./list-item";
import {useSetState} from "ahooks";
import {useLanguage} from "../../../language";
import {INTELINK_SCREEN_NAME} from "../../../routes/screen-name";
import AweSimpleNavigator from "../../../components/awe-simple-navigator";

const EntrustAcceptedScreen = (props: any) => {

    const [state, setState] = useSetState<any>({
        refreshing: false,
        moreLoading: false,
        hasMoreData: true,
    });

    React.useEffect(() => {
        setState({
            refreshing: false,
        });

    }, [state.refreshing]);

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

    const renderItem = ({ item }: any) => (
        <ListItem title={item.title} navigation={props.navigation}/>
    );

    /**
     * 下拉刷新数据
     */
    const onRefreshData = () => {
        setState({
            refreshing: true,
        });
    };

    /**
     * 加载更多数据
     */
    const onLoadMoreData = async (hasMoreData: boolean) => {
        // 当有更多数据时才自动加载更多数据，否则不做操作
        if (hasMoreData) {
            setState({
                moreLoading: true,
            });

            try {
                const data = []
                if (data.length) {
                    setState({
                        dataSource: [...state.dataSource, ...data],
                        moreLoading: false,
                        hasMoreData: true,
                    });
                } else {
                    setState({
                        moreLoading: false,
                        hasMoreData: false,
                    });
                }
            } catch (err) {}
        }
    };

    /**
     * 点击"没有更多数据"，手动加载更多数据
     */
    const handleNoMoreData = () => {
        setState({
            moreLoading: true,
            hasMoreData: true,
        });

        onLoadMoreData(true);
    };


    const loadMore = () => {
        return state.moreLoading ? (
            <View>
                <ActivityIndicator />
                <Text style={{textAlign: 'center'}}>
                    {useLanguage.load_more}
                </Text>
            </View>
        ) : (
            <>
                {!state.hasMoreData && (
                    <TouchableHighlight
                        style={{padding: 10}}
                        onPress={handleNoMoreData}>
                        <Text style={{textAlign: 'center'}}>没有更多数据</Text>
                    </TouchableHighlight>
                )}
            </>
        );
    };

    return <>
        <AweSimpleNavigator
            centerTitle={'Accepted'}
            goBack={props.navigation.goBack}
        />
        <View style={styles.dataCountBox}>
            <Text>3 people</Text>
            <Text>223,223,999 data</Text>
        </View>
        <FlatList
            data={DATA}
            removeClippedSubviews={true}
            renderItem={renderItem}
            style={{width: screenWidth}}
            keyExtractor={item => item.id}
            ListFooterComponent={() => loadMore()}
            onEndReached={() => onLoadMoreData(state.hasMoreData)}
            refreshControl={
                <RefreshControl
                    refreshing={state.refreshing}
                    onRefresh={onRefreshData}
                />
            }
        />
    </>
}

const styles = StyleSheet.create({
    pageTitle:{
        color:'#333333',
        fontSize:17,
        marginTop:4
    },
    dataCountBox:{
        height:42,
        backgroundColor:'#fff',
        paddingLeft:16,
        paddingRight:16,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        marginTop:4.5,
        marginBottom:5
    }
})

export default EntrustAcceptedScreen;