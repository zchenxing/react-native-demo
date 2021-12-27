import React from 'react';
import {
    Animated,
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {isIOS, screenWidth} from '../../config/contant';
import {avatarUrl} from '../../mock';
import {useSetState} from 'ahooks';
import Utils from '../../help';
import {PersonalOtherEnum} from './type';
import FollowButton from '../components/follow-button';
import Toast from 'react-native-simple-toast';
import {UserInfoProps} from '../../interface/work';

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
    followLoading: boolean;
    totalInfo: any[];
}

const PersonalInfo: React.FC<IProps> = (props: IProps) => {
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
            totalInfo[0].value = props.userInfo?.total_theme;
            totalInfo[1].value = props.userInfo?.total_follow;
            totalInfo[2].value = props.userInfo?.total_fans;
            setState({totalInfo});
        }
    }, [props.userInfo]);

    const onPressFollow = () => {
        setState({
            followLoading: true,
        });

        setTimeout(() => {
            setState({
                following: !state.following,
                followLoading: false,
            });

            Toast.showWithGravity(
                !state.following ? '已关注' : '已取消关注',
                1,
                Toast.TOP,
            );
        }, 900);
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
                    <Image source={{uri: avatarUrl}} style={{flex: 1}} />
                </LinearGradient>

                <View
                    style={[
                        styles.blur,
                        {backgroundColor: 'rgba(0, 0, 0, .6)'},
                    ]}
                />
            </Animated.View>

            <View style={styles.info}>
                <Image source={{uri: avatarUrl}} style={styles.avatar} />

                <View style={styles.actions}>
                    <FollowButton
                        isFollow={state.following}
                        followLoading={state.followLoading}
                        onChangeFollow={onPressFollow}
                    />
                    <TouchableHighlight onPress={props.onPressEdit}>
                        <Text>编辑</Text>
                    </TouchableHighlight>
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
        flexDirection: 'row',
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
