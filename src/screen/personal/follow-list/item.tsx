import React from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import FastImage from 'react-native-fast-image';
import FollowButton from '../../components/follow-button';
import {useSetState} from 'ahooks';
import {localImages} from '../../../assets/images';
import server from '../../../network';
import apis from '../../../network/apis';
import { errorMessage } from "../../../network/error";

interface IProps {
    userId: string
    nickname: string;
    isFollow: boolean;
    isMySelf: boolean;
    avatar?: string;
    intro?: string;
    onToggleFollow: (userId: string) => void
    onPressUser: (userId: string) => void
}

interface IState {
    followLoading: boolean;
}

const UserItem: React.FC<IProps> = (props: IProps) => {
    const [state, setState] = useSetState<IState>({
        followLoading: false,
    });

    const onChangeFollow = async () => {

        setState({
            followLoading: true,
        });

        try {
            await server.post(apis.user.follow(props.userId))
            props.onToggleFollow(props.userId)
            setState({
                followLoading: false
            });
        } catch (err) {
            setState({
                followLoading: false
            });
            errorMessage.alert(err)
        }
    };

    return (
        <TouchableHighlight
            underlayColor={'#f8f8f8'}
            onPress={() => props.onPressUser(props.userId)}>
            <View style={styles.row}>
                {props.avatar ? (
                    <FastImage source={{uri: props.avatar}} style={styles.avatar} />
                ) : (
                    <Image
                        style={styles.avatar}
                        source={localImages.defaultAvatar}
                    />
                )}

                <View style={styles.userInfo}>
                    <Text style={styles.username}>{props.nickname}</Text>
                    {props.intro ? (
                        <Text numberOfLines={1} style={styles.intro}>
                            {props.intro}
                        </Text>
                    ) : (
                        <></>
                    )}
                </View>

                {!props.isMySelf ? (
                    <FollowButton
                        isFollow={props.isFollow}
                        followLoading={state.followLoading}
                        onChangeFollow={onChangeFollow}
                    />
                ) : (
                    <View style={{width: 50}} />
                )}
            </View>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    row: {
        padding: 10,
        paddingLeft: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 60,
        marginRight: 10,
    },
    userInfo: {
        flex: 1,
    },
    username: {
        fontSize: 18,
        fontWeight: '500',
        color: '#333',
    },
    intro: {
        color: '#aaa',
        fontSize: 12,
    },
    follow: {
        width: 70,
    },
});

export default UserItem;
