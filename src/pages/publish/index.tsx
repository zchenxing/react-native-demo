import React from 'react';
import { Image, StyleSheet, TextInput, View } from "react-native";
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AweButton from '../../components/awe-button';
import * as ImagePicker from 'react-native-image-picker';
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';
import { Button } from "react-native-elements";
import { isIOS } from "../../config/contant";

const Publish: React.FC = () => {

    const [imageUri, setImageUri] = React.useState<string[]>([])

    const openPhotoLibrary2 = () => {
        ImagePicker.launchImageLibrary(
            {
                mediaType: 'photo',
                // includeBase64: true,
            },
            (response: any) => {
                console.log(response);
                setImageUri(response.assets[0].uri)
            },
        );
    };

    const openCamera = async () => {
        try {
            const response: any = await MultipleImagePicker.openPicker({
                mediaType: 'image',
                isPreview: true,
                numberOfColumn: 3,
                maxSelectedAssets: 5,
                usedCameraButton: false,
                // singleSelectedMode: true,
            });

            const urls: string[] = response.map((item: any) => {
                if (isIOS) {
                    return item.path.replace('file://', '')
                } else {
                    return `file://${item.realPath}`
                }
            })

            setImageUri(urls)

        } catch (e: any) {
            console.log('error：', e.code, e.message);
        }

    };

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

            <Button
                title={'multiple-image-picker'}
                type={'solid'}
                onPress={openCamera}
            />

            {
                imageUri.length ? imageUri.map(img => {
                    return <Image key={img} source={{uri: img}} style={{width: 100, height: 100}} />
                }) : <View />
            }

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
