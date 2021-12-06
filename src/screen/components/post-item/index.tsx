import React from 'react';
import { View, StyleSheet } from "react-native";
import {PostItemProps} from './type';
import PostHeader from './post-header';
import PostArticle from './post-article';
import { pictureList } from "../../../mock";
import PostPicture from './post-picture';

const PostItem: React.FC<PostItemProps> = (props: PostItemProps) => {

    React.useEffect(() => {
        // console.log(props);
    }, [])

    const onPressPicture = (startIndex: number) => {
        props.onPressPicture(pictureList, startIndex)
    }

    return (
        <View style={styles.itemContent}>

            <PostHeader />

            <PostArticle />

            <PostPicture
                pictureUri={pictureList}
                onPressPicture={onPressPicture}
            />

        </View>
    );
};


const styles = StyleSheet.create({
    itemContent: {
        padding: 10,
        paddingBottom: 20,
    },
})

export default PostItem;
