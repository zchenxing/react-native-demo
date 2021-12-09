import React from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View,
} from 'react-native';
import {themeColor, themeLightColor} from '../../assets/styles';
import {NavigateProps, PictureProps} from '../../interface';
import {isIOS, screenWidth} from '../../config/contant';
import {DragSortableView} from 'react-native-drag-sort';
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';
import AwePicturePreview from '../../components/awe-picture-preview';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {INTELINK_SCREEN_NAME} from '../../routes/screen-name';
import AweSimpleNavigator from '../../components/awe-simple-navigator';
import {observer} from 'mobx-react';
import {useSmartDataStore} from '../../mobx/provider';

const pictureWidth = (screenWidth - 20) / 3;

const __AddPictureName__ = 'addPicture';
const AddPicture = {
    fileName: __AddPictureName__,
    uri: require('../../assets/images/icons/add_picture.png'),
};

const PublishScreen: React.FC<NavigateProps> = (props: NavigateProps) => {
    const {publishTagId} = useSmartDataStore();
    const [selectedAssets, setSelectedAssets] = React.useState<any[]>([]);
    const [startIndex, setStartIndex] = React.useState(0);
    const [preview, setPreview] = React.useState(false);

    const onPreviewPicture = (data: any[], item: any, index: number) => {
        if (item.fileName === __AddPictureName__) {
            openCamera();
        } else {
            setStartIndex(index);
            setPreview(true);
        }
    };

    const onPressChooseTag = () => {
        props.navigation.push(INTELINK_SCREEN_NAME.SCREEN_PUBLISH_TAG, {
            tag: '',
        });
    };

    const openCamera = async () => {
        try {
            const response: any[] = await MultipleImagePicker.openPicker({
                selectedAssets: selectedAssets,
                mediaType: 'image',
                isPreview: true,
                numberOfColumn: 3,
                maxSelectedAssets: 9,
                usedCameraButton: false,
                allowedLivePhotos: false,
            });

            const select = response.map((item: PictureProps) => {
                const uri = isIOS
                    ? item.path.replace('file://', '')
                    : `file://${item.realPath}`;
                return {
                    ...item,
                    uri,
                };
            });

            setSelectedAssets(select);
        } catch (e: any) {
            console.log('error：', e.code, e.message);
        }
    };

    const onDeletePicture = (item: PictureProps) => {
        const uris = selectedAssets.map(picture => picture.uri);
        const deleteIndex = uris.indexOf(item.uri);

        const selected = [...selectedAssets];
        selected.splice(deleteIndex, 1);
        setSelectedAssets(selected);
    };

    return (
        <>
            <AweSimpleNavigator
                centerTitle={'Publish'}
                goBack={props.navigation.goBack}
                rightActionTitle={'Post'}
                rightActionEvent={() => console.log('发布')}
            />

            <TouchableHighlight
                underlayColor={themeLightColor}
                onPress={onPressChooseTag}>
                <View style={styles.labelHeader}>
                    <Text style={styles.labelText}>
                        {publishTagId ? publishTagId : 'Choose category'}
                    </Text>
                </View>
            </TouchableHighlight>

            <ScrollView style={styles.container} scrollEnabled={true}>
                <TextInput
                    placeholder={'Share your content'}
                    multiline={true}
                    keyboardType="default"
                    textAlignVertical={'top'}
                    style={styles.input}
                />

                <View style={styles.pictureList}>
                    <DragSortableView
                        isDragFreely={true}
                        dataSource={
                            selectedAssets.length === 9
                                ? selectedAssets
                                : [...selectedAssets, AddPicture]
                        }
                        parentWidth={screenWidth - 20}
                        childrenHeight={pictureWidth}
                        childrenWidth={pictureWidth}
                        onClickItem={onPreviewPicture}
                        onDataChange={result => setSelectedAssets(result)}
                        renderItem={item => RenderItem(item, onDeletePicture)}
                    />

                    {/*<TouchableHighlight*/}
                    {/*    onPress={openCamera}*/}
                    {/*    underlayColor={'#f8f8f8'}>*/}
                    {/*    <View style={styles.add} />*/}
                    {/*</TouchableHighlight>*/}
                </View>
            </ScrollView>

            <AwePicturePreview
                visible={preview}
                onClick={() => setPreview(false)}
                imageUrls={selectedAssets.map(item => item.uri)}
                startIndex={startIndex}
            />
        </>
    );
};

const RenderItem = (
    item: PictureProps,
    onDeleteItem: (item: PictureProps) => void,
) => {
    return (
        <View style={styles.pictureItem}>
            <Image
                source={
                    item.fileName === __AddPictureName__
                        ? item.uri
                        : {uri: item.uri}
                }
                style={styles.picture}
            />
            {item.fileName !== __AddPictureName__ && (
                <TouchableHighlight
                    style={styles.deleteButton}
                    underlayColor={'none'}
                    onPress={() => onDeleteItem(item)}>
                    <View style={styles.deleteView}>
                        <Icon name={'close'} style={{color: '#fff'}} />
                    </View>
                </TouchableHighlight>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    labelHeader: {
        height: 44,
        backgroundColor: themeColor,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    labelText: {
        color: '#fff',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    input: {
        height: 170,
    },
    pictureList: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    pictureItem: {
        width: pictureWidth,
        height: pictureWidth,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 5,
        position: 'relative',
    },
    picture: {
        borderRadius: 8,
        width: '100%',
        height: '100%',
        borderWidth: 1,
        borderColor: '#f1f1f1',
    },
    add: {
        width: pictureWidth,
        height: pictureWidth,
        borderRadius: 8,
        borderWidth: 1,
        borderStyle: 'dashed',
    },
    deleteButton: {
        position: 'absolute',
        top: 5,
        right: 5,
        padding: 5,
    },
    deleteView: {
        backgroundColor: 'rgba(0, 0, 0, .4)',
        padding: 2,
        borderRadius: 10,
    },
});

export default observer(PublishScreen);
