import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import Utils from '../../help';
import {themeColor} from '../../assets/styles';
import {pictureList} from '../../mock';
import FastImage from 'react-native-fast-image';
import {screenWidth} from '../../config/contant';
import AwePicturePreview from '../../components/awe-picture-preview';
import {useBoolean} from 'ahooks';
import {PostContentProps} from '../../interface/work';
import IconFont from "../../iconfont";

interface IProps {
    postDetail: PostContentProps | null;
}

const PostContent: React.FC<IProps> = (props: IProps) => {
    const [visible, {toggle}] = useBoolean(false);
    const [startIndex, setStartIndex] = React.useState(0);

    const onPressPicture = (index: number) => {
        setStartIndex(index);
        toggle();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{flexDirection: 'row'}}>
                    <View style={styles.tag}>
                        <Text style={styles.tagText}>{props.postDetail?.label}</Text>
                    </View>
                    <View style={styles.tag}>
                        <IconFont
                            name={'fenxiang'}
                            color={themeColor}
                            size={10}
                            style={{marginTop: 3, marginRight: 3}}
                        />
                        <Text style={styles.tagText}>Share</Text>
                    </View>
                </View>
                <Text style={styles.postTime}>
                    {Utils.getPostTime('2021-12-07 02:12:44')}
                </Text>
            </View>

            <Text selectable={true}>{props.postDetail?.content}</Text>

            {/*{pictureList.map((item, index) => (*/}
            {/*    <TouchableHighlight*/}
            {/*        key={index}*/}
            {/*        onPress={() => onPressPicture(index)}*/}
            {/*        style={{borderRadius: 10}}*/}
            {/*        underlayColor={'#f2f2f2'}>*/}
            {/*        <FastImage*/}
            {/*            key={index}*/}
            {/*            style={styles.image}*/}
            {/*            source={{uri: item.uri}}*/}
            {/*            resizeMode={FastImage.resizeMode.cover}*/}
            {/*        />*/}
            {/*    </TouchableHighlight>*/}
            {/*))}*/}

            <AwePicturePreview
                visible={visible}
                startIndex={startIndex}
                imageUrls={pictureList.map(picture => picture.uri)}
                onClick={toggle}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    tag: {
        paddingLeft: 5,
        paddingRight: 5,
        borderColor: themeColor,
        borderWidth: 1,
        marginRight: 8,
        borderRadius: 3,
        flexDirection: 'row',
    },
    tagText: {
        color: themeColor,
        fontSize: 12,
    },
    postTime: {
        fontSize: 11,
        color: '#f8f8f8',
    },
    image: {
        width: screenWidth - 35,
        height: screenWidth * 0.5,
        marginTop: 10,
        borderRadius: 5,
    },
});

export default PostContent;
