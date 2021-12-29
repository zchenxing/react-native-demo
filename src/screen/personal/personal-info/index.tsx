import React from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import AweSimpleNavigator from '../../../components/awe-simple-navigator';
import {NavigateProps} from '../../../interface';
import MultipleImagePicker, {
    Results,
} from '@baronha/react-native-multiple-image-picker';
import {isIOS} from '../../../config/contant';
import {useSetState} from 'ahooks';
import {localImages} from '../../../assets/images';
import IconFont from '../../../iconfont';
import {useLanguage} from '../../../language';
import {INTELINK_SCREEN_NAME} from '../../../routes/screen-name';
import {EditInfoType} from '../../../enum';
import {useSelfDataStore} from '../../../store/provider';
import {observer} from 'mobx-react';
import dayjs from 'dayjs';
import server from '../../../network';
import apis from '../../../network/apis';

interface IState {
    loading: boolean
    localAvatar: Results | null;
    localAvatarPath: string;
}

const PersonalPreviewScreen: React.FC<NavigateProps> = (
    props: NavigateProps,
) => {
    const {selfInfoData} = useSelfDataStore();
    const [state, setState] = useSetState<IState>({
        loading: false,
        localAvatar: null,
        localAvatarPath: '',
    });

    React.useEffect(() => {}, []);

    const openCamera = async () => {
        try {
            const response: any = await MultipleImagePicker.openPicker({
                mediaType: 'image',
                singleSelectedMode: true,
                isPreview: true,
                usedCameraButton: true,
                allowedLivePhotos: false,
            });

            response.uri = isIOS
                ? response.path.replace('file://', '')
                : `file://${response.realPath}`;

            setState({
                loading: true
            })

            uploadPicture(response);
        } catch (e: any) {
            console.log('error：', e.code, e.message);
        }
    };

    /**
     * 上传图片
     * @param response
     */
    const uploadPicture = async (response: any) => {
        try {
            const formData = new FormData();

            const file = {
                uri: response.uri,
                type: 'multipart/form-data',
                name: `${dayjs().valueOf()}-${response.fileName}`,
            };
            formData.append('file', file);

            const res = await server.post(apis.file.upload, formData);

            updateAvatar(response, res.data.url);
        } catch (err) {

            setState({
                loading: false
            })
        }
    };

    /**
     * 更新头像
     * @param response
     * @param url
     */
    const updateAvatar = async (response: any, url: string) => {
        try {
            await server.put(apis.user.myself, {avatar: url});
            setState({
                loading: false,
                localAvatar: response,
                localAvatarPath: response.uri,
            });
        } catch (err) {
            setState({
                loading: false
            })
        }
    };

    const onChooseAvatar = () => {};

    const onPressInfo = (editType: EditInfoType) => {
        props.navigation.push(INTELINK_SCREEN_NAME.SCREEN_EDIT_PERSONAL_INFO, {
            editType,
            contentText:
                editType === EditInfoType.Nickname
                    ? selfInfoData?.nickname
                    : selfInfoData?.intro,
        });
    };

    return (
        <>
            <AweSimpleNavigator
                centerTitle={useLanguage.personal_info}
                goBack={props.navigation.goBack}
            />

            <View style={styles.avatarRow}>
                <TouchableHighlight
                    underlayColor={'none'}
                    onPress={onChooseAvatar}>
                    <>
                        <Image
                            source={
                                state.localAvatarPath
                                    ? {uri: state.localAvatarPath}
                                    : localImages.defaultAvatar
                            }
                            style={styles.avatar}
                        />

                        <TouchableHighlight
                            style={styles.avatarTouch}
                            onPress={openCamera}
                            underlayColor={'none'}>
                            <View style={styles.avatarEdit}>
                                <IconFont name={'bianjitouxiang'} size={22} />
                            </View>
                        </TouchableHighlight>


                        {
                            state.loading &&
                            <View style={styles.uploadLoading}>
                                <ActivityIndicator />
                            </View>
                        }

                    </>
                </TouchableHighlight>
            </View>

            <TouchableHighlight
                underlayColor={'#efefef'}
                onPress={() => onPressInfo(EditInfoType.Nickname)}>
                <View style={styles.editRow}>
                    <View style={{flex: 1}}>
                        <Text style={styles.editTitle}>
                            {useLanguage.nickname}
                        </Text>
                        <Text style={styles.nicknameText}>
                            {selfInfoData?.nickname}
                        </Text>
                    </View>
                    <IconFont name={'arrow-right'} color={'#bbb'} size={14} />
                </View>
            </TouchableHighlight>

            <TouchableHighlight
                underlayColor={'#efefef'}
                onPress={() => onPressInfo(EditInfoType.Intro)}>
                <View style={styles.editRow}>
                    <View style={{flex: 1}}>
                        <Text style={styles.editTitle}>{useLanguage.bio}</Text>
                        <Text
                            style={[
                                styles.bioPlaceholder,
                                selfInfoData?.intro ? {color: '#333'} : {},
                            ]}>
                            {selfInfoData?.intro ||
                                useLanguage.describe_yourself}
                        </Text>
                    </View>
                    <IconFont name={'arrow-right'} color={'#bbb'} size={14} />
                </View>
            </TouchableHighlight>
        </>
    );
};

const styles = StyleSheet.create({
    avatarRow: {
        marginTop: 10,
        padding: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 90,
    },
    avatarTouch: {
        position: 'absolute',
        width: 40,
        height: 40,
        bottom: -8,
        right: -8,
    },
    avatarEdit: {
        width: 24,
        height: 24,
        borderRadius: 30,
        opacity: 0.7,
        transform: [{translateX: 10}, {translateY: 10}],
    },
    uploadLoading: {
        position: 'absolute',
        backgroundColor: '#111',
        width: 90,
        height: 90,
        borderRadius: 90,
        opacity: .4,
        justifyContent: 'center'
    },
    editRow: {
        backgroundColor: '#fff',
        marginTop: 10,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    editTitle: {
        paddingLeft: 2,
        color: '#999',
        fontSize: 12,
    },
    nicknameText: {
        paddingTop: 10,
        marginLeft: 2,
        color: '#333',
    },
    bioPlaceholder: {
        paddingTop: 10,
        paddingLeft: 2,
        color: '#bbb',
        height: 50,
    },
});

export default observer(PersonalPreviewScreen);
