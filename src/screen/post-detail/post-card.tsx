import React from 'react';
import {View} from 'react-native';
import AnimalCard from '../components/animal-card';
import axios from 'axios';
import apis from '../../network/apis';
import { ShareAnimalProps, ShareProps } from "../components/animal-card/type";
import { useSetState } from "ahooks";

interface IProps {
    animalId: string;
}

interface IState {
    shareData: ShareProps | null
    animalData: ShareAnimalProps | null
}

const PastCard: React.FC<IProps> = (props: IProps) => {

    const [state, setState] = useSetState<IState>({
        shareData: null,
        animalData: null
    })

    React.useEffect(() => {
        getCheckShare();
        getAnimalInfo()
    }, []);

    const getCheckShare = async () => {

        try {
            const res = await axios(apis.ecotopia.share(props.animalId));
            setState({
                shareData: res.data
            })
        } catch (err) {
            console.log(err);
        }
    };


    const getAnimalInfo = async () => {
        try {
            const res = await axios(apis.ecotopia.info(props.animalId))

            getAnimalImages(res.data.images)
            setState({
                animalData: {
                    ...res.data,
                    imageUrls: res.data.images.map((url: string) => {
                        return apis.ecotopia.image(props.animalId, url)
                    })
                }
            })
        } catch (err) {
            console.log(err);
        }
    }


    const getAnimalImages = async (images: string[]) => {

        try {

        } catch (err) {

        }

    }


    return (
        <View
            style={{
                paddingTop: 10,
                padding: 20,
                backgroundColor: '#FFF',
            }}>
            <AnimalCard
                showMoreInfo={true}
                shareData={state.shareData}
                animalInfo={state.animalData}
            />
        </View>
    );
};

export default React.memo(PastCard);
