import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    Dimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {articleStr, pictureList} from '../../../mock';
import { WebView } from "react-native-webview";
import AweButton from '../../../components/awe-button';

const pictureSize: number = Dimensions.get('window').width / 3 - 14;
const content: string = articleStr;

interface WeiboItemProps {
    onPicturePress?: (startIndex: number, pictureList: any[]) => void
}

const WeiboItem: React.FC<WeiboItemProps> = (props: WeiboItemProps) => {

    const onPreviewPicture = (index: number) => {
        props.onPicturePress && props.onPicturePress(index - 1, pictureList)
    }

    return (
        <View
            style={{
                backgroundColor: '#fff',
                marginBottom: 20,
                paddingBottom: 20,
            }}>
            <View style={styles.header}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                        style={styles.avator}
                        source={{
                            uri: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic3.zhimg.com%2F50%2Fv2-2bdb993d9d4069605c24d9af019e8723_hd.jpg&refer=http%3A%2F%2Fpic3.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640332643&t=729eb5b1b30363b6cd0411f98bd19501',
                        }}
                    />
                    <Text style={{marginLeft: 10, fontSize: 18}}>
                        nickname123
                    </Text>
                </View>

                <TouchableHighlight>
                    <View style={styles.focus}>
                        <Text style={{color: '#aaa'}}>关注</Text>
                    </View>
                </TouchableHighlight>
            </View>
            <View style={styles.articleContent}>
                <Text>
                    {content.length > 65
                        ? content.substring(0, 65) + '...'
                        : content}
                </Text>
            </View>

            <View style={styles.pictureList}>
                {pictureList.map(picture => {
                    return (
                        <TouchableHighlight
                            key={picture.index}
                            onPress={() => onPreviewPicture(picture.index)}
                            underlayColor={'none'}
                        >
                            <FastImage
                                style={styles.picture}
                                source={{uri: picture.uri}}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                        </TouchableHighlight>
                    );
                })}
            </View>
            <View style={{height: 300, width: Dimensions.get('window').width}}>
                <WebView
                    automaticallyAdjustContentInsets={false}
                    source={{
                        uri: 'https://leafletjs.com/examples/quick-start/example.html'
                    }}
                />
            </View>
            <View>
                <AweButton>评论</AweButton>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        height: 40,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 10,
    },
    avator: {
        width: 40,
        height: 40,
        borderRadius: 40,
    },
    focus: {
        width: 40,
        height: 24,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    articleContent: {
        paddingTop: 5,
    },
    pictureList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
    },
    picture: {
        width: pictureSize,
        height: pictureSize,
        marginRight: 5,
        marginBottom: 5,
    },
});

export default WeiboItem;
