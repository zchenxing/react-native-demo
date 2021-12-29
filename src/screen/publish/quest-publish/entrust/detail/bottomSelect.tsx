import React, {useCallback, useEffect} from 'react';
import {StyleSheet, TouchableHighlight, View, Text, Keyboard, TextInput, Alert} from "react-native";
import {screenHeight} from "../../../../../config/contant";
import BottomSheet from "@gorhom/bottom-sheet";
import AweKeyboard from "../../../../../components/awe-keyboard";
import {useSetState} from "ahooks";
import {Image} from "react-native-elements";
import {avatarUrl} from "../../../../../mock";
import {useLanguage} from "../../../../../language";
import {themeColor} from "../../../../../assets/styles";
import {ReasonSelectItem} from "./config";

const BottomSelect = (props) => {
    const [state, setState] = useSetState<any>({
        contentText: '',
        scrollOffsetY: 0,
        keyboardHeight: 0,
        selectValue:0,
    });
    useEffect(() => {
        let keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', _keyboardDidShow.bind(this));
        let keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', _keyboardDidHide.bind(this));
        return () => {
            keyboardDidShowListener.remove()
            keyboardDidHideListener.remove()
        }
    })
    const _keyboardDidShow = (e) => {
        console.log(e.startCoordinates.height)
        setState({
            keyboardHeight:screenHeight * 0.3
        })

    }

    const _keyboardDidHide= (e) => {
        setState({
            keyboardHeight:0
        })
    }

    const onClose = () => {
        if (state.keyboardHeight !== 0) {
            Keyboard.dismiss()
        } else {
            props.onClose()
        }
    }

    const selectChange = () => {
        Keyboard.dismiss()
        props.selectChange()
    }

    const handleSheetChanges = useCallback((index: number) => {
        if (index === 0) {
            Keyboard.dismiss()
            props.handleSheetChanges(index)
        }
    }, []);

    const selectItemChange= (selectValue: any) => {
        // Keyboard.dismiss()
        setState({selectValue:selectValue})
        if (selectValue.value === 4){
            setState({scrollOffsetY:200})
        }else {
            setState({scrollOffsetY:0})
        }
        console.log(selectValue)
        props.onSelectClose()
    }



    return <>
        {props.visible && (
            <TouchableHighlight
                underlayColor={'none'}
                style={styles.cover}
                onPress={onClose}>
                <View>
                </View>
            </TouchableHighlight>
        )}
        <BottomSheet
            ref={props.actionSheetRef}
                index={-1}
            snapPoints={[1, screenHeight * 0.3 + state.keyboardHeight * 1.2 + state.scrollOffsetY  ]}
            onChange={handleSheetChanges}
        >
            <View style={styles.sheetTop}>
                <Text style={styles.endText}>ENDED</Text>
                <TouchableHighlight
                    underlayColor={'none'}
                    onPress={selectChange}>
                    <View>
                        <Text>1111</Text>
                    </View>
                </TouchableHighlight>
            </View>
            <View style={styles.selectContentBox}>
                <Text style={styles.reasonText}>Reason for ending</Text>
                <TouchableHighlight
                    underlayColor={'none'}
                    onPress={selectChange}>
                    <View style={styles.selectBox}>
                        {
                            state.selectValue.name
                            ?<Text style={styles.selectText}>{state.selectValue.name}</Text>
                                :<Text style={styles.pleaseText}>Please select the end reason</Text>
                        }


                        <Text>1111</Text>
                    </View>
                </TouchableHighlight>
            </View>
            {
                state.selectValue.value === 4
                ?<View style={styles.footBox}>
                        <Text>Supplement</Text>
                        <View style={styles.textInputView}>
                            <TextInput placeholder="Username"  underlineColorAndroid="transparent"
                                       clearButtonMode={'while-editing'}
                                       style={[styles.textInput, {height: 148}]}
                                       multiline={true}
                                       clearTextOnFocus={true} />
                        </View>
                    </View>
                    :<View/>
            }

            <TouchableHighlight
                underlayColor={'none'}
                onPress={()=> {Alert.alert('111')}}>
                <View style={styles.confirmBox}>
                    <Text style={styles.confirmText}>confirm</Text>
                </View>
            </TouchableHighlight>


        </BottomSheet>
        {props.selectVisible && (
            <TouchableHighlight
                underlayColor={'none'}
                style={styles.selectCover}
                onPress={props.onSelectClose}>
                <View>
                </View>
            </TouchableHighlight>
        )}
        <BottomSheet
            ref={props.selectSheetRef}
            index={-1}
            snapPoints={[1, screenHeight * 0.3]}
            onChange={props.handleSelectSheetChanges}
        >
            {
                ReasonSelectItem().map((select: any) => {
                    return <TouchableHighlight
                        underlayColor={'none'}
                        key={select.value}
                        onPress={() => {selectItemChange(select)}}>
                        <View style={styles.selectItem}>
                            <Text>{select.name}</Text>
                        </View>
                    </TouchableHighlight>
                })
            }
        </BottomSheet>
    </>
}

const styles = StyleSheet.create({
    cover: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(1, 1, 1, .3)',
    },
    selectCover:{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(1, 1, 1, .3)',
    },
    sheetTop:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        paddingLeft:16,
        paddingRight:16,
        height:51.5,
        borderBottomWidth:1,
        borderBottomColor:'#F0F2F5',
    },
    endText:{
        fontSize:18,
        color:'#333333',
    },
    selectContentBox:{
        padding:15,
    },
    reasonText:{
        color:'#333333',
        fontSize:14
    },
    selectBox:{
        borderWidth:0.5,
        borderColor:'#979797',
        borderRadius:6,
        height:50,
        alignItems:"center",
        flexDirection:"row",
        justifyContent:"space-between",
        paddingLeft:16,
        paddingRight:16,
        marginTop:3
    },
    selectText:{
        color:'#333333',
        fontSize:16
    },
    pleaseText:{
        color:'#CCCCCC',
        fontSize:16
    },
    submitText: {
        flex: 1,
        padding: 10,
        paddingRight: 5,
        backgroundColor: '#FAFAFA',
        borderRadius: 20,
    },
    submitButton: {
        height: 35,
        justifyContent: 'center',
        marginLeft: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 20,
    },
    sheetFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 10,
        borderTopWidth: 1,
        borderTopColor: '#ebebeb',
        backgroundColor: '#fff',
    },
    container: {
        flex: 1
    },
    inner: {
        padding: 24,
        flex: 1,
        justifyContent: "space-around"
    },
    header: {
        fontSize: 36,
        marginBottom: 48
    },
    textInput: {
        flex: 1,
        borderRadius: 10,
        fontSize: 16,
        alignItems: 'flex-start',
        justifyContent:"flex-start",
    },
    btnContainer: {
        backgroundColor: "white",
        marginTop: 12
    },
    footBox:{
        paddingLeft:16,
        paddingRight:16,
    },
    textInputView:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        position: 'relative',
        backgroundColor: '#fff',
        padding: 12,
        borderWidth:0.5,
        borderRadius:6,
        borderColor:'#979797',
        marginTop:3
    },
    confirmBox:{
        marginLeft:16,
        marginRight:16,
        backgroundColor:'#69BECB',
        height:50,
        borderRadius:6,
        alignItems:"center",
        justifyContent:"center",
        marginTop:16
    },
    confirmText:{
        color:'#FFFFFF',
        fontSize:18
    },
    selectItem:{
        backgroundColor:'white',
        height:50,
        alignItems:"center",
        justifyContent:"center",
        borderBottomColor:'#cccccc',
        borderBottomWidth:0.5
    }
})

export default BottomSelect;