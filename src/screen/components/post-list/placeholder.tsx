import React from "react";
import { ScrollView, View } from "react-native";
import { Fade, Placeholder, PlaceholderLine, PlaceholderMedia } from "rn-placeholder";

const PostListPlaceholder: React.FC = () => {
    return (
        <ScrollView style={{padding: 20}}>
            {[1, 2, 3].map(value => (
                <Placeholder Animation={Fade} key={value}>
                    <PlaceholderMedia />
                    <View style={{height: 10}} />
                    <PlaceholderLine width={80} />
                    <PlaceholderLine />
                    <PlaceholderLine />
                    <View style={{height: 40}} />
                </Placeholder>
            ))}
        </ScrollView>
    );
};

export default PostListPlaceholder;
