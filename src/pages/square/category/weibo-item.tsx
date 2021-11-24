import React from 'react';
import {Image, StyleSheet, Text, TouchableHighlight, View} from 'react-native';

const content: string =
    '啃啃覅， 器我觉得🙃群殴我级景区我，看嘛hi较为较为我赔款平都去我品偶读， 器我觉得🙃群殴我级景区我，请勿断开强迫我看到破。器我觉得迫切我飓风破集卡片群殴我看发迫切我看的前雾灯看破我驱蚊扣 。却无法几千万破旧房迫切我驱蚊，驱蚊大秦网的剧情片我 ， 器我觉得🙃群殴我级景区我，器我觉得破孔雀窝破 ， 器我觉得🙃群殴我级景区我，强迫我就都抛弃我开疾跑哦';

const WeiboItem: React.FC<any> = (props: any) => {
    return (
        <View style={{backgroundColor: '#fff', marginBottom: 20, paddingBottom: 20}}>
            <View style={styles.header}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                        style={styles.avator}
                        source={{
                            uri: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic3.zhimg.com%2F50%2Fv2-2bdb993d9d4069605c24d9af019e8723_hd.jpg&refer=http%3A%2F%2Fpic3.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640332643&t=729eb5b1b30363b6cd0411f98bd19501',
                        }}
                    />
                    <Text style={{marginLeft: 10, fontSize: 18}}>nickname123</Text>
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
});

export default WeiboItem;
