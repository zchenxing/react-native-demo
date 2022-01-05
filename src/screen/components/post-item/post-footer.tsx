import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import Utils from '../../../help';
import IconFont from '../../../assets/iconfont';
import { useMyThrottle } from "../../../help/throttle";

interface PostFooterProps {
    isCollection: boolean
    createdAt: string
    // 评论总数
    commentTotal: number
    onPressCollection: () => void
    onPressComment: () => void
}

const PostFooter: React.FC<PostFooterProps> = (props: PostFooterProps) => {

    const onPressCollect = useMyThrottle(() => {
        props.onPressCollection()
    }, 500);

    return (
        <View style={styles.container}>
            <Text style={{color: '#999'}}>{Utils.getPostTime(props.createdAt)}</Text>

            <View style={styles.right}>
                {/* DESC --- 收藏 --- */}
                <TouchableHighlight
                    underlayColor={'none'}
                    onPress={onPressCollect}>
                    <View style={{padding: 5, paddingRight: 10}}>
                        {!props.isCollection ? (
                            <IconFont name={'weishoucang'} size={20} />
                        ) : (
                            <IconFont name={'yishoucang'} size={20} color={'#FFD575'} />
                        )}
                    </View>
                </TouchableHighlight>
                {/* DESC --- 评论 --- */}
                <TouchableHighlight underlayColor={'none'} onPress={props.onPressComment}>
                    <View style={{padding: 5, flexDirection: 'row'}}>
                        <IconFont
                            name={'pinglun'}
                            size={20}
                        />
                        <Text>
                            {' '}{props.commentTotal}
                        </Text>
                    </View>
                </TouchableHighlight>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    right: {
        flexDirection: 'row',
    },
});

export default React.memo(PostFooter);
