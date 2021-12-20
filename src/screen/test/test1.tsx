import 'react-native-reanimated'
import React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableHighlight, ScrollView } from "react-native";
import AweSimpleNavigator from '../../components/awe-simple-navigator';
import { NavigateProps } from "../../interface";
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import { Button } from "react-native-elements";
import AweKeyboard from "../../components/awe-keyboard";


const Test1: React.FC<NavigateProps> = (props: NavigateProps) => {

    const bottomSheetRef = React.useRef<any>(null);

    const [sheetVisible, setSheetVisible] = React.useState(false)

    const [keyboardVisible, setKeyboardVisible] = React.useState(false)
    const [contentText, setContentText] = React.useState('')


    // variables
    const snapPoints = React.useMemo(() => [1, 500], []);

    // callbacks
    const handleSheetChanges = React.useCallback((index: number) => {
        console.log('handleSheetChanges', index);
        if (index === 0) {
            onClose()
        }
    }, []);


    const onClose = () => {
        bottomSheetRef.current.snapToPosition(1)
        setTimeout(() => {
            setSheetVisible(false)
        }, 100)
    }

    return (
        <View style={{flex: 1}}>
            <AweSimpleNavigator centerTitle={'Test1'} goBack={props.navigation.goBack} />

            <Button title={'打开'} onPress={() => {
                setSheetVisible(true)
            }} />

            <Button title={'关闭'} onPress={() => {}} />



            <AweKeyboard
                visible={keyboardVisible}
                contentText={contentText}
                onChangeText={txt => setContentText(txt)}
                onClose={() => setKeyboardVisible(false)} />


            {
                sheetVisible &&
                <View style={styles.cover}>

                    <TouchableHighlight
                        underlayColor={'none'}
                        style={styles.cover}
                        onPress={onClose}>
                        <View />
                    </TouchableHighlight>

                    <BottomSheet
                        ref={bottomSheetRef}
                        index={1}
                        snapPoints={snapPoints}
                        onChange={handleSheetChanges}
                    >
                        <View style={{flex: 1}}>
                            <Button title={'下一页'} onPress={() => props.navigation.push('Test2')} />

                            <BottomSheetFlatList
                                data={Array.from(new Array(100).keys())}
                                keyExtractor={(i) => `${i}`}
                                renderItem={() => <View><Text>qwd</Text></View>}

                            />


                        </View>
                    </BottomSheet>
                </View>


            }

        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
    cover: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(1, 1, 1, .3)'
    }
});

export default Test1;
