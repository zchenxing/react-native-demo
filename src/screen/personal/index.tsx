import React from 'react';
import {
    FlatList,
    StatusBar,
    View,
    Animated,
    StyleSheet,
} from 'react-native';
import PersonalInfo from './info';
import { isIOS, screenWidth } from "../../config/contant";
import UserNavigator from '../components/user-navigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import PostItem from '../components/post-item';
import PostComment from '../components/post-comments';
import { PersonalOtherEnum } from "./type";
import { NavigateProps } from "../../interface";
import { INTELINK_SCREEN_NAME } from "../../routes/screen-name";


class PersonalScreen extends React.Component<NavigateProps, any> {

    changeNavHeight = 70; //决定改变导航栏样式的滑动距离
    flatListRef: any = React.createRef()
    navOpacityAnimated: any = null

    state = {
        navOpacityOffset: new Animated.Value(0),
        commentVisible: false
    };

    constructor(props: any) {
        super(props);
    }

    UNSAFE_componentWillMount() {

        //生成透明度动画输入输出区间
        const navOpacityOffset = this.state.navOpacityOffset;
        this.navOpacityAnimated = navOpacityOffset.interpolate({
            inputRange: [0, this.changeNavHeight],
            outputRange: [0, 1],
            extrapolate: 'clamp', // 阻止输出值超过outputRange
            // @ts-ignore
            useNativeDriver: true,
        });
    }


    onScrollOffset = (offset: number) => {
        this.flatListRef.scrollToOffset({
            offset,
            animated: true
        })
    }


    onPressFollowList = (type: PersonalOtherEnum) => {
        this.props.navigation.push(INTELINK_SCREEN_NAME.SCREEN_FOLLOW_LIST)
    }

    render() {
        return (
            <>
                <SafeAreaProvider style={{flex: 1}}>
                    <StatusBar
                        animated={true}
                        // @ts-ignore
                        androidtranslucent={true}
                        barStyle="dark-content"
                        translucent={true}
                    />

                    <View style={styles.header}>
                        <View style={styles.headerBack}>
                            <Icon
                                name={'angle-left'}
                                style={{fontSize: 30, color: '#fff'}}
                            />
                        </View>
                        <Animated.View
                            style={{
                                backgroundColor: '#fff',
                                opacity: this.navOpacityAnimated,
                            }}>
                            <UserNavigator
                                isFollow={true}
                                backgroundColor={`rgba(0, 0, 0, 0)`}
                                followLoading={false}
                                goBack={this.props.navigation.goBack}
                                onChangeFollow={() => {}}
                            />
                        </Animated.View>
                    </View>

                    <FlatList
                        ref={ref => (this.flatListRef = ref)}
                        style={{flex: 1, width: screenWidth}}
                        scrollEventThrottle={1}
                        data={Array.from(new Array(4).keys())}
                        onScroll={Animated.event(
                            [
                                {
                                    nativeEvent: {
                                        contentOffset: {
                                            y: this.state.navOpacityOffset,
                                        },
                                    },
                                },
                            ],
                            {
                                useNativeDriver: false,
                            },
                        )}
                        showsVerticalScrollIndicator={false}
                        renderItem={row => {
                            if (row.item === 0) {
                                return (
                                    <PersonalInfo
                                        imageOffsetY={this.state.navOpacityOffset}
                                        onScrollOffset={this.onScrollOffset}
                                        onPressFollowList={
                                            this.onPressFollowList
                                        }
                                    />
                                )
                            } else {
                                return (
                                    <PostItem
                                        {...row}
                                        hiddenFollow={true}
                                        onPressDetail={() => {}}
                                        onPressPicture={() => {}}
                                        onPressComment={() => this.setState({commentVisible: true})}
                                        onPressPersonal={() => {}}
                                    />
                                );
                            }
                        }}
                    />
                </SafeAreaProvider>


                <PostComment
                    visible={this.state.commentVisible}
                    onClose={() => this.setState({commentVisible: false})}
                />
            </>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        zIndex: 10,
    },
    headerBack: {
        position: 'absolute',
        bottom: 12,
        left: 19,
    },
    itemView: {
        width: screenWidth,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default PersonalScreen;
