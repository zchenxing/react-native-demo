import React, {useEffect} from 'react';
import {StyleSheet, Text, TextInput, TouchableHighlight, View} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {INTELINK_SCREEN_NAME} from "../../../../routes/screen-name";
import {Header} from "react-native-elements";
import {useLanguage} from "../../../../language";
import AweSimpleNavigator from "../../../../components/awe-simple-navigator";
import AnimalCard from "../../../components/animal-card";
import {useSetState} from "ahooks";
import server from "../../../../network";
import apiConfig from "../../../../network/config";
import apis from "../../../../network/apis";

const EntrustSharingScreen = (props: any) => {
    const inputRef = React.useRef<any>(null);
    const [state, setState] = useSetState<any>({
        textValue: '',
    });

    const onChangeText = (text: string) => {

        setState({
            textValue:text
        })
    }

    const getEntrustDetail = async () => {
        try {
            const res =  await server.get(apis.entrust.info('61cc20abaca33b662a0af029'),
                apiConfig.pageToken(),
            );
            console.log(res.data)
        }catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getEntrustDetail()
    },[])


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
        {/*<AnimalCard shareData={} animalInfo={}/>*/}

    </>
}

const styles = StyleSheet.create({
    pageTitle:{
        color:'#333333',
        fontSize:17,
        backgroundColor:'red'

        // marginTop:4
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