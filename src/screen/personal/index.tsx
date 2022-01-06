import React from 'react';
import {
    FlatList,
    StatusBar,
    View,
    Animated,
    StyleSheet,
    DeviceEventEmitter,
} from 'react-native';
import PersonalInfo from './info';
import {EventEmitterName, PAGE_SIZE, screenWidth} from '../../config/contant';
import UserNavigator from '../components/user-navigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import PostItem from '../components/post-item';
import PostCommentSheet from '../components/post-comments-sheet';
import {PersonalOtherEnum} from './type';
import {NavigateProps} from '../../interface';
import {INTELINK_SCREEN_NAME} from '../../routes/screen-name';
import server from '../../network';
import apis from '../../network/apis';
import {
    PostContentProps,
    PostImageProps,
    UserInfoProps,
} from '../../interface/work';
import {observer} from 'mobx-react';
import {useSetState} from 'ahooks';
import {usePostListDataStore} from '../../store/provider';
import AweKeyboard from '../../components/awe-keyboard';
import Toast from 'react-native-simple-toast';
import {useNetInfo} from '@react-native-community/netinfo';
import AweLoadMore from '../../components/awe-load-more';
import AwePicturePreview from '../../components/awe-picture-preview';
import {
    Fade,
    Placeholder,
    PlaceholderLine,
    PlaceholderMedia,
} from 'rn-placeholder';

interface IState {
    refreshing: boolean;
    moreLoading: boolean;
    hasMoreData: boolean;

    userInfo: UserInfoProps | undefined;
    navOpacityOffset: Animated.Value;

    // 首次评论的事件
    firstKeyboardVisible: boolean;
    firstContentText: string;
    currentPost: PostContentProps | null;
    currentRowIndex: number;

    pictureVisible: boolean;
    pictureStartIndex: number;
    pictureList: any[];
    commentVisible: boolean;
}

