import React from 'react';
import { View, Dimensions, StyleSheet} from 'react-native';
import {AweImageRankProps} from './type';
import FastImage from 'react-native-fast-image';

const width = Dimensions.get('window').width;
const height = 200;

type SizeProp = {
    w: number;
    h: number;
};

const mySort = {
    1: [{w: 1, h: 1}],
    2: [
        {w: 0.5, h: 1},
        {w: 0.5, h: 1},
    ],
    3: [
        {w: 0.5, h: 1},
        {w: 0.5, h: 0.5},
        {w: 0.5, h: 0.5},
    ],
    4: [
        {w: 1, h: 1},
        {w: 0.5, h: 1 / 3},
        {w: 0.5, h: 1 / 3},
        {w: 0.5, h: 1 / 3},
    ],
    5: [
        {w: 0.5, h: 0.6},
        {w: 0.5, h: 0.6},
        {w: 1 / 3, h: 0.4},
        {w: 1 / 3, h: 0.4},
        {w: 1 / 3, h: 0.4},
    ],
};

const AweImageRank: React.FC<AweImageRankProps> = (
    props: AweImageRankProps,
) => {
    const [sizeList, setSizeList] = React.useState<SizeProp[]>([]);

    React.useEffect(() => {
        const length = props.images.length;
        // @ts-ignore
        const list = length > 5 ? mySort[5] : mySort[length];
        setSizeList(list);
    }, [props.images]);

    return props.images.length && sizeList.length ? (
        <View style={styles.container}>
            {[...props.images]
                .splice(0, 5)
                .map((image: string, index: number) => {
                    const w = sizeList[index].w * width;
                    const h = sizeList[index].h * height;

                    return (
                        <View
                            key={image}
                            style={[
                                styles.imageContent,
                                {width: w, height: h},
                            ]}>
                            <FastImage
                                style={styles.image}
                                source={{uri: image}}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                        </View>
                    );
                })}
        </View>
    ) : (
        <View />
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 'auto',
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderRadius: 20,
        overflow: 'hidden',
    },
    imageContent: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 3,
    },
    image: {
        width: '100%',
        height: '100%',
    },
});

export default AweImageRank;
