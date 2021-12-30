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

            <PostList
                api={apis.post.list}
                listId={INTELINK_SCREEN_NAME.SCREEN_HOME}
                onPressPersonal={onPressPersonal}
                onPressDetail={onPressDetail}
            />


            {/*<SpeedDial*/}
            {/*    isOpen={open}*/}
            {/*    icon={{ name: 'edit', color: '#fff' }}*/}
            {/*    openIcon={{ name: 'close', color: '#fff' }}*/}
            {/*    onOpen={() => setOpen(!open)}*/}
            {/*    onClose={() => setOpen(!open)}*/}
            {/*>*/}
            {/*    <SpeedDial.Action*/}
            {/*        title={selfInfoData?.nickname}*/}
            {/*        onPress={() => props.navigation.push('Test1')}*/}
            {/*    />*/}
                <SpeedDial.Action
                    title="委托"
                    onPress={() => {
                        props.navigation.push(INTELINK_SCREEN_NAME.SCREEN_ENTRUST_LIST);
                    }}
                />

            {/*    <SpeedDial.Action*/}
            {/*        title="分享"*/}
            {/*        onPress={() => {*/}
            {/*            props.navigation.push(INTELINK_SCREEN_NAME.SCREEN_PUBLISH_SHARE, {*/}
            {/*                animalId: '61caefb2aca33b1a370bf463'*/}
            {/*            });*/}
            {/*        }}*/}
            {/*    />*/}
            {/*</SpeedDial>*/}
        </>
    );
};

export default observer(HomeScreen);
