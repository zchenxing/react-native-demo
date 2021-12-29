import React from 'react';
import {Image, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {pictureList} from '../../mock';
import {screenWidth} from '../../config/contant';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSetState } from "ahooks";
import {useLanguage} from '../../language';
import AwePicturePreview from '../../components/awe-picture-preview';
import { WebView } from "react-native-webview";
import PostAnimalCard from '../components/post-item/post-animal-card';

interface IProps {
    onPressMore: (offset: number, isPutAway: boolean) => void
}

interface IState {
    showMoreInfo: boolean
    pictureVisible: boolean
    pictureIndex: number
    mapLoading: boolean
}

const pictures = [...pictureList].splice(0, 2)

const PastCard: React.FC<IProps> = (props: IProps) => {

    const positionY = React.useRef<number>(0)

    const [state, setState] = useSetState<IState>({
        showMoreInfo: false,
        pictureVisible: false,
        pictureIndex: 0,
        mapLoading: true
    })

    React.useEffect(() => {

        setTimeout(() => {
            setState({
                mapLoading: false
            })
        }, 800)

    }, [])


    const onPressMore = () => {
        setState({
            showMoreInfo: !state.showMoreInfo
        })
        props.onPressMore(positionY.current, !state.showMoreInfo)
    }



    const onPressPicture = (index: number) => {
        setState({
            pictureIndex: index,
            pictureVisible: true
        })
    }

    return (
        <>
            <View style={styles.container}>
                <View style={styles.card}>

                    <View style={styles.gradient}>


                        <PostAnimalCard />


                        <View style={styles.moreBase} onLayout={e => {positionY.current = e.nativeEvent.layout.y}}>
                            <View style={styles.moreInfo}>
                                {state.showMoreInfo && (
                                    <>



                                        {/*<Text style={styles.specialTitle}>*/}
                                        {/*    {useLanguage.animal_special} (cm)*/}
                                        {/*</Text>*/}

                                        {/*{[1, 2, 3, 4, 5, 6, 7].map(i => (*/}
                                        {/*    <View*/}
                                        {/*        key={i}*/}
                                        {/*        style={styles.moreInfoItem}>*/}
                                        {/*        <Text*/}
                                        {/*            style={*/}
                                        {/*                styles.moreInfoItemTitle*/}
                                        {/*            }>*/}
                                        {/*            特征*/}
                                        {/*        </Text>*/}
                                        {/*        <Text*/}
                                        {/*            style={styles.moreInfoItemText}>*/}
                                        {/*            222*/}
                                        {/*        </Text>*/}
                                        {/*    </View>*/}
                                        {/*))}*/}
                                    </>
                                )}

                                <TouchableHighlight onPress={onPressMore}>
                                    <View
                                        style={[
                                            styles.moreButton,
                                            {
                                                bottom: state.showMoreInfo ? -33 : -22,
                                            },
                                        ]}>
                                        <Text style={{color: '#999'}}>
                                            {
                                                state.showMoreInfo ?
                                                    useLanguage.show_less :
                                                    useLanguage.show_more
                                            }
                                        </Text>
                                        <Icon
                                            name={state.showMoreInfo ? 'angle-double-up' : 'angle-double-down'}
                                            style={styles.showMoreAngle}
                                        />
                                    </View>
                                </TouchableHighlight>
                            </View>
                        </View>

                    </View>

                    <View style={{height: 300}}>
                        {
                            !state.mapLoading &&
                            <WebView
                                automaticallyAdjustContentInsets={false}
                                source={{
                                    uri: 'https://www.google.com/maps'
                                }}
                            />}
                    </View>

                </View>
            </View>


            <AwePicturePreview
                startIndex={state.pictureIndex}
                visible={state.pictureVisible}
                imageUrls={pictures.map(data => data.uri)}
                onClick={() => setState({pictureVisible: false})}
            />

        </>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: '#f8f8f8',
    },
    card: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
        overflow: 'hidden',
        position: 'relative',
    },
    cardHeader: {
        width: '100%',
        height: 69,
    },
    gradient: {
        justifyContent: 'flex-end',
    },
    animalPicture: {
        flexDirection: 'row',
        paddingTop: 70,
        paddingLeft: 4,
        paddingBottom: 20,
    },
    animalPictureItem: {
        height: (screenWidth - 50) / 2,
        marginLeft: 3,
        borderRadius: 5,
    },
    animalName: {
        position: 'absolute',
        top: 13,
        left: 0,
        right: 0,
        fontSize: 15,
        fontWeight: '600',
        textAlign: 'center',
        color: '#fff',
    },
    animalBase: {
        width: 78,
        height: 78,
        borderRadius: 78,
        position: 'absolute',
        borderColor: '#fff',
        borderWidth: 3,
        left: '50%',
        top: 40,
        transform: [{translateX: -39}],
    },
    animalInfo: {
        paddingTop: 10,
        paddingLeft: 10,
        height: 65,
        flexDirection: 'row',
        flexWrap: 'wrap',
        overflow: 'hidden',
        transform: [{translateY: -10}],
    },
    animalInfoItem: {
        marginRight: 13,
        backgroundColor: '#c1e3e6',
        padding: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 5,
        marginBottom: 8,
        borderRadius: 15,
    },
    animalInfoItemText: {
        fontSize: 12,
        color: '#666',
    },
    moreBase: {
        paddingTop: 20,
        padding: 15,
    },
    moreInfo: {
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        paddingTop: 10,
        paddingBottom: 20,
        position: 'relative',
    },
    specialTitle: {
        color: '#999',
    },
    moreInfoItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingTop: 10,
        paddingBottom: 10,
    },
    moreInfoItemTitle: {
        color: '#999',
        fontSize: 12,
    },
    moreInfoItemText: {
        color: '#333',
        fontSize: 15,
        paddingTop: 5,
    },
    moreButton: {
        alignItems: 'center',
        position: 'absolute',
        left: '50%',
        width: 135,
        transform: [{translateX: -135 / 2}],
        backgroundColor: '#fff',
        paddingLeft: 5,
        paddingRight: 5
    },
    showMoreAngle: {
        fontSize: 16,
        marginTop: 5,
        color: '#999'
    }

});

export default PastCard;
