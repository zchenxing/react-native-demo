import React from 'react';
import {
    ActivityIndicator,
    Image,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';
import {Button, Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {avatarUrl} from '../../mock';
import {themeColor, themeLightColor} from '../../assets/styles';

interface IProps {
    isFollow: boolean;
    followLoading: boolean;
    goBack: () => void;
    onChangeFollow: () => void;
}

const PostDetailNavigator: React.FC<IProps> = (props: IProps) => {
    return (
        <>
            <Header
                backgroundColor="#fff"
                leftComponent={
                    <View style={styles.left}>
                        <TouchableHighlight
                            underlayColor={'none'}
                            onPress={props.goBack}>
                            <View style={{width: 40, paddingLeft: 10}}>
                                <Icon
                                    name={'angle-left'}
                                    style={{fontSize: 30, color: '#aaa'}}
                                />
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight style={styles.userInfo}>
                            <>
                                <Image
                                    source={{uri: avatarUrl}}
                                    style={styles.avatar}
                                />

                                <Text style={styles.nickname}>
                                    Nick暗恶魔 posty
                                </Text>
                            </>
                        </TouchableHighlight>
                    </View>
                }
                centerContainerStyle={{
                    display: 'none',
                }}
                rightContainerStyle={{
                    justifyContent: 'center',
                }}
                rightComponent={
                    <TouchableHighlight
                        underlayColor={'none'}
                        onPress={props.onChangeFollow}
                        style={[
                            styles.followButton,
                            {
                                backgroundColor: props.isFollow
                                    ? '#f8f8f8'
                                    : '#bbe1e6',
                            },
                        ]}>
                        {props.followLoading ? (
                            <ActivityIndicator style={{width: 30}} />
                        ) : (
                            <Text
                                style={[
                                    styles.followText,
                                    {
                                        color: props.isFollow
                                            ? '#ccc'
                                            : themeColor,
                                    },
                                ]}>
                                {props.isFollow ? 'Following' : 'Follow'}
                            </Text>
                        )}
                    </TouchableHighlight>
                }
            />
        </>
    );
};

const styles = StyleSheet.create({
    left: {
        flexDirection: 'row',
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 32,
        marginRight: 10,
    },
    nickname: {
        fontWeight: 'bold',
        color: '#0A141E',
    },
    followButton: {
        borderRadius: 20,
        padding: 5,
        paddingLeft: 15,
        paddingRight: 15,
    },
    followText: {
        fontSize: 12,
    },
});

export default PostDetailNavigator;
