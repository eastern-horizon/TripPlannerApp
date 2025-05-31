// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TripListScreen from './screens/TripListScreen';
import TripDetailScreen from './screens/TripDetailScreen';
import MapScreen from './screens/MapScreen';
import LogbookScreen from './screens/LogbookScreen';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="TripList">
                <Stack.Screen name="TripList" component={TripListScreen} options={{ title: 'Trips' }} />
                <Stack.Screen name="TripDetail" component={TripDetailScreen} options={{ title: 'Trip Details' }} />
                <Stack.Screen name="MapScreen" component={MapScreen} options={{ title: 'Route Map' }} />
                <Stack.Screen name="LogbookScreen" component={LogbookScreen} options={{ title: 'Logbook' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
