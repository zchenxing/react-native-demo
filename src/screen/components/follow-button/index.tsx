import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableHighlight,
} from 'react-native';
import {FollowButtonProps} from './type';
import {themeColor} from '../../../assets/styles';

const FollowButton: React.FC<FollowButtonProps> = (
    props: FollowButtonProps,
) => {
    return (
        <TouchableHighlight
            underlayColor={'none'}
            onPress={props.onChangeFollow}
            style={[
                styles.followButton,
                {
                    backgroundColor: props.isFollow ? '#f8f8f8' : '#bbe1e6',
                },
            ]}>
            {props.followLoading ? (
                <ActivityIndicator style={{width: 30}} />
            ) : (
                <Text
                    style={[
                        styles.followText,
                        {
                            color: props.isFollow ? '#ccc' : themeColor,
                        },
                    ]}>
                    {props.isFollow ? 'Following' : 'Follow'}
                </Text>
            )}
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    followButton: {
        height: 28,
        borderRadius: 20,
        padding: 5,
        paddingLeft: 15,
        paddingRight: 15,
    },
    followText: {
        fontSize: 12,
    },
});

export default React.memo(FollowButton);
