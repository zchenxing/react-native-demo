import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import Utils from '../../help';
import {themeColor} from '../../assets/styles';
import FastImage from 'react-native-fast-image';
import {screenWidth} from '../../config/contant';
import AwePicturePreview from '../../components/awe-picture-preview';
import {useBoolean} from 'ahooks';
import {PostContentProps, PostImageProps} from '../../interface/work';
import IconFont from '../../assets/iconfont';
import { PostType } from "../../enum";
import { postType } from "../../config/type";
import AweProgressiveImage from "../../components/awe-progressive-image";

interface IProps {
    postType: PostType,
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
                        <Text style={styles.tagText}>
                            {props.postDetail?.label}
                        </Text>
                    </View>
                    {(props.postType === PostType.BiologicalCard ||
                        props.postType === PostType.Entrust) && (
                        <View style={styles.tag}>
                            <IconFont
                                // @ts-ignore
                                name={postType[props.postType].icon}
                                color={themeColor}
                                size={10}
                                style={{marginTop: 3, marginRight: 3}}
                            />
                            <Text style={styles.tagText}>
                                {postType[props.postType].title}
                            </Text>
                        </View>
                    )}
                </View>
                <Text style={styles.postTime}>
                    {Utils.getPostTime(props.postDetail?.created_at)}
                </Text>
            </View>

            <Text selectable={true}>{props.postDetail?.content}</Text>

            {props.postDetail?.images && (
                <>
                    {props.postDetail.images.map(
                        (item: PostImageProps, index: number) => (
                            <TouchableHighlight
                                key={item.id}
                                onPress={() => onPressPicture(index)}
                                style={{borderRadius: 10}}
                                underlayColor={'#f2f2f2'}>
                                <AweProgressiveImage
                                    thumbnailSource={{uri: item.url_thumb}}
                                    source={{uri: item.url_normal}}
                                    width={screenWidth - 35}
                                    height={screenWidth * 0.5}
                                    containerStyle={styles.image}
                                />
                            </TouchableHighlight>
                        ),
                    )}

                    <AwePicturePreview
                        visible={visible}
                        startIndex={startIndex}
                        imageUrls={props.postDetail.images.map(
                            picture => picture.url_origin,
                        )}
                        onClick={toggle}
                    />
                </>
            )}
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
        color: '#999'
    },
    image: {

        marginTop: 10,
        borderRadius: 5,
    },
});

export default PostContent;
