import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface IProps {
    contentText: string
}

const PostArticle: React.FC<IProps> = (props: IProps) => {
    return (
        <View style={styles.container}>
            <Text selectable={true} style={styles.postText}>
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
