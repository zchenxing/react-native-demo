import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    TouchableHighlight, ScrollView
} from 'react-native';
import {screenHeight, screenWidth} from '../../../config/contant';
import {Image} from 'react-native-elements';
import {useLanguage} from '../../../language';
import AweKeyboard from '../../../components/awe-keyboard';
import {PostCommentProps} from './type';
import {avatarUrl} from '../../../mock';
import CommentItem from './comment-item';
import { themeColor } from "../../../assets/styles";
import ActionSheet from 'react-native-actions-sheet';
import { useDebounce, useSetState } from "ahooks";
import { useSheetDataStore } from "../../../store/provider";


interface IState {
    contentText: string
    scrollOffsetY: number
    keyboardVisible: boolean
    resetScrollOffsetY: number
}


const PostCommentSheet: React.FC<PostCommentProps> = (
    props: PostCommentProps,
) => {
    const actionSheetRef = React.createRef<any>();
    const scrollRef = React.useRef<any>(null);

    const [state, setState] = useSetState<IState>({
        contentText: '',
        scrollOffsetY: 0,
        keyboardVisible: false,
        resetScrollOffsetY: 0
    })

    const { addDataToComment} = useSheetDataStore()

    const scrollOffsetY = useDebounce(state.scrollOffsetY, { wait: 100 });


    React.useEffect(() => {

        if (props.visible) {
            openComments();
        }

        if (state.resetScrollOffsetY && scrollRef.current) {
            scrollRef.current.scrollTo({
                y: state.resetScrollOffsetY,
                animated: false
            })
        }

    }, [props.visible, scrollRef.current]);


    React.useImperativeHandle(props.cRef, () => ({
        setScrollOffsetY: (offsetY: number) => {

            setTimeout(() => {
                setState({
                    resetScrollOffsetY: offsetY
                })
            }, 100)


        }
    }))


    /**
     * 打开 SheetView
     */
    const openComments = () => {
        if (!actionSheetRef.current.modalVisible) {
            actionSheetRef.current?.setModalVisible(true);
        }
    };


    /**
     * 点击回复 显示键盘
     */
    const onPressReply = () => {
        setState({
            keyboardVisible: true
        })
    }

    /**
     * 点击头像跳转到个人信息
     */
    const onPressAvatar = () => {
        addDataToComment(props.sheetId, {
            offsetY: scrollOffsetY,
            data: []
        })

        actionSheetRef.current?.setModalVisible(false)
        props.onPressAvatar()
    }


    const onClose = () => {
        setState({
            resetScrollOffsetY: 0
        })
        props.onClose()
    }

    return (
        <ActionSheet
            ref={actionSheetRef}
            gestureEnabled={false}
            openAnimationSpeed={4}
            keyboardHandlerEnabled={false}
            onClose={onClose}
            springOffset={150}
        >

            <View style={{height: screenHeight * 0.7 }} />

            <View style={styles.sheetView}>

                <View style={styles.sheetHeader}>
                    <Text style={{color: '#777'}}>
                        33 comments
                    </Text>
                </View>


                <ScrollView
                    ref={scrollRef}
                    style={{flex: 1}}
                    scrollEnabled={true}
                    nestedScrollEnabled={true}
                    onScroll={e => setState({scrollOffsetY: e.nativeEvent.contentOffset.y})}
                    onScrollEndDrag={() =>
                        actionSheetRef.current?.handleChildScrollEnd()
                    }
                    onScrollAnimationEnd={() =>
                        actionSheetRef.current?.handleChildScrollEnd()
                    }
                    onMomentumScrollEnd={() =>
                        actionSheetRef.current?.handleChildScrollEnd()
                    }
                >

                    <FlatList
                        style={styles.sheetContent}
                        data={Array.from(new Array(20).keys()).map(i => ({
                            id: i,
                        }))}
                        scrollEnabled={true}
                        keyExtractor={(item: any) => item.id}
                        renderItem={() => (
                            <CommentItem
                                showSeparator={true}
                                subComment={[]}
                                onPressAvatar={onPressAvatar}
                                onPressReply={onPressReply}
                            />
                        )}
                    />
                </ScrollView>


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
                                style={{color: state.contentText ? '#333' : '#ddd'}}>
                                {state.contentText
                                    ? state.contentText
                                    : useLanguage.say_something}
                            </Text>
                        </View>
                        <TouchableHighlight
                            underlayColor={'none'}
                            onPress={() => console.log('发布发布')}>
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
            </View>

            <AweKeyboard
                visible={state.keyboardVisible}
                contentText={state.contentText}
                onClose={() => setState({keyboardVisible: false})}
                onChangeText={(contentText) => setState({contentText})}
            />
        </ActionSheet>
    );
};

const styles = StyleSheet.create({
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
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 10,
        borderTopWidth: 1,
        borderTopColor: '#ebebeb',
        backgroundColor: '#fff'
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

export default PostCommentSheet;
