import React from 'react';
import {Alert, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import {INTELINK_SCREEN_NAME} from "../../../../../routes/screen-name";
import Timeline from "react-native-timeline-flatlist";
import {useSetState} from "ahooks";
import {screenWidth} from "../../../../../config/contant";

const ListItem: React.FC<any> = (props: any) => {

    const [state, setState] = useSetState<any>({
        data:[
            {title: '13:52   2021/02/05',description: 'Event 1 Description' },
            {title: '13:52   2021/02/05',description: 'Event 1 Description' },
            {title: '13:52   2021/02/05',description: 'Event 1 Description' },
        ]
    });

    return (
            <View style={styles.list}>
                <View style={styles.content}>
                    <View style={styles.useInfoBox}>
                        <View style={styles.avatar}></View>
                        <Text style={styles.userName}>Jacky-Forco</Text>
                    </View>
                    <View style={styles.timelineBox}>
                        <Timeline
                            data={state.data}
                            circleSize={10}
                            circleColor='#74D4E3'
                            lineColor='#74D4E3'
                            options={{
                                style:{paddingTop:0},
                            }}
                            titleStyle={styles.titleStyle}
                            separator={false}
                            detailContainerStyle={{marginBottom: 10, paddingLeft: 5, paddingRight: 5, borderRadius: 10,width:screenWidth - 100}}
                            columnFormat={'single-column-left'}
                            descriptionStyle={styles.descriptionStyle}
                            showTime={false}
                        />
                    </View>
                </View>
            </View>

    );
};

const styles = StyleSheet.create({
    list:{
        backgroundColor:'white',
        marginTop:5,
        flex:1,
        flexDirection: 'row',
    },
    timelineBox:{
        marginTop:28.5,
        paddingLeft:10,
        width:screenWidth
    },
    content:{
        paddingTop:16,
        paddingBottom:0,
    },
    useInfoBox:{
        paddingLeft:16,
        paddingRight:16,
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center"
    },
    avatar:{
        backgroundColor:'green',
        borderRadius:50,
        width:32,
        height:32,
        marginRight:7
    },
    userName:{
        color:'#0A141E',
        fontSize:15
    },
    descriptionStyle:{
        color:'#0A141E',
        fontSize:15
    },
    titleStyle:{
        position:'absolute',
        top:-11,
        color:'#999999',
        fontSize:11,
    }
});

export default ListItem;
