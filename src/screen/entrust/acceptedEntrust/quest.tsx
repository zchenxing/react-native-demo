import React from 'react';
import {FlatList, RefreshControl} from "react-native";
import { NavigateProps } from "../../../interface";
import {useSetState} from "ahooks";
import {screenWidth} from "../../../config/contant";
import AcceptListItem from "../acceptListItem";

const AcceptEntrustQuest: React.FC<NavigateProps> = (props: NavigateProps) => {
    const [state, setState] = useSetState<any>({
        refreshing: false,
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
        <AcceptListItem title={item.title} navigation={props.navigation}/>
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
            style={{width: screenWidth}}
            keyExtractor={item => item.id}
            refreshControl={
                <RefreshControl
                    refreshing={state.refreshing}
                    onRefresh={onRefreshData}
                />
            }
        />
    );
};



export default AcceptEntrustQuest;
