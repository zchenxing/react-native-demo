import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import AweSimpleNavigator from '../../../components/awe-simple-navigator';
import {useLanguage} from '../../../language';
import {NavigateProps} from '../../../interface';
import IconFont from '../../../assets/iconfont';
import {useSetState} from 'ahooks';
import AnimalCard from '../../components/animal-card';
import {
    AnimalCardType,
    ShareAnimalProps,
    ShareProps,
} from '../../components/animal-card/type';
import axios from 'axios';
import apis from '../../../network/apis';
import {usePublishDataStore} from '../../../store/provider';
import {PostType} from '../../../enum';
import Utils from '../../../help';
import {shareSpeciesTags} from '../../../config/type';
import { GOOGLE_KEY, isIOS } from "../../../config/contant";
import ReactNativeBlobUtil from 'react-native-blob-util';

interface IState {
    startIndex: number;
    preview: boolean;
    inputHeight: number;
    postContent: string;
    googleMapPic: string

    publishTag: any;
    shareData: ShareProps | null;
    animalData: ShareAnimalProps | null;
}

const QuestPublishScreen: React.FC<NavigateProps> = (props: NavigateProps) => {
    const {shareId} = props.route.params;
    const inputRef = React.useRef<any>(null);

    const {onPublishShare, resetPublishData} = usePublishDataStore();

    const [state, setState] = useSetState<IState>({
        publishTag: null,
        startIndex: 0,
        preview: false,
        inputHeight: 170,
        postContent: '',
        shareData: null,
        animalData: null,
        googleMapPic: 'file:///data/user/0/com.myapp/files/ReactNativeBlobUtilTmp_0z6za4iwdb339ku46ubwib.png'
    });

    React.useEffect(() => {
        resetPublishData();
        getCheckShare();
        getAnimalInfo();
    }, []);

    /**
     * 获取基础的分享数据
     */
    const getCheckShare = async () => {
        try {
            const res = await axios.get(apis.ecotopia.quest.base(shareId));
            const shareData: ShareProps = res.data;
            // 设置生物物种
            const tag = shareSpeciesTags[shareData.animal_category];

            setState({
                publishTag: tag,
                shareData,
            });


            // getGoogleMap({
            //     zoom: 16,
            //     lng: 104.062805, // res.data.geo_round.lng
            //     lat: 30.546428   // res.data.geo_round.lat
            // })

        } catch (err) {
            console.log(err);
        }
    };

    /**
     * 获取生物基础数据
     */
    const getAnimalInfo = async () => {
        try {
            const res = await axios.get(apis.ecotopia.quest.info(shareId));

            const animalData: ShareAnimalProps = {
                ...res.data,
                // 生成图片URL
                imageUrls: res.data.images.map((url: string) => {
                    return apis.ecotopia.quest.image(shareId, url);
                }),
            };

            setState({
                animalData,
            });
        } catch (err) {
            console.log(err);
        }
    };


    const getGoogleMap = async (values: {
        zoom: number;
        lng: number;
        lat: number;
    }) => {

        const googleMap = `http://maps.googleapis.com/maps/api/staticmap?maptype=roadmap&zoom=16&center=${values.lat},${values.lng}&size=640x428&markers=anchor:center%7Cicon:https://goo.gl/5y3S82%7C${values.lat},${values.lng}&key=${GOOGLE_KEY}`
        // 先下载图片到缓存
        const blob = await ReactNativeBlobUtil.config({
            fileCache: true,
            appendExt: 'png',
        }).fetch('GET', googleMap);

        // 获取路径
        const uri = !isIOS ? 'file://' + blob.data : '' + blob.data;

        console.log(uri);
        setState({
            googleMapPic: uri
        })
    }


    const onPressSubmit = async () => {

        const data = {
            googleMapPic: state.googleMapPic,

            label: state.publishTag.name,
            type: PostType.Entrust,
            content: Utils.removeSpaceAndEnter(
                state.postContent || useLanguage.share,
            ),
            entrust: {
                shared_entrust_id: shareId,
                device_info: {
                    device_id: state.shareData?.device_id,
                    uuid: state.shareData?.uuid,
                    product_model: state.shareData?.product_model,
                    geo_round_image_id: '',
                    geo_round: state.shareData?.geo_round,
                    platform: state.shareData?.platform
                },
                biological_info: {
                    biological_id: state.shareData?.biological_id,
                    biological_base: state.animalData?.biological_base,
                    image_ids: [],
                },
            },
        };

        onPublishShare(
            data,
            state.animalData?.imageUrls || [],
            AnimalCardType.QuestType,
        );

        props.navigation.goBack();
    };

    return (
        <>
            <AweSimpleNavigator
                centerTitle={useLanguage.create_post}
                goBack={props.navigation.goBack}
                rightActionTitle={'Post'}
                rightActionEvent={onPressSubmit}
                rightActionEditable={true}
            />

            <View style={styles.labelHeader}>
                {state.publishTag && (
                    <>
                        <IconFont
                            style={{marginRight: 10}}
                            size={18}
                            name={state.publishTag.icon}
                            color={'#fff'}
                        />
                        <Text style={styles.labelText}>
                            {state.publishTag.name}
                        </Text>
                    </>
                )}
            </View>

            <ScrollView style={styles.container} scrollEnabled={true}>
                <View style={{padding: 10}}>

                    <TextInput
                        ref={inputRef}
                        value={state.postContent}
                        onChangeText={text => {
                            setState({postContent: text});
                        }}
                        placeholder={'Share your content'}
                        multiline={true}
                        keyboardType="default"
                        textAlignVertical={'top'}
                        style={{height: state.inputHeight}}
                        maxLength={300}
                        onContentSizeChange={event => {
                            setState({
                                inputHeight: Math.max(
                                    170,
                                    event.nativeEvent.contentSize.height,
                                ),
                            });
                        }}
                    />
                </View>

                <View
                    style={{
                        paddingTop: 10,
                        padding: 20,
                    }}>
                    <AnimalCard
                        showOtherInfo={true}
                        animalType={AnimalCardType.QuestType}
                        googleMapPic={state.googleMapPic}
                        speciesType={state.shareData?.animal_category}
                        shareData={state.shareData}
                        animalInfo={state.animalData}
                    />
                </View>



                <View style={{height: 100}} />
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    labelHeader: {
        height: 44,
        backgroundColor: '#ccc',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    labelText: {
        color: '#fff',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default QuestPublishScreen;
