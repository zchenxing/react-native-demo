import React from 'react';
import { Text, View } from "react-native";
import AweSimpleNavigator from '../../components/awe-simple-navigator';
import { NavigateProps } from "../../interface";


const Test1: React.FC<NavigateProps> = (props: NavigateProps) => {
    return (
        <View>
            <AweSimpleNavigator centerTitle={'Test1'} goBack={props.navigation.goBack} />


        </View>
    );
};

export default Test1;
