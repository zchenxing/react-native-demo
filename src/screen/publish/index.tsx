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
    Alert
} from 'react-native';
import {themeColor, themeLightColor} from '../../assets/styles';
import {NavigateProps, PictureProps} from '../../interface';
import { isIOS, screenWidth } from "../../config/contant";
import {DragSortableView} from 'react-native-drag-sort';
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';
import AwePicturePreview from '../../components/awe-picture-preview';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {INTELINK_SCREEN_NAME} from '../../routes/screen-name';
import AweSimpleNavigator from '../../components/awe-simple-navigator';
import {observer} from 'mobx-react';
import {useSmartDataStore} from '../../mobx/provider';
import {useSetState} from 'ahooks'

const pictureWidth = (screenWidth - 20) / 3;

const __AddPictureName__ = 'addPicture';
const AddPicture = {
    fileName: __AddPictureName__,
    uri: require('../../assets/images/icons/add_picture.png'),
};

interface IState {
    selectedAssets: any[]
    startIndex: number
    preview: boolean,
    inputHeight: number,
    postContent: string
}

const PublishScreen: React.FC<NavigateProps> = (props: NavigateProps) => {

    const {publishTagId} = useSmartDataStore();
    const inputRef = React.useRef<any>(null)

    const [state, setState] = useSetState<IState>({
        selectedAssets: [],
        startIndex: 0,
        preview: false,
        inputHeight: 170,
        postContent: ''
    })

    React.useEffect(() => {

        setTimeout(() => {
            inputRef.current.focus()
        }, 500)

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            goBack)

        return () => backHandler.remove()

    }, [])

    const onPreviewPicture = (data: any[], item: any, index: number) => {
        if (item.fileName === __AddPictureName__) {
            openCamera();
        } else {
            setState({
                startIndex: index,
                preview: true
            })
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
                usedCameraButton: false,
                allowedLivePhotos: false,
            });

            const selectedAssets = response.map((item: PictureProps) => {
                const uri = isIOS
                    ? item.path.replace('file://', '')
                    : `file://${item.realPath}`;
                return {
                    ...item,
                    uri,
                };
            });

            console.log(selectedAssets);

            setState({ selectedAssets })
        } catch (e: any) {
            console.log('error：', e.code, e.message);
        }
    };

    const onDeletePicture = (item: PictureProps) => {
        const uris = state.selectedAssets.map(picture => picture.uri);
        const deleteIndex = uris.indexOf(item.uri);

        const selected = [...state.selectedAssets];
        selected.splice(deleteIndex, 1);
        setState({ selectedAssets: selected })
    };


    const goBack = () => {

        if (state.postContent) {
            Alert.alert('', '是否保存草稿?', [
                {
                    text: '不保存',
                    onPress: () => props.navigation.goBack(),
                    style: 'cancel',
                },
                { text: "保存", onPress: () => null,}
            ]);
            return true
        }
        else {
            props.navigation.goBack()
            return true
        }
    }


    return (
        <>
            <AweSimpleNavigator
                centerTitle={'Publish'}
                goBack={goBack}
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
                    ref={inputRef}
                    value={state.postContent}
                    onChangeText={text => setState({postContent: text})}
                    placeholder={'Share your content'}
                    multiline={true}
                    keyboardType="default"
                    textAlignVertical={'top'}
                    style={{height: state.inputHeight}}
                    maxLength={300}
                    onContentSizeChange={event => {
                        setState({
                            inputHeight:
                                Math.max(
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
                        onDataChange={result => setState({selectedAssets: result})}
                        fixedItems={[state.selectedAssets.length]}
                        renderItem={item =>  RenderItem(item, onDeletePicture)}
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

export default observer(PublishScreen);
