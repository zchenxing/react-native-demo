import React from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';
import {NavigateProps} from '../../interface';
import PostDetailNavigator from './navigator';
import PostContent from './post-content';
import ScreenBase from '../components/screen-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSetState} from 'ahooks';
import CommentItem from '../components/post-comments/comment-item';
import {themeColor} from '../../assets/styles';
import AweKeyboard from '../../components/awe-keyboard';
import {SafeAreaProvider} from 'react-native-safe-area-context';

interface IState {
    followStatus: boolean;
    followLoading: boolean;
    collection: boolean;
    keyboardVisible: boolean;
    commentText: string;
}

const PostDetailScreen: React.FC<NavigateProps> = (props: NavigateProps) => {
    const [state, setState] = useSetState<IState>({
        followStatus: false,
        followLoading: false,
        collection: false,
        keyboardVisible: false,
        commentText: '',
    });

    const onChangeFollow = () => {
        setState({
            followLoading: true,
        });
        setTimeout(() => {
            setState({
                followLoading: false,
                followStatus: !state.followStatus,
            });
        }, 1000);
    };

    const onPressEditComment = () => {
        setState({
            keyboardVisible: true,
        });
    };

    return (
        <SafeAreaProvider>
            <PostDetailNavigator
                isFollow={state.followStatus}
                followLoading={state.followLoading}
                goBack={props.navigation.goBack}
                onChangeFollow={onChangeFollow}
            />

            <ScreenBase>
                <View style={{flex: 1}}>
                    <FlatList
                        data={Array.from(new Array(1000).keys())}
                        renderItem={row => {
                            if (row.item === 0) {
                                return <PostContent />;
                            } else if (row.item === 1) {
                                return (
                                    <View style={styles.commentHeader}>
                                        <Text style={styles.commentHeaderTitle}>
                                            100 comments
                                        </Text>
                                    </View>
                                );
                            } else {
                                return (
                                    <View
                                        style={{
                                            paddingLeft: 20,
                                            paddingRight: 20,
                                        }}>
                                        <CommentItem
                                            showSeparator={true}
                                            subComment={[]}
                                        />
                                    </View>
                                );
                            }
                        }}
                    />
                </View>

                <View style={styles.footer}>
                    <TouchableHighlight
                        style={styles.comment}
                        underlayColor={'none'}
                        onPress={onPressEditComment}>
                        <Text numberOfLines={1}>
                            {state.commentText || 'Say something'}
                        </Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        style={styles.iconBase}
                        underlayColor={'none'}
                        onPress={() =>
                            setState({
                                collection: !state.collection,
                            })
                        }>
                        {state.collection ? (
                            <Icon
                                name={'star'}
                                style={{fontSize: 20, color: '#FFD575'}}
                            />
                        ) : (
                            <Icon name={'star-o'} style={{fontSize: 20}} />
                        )}
                    </TouchableHighlight>

                    <TouchableHighlight
                        style={styles.iconBase}
                        underlayColor={'none'}
                        onPress={() => console.log('444')}>
                        <Icon name={'share-alt'} style={{fontSize: 20}} />
                    </TouchableHighlight>
                </View>
            </ScreenBase>

            <AweKeyboard
                visible={state.keyboardVisible}
                contentText={state.commentText}
                onChangeText={text => setState({commentText: text})}
                onClose={() => setState({keyboardVisible: false})}
            />
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    footer: {
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        paddingLeft: 15,
        paddingRight: 20,
    },
    comment: {
        flex: 1,
        padding: 10,
        borderRadius: 30,
        backgroundColor: '#f8f8f8',
    },
    iconBase: {
        padding: 8,
    },
    commentHeader: {
        borderTopColor: '#f3f3f3',
        borderTopWidth: 10,
        borderBottomColor: '#f3f3f3',
        borderBottomWidth: 1,
        padding: 15,
        paddingTop: 13,
        paddingBottom: 13,
    },
    commentHeaderTitle: {
        fontSize: 13,
        color: themeColor,
    },
});

export default PostDetailScreen;
