import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Utils from "../../utils";
import { themeColor } from "../../assets/styles";

const PostContent: React.FC = (props) => {
    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.tag}>Bird</Text>
                    <Text style={styles.tag}>Share</Text>
                </View>
                <Text style={styles.postTime}>{Utils.getPostTime('2021-12-07 02:12:44', true)}</Text>
            </View>

            <Text>PostContent</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    postTime: {
        fontSize: 11,
        color: '#aaa'
    },
    tag: {
        paddingLeft: 5,
        paddingRight: 5,
        borderColor: themeColor,
        borderWidth: 1,
        marginRight: 5,
        color: themeColor,
        fontSize: 12,
        borderRadius: 3
    }
})

export default PostContent;
