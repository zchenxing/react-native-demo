import React from "react";
import { ActivityIndicator, Text } from "react-native";
import { Overlay } from "react-native-elements";
import { useLanguage } from "../../language";

interface IProps {
    visible: boolean
    title?: string
}

const AweOverlayLoading: React.FC<IProps> = (props: IProps) => {
    return (
        <Overlay isVisible={props.visible}>
            <ActivityIndicator />
            <Text>
                {props.title || `${useLanguage.loading}...`}
            </Text>
        </Overlay>
    );
};

export default AweOverlayLoading;