const PersonalScreen: React.FC<NavigateProps> = (props: NavigateProps) => {
    const {userId, listId} = props.route.params;
    const netInfo = useNetInfo();

    const changeNavHeight = 70; //决定改变导航栏样式的滑动距离
    const flatListRef: any = React.useRef<any>(null);
    const navOpacityAnimated: any = React.useRef<any>(null);

    const {postStoreData, getPostData, getMorePostData, onCollectPost} =
        usePostListDataStore();

    const [state, setState] = useSetState<IState>({
        refreshing: true,
        moreLoading: false,
        hasMoreData: false,

        userInfo: undefined,
        navOpacityOffset: new Animated.Value(0),

        firstKeyboardVisible: false,
        firstContentText: '',
        currentPost: null,
        currentRowIndex: -1,

        pictureVisible: false,
        pictureStartIndex: 0,
        pictureList: [],
        commentVisible: false,
    });

    React.useEffect(() => {
        getUserInfo();
        onLoadData();

        const navOpacityOffset = state.navOpacityOffset;

        navOpacityAnimated.current = navOpacityOffset.interpolate({
            inputRange: [0, changeNavHeight],
            outputRange: [0, 1],
            extrapolate: 'clamp', // 阻止输出值超过outputRange
            // @ts-ignore
            useNativeDriver: true,
        });

        const emitter = DeviceEventEmitter.addListener(
            EventEmitterName.EditInfo,
            getUserInfo,
        );

        return () => {
            emitter.remove();
        };
    }, []);

    const getUserInfo = async () => {
        try {
            const res = await server.get(apis.user.other(userId));
            setState({
                userInfo: res.data,
            });
        } catch (err) {
            console.log('get user info', err);
        }
    };

    const onLoadData = async () => {
        try {
            const res = await getPostData(
                {
                    api: apis.user.posts,
                    apiParam: userId,
                },
                listId,
            );

            setState({
                refreshing: false,
                hasMoreData: res.data.length && res.data.length === PAGE_SIZE,
            });
        } catch (err) {}
    };

    /**
     * 加载更多数据
     */
    const onLoadMoreData = async (hasMoreData: boolean) => {
        // 当有更多数据时才自动加载更多数据，否则不做操作
        if (hasMoreData) {
            setState({
                moreLoading: true,
            });

            try {
                const res = await getMorePostData(
                    {
                        api: apis.user.posts,
                        apiParam: userId || '',
                    },
                    listId,
                );
                setState({
                    moreLoading: false,
                    hasMoreData:
                        res.data.length && res.data.length === PAGE_SIZE,
                });
            } catch (err) {}
        }
    };

    /**
     * 点击"没有更多数据"，手动加载更多数据
     */
    const handleNoMoreData = () => {
        setState({
            moreLoading: true,
            hasMoreData: true,
        });

        onLoadMoreData(true);
    };

    const onScrollOffset = (offset: number) => {
        flatListRef.current.scrollToOffset({
            offset,
            animated: true,
        });
    };

    /**
     * 查看帖子详情
     */
    const onPressDetail = React.useCallback(
        (postItem: PostContentProps, row: any) => {
            props.navigation.push(INTELINK_SCREEN_NAME.SCREEN_POST_DETAIL, {
                postId: postItem.id,
                fromListId: state.userInfo?.id,
                rowIndex: row.index,
            });
        },
        [],
    );

    /**
     * 发送评论
     */
    const onPressComment = React.useCallback((row: any) => {
        // 如果有评论，就打开评论
        // 没有评论就截止回复
        if (row.item.total_comment) {
            setState({
                currentPost: row.item,
                commentVisible: true,
                currentRowIndex: row.index,
            });
        } else {
            // 判断是够连续查看同一条帖子的评论，如果是就不清除评论内容
            if (row.item.id === state.currentPost?.id) {
                setState({
                    currentRowIndex: row.index,
                    firstKeyboardVisible: true,
                });
            } else {
                setState({
                    currentRowIndex: row.index,
                    firstKeyboardVisible: true,
                    firstContentText: '',
                    currentPost: row.item,
                });
            }
        }
    }, []);

    /**
     * 发评论
     */
    const onSendComment = async () => {
        try {
            await server.post(
                apis.post.comment.push(state.currentPost?.id || ''),
                {
                    content: state.firstContentText,
                },
            );

            if (state.currentRowIndex > -1) {
                // 直接修改列表数据
                postStoreData[listId][state.currentRowIndex].total_comment = 1;

                setState({
                    firstContentText: '',
                    currentPost: null,
                    firstKeyboardVisible: false,
                });
            }

            Toast.show('消息发送成功');
        } catch (err) {}
    };

    /**
     * 点击收藏
     * @param row
     */
    const onPressCollection = React.useCallback(async (row: any) => {
        if (netInfo.type !== 'none') {
            try {
                await onCollectPost(row.item.id, row.index, listId);
            } catch (err) {
                console.log(err);
            }
        }
    }, []);

    /**
     * 浏览图片
     * @param pictures
     * @param startIndex
     */
    const onPressPicture = React.useCallback(
        (pictures: PostImageProps[], startIndex: number) => {
            const list = pictures.map(picture => picture.url_origin);

            setState({
                pictureVisible: true,
                pictureStartIndex: startIndex,
                pictureList: list,
            });
        },
        [],
    );

    /**
     * 跳转到关注列表
     * @param type
     */
    const onPressFollowList = (type: PersonalOtherEnum) => {
        props.navigation.push(INTELINK_SCREEN_NAME.SCREEN_FOLLOW_LIST, {
            userId: userId,
            followType: type,
        });
    };

    const onPressEdit = () => {
        props.navigation.push(
            INTELINK_SCREEN_NAME.SCREEN_PREVIEW_PERSONAL_INFO,
        );
    };

    const onPressAvatar = (id: string) => {
        props.navigation.push(INTELINK_SCREEN_NAME.SCREEN_PERSONAL, {
            userId: id,
        });
    };

    return (
        <>
            <SafeAreaProvider style={{flex: 1}}>
                <StatusBar
                    animated={true}
                    // @ts-ignore
                    androidtranslucent={true}
                    barStyle="dark-content"
                    translucent={true}
                />

                <View style={styles.header}>
                    <View style={styles.headerBack}>
                        <Icon
                            name={'angle-left'}
                            style={{fontSize: 30, color: '#fff'}}
                        />
                    </View>
                    <Animated.View
                        style={{
                            backgroundColor: '#fff',
                            opacity: navOpacityAnimated.current,
                        }}>
                        <UserNavigator
                            userInfo={state.userInfo}
                            isFollow={true}
                            backgroundColor={`rgba(0, 0, 0, 0)`}
                            followLoading={false}
                            goBack={props.navigation.goBack}
                            onChangeFollow={() => {}}
                        />
                    </Animated.View>
                </View>

                <FlatList
                    ref={flatListRef}
                    style={{flex: 1, width: screenWidth}}
                    scrollEventThrottle={1}
                    data={[null, ...(postStoreData[listId] || [])]}
                    showsVerticalScrollIndicator={false}
                    onEndReached={() => onLoadMoreData(state.hasMoreData)}
                    ListFooterComponent={
                        postStoreData[listId] ? (
                            <AweLoadMore
                                loading={state.moreLoading}
                                hasMoreData={state.hasMoreData}
                                handleNoMoreData={handleNoMoreData}
                            />
                        ) : (
                            <View style={{padding: 20}}>
                                {[1, 2].map(value => (
                                    <Placeholder Animation={Fade} key={value}>
                                        <PlaceholderMedia />
                                        <View style={{height: 10}} />
                                        <PlaceholderLine width={80} />
                                        <PlaceholderLine />
                                        <PlaceholderLine />
                                        <View style={{height: 40}} />
                                    </Placeholder>
                                ))}
                            </View>
                        )
                    }
                    onScroll={Animated.event(
                        [
                            {
                                nativeEvent: {
                                    contentOffset: {
                                        y: state.navOpacityOffset,
                                    },
                                },
                            },
                        ],
                        {
                            useNativeDriver: false,
                        },
                    )}
                    renderItem={row => {
                        if (row.index === 0) {
                            return (
                                <PersonalInfo
                                    userInfo={state.userInfo}
                                    imageOffsetY={state.navOpacityOffset}
                                    onScrollOffset={onScrollOffset}
                                    onPressFollowList={onPressFollowList}
                                    onPressEdit={onPressEdit}
                                />
                            );
                        } else {
                            row.index = row.index - 1;
                            return (
                                <PostItem
                                    row={JSON.stringify(row)}
                                    postItem={postStoreData[listId][row.index]}
                                    onPressDetail={onPressDetail}
                                    onPressPicture={onPressPicture}
                                    onPressComment={onPressComment}
                                    onPressCollection={onPressCollection}
                                />
                            );
                        }
                    }}
                />
            </SafeAreaProvider>

            <AwePicturePreview
                visible={state.pictureVisible}
                onClick={() => setState({pictureVisible: false})}
                imageUrls={state.pictureList}
                startIndex={state.pictureStartIndex}
            />

            <AweKeyboard
                visible={state.firstKeyboardVisible}
                contentText={state.firstContentText}
                onChangeText={firstContentText => setState({firstContentText})}
                onClose={() => setState({firstKeyboardVisible: false})}
                onPressSend={onSendComment}
            />

            <PostCommentSheet
                listId={listId}
                rowIndex={state.currentRowIndex}
                visible={state.commentVisible}
                onPressAvatar={onPressAvatar}
                onClose={() => setState({commentVisible: false})}
            />
        </>
    );
};

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        zIndex: 10,
    },
    headerBack: {
        position: 'absolute',
        bottom: 12,
        left: 19,
    },
    itemView: {
        width: screenWidth,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default observer(PersonalScreen);
