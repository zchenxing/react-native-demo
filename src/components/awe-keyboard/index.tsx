import React from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View,
    Keyboard,
    Modal,
    ActivityIndicator,
} from 'react-native';
import {AweKeyboardProps} from './type';
import { screenHeight, screenWidth } from "../../config/contant";
import {useLanguage} from '../../language';
import {KeyboardAccessoryView} from 'react-native-keyboard-accessory';
import {themeColor} from '../../assets/styles';
import {useNetInfo} from '@react-native-community/netinfo';
import Utils from '../../help';
import Toast from 'react-native-simple-toast';
import {useMyThrottle} from '../../help/throttle';

const AweKeyboard: React.FC<AweKeyboardProps> = (props: AweKeyboardProps) => {
    const netInfo = useNetInfo();
    const inputRef = React.useRef<any>(null);
    const [textValue, setTextValue] = React.useState<string>('');
    const [placeholder, setPlaceholder] = React.useState<string>('');
    const [showBase, setShowBase] = React.useState(true)
    const [loading, setLoading] = React.useState(false)
    const onPressSend = useMyThrottle(() => onSubmit(), 1000);

    React.useEffect(() => {
        console.log('创建 -----');
        if (props.visible) {
            setLoading(false)
            setShowBase(true)
            setTimeout(() => {
                inputRef.current && inputRef.current.focus();
            }, 70);
            setTimeout(() => {
                // setTextValue(props.contentText);
                if (props.replyUser) {
                    setPlaceholder(
                        `${useLanguage.reply_to}${props.replyUser.replyNickname}`,
                    );
                } else {
                    setPlaceholder(useLanguage.say_something);
                }
            }, 140);
        }

    }, [props.visible]);

    const onChangeText = (text: string) => {
        props.onChangeText(text);
        setTextValue(text);
    };

    const onSubmit = () => {
        if (netInfo.type !== 'none') {
            setLoading(true)
            props.onPressSend(Utils.removeSpaceAndEnter(textValue));

            setTimeout(() => {
                props.onClose()
            }, 200)
        } else {
            Toast.show(useLanguage.check_connection);
        }
    };

    const onClose = () => {
        setShowBase(false)
        Keyboard.dismiss()

        props.onClose()
        setLoading(false)
    };

    return (
        <Modal
            transparent={true}
            visible={props.visible}
            animationType={'fade'}>
            <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, .2)'}}>
                <TouchableHighlight onPress={onClose} underlayColor={'none'}>
                    <View style={{width: screenWidth, height: screenHeight}} />
                </TouchableHighlight>
            </View>

            <KeyboardAccessoryView
                animateOn={'all'}
                alwaysVisible={true}
                avoidKeyboard={true}
                androidAdjustResize={true}
                visibleOpacity={showBase ? 1 : .2}

            >
                <View style={[styles.textInputView]}>
                    <TextInput
                        ref={inputRef}
                        value={props.contentText}
                        placeholder={placeholder}
                        underlineColorAndroid="transparent"
                        clearButtonMode={'while-editing'}
                        style={[styles.textInput, {height: 80}]}
                        multiline={true}
                        clearTextOnFocus={true}
                        onChangeText={onChangeText}
                        textAlignVertical={'top'}
                    />

                    <TouchableHighlight
                        onPress={onPressSend}
                        disabled={!textValue}
                        underlayColor={'none'}>
                        <View
                            style={[
                                styles.textInputButton,
                                {opacity: textValue ? 1 : 0.7},
                            ]}>
                            {loading ? (
                                <ActivityIndicator
                                    style={{width: 60}}
                                    color={'#fff'}
                                />
                            ) : (
                                <Text style={{color: '#fff'}}>
                                    {useLanguage.comment}
                                </Text>
                            )}
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
        backgroundColor: '#f8f8f8',
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

export default React.memo(AweKeyboard);
