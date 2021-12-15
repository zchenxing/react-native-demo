import React from 'react';
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from "react-native";
import {NavigateProps} from '../../interface';
import PostContent from './post-content';
import ScreenBase from '../components/screen-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSetState} from 'ahooks';
import CommentItem from '../components/post-comments/comment-item';
import {themeColor} from '../../assets/styles';
import AweKeyboard from '../../components/awe-keyboard';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import PostCard from './post-card';
import UserNavigator from '../components/user-navigator';
import { useLanguage } from "../../language";

interface IState {
    followStatus: boolean;
    followLoading: boolean;
    collection: boolean;
    keyboardVisible: boolean;
    commentText: string;
    moreLoading: boolean
}

const PostDetailScreen: React.FC<NavigateProps> = (props: NavigateProps) => {

    const flatListRef = React.useRef<any>(null)


    const [state, setState] = useSetState<IState>({
        followStatus: false,
        followLoading: false,
        collection: false,
        keyboardVisible: false,
        commentText: '',
        moreLoading: false
    });

    /**
     * 点击生物卡片查看更多
     */
    const onPressAnimalCardMore = (offset: number, isPutAway: boolean) => {
        flatListRef.current.scrollToOffset({
            offset: offset + (isPutAway ? 340 : 0),
            animated: true
        })
    }

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


    const loadMore = () => {
        return state.moreLoading ? (
            <View>
                <ActivityIndicator />
                <Text style={{textAlign: 'center'}}>
                    {useLanguage.load_more}
                </Text>
            </View>
        ) : (
            <></>
        );
    };

    const onLoadMoreData = () => {
        setState({
            moreLoading: true
        });

        setTimeout(() => {
            setState({moreLoading: false});
        }, 2000);
    }


    return (
        <SafeAreaProvider>

            <UserNavigator
                isFollow={state.followStatus}
                followLoading={state.followLoading}
                goBack={props.navigation.goBack}
                onChangeFollow={onChangeFollow}
            />

            <ScreenBase>
                <View style={{flex: 1}}>
                    <FlatList
                        ref={flatListRef}
                        data={Array.from(new Array(22).keys())}
                        ListFooterComponent={() => loadMore()}
                        onEndReached={onLoadMoreData}
                        renderItem={row => {
                            if (row.item === 0) {

                                return <PostContent />;
                            } else if (row.item === 1) {

                                return <PostCard onPressMore={onPressAnimalCardMore} />
                            } else if (row.item === 2) {

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
