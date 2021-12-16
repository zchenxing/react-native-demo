import React from 'react';
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    Text,
    View,
} from 'react-native';
import PostItem from '../post-item';
import AwePicturePreview from '../../../components/awe-picture-preview';
import PostCommentSheet from '../post-comments-sheet';
import { useLanguage } from "../../../language";
import { useSetState } from "ahooks";

interface IState {
    pictureVisible: boolean
    pictureStartIndex: number
    pictureList: any[]
    commentVisible: boolean
}

const PostList: React.FC<PostListProps> = (props: PostListProps) => {

    const sheetRef = React.useRef<any>(null)

    const [state, setState] = useSetState<IState>({
        pictureVisible: false,
        pictureStartIndex: 0,
        pictureList: [],
        commentVisible: false
    })

    React.useImperativeHandle(props.cRef, () => ({
        openCommentSheet: (offsetY: number) => {
            setState({
                commentVisible: true
            })
            sheetRef.current.setScrollOffsetY(offsetY)
        }
    }))


    const loadMore = () => {
        return props.moreLoading ? (
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


    /**
     * 浏览图片
     * @param pictures
     * @param startIndex
     */
    const onPressPicture = (pictures: any[], startIndex: number) => {

        const list = pictures.map(picture => (picture.uri));

        setState({
            pictureVisible: true,
            pictureStartIndex: startIndex,
            pictureList: list
        })

    };

    /**
     * 查看评论
     */
    const onPressComment = () => {
        setState({
            commentVisible: true
        })
    };



    return (
        <>
            <FlatList
                data={props.dataSource}
                removeClippedSubviews={true}
                keyExtractor={item => item.id}
                ListFooterComponent={() => loadMore()}
                onEndReached={props.onLoadMoreData}
                refreshControl={
                    <RefreshControl
                        refreshing={props.refreshing}
                        onRefresh={props.onRefreshData}
                    />
                }
                renderItem={(item: any) => (
                    <PostItem
                        {...item}
                        onPressDetail={props.onPressDetail}
                        onPressPicture={onPressPicture}
                        onPressComment={onPressComment}
                        onPressPersonal={props.onPressPersonal}
                    />
                )}

            />

            <AwePicturePreview
                visible={state.pictureVisible}
                onClick={() => setState({pictureVisible: false})}
                imageUrls={state.pictureList}
                startIndex={state.pictureStartIndex}
            />

            <PostCommentSheet
                cRef={sheetRef}
                sheetId={props.sheetId}
                onPressAvatar={props.onPressPersonal}
                visible={state.commentVisible}
                onClose={() => setState({commentVisible: false})}
            />
        </>
    );
};

export default PostList;
