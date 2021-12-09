import React from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View,
    Keyboard,
    Modal,
} from 'react-native';
import {AweKeyboardProps} from './data';
import { screenHeight, screenWidth } from "../../config/contant";
import { useLanguage } from "../../language";
import {KeyboardAccessoryView} from 'react-native-keyboard-accessory';
import { themeColor } from "../../assets/styles";

const AweKeyboard: React.FC<AweKeyboardProps> = (props: AweKeyboardProps) => {
    const inputRef = React.useRef<any>(null);
    const [inputHeight, setInputHeight] = React.useState(80);
    const [textValue, setTextValue] = React.useState<string>('')

    React.useEffect(() => {
        if (props.visible) {

            setTimeout(() => {
                inputRef.current.focus();
            }, 10);

            setTimeout(() => {
                setTextValue(props.contentText)
            }, 140)
        }


        const keyboardDidHidden = Keyboard.addListener(
            'keyboardDidHide',
            onClose,
        );

        return () => {
            keyboardDidHidden.remove()
        }

    }, [props.visible]);

    const onChangeText = (text: string) => {
        props.onChangeText(text)
        setTextValue(text)
    }

    const onPressSend = () => {
        Keyboard.dismiss();
    };

    const onClose = () => {
        props.onClose();
        setTextValue('')
        Keyboard.dismiss();
    };


    return (
        <Modal transparent={true} visible={props.visible}>
            <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, .2)'}}>

                <TouchableHighlight onPress={onClose} underlayColor={'none'}>
                    <View style={{width: screenWidth, height: screenHeight}} />
                </TouchableHighlight>
            </View>


            <KeyboardAccessoryView
                alwaysVisible={true}
                avoidKeyboard={true}
                androidAdjustResize={true}>
                <View style={styles.textInputView}>
                    <TextInput
                        ref={inputRef}
                        value={textValue}
                        placeholder={useLanguage.say_something}
                        underlineColorAndroid="transparent"
                        clearButtonMode={'while-editing'}
                        style={[styles.textInput, {height: inputHeight}]}
                        multiline={true}
                        clearTextOnFocus={true}
                        onChangeText={onChangeText}
                        textAlignVertical={'top'}
                        // onContentSizeChange={event => {
                        //     setInputHeight(
                        //         Math.max(
                        //             40,
                        //             event.nativeEvent.contentSize.height,
                        //         ),
                        //     );
                        // }}
                    />
                    <TouchableHighlight onPress={onPressSend} underlayColor={'none'}>
                        <View style={[styles.textInputButton, {opacity: textValue ? 1 : 0.7}]}>
                            <Text style={{color: '#fff'}}>{useLanguage.comment}</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </KeyboardAccessoryView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    textInputView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        position: 'relative',
        backgroundColor: '#fff',
        padding: 10,
        paddingBottom: 20,
    },
    textInput: {
        flex: 1,
        borderRadius: 10,
        paddingLeft: 10,
        fontSize: 16,
        alignItems: 'center',
        backgroundColor: '#f8f8f8'
    },
    textInputButton: {
        height: 35,
        width: 'auto',
        backgroundColor: themeColor,
        justifyContent: 'center',
        marginLeft: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 20,
    },
});

export default AweKeyboard;
