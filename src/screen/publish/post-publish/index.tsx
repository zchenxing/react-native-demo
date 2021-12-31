import React from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    BackHandler,
    View,
    Alert,
    DeviceEventEmitter,
} from 'react-native';
import {themeColor, themeLightColor} from '../../../assets/styles';
import {NavigateProps, PhotoPictureProps} from '../../../interface';
import {EventEmitterName, isIOS, screenWidth} from '../../../config/contant';
import {DragSortableView} from 'react-native-drag-sort';
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';
import AwePicturePreview from '../../../components/awe-picture-preview';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {INTELINK_SCREEN_NAME} from '../../../routes/screen-name';
import AweSimpleNavigator from '../../../components/awe-simple-navigator';
import {observer} from 'mobx-react';
import {useSetState} from 'ahooks';
import {useLanguage} from '../../../language';
import server from '../../../network';
import apis from '../../../network/apis';
import Toast from 'react-native-simple-toast';
import Utils from '../../../help';
import IconFont from '../../../iconfont';
import axios from 'axios';
import dayjs from 'dayjs';
import myToken from '../../../network/token';
import {PostType} from '../../../enum';
import {usePublishDataStore} from '../../../store/provider';
import ImageResizer from 'react-native-image-resizer';
import WorkHelp from '../../../help/work';

const pictureWidth = (screenWidth - 20) / 3;

const __AddPictureName__ = 'addPicture';
const AddPicture = {
    fileName: __AddPictureName__,
    uri: require('../../../assets/images/icons/add_picture.png'),
};

interface IState {
    publishTag: any;
    selectedAssets: any[];
    startIndex: number;
    preview: boolean;
    inputHeight: number;
    postContent: string;
}

