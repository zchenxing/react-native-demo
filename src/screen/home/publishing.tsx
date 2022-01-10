import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import {observer} from 'mobx-react';
import {usePublishDataStore} from '../../store/provider';
import {LinearProgress} from 'react-native-elements';
import {useLanguage} from '../../language';
import IconFont from '../../assets/iconfont';
import {themeColor} from '../../assets/styles';

interface IProps {
    onPostAgain: () => void
}

const Publishing: React.FC<IProps> = (props: IProps) => {
    const {
        publishProgress,
        isPublishing,
        happenedError,
    } =
        usePublishDataStore();


    const onPressPostFailed = () => {
        if (happenedError) {
            props.onPostAgain()
        }
    }

    return isPublishing ? (
        <TouchableHighlight underlayColor={'none'} onPress={onPressPostFailed}>
            <View style={styles.container}>
                <IconFont
                    // @ts-ignore
                    name={'a-2xtuwenxiangqing'}
                    size={26}
                    style={{marginRight: 10}}
                />

                {happenedError ? (
                    <Text style={[styles.uploading, styles.error]}>
                        {useLanguage.post_failed}
                    </Text>
                ) : (
                    <>
                        <LinearProgress
                            value={publishProgress}
                            color={themeColor}
                            style={styles.lineProgress}
                            variant="determinate"
                        />
                        <Text style={styles.uploading}>
                            {publishProgress < 1
                                ? useLanguage.uploading
                                : useLanguage.complete}
                        </Text>
                    </>
                )}
            </View>
        </TouchableHighlight>
    ) : (
        <></>
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
        borderTopWidth: 1,
    },
    lineProgress: {
        flex: 1,
    },
    uploading: {
        fontSize: 12,
        color: '#999',
        paddingLeft: 10,
    },
    error: {
        color: '#FF6161',
    },
});

export default React.memo(observer(Publishing));
