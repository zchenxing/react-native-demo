import React from 'react';
import {View, StyleSheet, TouchableHighlight} from 'react-native';
import {PostItemProps} from './type';
import PostHeader from './post-header';
import PostArticle from './post-article';
import {pictureList} from '../../../mock';
import PostPicture from './post-picture';
import PostFooter from './post-footer';
import PostAnimalCard from "./post-animal-card";

const PostItem: React.FC<PostItemProps> = (props: PostItemProps) => {
    React.useEffect(() => {
        // console.log(props);
    }, []);

    const onPressPicture = (startIndex: number) => {
        props.onPressPicture(pictureList, startIndex);
    };

    return (
        <TouchableHighlight
            style={styles.itemContent}
            onPress={props.onPressDetail}
            underlayColor={'#eee'}
        >
            <>
                <PostHeader />

                <PostArticle />

                {
                    props.index % 2 !== 0 ?
                        <PostPicture
                            pictureUri={pictureList}
                            onPressPicture={onPressPicture}
                        />:
                        <PostAnimalCard />
                }



                <PostFooter onPressComment={props.onPressComment} />
            </>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    itemContent: {
        padding: 20,
        paddingBottom: 20,
    },
});

export default PostItem;
