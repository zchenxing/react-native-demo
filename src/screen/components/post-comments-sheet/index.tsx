import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
    ActivityIndicator,
    Keyboard,
} from 'react-native';
import {screenHeight, screenWidth} from '../../../config/contant';
import {Image} from 'react-native-elements';
import {useLanguage} from '../../../language';
import AweKeyboard from '../../../components/awe-keyboard';
import {PostCommentProps} from './type';
import {avatarUrl} from '../../../mock';
import CommentItem from './comment-item';
import {themeColor} from '../../../assets/styles';
import {useSetState} from 'ahooks';
import BottomSheet, {BottomSheetVirtualizedList} from '@gorhom/bottom-sheet';
import server from '../../../network';
import apis from '../../../network/apis';
import {CommentProps} from '../../../interface/work';
import dayjs from 'dayjs';
import {observer} from 'mobx-react';
import {usePostListDataStore} from '../../../store/provider';

interface IState {
    contentText: string;
    keyboardVisible: boolean;
    dataSource: CommentProps[];
}

const PostCommentSheet: React.FC<PostCommentProps> = (
    props: PostCommentProps,
) => {
    const {postStoreData} = usePostListDataStore();

    const actionSheetRef = React.createRef<any>();
    const commentListRef = React.useRef<any>(null);
    const currentPostId = React.useRef<string>('');
    const currentPostLatest = React.useRef<any>(null);

    const [state, setState] = useSetState<IState>({
        contentText: '',
        keyboardVisible: false,
        dataSource: [],
    });

    React.useEffect(() => {
        if (props.visible) {
            // 重复打开帖子的评论不需要重新请求
            // 同一个帖子打开的间隔超过20秒
            // 都会触发重新请求
            if (
                postStoreData[props.rowIndex].id !== currentPostId.current ||
                dayjs().valueOf() - currentPostLatest.current > 30000
            ) {
                currentPostId.current = postStoreData[props.rowIndex].id;
                currentPostLatest.current = dayjs().valueOf();
                setState({
                    dataSource: [],
                });
                getDataSource();
            }
            actionSheetRef.current && actionSheetRef.current.snapToIndex(1);
        } else {
            actionSheetRef.current && actionSheetRef.current.snapToIndex(-1);
        }
    }, [props.visible]);

    const getDataSource = async () => {
        try {
            const res = await server.get(
                apis.post.comment.list(currentPostId.current),
            );
            setState({
                dataSource: res.data,
            });
        } catch (err) {}
    };

    // callbacks
    const handleSheetChanges = React.useCallback((index: number) => {
        if (index === 0) {
            onClose();
        }
    }, []);

    /**
     * 点击回复 显示键盘
     */
    const onPressReply = () => {
        setState({
            keyboardVisible: true,
        });
    };

    /**
     * 点击头像跳转到个人信息
     */
    const onPressAvatar = () => {
        props.onPressAvatar();
    };

    const onClose = (animatedBack?: boolean) => {
        // 点击背景展示收回的动画
        animatedBack && actionSheetRef.current.snapToPosition(1);

        setTimeout(() => {
            props.onClose();
        }, 100);
    };

    /**
     * 发送评论
     */
    const onPressSend = async () => {
        try {
            const res = await server.post(
                apis.post.comment.push(currentPostId.current),
                {
                    content: state.contentText,
                },
            );

            // 能打开评论框，说明肯定有评论
            postStoreData[props.rowIndex].total_comment += 1

            Keyboard.dismiss();

            commentListRef.current.scrollToOffset({
                offset: 0,
                animated: true,
            });

            setState({
                dataSource: [res.data, ...state.dataSource],
                contentText: '',
                keyboardVisible: false,
            });
        } catch (err) {}
    };

    return (
        <>
            {props.visible && (
                <TouchableHighlight
                    underlayColor={'none'}
                    style={styles.cover}
                    onPress={() => onClose(true)}>
                    <View />
                </TouchableHighlight>
            )}

            <BottomSheet
                ref={actionSheetRef}
                index={-1}
                snapPoints={[1, screenHeight * 0.7]}
                onChange={handleSheetChanges}
                handleComponent={() => (
                    <View style={styles.sheetHeader}>
                        <Text style={{color: '#777'}}>
                            {postStoreData[props.rowIndex]?.total_comment || 0} comments
                        </Text>
                    </View>
                )}>
                {state.dataSource.length ? (
                    <BottomSheetVirtualizedList
                        ref={commentListRef}
                        style={styles.sheetContent}
                        getItemCount={() => state.dataSource.length}
                        getItem={(data, index) => data[index]}
                        data={state.dataSource}
                        keyExtractor={(item: any) => item.id}
                        renderItem={(row: any) => (
                            <CommentItem
                                commentDetail={row.item}
                                showSeparator={true}
                                // subComment={[]}
                                onPressAvatar={onPressAvatar}
                                onPressReply={onPressReply}
                            />
                        )}
                    />
                ) : (
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <ActivityIndicator />
                    </View>
                )}

                <TouchableHighlight
                    underlayColor={'none'}
                    onPress={() => setState({keyboardVisible: true})}>
                    <View style={styles.sheetFooter}>
                        <Image
                            style={styles.avatar}
                            source={{
                                uri: avatarUrl,
                            }}
                        />
                        <View style={styles.submitText}>
                            <Text
                                numberOfLines={1}
                                ellipsizeMode={'tail'}
                                style={{
                                    color: state.contentText ? '#333' : '#ddd',
                                }}>
                                {state.contentText
                                    ? state.contentText
                                    : useLanguage.say_something}
                            </Text>
                        </View>
                        <TouchableHighlight
                            underlayColor={'none'}
                            onPress={onPressSend}>
                            <View
                                style={[
                                    styles.submitButton,
                                    {
                                        backgroundColor: themeColor,
                                        opacity: state.contentText ? 1 : 0.7,
                                    },
                                ]}>
                                <Text style={{color: '#fff'}}>
                                    {useLanguage.comment}
                                </Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </TouchableHighlight>
            </BottomSheet>

            <AweKeyboard
                visible={state.keyboardVisible}
                contentText={state.contentText}
                onClose={() => setState({keyboardVisible: false})}
                onChangeText={contentText => setState({contentText})}
                onPressSend={onPressSend}
            />
        </>
    );
};

const styles = StyleSheet.create({
    cover: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: -120,
        bottom: 0,
        backgroundColor: 'rgba(1, 1, 1, .3)',
    },
    sheetView: {
        width: screenWidth,
        height: screenHeight * 0.7,
        backgroundColor: '#fff',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        position: 'absolute',
        left: 0,
        bottom: 4,
    },
    sheetHeader: {
        width: screenWidth,
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sheetContent: {
        flex: 1,
        padding: 20,
        paddingTop: 10,
    },
    sheetFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 25,
        paddingLeft: 20,
        paddingRight: 10,
        borderTopWidth: 1,
        borderTopColor: '#ebebeb',
        backgroundColor: '#fff',
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 30,
        marginRight: 10,
    },
    submitText: {
        flex: 1,
        padding: 10,
        paddingRight: 5,
        backgroundColor: '#FAFAFA',
        borderRadius: 20,
    },
    submitButton: {
        height: 35,
        justifyContent: 'center',
        marginLeft: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 20,
    },
});

export default React.memo(observer(PostCommentSheet));
