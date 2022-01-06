import React from 'react';
import HomeNavigator from './navigator';
import {NavigateProps} from '../../interface';
import {INTELINK_SCREEN_NAME} from '../../routes/screen-name';
import PostList from '../components/post-list';
import {PostContentProps} from '../../interface/work';
import { useCommentDataStore, useSelfDataStore } from "../../store/provider";
import {observer} from 'mobx-react'
import apis from '../../network/apis';
import {SpeedDial} from 'react-native-elements'
import { Text, View } from "react-native";
import Publishing from "./publishing";



const HomeScreen: React.FC<NavigateProps> = (props: NavigateProps) => {

    const {selfInfoData} = useSelfDataStore()
    const {resetCommentData} = useCommentDataStore()
    const [open, setOpen] = React.useState(false);

    const onPressSearch = () => {
        props.navigation.push(INTELINK_SCREEN_NAME.SCREEN_SEARCH);
    };

    const onPublish = () => {
        props.navigation.push(INTELINK_SCREEN_NAME.SCREEN_PUBLISH);
    };

    const onPressPersonal = (userId: string) => {
        // resetCommentData('')
        props.navigation.push(INTELINK_SCREEN_NAME.SCREEN_PERSONAL, {
            listId: userId,
            userId
        });
    };

    const onPressDetail = (postContent: PostContentProps, rowIndex: number) => {

        // 重置首页评论数据
        resetCommentData(INTELINK_SCREEN_NAME.SCREEN_HOME)
        props.navigation.push(INTELINK_SCREEN_NAME.SCREEN_POST_DETAIL, {
            postId: postContent.id,
            // 当修改评论时，来自主页数据的评论个数也需要修改
            fromListId: INTELINK_SCREEN_NAME.SCREEN_HOME,
            rowIndex
        });
    };

    return (
        <>
            <HomeNavigator onSearch={onPressSearch} onPublish={onPublish} />

            <Publishing />

            <PostList
                api={apis.post.list}
                listId={INTELINK_SCREEN_NAME.SCREEN_HOME}
                onPressPersonal={onPressPersonal}
                onPressDetail={onPressDetail}
            />


            <SpeedDial
                isOpen={open}
                icon={{ name: 'edit', color: '#fff' }}
                openIcon={{ name: 'close', color: '#fff' }}
                onOpen={() => setOpen(!open)}
                onClose={() => setOpen(!open)}
            >
                <SpeedDial.Action
                    title={selfInfoData?.nickname}
                    onPress={() => props.navigation.push('Test1')}
                />

                <SpeedDial.Action
                    title="发布委托"
                    onPress={() => {
                        setOpen(false)
                        props.navigation.push(INTELINK_SCREEN_NAME.SCREEN_PUBLISH_ENTRUST, {
                            shareId: '61cd0facaca33b601ec76ea1'
                        });
                    }}
                />

                <SpeedDial.Action
                    title="发布分享"
                    onPress={() => {
                        setOpen(false)
                        props.navigation.push(INTELINK_SCREEN_NAME.SCREEN_PUBLISH_SHARE, {
                            shareId: '61caefb2aca33b1a370bf463'
                        });
                    }}
                />
            </SpeedDial>
        </>
    );
};

export default observer(HomeScreen);
