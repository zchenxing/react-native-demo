import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {Image} from 'react-native-elements';
import {themeColor} from '../../../assets/styles';
import { localImages } from "../../../assets/images";

interface IProps {
    // 显示标签
    label?: string
    // 用户头像
    userAvatar?: string
    // 用户昵称
    userNickname?: string
    // 隐藏follow按钮
    hiddenFollow?: boolean
    // 点击用户跳转
    handleUser: () => void;
}

const PostHeader: React.FC<IProps> = (props: IProps) => {

    return (
        <View style={postHeaderStyles.header}>
            <TouchableHighlight
                style={{flexDirection: 'row'}}
                underlayColor={'none'}
                onPress={props.handleUser}>
                <>
                    <Image
                        style={postHeaderStyles.avatar}
                        defaultSource={ localImages.defaultAvatar}
                        source={props.userAvatar ? { uri: props.userAvatar }: localImages.defaultAvatar}
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
    }
});

export default React.memo(PostHeader);
