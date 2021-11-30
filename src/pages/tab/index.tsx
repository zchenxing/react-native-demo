import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {Tab, TabView, Text} from 'react-native-elements'

const MyTab: React.FC = props => {

    const [tabIndex, setTabIndex] = React.useState(0)

    return (
        <SafeAreaProvider style={{flex: 1, overflow: 'hidden'}}>
            <Tab value={tabIndex} onChange={setTabIndex} style={{height: 30}}>
                <Tab.Item title={'Recent'} />
                <Tab.Item title={'Favorite'} />
                <Tab.Item title={'Cart'} />
            </Tab>

            <TabView value={tabIndex} onChange={setTabIndex} >
                <TabView.Item style={{ backgroundColor: 'red', width: '100%' }}>
                    <Text h1>Recent</Text>
                </TabView.Item>
                <TabView.Item style={{ backgroundColor: 'blue', width: '100%' }}>
                    <Text h1>Favorite</Text>
                </TabView.Item>
                <TabView.Item style={{ backgroundColor: 'green', width: '100%' }}>
                    <Text h1>Cart</Text>
                </TabView.Item>
            </TabView>
        </SafeAreaProvider>
    );
};

export default MyTab;
