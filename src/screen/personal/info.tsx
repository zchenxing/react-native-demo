import React from 'react';
import {
    Animated,
    StatusBar,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {isIOS, screenWidth} from '../../config/contant';
import {useSetState} from 'ahooks';
import Utils from '../../help';
import {PersonalOtherEnum} from './type';
import FollowButton from '../components/follow-button';
import Toast from 'react-native-simple-toast';
import {UserInfoProps} from '../../interface/work';
import {localImages} from '../../assets/images';
import IconFont from '../../iconfont';
import {themeColor} from '../../assets/styles';
import {useSelfDataStore} from '../../store/provider';
import server from "../../network";
import apis from "../../network/apis";
import WorkHelp from "../../help/work";
import { UserEventType } from "../../enum";

const imageHeight = 90 + (isIOS ? 44 : StatusBar.currentHeight || 0);

interface IProps {
    userInfo: UserInfoProps | undefined;
    imageOffsetY: Animated.Value;
    onScrollOffset: (offset: number) => void;
    onPressFollowList: (type: PersonalOtherEnum) => void;
    onPressEdit: () => void;
}

interface IState {
    following: boolean;
    followLoading: boolean
    totalInfo: any[];
}

const PersonalInfo: React.FC<IProps> = (props: IProps) => {
    const {selfInfoData} = useSelfDataStore();
    const containerHeight = React.useRef<number>(0);

    const [state, setState] = useSetState<IState>({
        following: false,
        followLoading: false,
        totalInfo: [
            {
                type: PersonalOtherEnum.Post,
                title: 'Post',
                value: 0,
            },
            {
                type: PersonalOtherEnum.Following,
                title: 'Following',
                value: 0,
            },
            {
                type: PersonalOtherEnum.Follower,
                title: 'Follower',
                value: 0,
            },
        ],
    });

    React.useEffect(() => {
        if (props.userInfo) {

            const totalInfo = [...state.totalInfo];
            totalInfo[0].value = props.userInfo?.total_theme || 0;
            totalInfo[1].value = props.userInfo?.total_follow || 0;
            totalInfo[2].value = props.userInfo?.total_fans || 0;
            setState({
                totalInfo,
                following: !!props.userInfo.user_event
            });
        }
    }, [props.userInfo]);

    const onPressFollow = async () => {

        setState({
            followLoading: true
        })

        try {
            await server.post(apis.user.follow(props.userInfo?.id || ''), {})

            const totalInfo = [...state.totalInfo];
            totalInfo[2].value = totalInfo[2].value + (state.following ? -1 : 1);

            setState({
                totalInfo,
                followLoading: false,
                following: !state.following
            })
        } catch (err) {
            console.log(err);
            setState({
                followLoading: false
            })
        }
    };

    const onPressOtherItem = (type: PersonalOtherEnum) => {
        if (type === PersonalOtherEnum.Post) {
            props.onScrollOffset(containerHeight.current - 90);
        } else {
            props.onPressFollowList(type);
        }
    };

    return (
        <View
            style={styles.container}
            onLayout={e =>
                (containerHeight.current = e.nativeEvent.layout.height)
            }>
            <Animated.View
                style={{
                    height: imageHeight,
                    transform: [
                        {
                            translateY: props.imageOffsetY.interpolate({
                                inputRange: [-imageHeight, 0, imageHeight],
                                outputRange: [-imageHeight / 2, -1, 0],
                                extrapolate: 'clamp',
                                // @ts-ignore
                                useNativeDriver: true,
                            }),
                        },
                        {
                            scale: props.imageOffsetY.interpolate({
                                inputRange: [-imageHeight, 0, imageHeight],
                                outputRange: [2, 1, 1],
                                extrapolate: 'clamp', // 阻止输出值超过outputRange
                                // @ts-ignore
                                useNativeDriver: true,
                            }),
                        },
                    ],
                }}>
                <LinearGradient
                    colors={['#69BECB', '#A2E0E7']}
                    start={{x: 0, y: 0}}
                    end={{x: 0, y: 1}}
                    style={{height: imageHeight}}>
                    {props.userInfo?.avatar && (
                        <Image
                            source={{uri: props.userInfo.avatar.url_thumb}}
                            style={{flex: 1}}
                        />
                    )}
                </LinearGradient>

                {props.userInfo?.avatar && (
                    <View
                        style={[
                            styles.blur,
                            {backgroundColor: 'rgba(0, 0, 0, .6)'},
                        ]}
                    />
                )}
            </Animated.View>

            <View style={styles.info}>
                <Image
                    defaultSource={localImages.defaultAvatar}
                    source={
                        props.userInfo?.avatar
                            ? {uri: props.userInfo.avatar.url_normal}
                            : localImages.defaultAvatar
                    }
                    style={styles.avatar}
                />

                <View style={styles.actions}>
                    {props.userInfo?.id && (
                        <>
                            {selfInfoData?.id !== props.userInfo?.id ? (
                                <>
                                    <FollowButton
                                        containerStyle={{marginRight: 10}}
                                        isFollow={state.following}
                                        followLoading={state.followLoading}
                                        onChangeFollow={onPressFollow}
                                    />
                                    <TouchableHighlight>
                                        <IconFont
                                            name={'jiaoliu'}
                                            color={themeColor}
                                            size={40}
                                        />
                                    </TouchableHighlight>
                                </>
                            ) : (
                                <TouchableHighlight
                                    onPress={props.onPressEdit}
                                    underlayColor={'none'}
                                >
                                    <IconFont
                                        name={'bianjiziliao'}
                                        color={themeColor}
                                        size={20}
                                    />
                                </TouchableHighlight>
                            )}
                        </>
                    )}
                </View>
            </View>

            <View style={styles.nameRow}>
                <Text style={styles.username}>{props.userInfo?.nickname}</Text>

                <Text style={styles.signature}>{props.userInfo?.intro}</Text>
            </View>

            <View style={styles.others}>
                {state.totalInfo.map(item => (
                    <TouchableHighlight
                        key={item.title}
                        underlayColor={'#f8f8f8'}
                        onPress={() => onPressOtherItem(item.type)}>
                        <View style={styles.othersItem}>
                            <Text>{Utils.number2monetaryUnit(item.value)}</Text>
                            <Text>{item.title}</Text>
                        </View>
                    </TouchableHighlight>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    info: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        padding: 10,
        paddingLeft: 20,
    },
    avatar: {
        position: 'absolute',
        left: 20,
        width: 86,
        height: 86,
        borderRadius: 86,
        borderWidth: 2,
        borderColor: '#fff',
        marginLeft: 5,
        marginRight: 10,
    },
    actions: {
        height: 40,
        flex: 1,
        paddingRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    nameRow: {
        flex: 1,
        paddingTop: 10,
        padding: 20,
    },
    username: {
        fontSize: 18,
        color: '#333',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    signature: {
        color: '#858585',
        fontSize: 12,
    },
    others: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopColor: '#f8f8f8',
        borderTopWidth: 1,
        borderBottomColor: '#f8f8f8',
        borderBottomWidth: 10,
    },
    othersItem: {
        width: screenWidth / 3 - 10,
        alignItems: 'center',
        padding: 20,
    },
    blur: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});

export default React.memo(PersonalInfo);
