import React from 'react';
import {NavigateProps} from '../../../interface';
import AweSimpleNavigator from '../../../components/awe-simple-navigator';
import { View, Text, StyleSheet, ScrollView, TouchableHighlight, DeviceEventEmitter } from "react-native";
import { themeColor } from "../../../assets/styles";
import IconFont from '../../../iconfont';
import { useLanguage } from "../../../language";
import { EventEmitterName } from "../../../config/contant";


const PostTags: any = [
    {
        icon: 'niao',
        color: '#5eb6c3',
        name: 'Birds'
    },
    {
        // 哺乳
        icon: 'xiong',
        color: '#c29c8a',
        name: 'Mammals'
    },
    {
        icon: 'yu',
        color: '#466eed',
        name: 'Fishes'
    },
    {
        // 爬行动物
        icon: 'pahang',
        color: '#51a35c',
        name: 'Reptiles'
    },
    {
        // 两栖动物
        icon: 'liangqi',
        color: '#f66554',
        name: 'Amphibian'
    }
]


const PublishTagScreen: React.FC<NavigateProps> = (props: NavigateProps) => {


    const onSelectTag = (tag: any) => {
        DeviceEventEmitter.emit(EventEmitterName.ChooseCategory, {tag});

        props.navigation.goBack()
    }

    return (
        <>
            <AweSimpleNavigator
                centerTitle={useLanguage.choose_category}
                goBack={props.navigation.goBack}
            />

            <ScrollView style={styles.container}>
                {PostTags.map((tag: any) => (
                    <TouchableHighlight
                        key={tag.name}
                        style={styles.listItem}
                        onPress={() => onSelectTag(tag)}
                        underlayColor={'#efefef'}>
                        <>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>

                                <IconFont
                                    style={{marginRight: 10}}
                                    name={tag.icon}
                                    color={tag.color}
                                    size={26}
                                />

                                <Text style={{fontSize: 15}}>
                                    {tag.name}
                                </Text>
                            </View>

                            <Text style={{color: themeColor}}>Select</Text>
                        </>
                    </TouchableHighlight>
                ))}
            </ScrollView>

        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderTopWidth: 1,
        borderColor: '#eee'
    },
    listItem: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingLeft: 20,
        paddingRight: 20
    }
});

export default PublishTagScreen;
