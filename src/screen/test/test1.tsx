import 'react-native-reanimated'
import React from 'react';
import { StyleSheet, View } from "react-native";
import AweSimpleNavigator from '../../components/awe-simple-navigator';
import { NavigateProps } from "../../interface";
import { Button, Input } from "react-native-elements";
import apis from '../../network/apis';
import server from '../../network';
import myToken from '../../network/token';
import apiConfig from '../../network/config';
import { ProgressiveImage } from "../../components/awe-progressive-image";
import { birdCard } from "../../mock";

const Test1: React.FC<NavigateProps> = (props: NavigateProps) => {

    const [username, setUsername] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const [nickname, setNickname] = React.useState<string>('')

    const onLogin = async () => {

        try {
            const res = await server.post(apis.user.login, {
                username: username,
                password: apiConfig.generatePassword(username, password)
            })
            myToken.setToken(res.headers['x-druid-authentication'])
            props.navigation.goBack()

        } catch (err) {
            console.log(err);
        }
    }

    const onRegister = async () => {
        try {
            const res = await server.post(apis.user.register, {
                username: username,
                nickname: nickname,
                password: apiConfig.generatePassword(username, password)
            })
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <View style={{flex: 1}}>

            <AweSimpleNavigator centerTitle={'登录注册'} goBack={props.navigation.goBack} />

            <Input placeholder={"账号"} autoCompleteType={undefined} onChangeText={setUsername}  />
            <Input placeholder={'密码'} autoCompleteType={undefined} onChangeText={setPassword} />
            <Input placeholder={'注册用户名'} autoCompleteType={undefined} onChangeText={setNickname} />

            <Button title={'登录'} onPress={onLogin} />
            <Button title={'注册'} onPress={onRegister} />


        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
    cover: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(1, 1, 1, .3)'
    }
});

export default Test1;
