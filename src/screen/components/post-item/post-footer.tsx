import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import Utils from '../../../utils';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-simple-toast';

interface PostFooterProps {
    onPressComment: () => void
}

const PostFooter: React.FC<PostFooterProps> = (props: PostFooterProps) => {
    const [collection, setCollection] = React.useState(false);

    const onPressCollect = (status: boolean) => {
        Toast.show(status ? '收藏' : '取消收藏');
        setCollection(status);
    };


    return (
        <View style={styles.container}>
            <Text>{Utils.getPostTime('2021-12-05 12:00:33')}</Text>

            <View style={styles.right}>
                <TouchableHighlight
                    underlayColor={'none'}
                    onPress={() => onPressCollect(!collection)}>
                    <View style={{padding: 5, paddingRight: 10}}>
                        {collection ? (
                            <Icon
                                name={'star'}
                                style={{fontSize: 20, color: '#FFD575'}}
                            />
                        ) : (
                            <Icon name={'star-o'} style={{fontSize: 20}} />
                        )}
                    </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor={'none'} onPress={props.onPressComment}>
                    <View style={{padding: 5, flexDirection: 'row'}}>
                        <Icon
                            name={'commenting-o'}
                            style={styles.commentIcon}
                        />
                        <Text>99+</Text>
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
    commentIcon: {
        fontSize: 20,
        paddingRight: 5,
        transform: [
            {
                translateY: -2,
            },
        ],
    },
});

export default React.memo(PostFooter);
