import React from 'react';
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {avatarUrl, postList} from '../../../mock';
import Utils from '../../../utils';
import {PostCommentsItemProps} from './type';
import {themeColor} from '../../../assets/styles';
import {useSetState} from 'ahooks';
import {isIOS} from '../../../config/contant';

interface IState {
    // 加载更多回复
    moreLoading: boolean;
}

const CommentItem: React.FC<PostCommentsItemProps> = (
    props: PostCommentsItemProps,
) => {
    const [state, setState] = useSetState<IState>({
        moreLoading: false,
    });

    const onPressLoadMore = () => {
        setState({
            moreLoading: true,
        });

        setTimeout(() => {
            setState({
                moreLoading: false,
            });
        }, 1000);
    };

    return (
        <View>
            <TouchableHighlight
                onPress={() => props.onPressReply && props.onPressReply()}
                underlayColor={'#fafafa'}>
                <View style={styles.container}>
                    <FastImage
                        style={styles.avatar}
                        source={{uri: avatarUrl}}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                    <View style={[styles.rightView]}>
                        <View style={styles.postHeader}>
                            <Text style={{color: '#999'}}>
                                Coconut Island Games
                            </Text>
                            <Text style={styles.postTime}>
                                {Utils.getPostTime('2021-12-07 12:33:22')}
                            </Text>
                        </View>

                        <Text>
                            <Text>
                                I am excited to share he latest trajectory of
                                the seagulls seagulls seagu2233333lls sea.
                            </Text>
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>

            {props.subComment && (
                <View style={{paddingLeft: 40}}>
                    {[...postList].splice(0, 2).map(data => (
                        <CommentItem key={data.id} />
                    ))}

                    <TouchableHighlight
                        style={styles.moreReplies}
                        onPress={onPressLoadMore}
                        underlayColor={'none'}>
                        {!state.moreLoading ? (
                            <Text style={styles.moreRepliesText}>
                                View more replies
                            </Text>
                        ) : (
                            <Text style={styles.moreRepliesText}>
                                <ActivityIndicator />
                                Load more
                            </Text>
                        )}
                    </TouchableHighlight>
                </View>
            )}

            {props.showSeparator && <View style={styles.separator} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingTop: 20,
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 32,
    },
    rightView: {
        flex: 1,
        marginRight: 10,
        marginLeft: 10,
        paddingBottom: 15,
    },
    postHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    postTime: {
        color: '#999',
        fontSize: 11,
    },
    separator: {
        flex: 1,
        height: 1,
        backgroundColor: '#eee',
        marginLeft: 35,
    },
    moreReplies: {
        width: 140,
        marginLeft: 30,
        paddingBottom: 10,
    },
    moreRepliesText: {
        paddingLeft: 10,
        color: themeColor,
        lineHeight: isIOS ? 22 : 17,
    },
});

export default React.memo(CommentItem);
