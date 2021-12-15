import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    TouchableHighlight, ScrollView
} from "react-native";
import {screenHeight, screenWidth} from '../../../config/contant';
import {Image} from 'react-native-elements';
import {useLanguage} from '../../../language';
import AweKeyboard from '../../../components/awe-keyboard';
import {PostCommentsProps} from './type';
import {avatarUrl, postList} from '../../../mock';
import CommentItem from './comment-item';
import { themeColor } from "../../../assets/styles";
import ActionSheet from 'react-native-actions-sheet';

const PostComment: React.FC<PostCommentsProps> = (props: PostCommentsProps) => {
    const actionSheetRef = React.createRef<any>();

    const [contentText, setContentText] = React.useState<string>('');
    const [keyboardVisible, setKeyboardVisible] = React.useState(false);

    React.useEffect(() => {

        if (props.visible) {
            openComments();
        }

    }, [props.visible]);

    /**
     * 打开 SheetView
     */
    const openComments = () => {
        actionSheetRef.current?.setModalVisible(true);
    };


    const onPressReply = () => {

    }


    return (
        <ActionSheet
            ref={actionSheetRef}
            gestureEnabled={false}
            keyboardHandlerEnabled={false}
            onClose={props.onClose}
            springOffset={150}
        >

            <View style={{height: screenHeight * 0.7 }} />

            <View style={styles.sheetView}>

                <View style={styles.sheetHeader}>
                    <Text style={{color: '#777'}}>33 comments</Text>
                </View>


                <ScrollView
                    style={{flex: 1}}
                    scrollEnabled={true}
                    nestedScrollEnabled={true}
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
                        data={Array.from(new Array(10).keys()).map(i => ({
                            id: i,
                        }))}
                        scrollEnabled={true}
                        keyExtractor={(item: any) => item.id}
                        renderItem={() => (
                            <CommentItem
                                showSeparator={true}
                                subComment={[]}
                                onPressReply={onPressReply}
                            />
                        )}
                    />
                </ScrollView>


                <TouchableHighlight
                    underlayColor={'none'}
                    onPress={() => setKeyboardVisible(true)}>
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
                                style={{color: contentText ? '#333' : '#ddd'}}>
                                {contentText
                                    ? contentText
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
                                        opacity: contentText ? 1 : 0.7,
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
                visible={keyboardVisible}
                contentText={contentText}
                onClose={() => setKeyboardVisible(false)}
                onChangeText={setContentText}
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

export default PostComment;
