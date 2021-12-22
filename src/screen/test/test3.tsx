import React from 'react';
import { Text, View } from "react-native";
import AweSimpleNavigator from '../../components/awe-simple-navigator';
import { NavigateProps } from "../../interface";

const Test3: React.FC<NavigateProps> = (props: NavigateProps) => {
    return (
        <View style={{flex: 1}}>

            {/*<AweSimpleNavigator centerTitle={'Test2'} goBack={props.navigation.goBack} />*/}

            <Text>Test2</Text>
        </View>
    );
};

export default Test3;
