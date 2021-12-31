import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { observer } from "mobx-react";
import { usePublishDataStore } from "../../store/provider";
import { LinearProgress } from 'react-native-elements';
import { useLanguage } from "../../language";
import IconFont from "../../iconfont";
import { themeColor } from "../../assets/styles";

const Publishing: React.FC = (props) => {

    const {publishProgress, isPublishing} = usePublishDataStore()

    return (
        isPublishing ?
        <View style={styles.container}>
            <IconFont
                // @ts-ignore
                name={'a-2xtuwenxiangqing'}
                size={26}
                style={{marginRight: 10}}
            />
            <LinearProgress

                value={publishProgress}
                color={themeColor}
                style={styles.lineProgress}
                variant="determinate"
            />
            <Text style={styles.uploading}>
                {publishProgress < 1 ? useLanguage.uploading : useLanguage.complete}
            </Text>
        </View> : <></>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 8,
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 5,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        borderTopColor: '#eee',
        borderTopWidth: 1
    },
    lineProgress: {
        flex: 1,
    },
    uploading: {
        fontSize: 12,
        color: '#999',
        paddingLeft: 10,
    }
})

export default React.memo(observer(Publishing));
