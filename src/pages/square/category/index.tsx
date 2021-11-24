import React from 'react';
import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    Image,
    TouchableHighlight,
    FlatList,
} from 'react-native';
import WeiboItem from './weibo-item';

const DATA = Array.from(new Array(31).keys()).map(data => {
    return {
        id: Math.random(),
        title: data,
    };
});

const SquareCategory: React.FC = () => {
    return (
        <View style={styles.container}>
            <FlatList
                data={DATA}
                renderItem={WeiboItem}
                keyExtractor={(item: any) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#333',
        padding: 10,
    },
});

export default SquareCategory;
