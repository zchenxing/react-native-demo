import React, {useEffect} from 'react';
import {Text, TouchableHighlight, View,StyleSheet} from "react-native";
import { NavigateProps } from "../../interface";
import Spinner from 'react-native-loading-spinner-overlay';
import {useSetState} from "ahooks";

const Test4: React.FC<NavigateProps> = (props: NavigateProps) => {
    const [state, setState] = useSetState<any>({
        loading: false,
    });
    useEffect(() => {
        if (state.loading){
            setTimeout(() => {
                setState({loading: false})
            },1000)

        }
    },[state.loading])
    const setLoading = () => {
        setState({loading:true})
    }
    return (
        <View style={{flex: 1}}>
            <Spinner
                visible={state.loading}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
            <TouchableHighlight
                activeOpacity={0.5}
                underlayColor={'green'}
                style={{width:80,backgroundColor:'green',borderRadius:20,padding:10}}
                onPress={setLoading}>
                <Text style={{textAlign:"center",color:'white'}}>Test2</Text>
            </TouchableHighlight>

        </View>
    );
};

const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#FFF'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    }
});

export default Test4;
