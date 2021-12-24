import React from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableHighlight, View } from "react-native";
import AweSimpleNavigator from '../../../components/awe-simple-navigator';
import { NavigateProps } from "../../../interface";
import { avatarUrl } from "../../../mock";
import MultipleImagePicker, { Results } from "@baronha/react-native-multiple-image-picker";
import { isIOS } from "../../../config/contant";
import { useSetState } from "ahooks";

interface IState {
    localAvatar: Results | null
    localAvatarPath: string
}

const EditPersonalInfoScreen: React.FC<NavigateProps> = (props: NavigateProps) => {

    const [state, setState] = useSetState<IState>({
        localAvatar: null,
        localAvatarPath: ''
    })

    const openCamera = async () => {
        try {
            const response: any = await MultipleImagePicker.openPicker({
                mediaType: 'image',
                singleSelectedMode: true,
                isPreview: true,
                usedCameraButton: true,
                allowedLivePhotos: false,
            });


            setState({
                localAvatar: response,
                localAvatarPath: isIOS ? response.path.replace('file://', '') : `file://${response.realPath}`
            })

        } catch (e: any) {
            console.log('error：', e.code, e.message);
        }
    };

    const onSaveInfo = () => {
        console.log('保存数据');
    }


    const onChooseAvatar = () => {

    }


    return (
        <>
            <AweSimpleNavigator
                centerTitle={"sss's info"}
                goBack={props.navigation.goBack}
                rightActionTitle={'save'}
                rightActionEvent={onSaveInfo}
            />

            <View style={styles.avatarRow}>

                <TouchableHighlight underlayColor={'none'} onPress={onChooseAvatar}>
                    <>
                        <Image
                            source={{uri: state.localAvatarPath ? state.localAvatarPath : avatarUrl}}
                            style={styles.avatar} />

                        <TouchableHighlight style={styles.avatarTouch} onPress={openCamera}>
                            <View style={styles.avatarEdit} />
                        </TouchableHighlight>
                    </>
                </TouchableHighlight>

            </View>


            <View style={styles.editRow}>
                <Text style={styles.editTitle}>Name</Text>
                <TextInput placeholder={'Enter name'} />
            </View>


            <View style={styles.editRow}>
                <Text style={styles.editTitle}>Self introduction</Text>
                <TextInput
                    placeholder={'Enter introduction'}
                    multiline={true}
                    textAlignVertical={'top'}
                    style={{height: 60}}
                />
            </View>

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
        bottom: -10,
        right: -10
    },
    avatarEdit: {
        width: 24,
        height: 24,
        borderRadius: 30,
        backgroundColor: 'rgba(1, 1, 1, .7)',
        transform: [
            {translateX: 10},
            {translateY: 10}
        ]
    },
    editRow: {
        backgroundColor: '#fff',
        marginTop: 10,
        padding: 10
    },
    editTitle: {
        paddingLeft: 2,
        color: '#999',
        fontSize: 12
    }
})

export default EditPersonalInfoScreen;
