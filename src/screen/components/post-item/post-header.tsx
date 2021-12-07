import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {Image} from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import { avatarUrl } from "../../../mock";
import { themeColor } from "../../../assets/styles";

const PostHeader: React.FC = props => {
    const [following, setFollowing] = React.useState(false);

    const onPressFollow = (followStatus: boolean) => {
        setFollowing(followStatus);

        Toast.showWithGravity(
            followStatus ? '已关注' : '已取消关注',
            1,
            Toast.TOP
        )

    };

    return (
        <View style={postHeaderStyles.header}>
            <View style={{flexDirection: 'row'}}>
                <Image
                    style={postHeaderStyles.avatar}
                    source={{
                        uri: avatarUrl
                    }}
                />

                <View style={{justifyContent: 'space-between'}}>
                    <Text style={postHeaderStyles.nickname}>
                        Donald John Trump
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={postHeaderStyles.tag}>Birds</Text>
                    </View>
                </View>
            </View>

            <TouchableHighlight onPress={() => onPressFollow(!following)} underlayColor="none">
                <View
                    style={[
                        postHeaderStyles.follow,
                        {
                            backgroundColor: following ? '#f7f7f7' : '#bbe1e6',
                        },
                    ]}>
                    <Text
                        style={[
                            postHeaderStyles.followText,
                            {
                                color: following ? '#ccc' : themeColor,
                            },
                        ]}>
                        {following ? 'Following' : 'Follow'}
                    </Text>
                </View>
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
