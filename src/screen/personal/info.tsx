import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AweSimpleNavigator from "../../components/awe-simple-navigator";


const HEADER_HEIGHT = 200


const PersonalInfo: React.FC = (props) => {
    return (
       <>

           <View style={styles.container}>

               <Text>PersonalInfo</Text>
           </View>
       </>
    );
};

const styles = StyleSheet.create({
    container: {
        height: HEADER_HEIGHT,
        backgroundColor: 'green'
    }
})

export default React.memo(PersonalInfo);
