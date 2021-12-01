import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AweButton from '../../components/awe-button';
import * as ImagePicker from 'react-native-image-picker';
import * as CropImagePicker from 'react-native-image-crop-picker';
import { Button } from "react-native-elements";

const Publish: React.FC = () => {

    const openPhotoLibrary2 = () => {
        ImagePicker.launchImageLibrary(
            {
                mediaType: 'photo',
                includeBase64: true,
            },
            response => {
                console.log(response);
            },
        );
    };

    const openPhotoLibrary3 = () => {
        CropImagePicker.openPicker({
            mediaType: 'photo',
            multiple: true,
        }).then(image => {
            console.log(image);
        });
    };

    const openPhotoLibrary4 = () => {
    }

    return (
        <SafeAreaProvider style={styles.container}>
            <TextInput
                style={styles.textInput}
                numberOfLines={4}
                multiline={true}
                // 解决Android的input从中间行开始的问题
                textAlignVertical={'top'}
            />

            <AweButton onPress={openPhotoLibrary2}>image-picker</AweButton>
            <AweButton onPress={openPhotoLibrary3}>image-crop-picker</AweButton>

            <Button
                title={'react-native-customized-image-picker'}
                type={'solid'}
                onPress={openPhotoLibrary4}
            />
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    textInput: {
        height: 150,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
    }
});

export default Publish;