const PostPublishScreen: React.FC<NavigateProps> = (props: NavigateProps) => {
    const inputRef = React.useRef<any>(null);
    const contentText = React.useRef<any>('');
    const backListener = React.useRef<any>(null);

    const {onPublishData} = usePublishDataStore();

    const [state, setState] = useSetState<IState>({
        publishTag: {
            color: '#fff',
            icon: 'huati',
            name: useLanguage.choose_category_first,
        },
        selectedAssets: [],
        startIndex: 0,
        preview: false,
        inputHeight: 170,
        postContent: '',
    });

    React.useEffect(() => {
        setTimeout(() => {
            inputRef.current.focus();
        }, 500);

        // if (!isIOS) {
        //     backListener.current = BackHandler.addEventListener(
        //         'hardwareBackPress',
        //         () => goBack(),
        //     );
        // }
        //
        // const emitter = DeviceEventEmitter.addListener(
        //     EventEmitterName.ChooseCategory,
        //     setCategory,
        // );
        //
        // return () => {
        //     emitter.remove();
        //     if (!isIOS) {
        //         backListener.current.remove();
        //     }
        // };
    }, []);

    const setCategory = (param: any) => {
        setState({
            publishTag: param.tag,
        });
    };

    const onPreviewPicture = (data: any[], item: any, index: number) => {
        if (item.fileName === __AddPictureName__) {
            openCamera();
        } else {
            setState({
                startIndex: index,
                preview: true,
            });
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
                selectedAssets: state.selectedAssets,
                mediaType: 'image',
                isPreview: true,
                numberOfColumn: 3,
                maxSelectedAssets: 9,
                usedCameraButton: true,
                allowedLivePhotos: false,
            });

            const selectedAssets: PhotoPictureProps[] = response.map(
                (item: PhotoPictureProps) => {
                    const uri = isIOS
                        ? item.path.replace('file://', '')
                        : `file://${item.realPath}`;
                    return {
                        ...item,
                        uri,
                    };
                },
            );

            const newAssets = await WorkHelp.compressPicture(selectedAssets);
            console.log('压缩后的图片', newAssets);
            setState({selectedAssets: newAssets});

        } catch (e: any) {
            console.log('error：', e.code, e.message);
        }
    };

    const onDeletePicture = (item: PhotoPictureProps) => {
        const uris = state.selectedAssets.map(picture => picture.uri);
        const deleteIndex = uris.indexOf(item.uri);

        const selected = [...state.selectedAssets];
        selected.splice(deleteIndex, 1);
        setState({selectedAssets: selected});
    };

    /**
     *
     * @param isNavigationBack 是否用导航栏返回
     */
    const goBack = (isNavigationBack?: boolean) => {
        // if (contentText.current) {
        //     Alert.alert('', useLanguage.save_post_to_draft, [
        //         {
        //             text: useLanguage.dont_save,
        //             onPress: () => props.navigation.goBack(),
        //             style: 'cancel',
        //         },
        //         {text: useLanguage.save, onPress: savePostToDraft},
        //     ]);
        //     return true;
        // } else {
        //     if (isNavigationBack) {
        //         props.navigation.goBack();
        //     }
        //     return false;
        // }

        props.navigation.goBack();
        return false
    };

    /**
     * 将帖子保存至草稿
     */
    const savePostToDraft = () => {};

    const onPressSubmit = async () => {
        const data = {
            label: state.publishTag.name,
            type: PostType.Normal,
            content: Utils.removeSpaceAndEnter(state.postContent),
        };

        props.navigation.goBack();

        await onPublishData(data, [...state.selectedAssets]);

        // 刷新首页列表
        DeviceEventEmitter.emit(EventEmitterName.RefreshHome);
    };

    return (
        <>
            <AweSimpleNavigator
                centerTitle={useLanguage.create_post}
                goBack={() => goBack(true)}
                rightActionTitle={'Post'}
                rightActionEvent={onPressSubmit}
                rightActionEditable={!!state.postContent}
            />

            <TouchableHighlight
                underlayColor={themeLightColor}
                onPress={onPressChooseTag}>
                <View style={styles.labelHeader}>
                    <IconFont
                        style={{marginRight: 10}}
                        size={18}
                        name={state.publishTag.icon}
                        color={'#fff'}
                    />
                    <Text style={styles.labelText}>
                        {state.publishTag.name}
                    </Text>
                </View>
            </TouchableHighlight>

            <ScrollView style={styles.container} scrollEnabled={true}>
                <TextInput
                    ref={inputRef}
                    value={state.postContent}
                    onChangeText={text => {
                        contentText.current = text;
                        setState({postContent: text});
                    }}
                    placeholder={'Share your content'}
                    multiline={true}
                    keyboardType="default"
                    textAlignVertical={'top'}
                    style={{height: state.inputHeight}}
                    maxLength={300}
                    onContentSizeChange={event => {
                        setState({
                            inputHeight: Math.max(
                                170,
                                event.nativeEvent.contentSize.height,
                            ),
                        });
                    }}
                />

                <View style={styles.pictureList}>
                    <DragSortableView
                        isDragFreely={true}
                        dataSource={
                            state.selectedAssets.length === 9
                                ? state.selectedAssets
                                : [...state.selectedAssets, AddPicture]
                        }
                        parentWidth={screenWidth - 20}
                        childrenHeight={pictureWidth}
                        childrenWidth={pictureWidth}
                        onClickItem={onPreviewPicture}
                        onDataChange={result => {
                            result = result.filter(
                                item => item.fileName !== __AddPictureName__,
                            );
                            setState({selectedAssets: result});
                        }}
                        fixedItems={[state.selectedAssets.length]}
                        renderItem={item => RenderItem(item, onDeletePicture)}
                    />
                </View>
            </ScrollView>

            <AwePicturePreview
                visible={state.preview}
                onClick={() => setState({preview: false})}
                imageUrls={state.selectedAssets.map(item => item.uri)}
                startIndex={state.startIndex}
            />
        </>
    );
};

const RenderItem = (
    item: PhotoPictureProps,
    onDeleteItem: (item: PhotoPictureProps) => void,
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
    pictureList: {
        flex: 1,
        height: screenWidth + 30,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    pictureItem: {
        width: pictureWidth,
        height: pictureWidth + 1,
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
        padding: 6,
        borderRadius: 10,
    },
});

export default observer(PostPublishScreen);
