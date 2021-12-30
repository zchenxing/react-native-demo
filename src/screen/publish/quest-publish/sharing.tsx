import React, {useEffect} from 'react';
import {StyleSheet, TextInput, View,ScrollView} from "react-native";
import {INTELINK_SCREEN_NAME} from "../../../routes/screen-name";
import AweSimpleNavigator from "../../../components/awe-simple-navigator";
import AnimalCard from "../../components/animal-card";
import {useSetState} from "ahooks";
import server from "../../../network";
import apiConfig from "../../../network/config";
import apis from "../../../network/apis";
import {AnimalCardType} from "../../components/animal-card/type";

const EntrustSharingScreen = (props: any) => {
    const inputRef = React.useRef<any>(null);
    const [state, setState] = useSetState<any>({
        textValue: '',
        shareData: {},
        animalInfo: {},
    });

    useEffect(() => {
        let id = '61cc20abaca33b662a0af029'
        getEntrustDetail(id)
        getAnimalIngo(id)
    },[])

    const onChangeText = (text: string) => {

        setState({
            textValue:text
        })
    }

    const getEntrustDetail = async (id: string) => {
        try {
            const res =  await server.get(apis.entrust.info(id),
                apiConfig.pageToken(),
            );
            setState({
                shareData:res.data
            })

        }catch (err) {
            console.log(err);
        }
    }

    const getAnimalIngo = async (id: string) => {
        try {
            let res =  await server.get(apis.entrust.biologicalInfo(id),
                apiConfig.pageToken(),
            );
            if (res.data.images){
                res.data.imageUrls = []
                res.data.images.forEach((value:string) => {
                    res.data.imageUrls.push(apis.entrust.biologicalImage(id,value))
                })
            }
            delete res.data.images
            setState({
                animalInfo:res.data
            })
        }catch (err) {
            console.log(err);
        }
    }




    return <>
        <AweSimpleNavigator
            centerTitle={'Commissioned release'}
            goBack={props.navigation.goBack}
            rightActionTitle={'Post'}
            rightActionEvent={() => {
                props.navigation.push(INTELINK_SCREEN_NAME.SCREEN_ENTRUST_RECORDING)
            }}
            rightActionEditable={!!state.textValue}
        />
        <ScrollView>
            <View style={styles.inputBox}>
                <TextInput placeholder="Username"  underlineColorAndroid="transparent"
                           clearButtonMode={'while-editing'}
                           style={[styles.textInput, {height: 148}]}
                           multiline={true}
                           ref={inputRef}
                           onChangeText={onChangeText}
                           value={state.textValue}
                           clearTextOnFocus={true} />
            </View>

            {
                state.animalInfo.biological_base && state.shareData.id
                    ? <View style={styles.animalInfoBox}>
                        <AnimalCard shareData={state.shareData} animalInfo={state.animalInfo} animalType={AnimalCardType.QuestType} showOtherInfo={true}/>
                    </View>
                    :<View/>
            }
        </ScrollView>




    </>
}

const styles = StyleSheet.create({
    pageTitle:{
        color:'#333333',
        fontSize:17,
        backgroundColor:'red'

        // marginTop:4
    },
    animalInfoBox:{
        paddingLeft:16,
        paddingRight:16,
        backgroundColor:'#fff'
    },
    textInput: {
        flex: 1,
        borderRadius: 10,
        fontSize: 16,
        alignItems: 'flex-start',
        justifyContent:"flex-start",
    },
    inputBox:{
        height:173,
        paddingLeft:22.5,
        paddingRight:22.5,
        paddingTop:10.5,
        backgroundColor:'#fff'
    }
})

export default EntrustSharingScreen;