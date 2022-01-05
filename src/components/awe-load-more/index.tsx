import React from 'react';
import { ActivityIndicator, Text, TouchableHighlight, View } from "react-native";
import { useLanguage } from "../../language";
import { AweLoadMoreProps } from "./type";

const AweLoadMore: React.FC<AweLoadMoreProps> = (props: AweLoadMoreProps) => {
    return props.loading ? (
        <View>
            <ActivityIndicator />
            <Text style={{textAlign: 'center'}}>
                {useLanguage.load_more}
            </Text>
        </View>
    ) : (
        <>
            {!props.hasMoreData && (
                <TouchableHighlight
                    underlayColor={'#fafafa'}
                    style={{padding: 22}}
                    onPress={props.handleNoMoreData}>
                    <Text style={{textAlign: 'center', color: '#ccc'}}>
                        {props.title || useLanguage.no_more_data}
                    </Text>
                </TouchableHighlight>
            )}
        </>
    );
};

export default React.memo(AweLoadMore);
