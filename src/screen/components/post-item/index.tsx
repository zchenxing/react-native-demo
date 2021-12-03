import React from 'react';
import { View, StyleSheet } from "react-native";
import {PostItemProps} from './type';
import PostHeader from './post-header';
import PostArticle from './post-article';
import { pictureList } from "../../../mock";
import PostPicture from "./post-picture";


const pictureUri: string[] = pictureList.map(pic => pic.uri)

const PostItem: React.FC<PostItemProps> = (props: PostItemProps) => {


    return (
        <View style={styles.itemContent}>

            <PostHeader />

            <PostArticle />

            <PostPicture pictureUri={pictureUri} />

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
