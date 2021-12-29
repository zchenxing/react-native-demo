import React from "react";
import { ScrollView, StyleSheet, TouchableHighlight, View } from "react-native";
import FastImage from "react-native-fast-image";
import { screenWidth } from "../../../config/contant";
import { useSetState } from "ahooks";
import AwePicturePreview from "../../../components/awe-picture-preview";

interface IProps {
    imageUrls: string[]
}

interface IState {
    pictureVisible: boolean;
    pictureIndex: number;
}

const AnimalMorePicture: React.FC<IProps> = (props: IProps) => {

    const [state, setState] = useSetState<IState>({
        pictureVisible: false,
        pictureIndex: 0,
    });

    const onPressPicture = (index: number) => {
        setState({
            pictureIndex: index,
            pictureVisible: true,
        });
    };


    return (
        <>

            <View style={styles.pictures}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={styles.scrollView}>
                    {props.imageUrls.map((picture, index) => (
                        <TouchableHighlight
                            key={picture}
                            underlayColor={'none'}
                            onPress={() => onPressPicture(index)}>
                            <FastImage
                                source={{uri: picture}}
                                style={styles.pictureItem}
                            />
                        </TouchableHighlight>
                    ))}
                </ScrollView>
            </View>

            {props.imageUrls && (
                <AwePicturePreview
                    startIndex={state.pictureIndex}
                    visible={state.pictureVisible}
                    imageUrls={props.imageUrls.map(url => url)}
                    onClick={() => setState({pictureVisible: false})}
                />
            )}
        </>

    );
};


const styles = StyleSheet.create({
    pictures: {
        flexDirection: 'row',
        width: screenWidth,
        left: -20,
        paddingRight: 35,
    },
    scrollView: {
        paddingLeft: 20,
        paddingRight: 140,
        overflow: 'visible',
    },
    pictureItem: {
        borderWidth: 1,
        borderColor: '#f8f8f8',
        marginRight: 5,
        borderRadius: 6,
        width: (screenWidth - 30) / 3.2,
        height: (screenWidth - 30) / 3.2,
    },
})

export default AnimalMorePicture;
