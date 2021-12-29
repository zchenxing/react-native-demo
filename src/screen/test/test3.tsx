import React, {useState} from 'react';
import {Text, View, StyleSheet, Pressable, Alert, TouchableHighlight} from "react-native";
import AweSimpleNavigator from '../../components/awe-simple-navigator';
import { NavigateProps } from "../../interface";
// import SwipeableFlatList from 'react-native-swipeable-list';
import {useSetState} from "ahooks";
const darkColors = {
    background: '#121212',
    backgroundColor: '#121212',
    primary: '#BB86FC',
    primary2: '#3700b3',
    secondary: '#03DAC6',
    onBackground: '#FFFFFF',
    error: '#CF6679',
};

const colorEmphasis = {
    high: 0.87,
    medium: 0.6,
    disabled: 0.38,
};

function renderItemSeparator() {
    return <View style={styles.itemSeparator} />;
}

const Item = ({item,goBack}: any) => {
    return (
        <>
            <TouchableHighlight
                onPress={goBack}>
                <View style={styles.item}>
                    <View style={styles.avatar} />
                    <View style={styles.messageContainer}>
                        <Text style={styles.name} numberOfLines={1}>
                            {item.name}
                        </Text>
                        <Text style={styles.subject} numberOfLines={1}>
                            Subject: {item.subject}
                        </Text>
                        <Text style={styles.text} numberOfLines={2}>
                            {item.text}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>

        </>
    );
};

const Test3: React.FC<NavigateProps> = (props: NavigateProps) => {
    const [state, setState] = useSetState<any>({
        data:[
            {name:'111',text:'text',id:'id1'},
            {name:'111',text:'text',id:'id2'},
        ]
    });

    const deleteItem = itemId => {
        // ! Please don't do something like this in production. Use proper state management.
        const newState = [...state.data];
        const filteredState = newState.filter(item => item.id !== itemId);
        return setState({
            data: filteredState,
        })
    };

    const archiveItem = itemId => {
        Alert.alert(
            'DISHONESTY ALERT',
            "Not gonna Archive it. We're actually are gonna just delete it.",
            [
                {
                    text: 'Just delete it?',
                    onPress: () => deleteItem(itemId),
                    style: 'destructive',
                },
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
            ],
        );
    };

    const QuickActions = (index, qaItem) => {
        return (
            <View style={styles.qaContainer}>
                <View style={[styles.button, styles.button1]}>
                    <Pressable onPress={() => archiveItem(qaItem.id)}>
                        <Text style={[styles.buttonText, styles.button1Text]}>Archive</Text>
                    </Pressable>
                </View>
                {/*<View style={[styles.button, styles.button2]}>*/}
                {/*    <Pressable onPress={() => snoozeItem(qaItem.id)}>*/}
                {/*        <Text style={[styles.buttonText, styles.button2Text]}>Snooze</Text>*/}
                {/*    </Pressable>*/}
                {/*</View>*/}
                <View style={[styles.button, styles.button3]}>
                    <Pressable onPress={() => deleteItem(qaItem.id)}>
                        <Text style={[styles.buttonText, styles.button3Text]}>Delete</Text>
                    </Pressable>
                </View>
            </View>
        );
    };




    const extractItemKey = item => {
        return item.id;
    };
    const goBack = () => {
        props.navigation.goBack()
    }
    return (
        <View style={{flex: 1}}>
            {/*<SwipeableFlatList*/}
            {/*    keyExtractor={extractItemKey}*/}
            {/*    data={state.data}*/}
            {/*    renderItem={({item}) => (*/}
            {/*        <Item item={item} deleteItem={() => deleteItem} goBack={goBack} />*/}
            {/*    )}*/}
            {/*    maxSwipeDistance={240}*/}
            {/*    renderQuickActions={({index, item}) => QuickActions(index, item)}*/}
            {/*    contentContainerStyle={styles.contentContainerStyle}*/}
            {/*    shouldBounceOnMount={true}*/}
            {/*    ItemSeparatorComponent={renderItemSeparator}*/}
            {/*/>*/}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#121212',
    },
    headerContainer: {
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
    },
    headerText: {
        fontSize: 30,
        fontWeight: '800',
        color: darkColors.onBackground,
        opacity: colorEmphasis.high,
    },
    item: {
        backgroundColor: '#121212',
        height: 80,
        flexDirection: 'row',
        padding: 10,
    },
    messageContainer: {
        backgroundColor: darkColors.backgroundColor,
        maxWidth: 300,
    },
    name: {
        fontSize: 16,
        color: darkColors.primary,
        opacity: colorEmphasis.high,
        fontWeight: '800',
    },
    subject: {
        fontSize: 14,
        color: darkColors.onBackground,
        opacity: colorEmphasis.high,
        fontWeight: 'bold',
        textShadowColor: darkColors.secondary,
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 4,
    },
    text: {
        fontSize: 10,
        color: darkColors.onBackground,
        opacity: colorEmphasis.medium,
    },
    avatar: {
        width: 40,
        height: 40,
        backgroundColor: darkColors.onBackground,
        opacity: colorEmphasis.high,
        borderColor: darkColors.primary,
        borderWidth: 1,
        borderRadius: 20,
        marginRight: 7,
        alignSelf: 'center',
        shadowColor: darkColors.secondary,
        shadowOffset: {width: 1, height: 1},
        shadowRadius: 2,
        shadowOpacity: colorEmphasis.high,
    },
    itemSeparator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: darkColors.onBackground,
        opacity: colorEmphasis.medium,
    },
    qaContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    button: {
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontWeight: 'bold',
        opacity: colorEmphasis.high,
    },
    button1Text: {
        color: darkColors.primary,
    },
    button2Text: {
        color: darkColors.secondary,
    },
    button3Text: {
        color: darkColors.error,
    },
    contentContainerStyle: {
        flexGrow: 1,
        backgroundColor: darkColors.backgroundColor,
    },
});

export default Test3;
