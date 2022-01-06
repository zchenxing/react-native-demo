import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';
import IconFont from '../../assets/iconfont';

interface IProps {
    contentText: string;
    isCollection: boolean;
    onCollection: () => void;
    onPressEditComment: () => void;
}

const CommentFooter: React.FC<IProps> = (props: IProps) => {
    // @ts-ignore
    return (
        <SafeAreaView>
            <View style={styles.footer}>
                <TouchableHighlight
                    style={styles.comment}
                    underlayColor={'none'}
                    onPress={props.onPressEditComment}>
                    <Text
                        numberOfLines={1}
                        style={{color: props.contentText ? '#333' : '#aaa'}}>
                        {props.contentText || 'Say something'}
                    </Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.iconBase}
                    underlayColor={'none'}
                    onPress={() => console.log('444')}>
                    {/*@ts-ignore*/}
                    <IconFont name={'fenxiang1'} size={20} />
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.iconBase}
                    underlayColor={'none'}
                    onPress={props.onCollection}>
                    {props.isCollection ? (
                        <IconFont
                            name={'yishoucang'}
                            size={20}
                            color={'#FFD575'}
                        />
                    ) : (
                        <IconFont name={'weishoucang'} size={20} />
                    )}
                </TouchableHighlight>
            </View>
        </SafeAreaView>
    );
};

export default CommentFooter;

const styles = StyleSheet.create({
    footer: {
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        paddingLeft: 15,
        paddingRight: 10,
        paddingBottom: 20,
    },
    comment: {
        flex: 1,
        padding: 10,
        borderRadius: 30,
        marginRight: 10,
        backgroundColor: '#f8f8f8',
    },
    iconBase: {
        padding: 8,
    },
});
