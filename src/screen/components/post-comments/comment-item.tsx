import React from 'react';
import {
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

const CommentItem: React.FC<PostCommentsItemProps> = (
    props: PostCommentsItemProps,
) => {
    return (
        <View>
            <TouchableHighlight
                onPress={() => console.log('回复')}
                underlayColor={'#fafafa'}>
                <View style={styles.container}>
                    <FastImage
                        style={styles.avatar}
                        source={{uri: avatarUrl}}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                    <View style={[styles.rightView]}>
                        <View style={styles.postHeader}>
                            <Text style={{color: '#999'}}>User Nickname</Text>
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
                    {/*<FlatList*/}
                    {/*    data={postList}*/}
                    {/*    keyExtractor={item => item.id}*/}
                    {/*    removeClippedSubviews={true}*/}
                    {/*    renderItem={() => <CommentItem />}*/}
                    {/*/>*/}

                    <CommentItem />
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
});

export default React.memo(CommentItem);
