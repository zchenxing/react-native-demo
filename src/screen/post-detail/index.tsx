import React from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { NavigateProps } from "../../interface";
import PostDetailNavigator from "./navigator";
import PostContent from "./post-content";
import ScreenBase from "../components/screen-base";

const PostDetailScreen: React.FC<NavigateProps> = (props: NavigateProps) => {

    const [followStatus, setFollowStatus] = React.useState(false)
    const [followLoading, setFollowLoading] = React.useState(false)

    const onChangeFollow = () => {
        setFollowLoading(true)
        setTimeout(() => {
            setFollowLoading(false)
            setFollowStatus(!followStatus)
        }, 1000)
    }

    return (
        <>
            <PostDetailNavigator
                isFollow={followStatus}
                followLoading={followLoading}
                goBack={props.navigation.goBack}
                onChangeFollow={onChangeFollow}
            />

            <ScreenBase>

                <View style={{flex: 1}}>
                    <FlatList
                        data={Array.from(new Array(100).keys())}
                        renderItem={(row) => {
                            if (row.item === 0) {
                                return <PostContent />
                            } else {
                                return (
                                    <View>
                                        <Text>comment</Text>
                                    </View>
                                )
                            }

                        }}
                    />
                </View>


                <View style={styles.footer}>
                    <TextInput defaultValue={'0219ie9'} />
                </View>
            </ScreenBase>

        </>
    );
};


const styles = StyleSheet.create({
    footer: {
        height: 50,
        backgroundColor: '#eee'
    }
})

export default PostDetailScreen;
