import React, {useEffect} from 'react';
import {Text, TouchableHighlight, View,StyleSheet} from "react-native";
import { NavigateProps } from "../../interface";
import {useSetState} from "ahooks";
import Timeline from 'react-native-timeline-flatlist'

const Test4: React.FC<NavigateProps> = (props: NavigateProps) => {
    const [state, setState] = useSetState<any>({
        loading: false,
        data:[
            {time: '', title: 'Event 1',description: 'Event 1 Description' },
            {time: '', title: 'Event 2',description: 'Event 1 Description' },
            {time: '', title: 'Event 3',description: 'Event 1 Description' },
        ]
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
            <TouchableHighlight
                activeOpacity={0.5}
                underlayColor={'green'}
                style={{width:80,backgroundColor:'green',borderRadius:20,padding:10}}
                onPress={setLoading}>
                <Text style={{textAlign:"center",color:'white'}}>Test2</Text>
            </TouchableHighlight>

            <View style={{height:220}}>
                <View style={{position:"absolute",height:220,top:0,zIndex:2,width:'100%'}}/>

                <Timeline
                    style={styles.list}
                    data={state.data}
                    circleSize={10}
                    circleColor='green'
                    lineColor='rgb(45,156,219)'
                    options={{
                        style:{paddingTop:5},
                    }}
                    titleStyle={{position:'absolute',top:-15,color:'red'}}
                    separator={false}
                    detailContainerStyle={{marginBottom: 20, paddingLeft: 5, paddingRight: 5, borderRadius: 10}}
                    columnFormat={'single-column-left'}
                    descriptionStyle={{color:'gray'}}
                    showTime={false}
                />
            </View>


            {/*<Timeline*/}
            {/*    style={styles.list}*/}
            {/*    data={state.data}*/}
            {/*    circleSize={10}*/}
            {/*    circleColor='green'*/}
            {/*    lineColor='rgb(45,156,219)'*/}
            {/*    // timeContainerStyle={{minWidth:52, marginTop: -5}}*/}
            {/*    // descriptionStyle={{color:'gray'}}*/}
            {/*    options={{*/}
            {/*        style:{paddingTop:5}*/}
            {/*    }}*/}
            {/*    titleStyle={{position:'absolute',top:-15}}*/}
            {/*    innerCircle={'icon'}*/}
            {/*    // onEventPress={this.onEventPress}*/}
            {/*    separator={false}*/}
            {/*    detailContainerStyle={{marginBottom: 20, paddingLeft: 5, paddingRight: 5, borderRadius: 10}}*/}
            {/*    columnFormat={'single-column-left'}*/}
            {/*    showTime={false}*/}
            {/*/>*/}


        </View>
    );
};

const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#FFF'
    },
    list: {
        flex: 1,
        marginTop:20,
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
