import React from "react";
import { StyleSheet, Text, View } from "react-native";

const PostArticle: React.FC = (props) => {
    return (
        <View style={styles.container}>
            <Text selectable={true} style={styles.postText}>
                I am excited to share the latest trajectory of the seagulls. It has been 3 months since the first data acquisition.
                I am excited to share the latest trajectory of the seagulls. It has been 3 months since the first data acquisition.
                {Math.floor(Math.random() * 100)}
            </Text>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingBottom: 10
    },
    postText: {
        fontSize: 15
    }
})


export default React.memo(PostArticle);
