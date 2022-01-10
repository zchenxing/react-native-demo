import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Draggable from 'react-native-draggable';
import {screenHeight, screenWidth} from '../../config/contant';
import {Card} from 'react-native-shadow-cards';
import LinearGradient from 'react-native-linear-gradient';
import {useLanguage} from '../../language';
import {themeColor} from '../../assets/styles';

interface IProps {
    onPressIn: () => void;
    onRelease: () => void;
}

const QuestDrag: React.FC<IProps> = (props: IProps) => {
    const [hasAccept, setHasAccept] = React.useState(false);

    return (
        <Draggable
            x={screenWidth - (hasAccept ? 140 : 110)}
            y={screenHeight - 150}
            minX={0}
            minY={0}
            maxX={screenWidth}
            maxY={screenHeight}
            onShortPressRelease={() => setHasAccept(!hasAccept)}
            onPressIn={props.onPressIn}
            onRelease={props.onRelease}>
            <Card style={styles.shadow}>
                <LinearGradient
                    colors={['#6FC1CE', '#a2dee6']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={styles.questDetail}>
                    <Text style={{color: '#fff'}}>
                        {hasAccept
                            ? useLanguage.quest_detail
                            : useLanguage.accept}
                    </Text>
                </LinearGradient>
            </Card>
        </Draggable>
    );
};

export default React.memo(QuestDrag);

const styles = StyleSheet.create({
    questDetail: {
        backgroundColor: themeColor,
        height: 40,
        paddingRight: 20,
        paddingLeft: 20,
        borderRadius: 40,
        justifyContent: 'center',
    },
    shadow: {
        borderRadius: 20,
        width: 'auto',
    },
});
