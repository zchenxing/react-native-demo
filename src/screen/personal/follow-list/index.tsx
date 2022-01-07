import React from 'react';
import { DeviceEventEmitter, FlatList, RefreshControl, StatusBar, Text, View } from "react-native";
import ScreenBase from '../../components/screen-base';
import AweSimpleNavigator from '../../../components/awe-simple-navigator';
import {NavigateProps} from '../../../interface';
import UserItem from './item';
import server from '../../../network';
import apis from '../../../network/apis';
import {PersonalOtherEnum} from '../type';
import {PostImageProps} from '../../../interface/work';
import {useSetState} from 'ahooks';
import {localImages} from '../../../assets/images';
import {useLanguage} from '../../../language';
import {useSelfDataStore} from '../../../store/provider';
import {Placeholder, PlaceholderLine, PlaceholderMedia} from 'rn-placeholder';
import WorkHelp from '../../../help/work';
import {UserEventType} from '../../../enum';
import { EventEmitterName, PAGE_SIZE } from "../../../config/contant";
import { INTELINK_SCREEN_NAME } from "../../../routes/screen-name";
import AweLoadMore from "../../../components/awe-load-more";

type UserProps = {
    id: string;
    nickname: string;
    intro?: string;
    avatar?: PostImageProps;
    user_event: any;
};

interface IState {
    initStatus: boolean;
    loading: boolean;
    removeUser: string[];
    dataSource: UserProps[];
    showPlaceholder: boolean;

    refreshing: boolean
    moreLoading: boolean;
    hasMoreData: boolean;
}

const FollowListScreen: React.FC<NavigateProps> = (props: NavigateProps) => {
    const {userId, followType, total} = props.route.params;
    const {selfInfoData} = useSelfDataStore();

    const [state, setState] = useSetState<IState>({
        initStatus: followType === PersonalOtherEnum.Following,
        loading: true,
        removeUser: [],
        dataSource: [],
        showPlaceholder: true,
        refreshing: true,
        moreLoading: false,
        hasMoreData: false,
    });

    React.useEffect(() => {

        if (state.refreshing) {
            getFollowData();
        }
    }, [state.refreshing]);

    const getFollowData = async (lastId = '') => {
        try {
            const api =
                followType === PersonalOtherEnum.Following
                    ? apis.user.followed(userId, lastId)
                    : apis.user.fans(userId, lastId);
            const res = await server.get(api);

            setState({
                loading: false,
                dataSource: res.data,
                showPlaceholder: false,
                refreshing: false
            });

            return Promise.resolve(res)
        } catch (err) {
            setState({
                showPlaceholder: false,
                loading: false,
                refreshing: false
            });
            return Promise.reject(err)
        }
    };


    const onRefreshData = () => {
        setState({
            refreshing: true
        })
    }



    const onLoadMoreData = async (hasMoreData: boolean) => {

        if (hasMoreData) {
            setState({
                moreLoading: true
            })

            try {

                const lastId = state.dataSource[state.dataSource.length - 1].id
                const res = await getFollowData(lastId)

                const dataSource = [...state.dataSource, ...res.data]

                setState({
                    dataSource: dataSource,
                    moreLoading: false,
                    hasMoreData: res.data.length && res.data.length === PAGE_SIZE
                })


            } catch (err) {
                setState({
                    moreLoading: false,
                    hasMoreData: true
                })
            }
        }

    }

    const handleNoMoreData = () => {
        setState({
            moreLoading: true,
            hasMoreData: true,
        });

        onLoadMoreData(true);
    }

    /**
     * 关注用户 / 取消关注
     * follow true 添加关注 | false 取消关注
     */
    const onToggleFollow = React.useCallback(
        (id: string) => {
            const index = WorkHelp.getDataSourceIndex(state.dataSource, id);

            if (index > -1) {
                const data = state.dataSource[index];
                if (data.user_event) {
                    delete data.user_event;
                } else {
                    data.user_event = {
                        event_type: UserEventType.Follow,
                    };
                }

                // 如果进入的是自己个人主页的列表，就要刷新详情页面
                if (userId === selfInfoData?.id) {
                    DeviceEventEmitter.emit(EventEmitterName.RefreshMyInfo)
                }

                setState({
                    dataSource: state.dataSource,
                });
            }
        },
        [state],
    );


    /**
     * 进入用户详情页面
     */
    const onPressUser = React.useCallback((id) => {
        props.navigation.push(INTELINK_SCREEN_NAME.SCREEN_PERSONAL, {
            userId: id,
        })
    }, [])



    return (
        <>
            <AweSimpleNavigator
                centerTitle={'Follow'}
                goBack={props.navigation.goBack}
            />

            <ScreenBase
                onReload={getFollowData}
                showPlaceholder={state.showPlaceholder}
                placeholderComponent={
                    <View style={{padding: 10}}>
                        {Array.from(new Array(Math.min(total || 0, 10)).keys()).map(
                            index => (
                                <Placeholder
                                    Left={PlaceholderMedia}
                                    key={index}>
                                    <PlaceholderLine width={40} />
                                    <PlaceholderLine />
                                    <View style={{height: 20}} />
                                </Placeholder>
                            ),
                        )}
                    </View>
                }
                nothingPage={
                    !state.dataSource.length
                        ? {
                              picture: localImages.nothing,
                              title:
                                  followType === PersonalOtherEnum.Following
                                      ? useLanguage.no_following
                                      : useLanguage.no_follower,
                          }
                        : undefined
                }
            >
                <StatusBar translucent={true} />
                <View style={{flex: 1}}>
                    <FlatList
                        data={state.dataSource}
                        keyExtractor={item => item.id}
                        onEndReached={() => onLoadMoreData(state.hasMoreData)}
                        refreshControl={
                            <RefreshControl
                                refreshing={state.refreshing}
                                onRefresh={onRefreshData}
                            />
                        }
                        ListFooterComponent={
                            <AweLoadMore
                                loading={state.moreLoading}
                                hasMoreData={state.hasMoreData}
                                handleNoMoreData={handleNoMoreData}
                            />
                        }
                        renderItem={row => {
                            const item: UserProps = row.item;
                            return (
                                <UserItem
                                    userId={item.id}
                                    nickname={item.nickname}
                                    intro={item.intro || ''}
                                    avatar={item.avatar?.url_thumb}
                                    isFollow={!!item.user_event}
                                    isMySelf={selfInfoData?.id === item.id}
                                    onToggleFollow={onToggleFollow}
                                    onPressUser={onPressUser}
                                />
                            );
                        }}
                    />
                </View>
            </ScreenBase>
        </>
    );
};

export default FollowListScreen;
