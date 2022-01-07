import React from 'react';
import {StyleSheet, TouchableHighlight} from 'react-native';
import {PostItemProps} from './type';
import PostHeader from './post-header';
import PostArticle from './post-article';
import PostFooter from './post-footer';
import PostPicture from './post-picture';
import { UserEventType } from "../../../enum";
import WorkHelp from '../../../help/work';
import AnimalCard from '../animal-card';
import {AnimalCardType, ShareAnimalProps} from '../animal-card/type';
import PostQuest from './post-quest';
import { useSetState } from "ahooks";
import { useSelfDataStore } from "../../../store/provider";

interface IState {
    biologicalCard: ShareAnimalProps | null
    questCard: any
}

const PostItem: React.FC<PostItemProps> = (props: PostItemProps) => {

    const row: any = React.useRef(JSON.parse(props.row)).current

    const {selfInfoData} = useSelfDataStore()

    const [state, setState] = useSetState<IState>({
        biologicalCard: null,
        questCard: null
    })


    React.useEffect(() => {
        // 生物分享数据
        if (props.postItem.biological_card) {
            const card: any = props.postItem.biological_card;
            const data: ShareAnimalProps = {
                biological_base: card.biological_base,
                biological_detail: card.biological_detail || null,
                biological_release: card.biological_release || null,
                imageUrls: card.biological_images.map(
                    (img: any) => img.url_normal,
                ),
                images: [],
            };
            setState({
                biologicalCard: data
            })
        }
        // 委托数据
        else if (props.postItem.entrust) {
            const entrust: any = props.postItem.entrust;
            const data: any = {
                biologicalBase: entrust.biological_info.biological_base,
                avatar: entrust.biological_info.images[0].url_thumb,
                mapPicture: entrust.device_info.geo_round_image.url_origin
            }

            setState({
                questCard: data
            })
        }
    }, []);

    const onPressPicture = (startIndex: number) => {
        if (props.postItem.images) {
            props.onPressPicture(props.postItem.images, startIndex);
        }
    };


    console.log('Post item:', new Date().valueOf());

    return (
        <TouchableHighlight
            style={styles.itemContent}
            onPress={() => props.onPressDetail(props.postItem, row.index)}
            underlayColor={'#eee'}>
            <>
                <PostHeader
                    postType={props.postItem.type}
                    isMySelf={props.postItem.user_id === selfInfoData?.id}
                    userNickname={props.postItem.user_info.nickname}
                    userAvatar={props.postItem.user_info.avatar?.url_thumb}
                    label={props.postItem.label}
                    hiddenFollow={props.hiddenFollow}
                    handleUser={() => props.onPressPersonal && props.onPressPersonal(row.item.user_id)}
                    handleMore={() => props.onPressMoreAction && props.onPressMoreAction(row)}
                />

                <PostArticle contentText={props.postItem.content} />

                {props.postItem.images && (
                    <PostPicture
                        pictureUri={props.postItem.images}
                        onPressPicture={onPressPicture}
                    />
                )}

                {props.postItem.biological_card && state.biologicalCard && (
                    <AnimalCard
                        speciesType={props.postItem.label}
                        animalType={AnimalCardType.ShareType}
                        showLocation={true}
                        animalInfo={state.biologicalCard}
                    />
                )}


                {
                    props.postItem.entrust && state.questCard &&
                    <PostQuest {...state.questCard} />
                }

                <PostFooter
                    isCollection={
                        WorkHelp.userEventExist(
                            props.postItem.user_events,
                            UserEventType.Collection,
                        ).isExist
                    }
                    createdAt={props.postItem.created_at}
                    commentTotal={props.postItem.total_comment}
                    onPressCollection={() => props.onPressCollection(row)}
                    onPressComment={() => props.onPressComment(row)}
                />
            </>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    itemContent: {
        padding: 20,
        paddingBottom: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 10,
        borderBottomColor: '#F8F8F8',
    },
});

export default React.memo(PostItem);
