import React from 'react';
import { FlatList, Text, View } from "react-native";
import { NavigateProps } from "../../interface";
import PersonalInfo from "./info";
import AweSimpleNavigator from "../../components/awe-simple-navigator";



const PersonalScreen: React.FC<NavigateProps> = (props: NavigateProps) => {


    const _onScroll = (event: any) => {
        console.log(event.nativeEvent.contentOffset.y);
    }

    return (
        <View style={{flex: 1, backgroundColor: 'green'}}>
            <AweSimpleNavigator
                centerTitle={''}
                goBack={() => console.log('123')}
            />

            <FlatList
                style={{backgroundColor: '#fff'}}
                data={Array.from(new Array(100).keys())}
                onScroll={_onScroll}
                renderItem={(row) => {
                    if (row.item === 0) {
                        return <PersonalInfo />
                    }
                    else {
                        return (
                            <View>
                                <Text>12312</Text>
                            </View>
                        )
                    }

                }}
            />
        </View>
    );
};



export default PersonalScreen;
