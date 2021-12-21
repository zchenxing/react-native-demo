import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {Image} from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import {avatarUrl} from '../../../mock';
import {themeColor} from '../../../assets/styles';
import FollowButton from '../follow-button';
import { useSetState } from "ahooks";

interface IProps {
    userAvatar?: string
    userNickname?: string
    label?: string

    hiddenFollow?: boolean
    handleUser: () => void;
}

interface IState {
    following: boolean
    followLoading: boolean
}

const PostHeader: React.FC<IProps> = (props: IProps) => {

    const [state, setState] = useSetState<IState>({
        following: false,
        followLoading: false
    })


    const onPressFollow = (followStatus: boolean) => {

        setState({
            followLoading: true
        })

        setTimeout(() => {
            setState({
                following: followStatus,
                followLoading: false
            })

            Toast.showWithGravity(
                followStatus ? '已关注' : '已取消关注',
                1,
                Toast.TOP,
            );
        }, 900)

    };

    return (
        <View style={postHeaderStyles.header}>
            <TouchableHighlight
                style={{flexDirection: 'row'}}
                underlayColor={'none'}
                onPress={props.handleUser}>
                <>
                    <Image
                        style={postHeaderStyles.avatar}
                        source={{
                            uri: props.userAvatar ? props.userAvatar : avatarUrl,
                        }}
                    />

                    <View style={{justifyContent: 'space-between'}}>
                        <Text style={postHeaderStyles.nickname}>
                            {props.userNickname || '——'}
                        </Text>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={postHeaderStyles.tag}>
                                {props.label}
                            </Text>
                        </View>
                    </View>
                </>
            </TouchableHighlight>

            {
                !props.hiddenFollow &&

                <FollowButton
                    isFollow={state.following}
                    followLoading={state.followLoading}
                    onChangeFollow={() => onPressFollow(!state.following)}
                />

            }

        </View>
    );
};

const postHeaderStyles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 40,
        marginRight: 10,
    },
    nickname: {
        fontSize: 15,
        fontWeight: '700',
        color: '#000',
    },
    tag: {
        borderWidth: 1,
        borderColor: themeColor,
        borderRadius: 3,
        color: themeColor,
        fontSize: 12,
        paddingLeft: 5,
        paddingRight: 5,
    },

    follow: {
        width: 80,
        padding: 5,
        borderRadius: 30,
    },
    followText: {
        textAlign: 'center',
    },
});

export default React.memo(PostHeader);
