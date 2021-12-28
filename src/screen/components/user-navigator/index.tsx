import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';
import {Header, Image} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {UserNavigatorProps} from './type';
import FollowButton from '../follow-button';
import { localImages } from "../../../assets/images";

const UserNavigator: React.FC<UserNavigatorProps> = (
    props: UserNavigatorProps,
) => {
    return (
        <Header
            backgroundColor={
                props.backgroundColor ? props.backgroundColor : '#fff'
            }
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
                                source={props.userInfo?.avatar ? {uri: props.userInfo.avatar} : localImages.defaultAvatar}
                                style={styles.avatar}
                            />

                            <Text style={styles.nickname}>
                                {props.userInfo?.nickname}
                            </Text>
                        </>
                    </TouchableHighlight>
                </View>
            }
            centerContainerStyle={{
                display: 'none',
            }}
            // rightContainerStyle={{
            //     justifyContent: 'center',
            // }}
            // rightComponent={
            //     <FollowButton
            //         isFollow={props.isFollow}
            //         followLoading={props.followLoading}
            //         onChangeFollow={props.onChangeFollow}
            //     />
            // }
        />
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
});

export default UserNavigator;
