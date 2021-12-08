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
import PostComment from '../post-comments';
import { useLanguage } from "../../../language";

const PostList: React.FC<PostListProps> = (props: PostListProps) => {
    const [pictureVisible, setPictureVisible] = React.useState(false);
    const [pictureStartIndex, setPictureStartIndex] = React.useState<number>(0);
    const [pictureList, setPictureList] = React.useState<any[]>([]);
    const [commentVisible, setCommentVisible] = React.useState(false);


    const loadMore = () => {
        return props.moreLoading ? (
            <View>
                <ActivityIndicator />
                <Text style={{textAlign: 'center'}}>
                    {useLanguage.load_more}
                </Text>
            </View>
        ) : (
            <View>

            </View>
        );
    };


    /**
     * 浏览图片
     * @param pictures
     * @param startIndex
     */
    const onPressPicture = (pictures: any[], startIndex: number) => {
        setPictureVisible(true);
        setPictureStartIndex(startIndex);

        const list = pictures.map(picture => (picture.uri));
        setPictureList(list);
    };

    /**
     * 查看评论
     */
    const onPressComment = () => {
        setCommentVisible(true);
    };

    return (
        <>
            <FlatList
                data={props.dataSource}
                removeClippedSubviews={true}
                keyExtractor={item => item.id}
                refreshControl={
                    <RefreshControl
                        refreshing={props.refreshing}
                        onRefresh={props.onRefreshData}
                    />
                }
                renderItem={(item: any) => (
                    <PostItem
                        {...item}
                        onPressPicture={onPressPicture}
                        onPressComment={onPressComment}
                    />
                )}
                ListFooterComponent={() => loadMore()}
                onEndReached={props.onLoadMoreData}
            />

            <AwePicturePreview
                visible={pictureVisible}
                onClick={() => setPictureVisible(false)}
                imageUrls={pictureList}
                startIndex={pictureStartIndex}
            />

            <PostComment
                visible={commentVisible}
                onClose={() => setCommentVisible(false)}
            />
        </>
    );
};

export default PostList;
