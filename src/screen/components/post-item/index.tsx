import React from 'react';
import {StyleSheet, TouchableHighlight} from 'react-native';
import {PostItemProps} from './type';
import PostHeader from './post-header';
import PostArticle from './post-article';
import PostFooter from './post-footer';
import PostPicture from './post-picture';
import {UserEventType} from '../../../enum';
import WorkHelp from '../../../help/work';
import AnimalCard from '../animal-card';
import {AnimalCardType, ShareAnimalProps} from '../animal-card/type';

const PostItem: React.FC<PostItemProps> = (props: PostItemProps) => {
    const [biologicalCard, setBiologicalCard] =
        React.useState<ShareAnimalProps | null>(null);

    React.useEffect(() => {
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
            setBiologicalCard(data);
        }
    }, []);

    const onPressPicture = (startIndex: number) => {
        if (props.postItem.images) {
            props.onPressPicture(props.postItem.images, startIndex);
        }
    };

    return (
        <TouchableHighlight
            style={styles.itemContent}
            onPress={() => props.onPressDetail(props.postItem)}
            underlayColor={'#eee'}>
            <>
                <PostHeader
                    isShare={!!props.postItem.biological_card}
                    userNickname={props.postItem.user_info.nickname}
                    userAvatar={props.postItem.user_info.avatar?.url_thumb}
                    label={props.postItem.label}
                    hiddenFollow={props.hiddenFollow}
                    handleUser={() =>
                        props.onPressPersonal && props.onPressPersonal()
                    }
                />

                <PostArticle contentText={props.postItem.content} />

                {props.postItem.images && (
                    <PostPicture
                        pictureUri={props.postItem.images}
                        onPressPicture={onPressPicture}
                    />
                )}

                {props.postItem.biological_card && biologicalCard && (
                    <AnimalCard
                        speciesType={props.postItem.label}
                        animalType={AnimalCardType.ShareType}
                        showLocation={true}
                        animalInfo={biologicalCard}
                    />
                )}

                <PostFooter
                    isCollection={
                        WorkHelp.userEventExist(
                            props.postItem.user_events,
                            UserEventType.Collection,
                        ).isExist
                    }
                    createdAt={props.postItem.created_at}
                    commentTotal={props.postItem.total_comment}
                    onPressCollection={props.onPressCollection}
                    onPressComment={props.onPressComment}
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

export default PostItem;
