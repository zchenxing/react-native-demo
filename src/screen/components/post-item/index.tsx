import React from 'react';
import {StyleSheet, TouchableHighlight} from 'react-native';
import {PostItemProps} from './type';
import PostHeader from './post-header';
import PostArticle from './post-article';
import {pictureList} from '../../../mock';
import PostPicture from './post-picture';
import PostFooter from './post-footer';
import PostAnimalCard from './post-animal-card';
import {PostUserEventType} from '../../../enum';
import WorkHelp from '../../../help/work';

const PostItem: React.FC<PostItemProps> = (props: PostItemProps) => {


    React.useEffect(() => {}, []);

    const onPressPicture = (startIndex: number) => {
        props.onPressPicture(pictureList, startIndex);
    };

    return (
        <TouchableHighlight
            style={styles.itemContent}
            onPress={() => props.onPressDetail(props.postItem)}
            underlayColor={'#eee'}>
            <>
                <PostHeader
                    userNickname={props.postItem.user_info.nickname}
                    userAvatar={props.postItem.user_info.avatar}
                    label={props.postItem.label}
                    hiddenFollow={props.hiddenFollow}
                    handleUser={props.onPressPersonal}
                />

                <PostArticle contentText={props.postItem.content} />

                {/*{props.index % 2 !== 0 ? (*/}
                {/*    <PostPicture*/}
                {/*        pictureUri={pictureList}*/}
                {/*        onPressPicture={onPressPicture}*/}
                {/*    />*/}
                {/*) : (*/}
                {/*    <PostAnimalCard />*/}
                {/*)}*/}

                {/*<PostAnimalCard />*/}

                <PostFooter
                    isCollection={
                        WorkHelp.userEventExist(
                            props.postItem.user_events,
                            PostUserEventType.Collection,
                        ).isExist
                    }
                    createdAt={props.postItem.created_at}
                    commentTotal={props.postItem.total_comment}
                    onPressCollection={props.onPressCollection}
                    onPressComment={props.onPressComment}
                />
            </>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    itemContent: {
        padding: 20,
        paddingBottom: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 10,
        borderBottomColor: '#F8F8F8',
    },
});

export default PostItem;
