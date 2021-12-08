import React from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { themeColor } from "../../assets/styles";

interface PublishHeaderProps {
    goBack: () => void
}

const PublishHeader: React.FC<PublishHeaderProps> = (props: PublishHeaderProps) => {
    return (
        <>
            <Header
                backgroundColor='#fff'
                leftComponent={
                    <TouchableHighlight
                        underlayColor={'none'}
                        onPress={props.goBack}>
                        <View style={{width: 100, paddingLeft: 10}}>
                            <Icon
                                name={'angle-left'}
                                style={{fontSize: 30, color: '#aaa'}}
                            />
                        </View>
                    </TouchableHighlight>
                }
                centerContainerStyle={{
                    justifyContent: 'center'
                }}
                centerComponent={
                    <Text style={styles.title}>Publish</Text>
                }
                rightContainerStyle={{
                    justifyContent: 'center'
                }}
                rightComponent={
                    <TouchableHighlight underlayColor={'none'} onPress={() => console.log('发布')}>
                        <View>
                            <Text style={styles.post}>Post</Text>
                        </View>
                    </TouchableHighlight>
                }
            />
        </>
    );
};


const styles = StyleSheet.create({
    title: {
        fontSize: 17
    },
    post: {
        padding: 5,
        color: themeColor
    }
})

export default PublishHeader;
