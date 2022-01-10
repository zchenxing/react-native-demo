import React from 'react';
import HomeNavigator from './navigator';
import {NavigateProps} from '../../interface';
import {INTELINK_SCREEN_NAME} from '../../routes/screen-name';
import PostList from '../components/post-list';
import {PostContentProps} from '../../interface/work';
import {
    useCommentDataStore,
    usePublishDataStore,
    useSelfDataStore,
} from '../../store/provider';
import {observer} from 'mobx-react';
import apis from '../../network/apis';
import {SpeedDial} from 'react-native-elements';
import Publishing from './publishing';
import {PostType} from '../../enum';
import {useMyThrottle} from '../../help/throttle';

const HomeScreen: React.FC<NavigateProps> = (props: NavigateProps) => {
    const {selfInfoData} = useSelfDataStore();
    const {resetCommentData} = useCommentDataStore();
    const {draftBox} = usePublishDataStore();
    const [open, setOpen] = React.useState(false);

    const onPressSearch = () => {
        props.navigation.push(INTELINK_SCREEN_NAME.SCREEN_SEARCH);
    };

    const onPressPersonal = (userId: string) => {
        props.navigation.push(INTELINK_SCREEN_NAME.SCREEN_PERSONAL, {
            listId: userId,
            userId,
        });
    };

    const onPressDetail = useMyThrottle(
        (postContent: PostContentProps, rowIndex: number) => {
            // 重置首页评论数据
            resetCommentData(INTELINK_SCREEN_NAME.SCREEN_HOME);
            props.navigation.push(INTELINK_SCREEN_NAME.SCREEN_POST_DETAIL, {
                postId: postContent.id,
                // 当修改评论时，来自主页数据的评论个数也需要修改
                fromListId: INTELINK_SCREEN_NAME.SCREEN_HOME,
                rowIndex,
            });
        },
        666,
    );

    /**
     * 发布普通帖子
     */
    const onPublish = () => {
        props.navigation.push(INTELINK_SCREEN_NAME.SCREEN_PUBLISH);
    };

    /**
     * 发布分享
     */
    const onPublishShare = (shareId: string) => {
        console.log('分享 shareId=', shareId);
        props.navigation.push(INTELINK_SCREEN_NAME.SCREEN_PUBLISH_SHARE, {
            shareId,
        });
    };

    /**
     * 发布委托
     */
    const onPublishQuest = (shareId: string) => {
        console.log('委托 shareId=', shareId);
        props.navigation.push(INTELINK_SCREEN_NAME.SCREEN_PUBLISH_ENTRUST, {
            shareId,
        });
    };

    const onPostAgain = () => {
        console.log('Post again:', draftBox);
        // 普通发布
        if (draftBox) {
            if (draftBox.postType === PostType.Normal) {
                onPublish();
            } else if (draftBox.postType === PostType.BiologicalCard) {
                onPublishShare(draftBox.shareId || '');
            } else {
                onPublishQuest(draftBox.shareId || '');
            }
        }
    };

    return (
        <>
            <HomeNavigator onSearch={onPressSearch} onPublish={onPublish} />

            <Publishing onPostAgain={onPostAgain} />

            <PostList
                api={apis.post.list}
                listId={INTELINK_SCREEN_NAME.SCREEN_HOME}
                onPressPersonal={onPressPersonal}
                onPressDetail={onPressDetail}
            />

            <SpeedDial
                isOpen={open}
                icon={{name: 'edit', color: '#fff'}}
                openIcon={{name: 'close', color: '#fff'}}
                onOpen={() => setOpen(!open)}
                onClose={() => setOpen(!open)}>
                <SpeedDial.Action
                    title={selfInfoData?.nickname}
                    onPress={() => props.navigation.push('Test1')}
                />

                <SpeedDial.Action
                    title="发布委托"
                    onPress={() => {
                        setOpen(false);
                        onPublishQuest('61cd0facaca33b601ec76ea1');
                    }}
                />

                <SpeedDial.Action
                    title="发布分享"
                    onPress={() => {
                        setOpen(false);
                        onPublishShare('61caefb2aca33b1a370bf463');
                    }}
                />
            </SpeedDial>
        </>
    );
};

export default observer(HomeScreen);
