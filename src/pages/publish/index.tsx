import React from 'react';
import {Image, View, StyleSheet, TextInput} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AweButton from '../../components/awe-button';
import SyanImagePicker from 'react-native-syan-image-picker';

const Publish: React.FC = () => {
    const [pictures, setPictures] = React.useState<any[]>([]);


    const openPhotoLibrary = () => {
        // promise-then
        SyanImagePicker.asyncShowImagePicker({
            compress: true,
            minimumCompressSize: 1024
            // enableBase64: true
        })
            .then(photos => {
                // 选择成功
                console.log(photos);
                setPictures(photos)
            })
            .catch(err => {
                console.log(err);
                // 取消选择，err.message为"取消"
            })

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

            <AweButton onPress={openPhotoLibrary}>打开相册</AweButton>

            <View style={styles.pictureView}>
                {pictures.map(picture => (
                    <Image
                        key={picture.uri}
                        style={{width: 100, height: 100}}
                        source={{uri: picture.uri}}
                    />
                ))}
            </View>
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
    },

    pictureView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});

export default Publish;
