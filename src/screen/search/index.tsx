import React from 'react';
import ScreenBase from '../components/screen-base';
import SearchNavigator from './search-navigator';
import {NavigateProps} from '../../interface';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import druidStorage from '../../storage';
import { themeColor } from '../../assets/styles';
import { useLanguage } from '../../language';
import { StorageType } from "../../storage/storage-type";
import { INTELINK_SCREEN_NAME } from "../../routes/screen-name";

const SearchScreen: React.FC<NavigateProps> = (props: NavigateProps) => {

    const [historyResult, setHistoryResult] = React.useState<string[]>([])

    React.useEffect(() => {

        getHistory()

    }, []);

    /**
     * storage获取历史数据
     */
    const getHistory = async () => {
        const result = await druidStorage.getData(StorageType.SearchHistory)
        setHistoryResult(result ? result : [])
    }

    /**
     * 保存数据至storage
     * @param data
     */
    const saveHistory = async (data: string[]) => {
        await druidStorage.saveData(StorageType.SearchHistory, data)
    }

    /**
     * 删除单个历史数据
     * @param data
     */
    const onDeleteHistoryItem = (data: any) => {
        const deleteIndex = data.index
        const history = [...historyResult]
        history.splice(deleteIndex, 1)
        setHistoryResult(history)
        saveHistory(history)
    };

    /**
     * 清空历史数据
     */
    const onPressClear = () => {
        setHistoryResult([])
        saveHistory([])
    }


    /**
     * 展示搜索结果
     */
    const showSearchResult = (result: string) => {

        if (result) {
            const searchArr: string[] = [...historyResult]
            searchArr.unshift(result)
            setHistoryResult(searchArr)
            saveHistory(searchArr)
            pushHistoryResult(result)
        }
    }


    const pushHistoryResult = (result: string) => {
        props.navigation.push(INTELINK_SCREEN_NAME.SCREEN_SEARCH_RESULT, {
            searchResult: result
        })
    }

    return (
        <>
            <SearchNavigator
                onLeftPress={props.navigation.goBack}
                onSearchDone={showSearchResult}

            />

            <ScreenBase>
                <View style={{flex: 1}}>
                    <View style={styles.header}>
                        <Text style={{color: '#ccc', fontSize: 12}}>
                            {useLanguage.history}
                        </Text>

                        <TouchableHighlight
                            onPress={onPressClear}
                            underlayColor={'none'}
                        >
                            <Text style={{color: themeColor}}>
                                {useLanguage.clear}
                            </Text>
                        </TouchableHighlight>
                    </View>

                    <View style={{flex: 1}}>
                        <FlatList
                            data={historyResult}
                            renderItem={(data) => (
                                <TouchableHighlight
                                    onPress={() => pushHistoryResult(data.item)}
                                    underlayColor={'#fafafa'}>
                                    <View style={styles.item}>
                                        <View style={{flexDirection: 'row'}}>
                                            <Icon
                                                name={'history'}
                                                style={styles.historyIcon}
                                            />
                                            <Text style={{color: '#666'}}>
                                                {data.item}
                                            </Text>
                                        </View>
                                        <TouchableHighlight
                                            onPress={() => onDeleteHistoryItem(data)}
                                            underlayColor={'#fafafa'}
                                            style={{borderRadius: 20}}>
                                            <View style={styles.delete}>
                                                <Icon
                                                    name={'close'}
                                                    style={styles.deleteIcon}
                                                />
                                            </View>
                                        </TouchableHighlight>
                                    </View>
                                </TouchableHighlight>
                            )}
                        />
                    </View>
                </View>
            </ScreenBase>
        </>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        paddingTop: 20,
    },
    item: {
        height: 40,
        paddingLeft: 10,
        paddingRight: 13,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    historyIcon: {
        marginRight: 10,
        paddingTop: 4,
        fontSize: 16,
        color: '#ccc',
    },
    delete: {
        padding: 5,
    },
    deleteIcon: {
        color: '#bbb',
        fontSize: 16,
    },
});

export default SearchScreen;
