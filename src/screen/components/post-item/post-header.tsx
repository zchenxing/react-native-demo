import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {Image} from 'react-native-elements';
import {themeColor} from '../../../assets/styles';
import { localImages } from "../../../assets/images";
import { useLanguage } from "../../../language";
import IconFont from "../../../assets/iconfont";

interface IProps {
    // 是否是分享信息
    isShare?: boolean
    // 是否是自己
    isMySelf?: boolean
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
    // 更多操作
    handleMore: () => void
}

const PostHeader: React.FC<IProps> = (props: IProps) => {

    return (
        <View style={styles.header}>
            <TouchableHighlight
                style={{flexDirection: 'row'}}
                underlayColor={'none'}
                onPress={props.handleUser}>
                <>
                    <Image
                        style={styles.avatar}
                        defaultSource={ localImages.defaultAvatar}
                        source={props.userAvatar ? { uri: props.userAvatar }: localImages.defaultAvatar}
                    />

                    <View style={{justifyContent: 'space-between'}}>
                        <Text style={styles.nickname}>
                            {props.userNickname || '——'}
                        </Text>
                        <View style={{flexDirection: 'row'}}>
                            <View style={styles.tag}>
                                <Text style={styles.tagText}>{props.label}</Text>
                            </View>

                            {
                                props.isShare &&
                                <View style={styles.tag}>
                                    <IconFont
                                        name={'fenxiang'}
                                        color={themeColor}
                                        size={10}
                                        style={{marginTop: 3, marginRight: 3}}
                                    />
                                    <Text style={styles.tagText}>{useLanguage.share}</Text>
                                </View>
                            }
                        </View>
                    </View>
                </>
            </TouchableHighlight>

            {
                props.isMySelf &&
                <TouchableHighlight
                    style={{paddingLeft: 10}}
                    underlayColor={'none'}
                    onPress={props.handleMore}
                >
                    <IconFont name={'more'} size={20} color={'#aaa'} />
                </TouchableHighlight>
            }


        </View>
    );
};

const styles = StyleSheet.create({
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
        fontWeight: '600',
        color: '#000',
    },
    tag: {
        borderWidth: 1,
        borderColor: themeColor,
        borderRadius: 3,

        paddingLeft: 5,
        paddingRight: 5,
        marginRight: 5,

        flexDirection: 'row',
    },
    tagText: {
        color: themeColor,
        fontSize: 12,
    }
});

export default React.memo(PostHeader);
