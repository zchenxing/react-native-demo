import React from "react";
import { View } from "react-native";
import AnimalCard from "../components/animal-card";
import { AnimalCardType, ShareAnimalProps } from "../components/animal-card/type";
import { PostContentProps } from "../../interface/work";
import { useSetState } from "ahooks";

interface IState {
    biologicalCard: ShareAnimalProps | null
    deviceInfo: any
    googleMapUrl: string
}

interface IProps {
    animalType: AnimalCardType
    postData: PostContentProps;
}

const PastCard: React.FC<IProps> = (props: IProps) => {

    const [state, setState] = useSetState<IState>({
        biologicalCard: null,
        deviceInfo: null,
        googleMapUrl: ''
    })

    React.useEffect(() => {

        if (props.animalType === AnimalCardType.ShareType) {
            const card: any = props.postData.biological_card;
            const data: ShareAnimalProps = {
                biological_base: card.biological_base,
                biological_detail: card.biological_detail || null,
                biological_release: card.biological_release || null,
                imageUrls: card.biological_images.map((img: any) => img.url_normal),
                images: [],
            };

            setState({
                biologicalCard: data
            })

        } else {
            const entrust: any = props.postData.entrust;
            const animal: ShareAnimalProps = {
                biological_base: entrust.biological_info.biological_base,
                imageUrls: entrust.biological_info.images.map((img: any) => img.url_normal),
                images: [],
            };

            const device = {
                uuid: entrust.device_info.uuid,
                product_model: entrust.device_info.product_model,
            }

            setState({
                biologicalCard: animal,
                deviceInfo: device,
                googleMapUrl: entrust.device_info.geo_round_image.url_origin
            })

        }


    }, []);

    return (
        <View
            style={{
                paddingTop: 10,
                padding: 20,
                backgroundColor: '#FFF',
            }}>
            {state.biologicalCard && (
                <AnimalCard
                    animalType={props.animalType}
                    showOtherInfo={true}
                    animalInfo={state.biologicalCard}
                    shareData={state.deviceInfo}
                    googleMapPic={state.googleMapUrl}
                />
            )}
        </View>
    );
};

export default React.memo(PastCard);
