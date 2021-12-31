import React from 'react';
import { Image, StyleSheet, Text, View } from "react-native";
import FastImage from 'react-native-fast-image';
import {avatarUrl} from '../../../mock';
import FollowButton from '../../components/follow-button';
import {useSetState} from 'ahooks';
import Toast from 'react-native-simple-toast';
import { localImages } from "../../../assets/images";

interface IProps {
    nickname: string
    avatar?: string
    intro?: string
}


interface IState {
    following: boolean;
    followLoading: boolean;
}

const UserItem: React.FC<IProps> = (props: IProps) => {
    const [state, setState] = useSetState<IState>({
        following: false,
        followLoading: false,
    });

    const onChangeFollow = () => {
        setState({
            followLoading: true,
        });

        setTimeout(() => {
            setState({
                following: !state.following,
                followLoading: false,
            });

            Toast.showWithGravity(
                !state.following ? '已关注' : '已取消关注',
                1,
                Toast.TOP,
            );
        }, 444);
    };

    return (
        <View style={styles.row}>
            {
                props.avatar ?
                    <FastImage source={{uri: avatarUrl}} style={styles.avatar} />:
                    <Image source={localImages.defaultAvatar} style={styles.avatar} />
            }


            <View style={styles.userInfo}>
                <Text style={styles.username}>
                    {props.nickname}
                </Text>
                <Text numberOfLines={1}>
                    You have a large list that is slow to update - make sure
                    your renderItem function renders components that follow
                    React performance best practices like PureComponent
                </Text>
            </View>


            <FollowButton
                isFollow={state.following}
                followLoading={state.followLoading}
                onChangeFollow={onChangeFollow}
            />
        </View>
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
        width: 50,
        height: 50,
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
    follow: {
        width: 70,
    },
});

export default UserItem;
