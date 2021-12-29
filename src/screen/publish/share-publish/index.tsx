import React from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import AweSimpleNavigator from "../../../components/awe-simple-navigator";
import { useLanguage } from "../../../language";
import { NavigateProps } from "../../../interface";
import IconFont from "../../../iconfont";
import { themeColor } from "../../../assets/styles";
import { useSetState } from "ahooks";
import AnimalCard from "../../components/animal-card";
import { AnimalCardType, ShareAnimalProps, ShareProps } from "../../components/animal-card/type";
import axios from "axios";
import apis from "../../../network/apis";


interface IState {
    startIndex: number
    preview: boolean
    inputHeight: number
    postContent: string

    shareData: ShareProps | null
    animalData: ShareAnimalProps | null
}


const SharePublishScreen: React.FC<NavigateProps> = (props: NavigateProps) => {

    const {animalId} = props.route.params
    const inputRef = React.useRef<any>(null);


    const [state, setState] = useSetState<IState>({
        startIndex: 0,
        preview: false,
        inputHeight: 170,
        postContent: '',
        shareData: null,
        animalData: null
    });


    React.useEffect(() => {
        getCheckShare();
        getAnimalInfo()
    }, [])

    const getCheckShare = async () => {

        try {
            const res = await axios(apis.ecotopia.share(animalId));
            setState({
                shareData: res.data
            })
        } catch (err) {
            console.log(err);
        }
    };


    const getAnimalInfo = async () => {
        try {
            const res = await axios(apis.ecotopia.info(animalId))

            setState({
                animalData: {
                    ...res.data,
                    // 生成图片URL
                    imageUrls: res.data.images.map((url: string) => {
                        return apis.ecotopia.image(animalId, url)
                    })
                }
            })
        } catch (err) {
            console.log(err);
        }
    }


    const onPressSubmit = () => {

    }


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

                <IconFont
                    style={{marginRight: 10}}
                    size={18}
                    name={'niao'}
                    color={'#fff'}
                />
                <Text style={styles.labelText}>
                    {'Birds'}
                </Text>
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


              <View style={{
                  paddingTop: 10,
                  padding: 20,
              }}>
                  <AnimalCard
                      animalType={AnimalCardType.QuestType}
                      showOtherInfo={true}
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
        backgroundColor: themeColor,
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
})

export default SharePublishScreen;
