import React from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View,
    Keyboard
} from 'react-native';
import {KeyboardAccessoryView} from 'react-native-keyboard-accessory';

const AweKeyboard: React.FC = () => {
    const inputRef = React.useRef<any>(null)
    const [inputHeight, setInputHeight] = React.useState(40);


    const onPressSend = () => {
        Keyboard.dismiss()
    }

    return (
        <KeyboardAccessoryView
            alwaysVisible={true}
            avoidKeyboard={true}
            androidAdjustResize={true}>
            <View style={styles.textInputView}>
                <TextInput
                    ref={inputRef}
                    placeholder="Write your message"
                    underlineColorAndroid="transparent"
                    clearButtonMode={'while-editing'}
                    style={[styles.textInput, {height: inputHeight}]}
                    multiline={true}
                    onContentSizeChange={event => {
                        setInputHeight(
                            Math.max(
                                40,
                                event.nativeEvent.contentSize.height,
                            ),
                        );
                    }}
                />
                <TouchableHighlight onPress={onPressSend}>
                    <View style={styles.textInputButton}>
                        <Text>Send</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </KeyboardAccessoryView>
    );
};

const styles = StyleSheet.create({
    textInputView: {
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        position: 'relative',
        zIndex: 9999
    },
    textInput: {
        flex: 1,
        backgroundColor: 'yellow',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 10,
        borderColor: '#CCC',
        fontSize: 16,
        alignItems: 'center',
        // textAlignVertical: 'center',
    },
    textInputButton: {
        width: 'auto',
        height: 40,
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: 'green',
    },
});

export default AweKeyboard;
