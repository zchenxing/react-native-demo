import React from 'react';
import {FlatList, StatusBar, View} from 'react-native';
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

type UserProps = {
    id: string;
    nickname: string;
    intro?: string;
    avatar?: PostImageProps;
};

interface IState {
    initStatus: boolean
    loading: boolean;
    removeUser: string[];
    dataSource: UserProps[];
}

const FollowListScreen: React.FC<NavigateProps> = (props: NavigateProps) => {
    const {userId, followType} = props.route.params;

    const [state, setState] = useSetState<IState>({
        initStatus: followType === PersonalOtherEnum.Following,
        loading: true,
        removeUser: [],
        dataSource: [],
    });

    React.useEffect(() => {
        getFollowData();
    }, []);

    const getFollowData = async () => {
        try {
            const api =
                followType === PersonalOtherEnum.Following
                    ? apis.user.followed(userId)
                    : apis.user.fans(userId);
            const res = await server.get(api);

            setState({
                loading: false,
                dataSource: res.data,
            });
        } catch (err) {
            setState({
                loading: false
            })
            console.log(err);
        }
    };

    return (
        <>
            <AweSimpleNavigator
                centerTitle={'Follow'}
                goBack={props.navigation.goBack}
            />

            <ScreenBase
                nothingPage={
                    !state.dataSource.length && !state.loading
                        ? {
                              picture: localImages.nothing,
                              title:
                                  followType === PersonalOtherEnum.Following
                                      ? useLanguage.no_following
                                      : useLanguage.no_follower,
                          }
                        : undefined
                }>
                <StatusBar translucent={true} />
                <View style={{flex: 1}}>
                    <FlatList
                        data={state.dataSource}
                        renderItem={row => {
                            const item: UserProps = row.item;

                            return (
                                <UserItem
                                    nickname={item.nickname}
                                    intro={item.intro || ''}
                                    avatar={item.avatar?.url_thumb}
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
