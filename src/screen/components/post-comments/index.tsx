import React from 'react';
import { Text, View, Modal, StyleSheet, TextInput } from "react-native";
import ActionSheet from 'react-native-actions-sheet';
import { screenHeight, screenWidth } from "../../../config/contant";
import AweKeyboard from "../../../components/awe-keyboard";

const PostComment: React.FC = (props) => {

    const sheetRef = React.createRef<any>()

    React.useEffect(() => {
        openComments()
    }, [])

    const openComments = () => {
        sheetRef.current?.setModalVisible(true);
    }


    const closeComment = () => {
        console.log('关闭sheet');
    }

    return (
        <Modal visible={true} transparent={true}>
            <View style={styles.container}>

                <View style={styles.sheetView}>
                    <View style={styles.sheetHeader}>
                        <Text style={{color: '#777'}}>33 comments</Text>
                    </View>

                    <View style={styles.sheetContent}>

                    </View>

                </View>

            </View>
            <AweKeyboard />

        </Modal>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, .3)',
        position: 'relative'
    },
    sheetView: {
        position: "absolute",
        bottom: 0,
        width: screenWidth,
        height: screenHeight * 0.7,
    },
    sheetHeader: {
        width: screenWidth,
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sheetContent: {
        flex: 1,
        borderWidth: 3,
        borderColor: 'red'
    }
})


export default PostComment;
