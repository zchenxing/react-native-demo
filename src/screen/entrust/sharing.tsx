import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {INTELINK_SCREEN_NAME} from "../../routes/screen-name";
import {Header} from "react-native-elements";

const EntrustSharingScreen = (props) => {
    return <>
        <Header
            backgroundColor='#fff'
            leftComponent={
                <TouchableHighlight
                    underlayColor={'none'}
                    onPress={props.navigation.goBack}>
                    <View style={{width: 100, paddingLeft: 10,backgroundColor:'green'}}>
                        <Icon
                            name={'angle-left'}
                            style={{fontSize: 30, color: '#aaa'}}
                        />
                    </View>
                </TouchableHighlight>
            }
            centerComponent={
                <View>
                    <Text style={styles.pageTitle}>Commissioned release</Text>
                </View>
            }
            rightComponent={
                <TouchableHighlight
                    underlayColor={'none'}
                    onPress={()=>{props.navigation.push(INTELINK_SCREEN_NAME.SCREEN_ENTRUST_RECORDING)}}>
                    <View style={{width: 100, paddingLeft: 10, justifyContent: "flex-end", flexDirection: "row"}}>
                        <Text>Post</Text>
                    </View>
                </TouchableHighlight>
            }
        >
        </Header>
    </>
}

const styles = StyleSheet.create({
    pageTitle:{
        color:'#333333',
        fontSize:17,
        backgroundColor:'red'

        // marginTop:4
    }
})

export default EntrustSharingScreen;