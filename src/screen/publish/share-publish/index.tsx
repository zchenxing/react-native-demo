import React from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import AweSimpleNavigator from "../../../components/awe-simple-navigator";
import { useLanguage } from "../../../language";
import { NavigateProps } from "../../../interface";
import IconFont from "../../../assets/iconfont";
import { useSetState } from "ahooks";
import AnimalCard from "../../components/animal-card";
import { AnimalCardType, ShareAnimalProps, ShareProps } from "../../components/animal-card/type";
import axios from "axios";
import apis from "../../../network/apis";
import { usePublishDataStore } from "../../../store/provider";
import { PostType } from "../../../enum";
import Utils from "../../../help";
import { shareSpeciesTags } from "../../../config/type";

interface IState {
    startIndex: number;
    preview: boolean;
    inputHeight: number;
    postContent: string;

    publishTag: any;
    shareData: ShareProps | null;
    animalData: ShareAnimalProps | null;
}

const SharePublishScreen: React.FC<NavigateProps> = (props: NavigateProps) => {
    const {shareId} = props.route.params;
    const inputRef = React.useRef<any>(null);

    const {onPublishShare, resetPublishData, draftBox} = usePublishDataStore()

    const [state, setState] = useSetState<IState>({
        publishTag: null,
        startIndex: 0,
        preview: false,
        inputHeight: 170,
        postContent: '',
        shareData: null,
        animalData: null,
    });

    React.useEffect(() => {
        if (draftBox && draftBox.postType === PostType.BiologicalCard) {
            setState({
                postContent: draftBox.data.content
            })
        }
        resetPublishData()
        getCheckShare();
        getAnimalInfo();
    }, []);

    /**
     * 获取基础的分享数据
     */
    const getCheckShare = async () => {
        try {
            const res = await axios.get(apis.ecotopia.share.base(shareId));
            const shareData: ShareProps = res.data;
            // 设置生物物种
            const tag = shareSpeciesTags[shareData.animal_category];

            setState({
                publishTag: tag,
                shareData,
            });
        } catch (err) {
            console.log(err);
        }
    };

    /**
     * 获取生物基础数据
     */
    const getAnimalInfo = async () => {
        try {
            const res = await axios.get(apis.ecotopia.share.info(shareId));

            const animalData: ShareAnimalProps = {
                ...res.data,
                // 生成图片URL
                imageUrls: res.data.images.map((url: string) => {
                    return apis.ecotopia.share.image(shareId, url);
                }),
            }

            setState({
                animalData
            });
        } catch (err) {
            console.log(err);
        }
    };

    const onPressSubmit = async () => {

        const data = {
            label: state.publishTag.name,
            type: PostType.BiologicalCard,
            content: Utils.removeSpaceAndEnter(
                state.postContent || useLanguage.share,
            ),
            biological_card: {
                share_id: shareId,
                data_category: state.shareData?.data_category,
                biological_image_ids: [],
                biological_base: state.animalData?.biological_base || null,
                biological_release: state.animalData?.biological_release || null,
                biological_detail: state.animalData?.biological_detail || null,
            }
        }

        onPublishShare(
            shareId,
            data,
            state.animalData?.imageUrls || [],
            AnimalCardType.ShareType,
        );

        props.navigation.goBack()
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
                        animalType={AnimalCardType.ShareType}
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

export default SharePublishScreen;
