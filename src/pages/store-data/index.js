import React from 'react';
import {Button, Text, View} from 'react-native';
import {useListDataStore} from '../../mobx/provider';
import {observer} from 'mobx-react';

const StoreData = () => {

    const {count, resetCount} = useListDataStore()

    return (
        <View>
            <Text>count: {count}</Text>
            <Button
                title={'+'}
                onPress={() => resetCount(Math.floor(Math.random() * 100))}
            />
        </View>
    );
};

export default observer(StoreData);
