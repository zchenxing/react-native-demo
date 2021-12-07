import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import ScreenBase from '../components/screen-base';
import AweSearchNavigator from '../../components/awe-search-header';
import {NavigateProps} from '../../interface';
import { FlatList, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { globalStyles, themeColor } from "../../assets/styles";
import { useLanguage } from "../../language";
import { ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";

const SearchScreen: React.FC<NavigateProps> = (props: NavigateProps) => {

    React.useEffect(() => {

    }, []);

    return (
        <SafeAreaProvider style={[globalStyles.container]}>
            <AweSearchNavigator
                onRightPress={props.navigation.goBack}
            />

            <ScreenBase initLoading={true}>
                <View style={{flex: 1}}>

                    <View style={styles.header}>
                        <Text style={{color: '#ccc', fontSize: 12}}>
                            {useLanguage.history}
                        </Text>

                        <TouchableHighlight onPress={() => console.log('clear')}>
                            <Text style={{color: themeColor}}>{useLanguage.clear}</Text>
                        </TouchableHighlight>

                    </View>

                    <View style={{flex: 1}}>
                        {
                            [1,2,3,5,6,7,8,9,11,12,13,14,15].map((value) => (
                                <ListItem key={value}>
                                    <Icon name={'history'} />
                                    <ListItem.Content>
                                        <ListItem.Title>qwdqwdqwd</ListItem.Title>
                                    </ListItem.Content>
                                </ListItem>
                            ))
                        }
                    </View>

                </View>
            </ScreenBase>
        </SafeAreaProvider>
    );
};


const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        paddingTop: 20,
    }
})

export default SearchScreen;
