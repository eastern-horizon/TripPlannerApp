// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Main Screens
import MainLandingScreen from './screens/MainLandingScreen';
import TripListScreen from './screens/TripListScreen';
import TripDetailScreen from './screens/TripDetailScreen';
import NotificationScreen from './screens/NotificationScreen';
import BackOfficeScreen from './screens/BackOfficeScreen';

// Trip Modules
import TripInputScreen from './screens/TripInputScreen';
import MapScreen from './screens/MapScreen';  // will auto-pick .native.js or .web.js
import ItineraryScreen from './screens/ItineraryScreen';

// Truck & Profile
import TruckProfileScreen from './screens/TruckProfileScreen';

// HOS & Logbook
import HOSScreen from './screens/HOSScreen';
import LogbookScreen from './screens/LogbookScreen';

// Compliance
import ComplianceScreen from './screens/ComplianceScreen';
import PermitScreen from './screens/PermitScreen';
import RuleBookScreen from './screens/RuleBookScreen';

// Back Office Extras
import AuditScreen from './screens/AuditScreen';
import FuelScreen from './screens/FuelScreen';
import ReconcileScreen from './screens/ReconcileScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainLanding">

        {/* === Main Navigation === */}
        <Stack.Screen name="MainLanding" component={MainLandingScreen} />
        <Stack.Screen name="TripList" component={TripListScreen} />
        <Stack.Screen name="TripDetail" component={TripDetailScreen} />
        <Stack.Screen name="Notification" component={NotificationScreen} />
        <Stack.Screen name="BackOffice" component={BackOfficeScreen} />

        {/* === Trip Modules === */}
        <Stack.Screen name="TripInput" component={TripInputScreen} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen name="Itinerary" component={ItineraryScreen} />

        {/* === Truck & Profile === */}
        <Stack.Screen name="TruckProfile" component={TruckProfileScreen} />

        {/* === HOS & Logbook === */}
        <Stack.Screen name="HOS" component={HOSScreen} />
        <Stack.Screen name="Logbook" component={LogbookScreen} />

        {/* === Compliance === */}
        <Stack.Screen name="Compliance" component={ComplianceScreen} />
        <Stack.Screen name="Permit" component={PermitScreen} />
        <Stack.Screen name="RuleBook" component={RuleBookScreen} />

        {/* === Back Office Extras === */}
        <Stack.Screen name="Audit" component={AuditScreen} />
        <Stack.Screen name="Fuel" component={FuelScreen} />
        <Stack.Screen name="Reconcile" component={ReconcileScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
