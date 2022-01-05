import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {themeColor} from '../../../assets/styles';
import {screenWidth} from '../../../config/contant';

interface IProps {
    biologicalBase: {
        name: string;
        species: string;
    };
    avatar: string;
    mapPicture: string;
}

const PostQuest: React.FC<IProps> = (props: IProps) => {
    return (
        <View>
            <View style={styles.container}>
                <View style={styles.headerBase}>
                    <Image
                        source={require('../../../assets/images/card_header.png')}
                        style={styles.headerImg}
                    />

                    <View style={styles.headerContent}>
                        <View style={styles.imgBase}>
                            <Image
                                source={{uri: props.avatar}}
                                style={styles.image}
                            />
                        </View>
                        <View style={styles.contentBase}>
                            <Text style={{color: themeColor}}>
                                {props.biologicalBase.species}
                            </Text>
                            <Text>
                                {props.biologicalBase.name}
                            </Text>
                        </View>
                    </View>
                </View>

                <Image
                    style={styles.mapImg}
                    source={{
                        uri: props.mapPicture,
                    }}
                />
            </View>

            {/*<View style={styles.dateBase}>*/}
            {/*    <Text>有效期</Text>*/}
            {/*    <Text>丢失 xxxx 天</Text>*/}
            {/*</View>*/}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: themeColor,
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 5,
    },
    headerBase: {
        height: 95,
        justifyContent: 'flex-end',
    },
    headerImg: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        resizeMode: 'stretch',
    },
    headerContent: {
        backgroundColor: '#fff',
        height: 50,
        flexDirection: 'row',
    },
    imgBase: {
        width: 100,
        height: '100%',
    },
    image: {
        width: 78,
        height: 78,
        position: 'absolute',
        bottom: 5,
        left: 20,
        borderRadius: 100,
        borderColor: '#fff',
        borderWidth: 2,
    },
    contentBase: {
        flex: 1,
        padding: 5,
    },
    mapImg: {
        width: screenWidth - 40,
        height: screenWidth * 0.6,
    },
    dateBase: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default PostQuest;
