import React from "react";
import { View } from "react-native";
import AnimalCard from "../components/animal-card";
import axios from "axios";
import apis from "../../network/apis";
import { AnimalCardType, ShareAnimalProps, ShareProps } from "../components/animal-card/type";
import { useSetState } from "ahooks";
import { PostContentProps } from "../../interface/work";

interface IProps {
    postData: PostContentProps;
}


const PastCard: React.FC<IProps> = (props: IProps) => {

    const [biologicalCard, setBiologicalCard] =
        React.useState<ShareAnimalProps | null>(null);

    React.useEffect(() => {
        const card: any = props.postData.biological_card;
        const data: ShareAnimalProps = {
            biological_base: card.biological_base,
            biological_detail: card.biological_detail || null,
            biological_release: card.biological_release || null,
            imageUrls: card.biological_images.map(
                (img: any) => img.url_normal,
            ),
            images: [],
        };

        setBiologicalCard(data)

    }, [])

    return (
        <View
            style={{
                paddingTop: 10,
                padding: 20,
                backgroundColor: '#FFF',
            }}>
            {
                biologicalCard &&
                <AnimalCard
                    animalType={AnimalCardType.ShareType}
                    showOtherInfo={true}
                    animalInfo={biologicalCard}
                />
            }

        </View>
    );
};

export default React.memo(PastCard);
