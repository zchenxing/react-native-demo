import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface IProps {
    contentText: string
}

const PostArticle: React.FC<IProps> = (props: IProps) => {
    return (
        <View style={styles.container}>
            <Text selectable={true} style={styles.postText}>
                {/*I am excited to share the latest trajectory of the seagulls. It has been 3 months since the first data acquisition.*/}
                {/*I am excited to share the latest trajectory of the seagulls. It has been 3 months since the first data acquisition.*/}
                {/*{Math.floor(Math.random() * 100)}*/}

                {props.contentText}
            </Text>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingBottom: 5
    },
    postText: {
        fontSize: 15
    }
})


export default React.memo(PostArticle);
