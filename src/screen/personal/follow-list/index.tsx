import React from 'react';
import { FlatList, StatusBar, View } from "react-native";
import ScreenBase from '../../components/screen-base';
import AweSimpleNavigator from '../../../components/awe-simple-navigator';
import { NavigateProps } from "../../../interface";
import UserItem from './item';


const FollowListScreen: React.FC<NavigateProps> = (props: NavigateProps) => {

    const { userId, followType } = props.route.params

    React.useEffect(() => {

        getFollowData()
    }, [])


    const getFollowData = async () => {
        try {

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <AweSimpleNavigator
                centerTitle={'Follow'}
                goBack={props.navigation.goBack}
            />

            <ScreenBase>
                <StatusBar translucent={true} />
                <View style={{flex: 1}}>
                    <FlatList
                        data={Array.from(new Array(100).keys())}
                        renderItem={() => <UserItem />}
                    />
                </View>
            </ScreenBase>
        </>
    );
};



export default FollowListScreen;
