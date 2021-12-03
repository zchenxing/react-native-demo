import React from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { Image } from "react-native-elements";

const PostHeader: React.FC = (props) => {

    const [following, setFollowing] = React.useState(false);

    return (
        <View style={postHeaderStyles.header}>
            <View style={{flexDirection: 'row'}}>
                <Image
                    style={postHeaderStyles.avatar}
                    source={{
                        uri: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbig5.taiwan.cn%2Fxwzx%2Fgj%2F201608%2FW020160823312274505897.jpg&refer=http%3A%2F%2Fbig5.taiwan.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1641116419&t=85aad9729189094f17726a8427de4b32',
                    }}
                />

                <View style={{justifyContent: 'space-between'}}>
                    <Text style={postHeaderStyles.nickname}>Donald John Trump</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={postHeaderStyles.tag}>Birds</Text>
                    </View>
                </View>
            </View>

            <TouchableHighlight
                onPress={() => setFollowing(!following)}
                underlayColor="none">
                <View
                    style={[
                        postHeaderStyles.follow,
                        {
                            backgroundColor: following
                                ? '#f7f7f7'
                                : '#bbe1e6',
                        },
                    ]}>
                    <Text
                        style={[
                            postHeaderStyles.followText,
                            {
                                color: following ? '#ccc' : '#69BECB',
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
        borderColor: '#69BECB',
        borderRadius: 3,
        color: '#69BECB',
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
    }
});


export default React.memo(PostHeader);
