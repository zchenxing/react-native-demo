import React from 'react';
import { DeviceEventEmitter, Keyboard, StyleSheet, TextInput, View } from "react-native";
import AweSimpleNavigator from '../../../components/awe-simple-navigator';
import {NavigateProps} from '../../../interface';
import {useLanguage} from '../../../language';
import {EditInfoType} from '../../../enum';
import server from '../../../network';
import apis from '../../../network/apis';
import {useSelfDataStore} from '../../../store/provider';
import AweOverlayLoading from '../../../components/awe-overlay-loading';
import {useSetState} from 'ahooks';
import { EventEmitterName } from "../../../config/contant";

interface IState {
    editSave: boolean;
    loading: boolean;
    content: string;
}

const EditPersonalInfoScreen: React.FC<NavigateProps> = (
    props: NavigateProps,
) => {
    const {editType, contentText} = props.route.params;
    const titleText =
        editType === EditInfoType.Nickname
            ? useLanguage.nickname
            : useLanguage.describe_yourself;

    const {setSelfInfoData, selfInfoData} = useSelfDataStore();
    const inputRef = React.useRef<any>(null);
    const [state, setState] = useSetState<IState>({
        editSave: false,
        loading: false,
        content: '',
    });

    React.useEffect(() => {
        inputRef.current.focus();
        setState({
            content: contentText,
        });
    }, [inputRef.current]);

    const onSave = async () => {
        try {
            Keyboard.dismiss();
            setState({
                loading: true,
            });

            const data: any = {};
            if (editType === EditInfoType.Nickname) {
                data.nickname = state.content;
            } else {
                data.intro = state.content;
            }

            await server.put(apis.user.myself, data);

            DeviceEventEmitter.emit(EventEmitterName.EditInfo)

            setSelfInfoData({
                ...selfInfoData,
                ...data,
            });

            setState({
                loading: false,
            });
            props.navigation.goBack();

        } catch (err) {
            setState({
                loading: false,
            });
        }
    };


    const nicknameEditable = state.content !== contentText && !!state.content
    const introEditable = state.content !== contentText

    return (
        <>
            <AweSimpleNavigator
                centerTitle={titleText}
                goBack={props.navigation.goBack}
                rightActionTitle={useLanguage.save}
                rightActionEvent={onSave}
                rightActionEditable={
                    editType === EditInfoType.Nickname
                        ? nicknameEditable
                        : introEditable
                }
            />

            <View style={styles.container}>
                <TextInput
                    ref={inputRef}
                    value={state.content}
                    onChangeText={content => setState({content})}
                    multiline={true}
                    placeholder={titleText}
                    clearButtonMode={'while-editing'}
                />
            </View>

            <AweOverlayLoading visible={state.loading} />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginTop: 10,
        padding: 5,
    },
});

export default EditPersonalInfoScreen;
