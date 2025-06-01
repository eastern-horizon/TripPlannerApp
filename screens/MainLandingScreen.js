// screens/MainLandingScreen.js

import React from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';

export default function MainLandingScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.title}>🚛 Oversize Trip Planner - Alpha</Text>

      {/* === Core Navigation === */}
      <Text style={styles.section}>Core</Text>
      <Button title="Trip List" onPress={() => navigation.navigate('TripList')} />
      <Button title="Back Office" onPress={() => navigation.navigate('BackOffice')} />
      <Button title="Notifications" onPress={() => navigation.navigate('Notification')} />

      {/* === Trip Modules === */}
      <Text style={styles.section}>Trip Modules</Text>
      <Button title="Trip Input" onPress={() => navigation.navigate('TripInput')} />
      <Button title="Map Screen" onPress={() => navigation.navigate('MapScreen')} />
      <Button title="Itinerary" onPress={() => navigation.navigate('Itinerary')} />

      {/* === Truck & Profile === */}
      <Text style={styles.section}>Truck & Profile</Text>
      <Button title="Truck Profile" onPress={() => navigation.navigate('TruckProfile')} />

      {/* === HOS & Logbook === */}
      <Text style={styles.section}>HOS & Logbook</Text>
      <Button title="HOS" onPress={() => navigation.navigate('HOS')} />
      <Button title="Logbook" onPress={() => navigation.navigate('Logbook')} />

      {/* === Compliance === */}
      <Text style={styles.section}>Compliance</Text>
      <Button title="Compliance" onPress={() => navigation.navigate('Compliance')} />
      <Button title="Permit" onPress={() => navigation.navigate('Permit')} />
      <Button title="Rule Book" onPress={() => navigation.navigate('RuleBook')} />

      {/* === Back Office Extras === */}
      <Text style={styles.section}>Back Office Extras</Text>
      <Button title="Audit" onPress={() => navigation.navigate('Audit')} />
      <Button title="Fuel" onPress={() => navigation.navigate('Fuel')} />
      <Button title="Reconcile" onPress={() => navigation.navigate('Reconcile')} />

      <View style={{ height: 50 }} />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
});
