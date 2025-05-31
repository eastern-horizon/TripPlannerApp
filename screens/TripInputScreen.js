// screens/TripInputScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Constants from 'expo-constants';
import { fetchRoute } from '../utils/routeService';

const cfg = Constants.manifest ?? Constants.expoConfig;
const ORS_KEY = cfg?.extra?.ORS_API_KEY;

async function geocode(place) {
  const url = `https://api.openrouteservice.org/geocode/search?api_key=${ORS_KEY}&text=${encodeURIComponent(
    place
  )}`;
  const res = await fetch(url);
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Geocode error: ${txt}`);
  }
  const { features } = await res.json();
  if (!features.length) {
    throw new Error(`No results found for “${place}”`);
  }
  const [lng, lat] = features[0].geometry.coordinates;
  return { lat, lng };
}

export default function TripInputScreen({ navigation }) {
  const [originText, setOriginText] = useState('');
  const [destText, setDestText]     = useState('');
  const [loading, setLoading]       = useState(false);

  const handleGenerate = async () => {
    if (!originText.trim() || !destText.trim()) {
      return Alert.alert('Missing info', 'Please enter both origin and destination.');
    }
    try {
      setLoading(true);
      const origin      = await geocode(originText);
      const destination = await geocode(destText);
      const { distance, duration, steps } = await fetchRoute(origin, destination);

      navigation.navigate('Itinerary', {
        originText,
        destText,
        plannedDistance: (distance / 1609.34).toFixed(1), // in miles
        plannedDuration: duration,                        // in seconds
        routeSteps: steps,
      });
    } catch (err) {
      console.error(err);
      Alert.alert('Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <Text style={styles.header}>Trip Planner</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Origin</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. San Diego, CA"
          value={originText}
          onChangeText={setOriginText}
          editable={!loading}
          returnKeyType="next"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Destination</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Brockton, MA"
          value={destText}
          onChangeText={setDestText}
          editable={!loading}
          onSubmitEditing={handleGenerate}
          returnKeyType="go"
        />
      </View>

      {loading
        ? <ActivityIndicator size="large" style={{ marginTop: 20 }} />
        : (
          <TouchableOpacity style={styles.button} onPress={handleGenerate}>
            <Text style={styles.buttonText}>Generate Itinerary</Text>
          </TouchableOpacity>
        )
      }
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#fff' },
  header:    { fontSize: 28, fontWeight: '600', marginBottom: 32, textAlign: 'center' },
  inputGroup:{ marginBottom: 20 },
  label:     { fontSize: 16, marginBottom: 6, color: '#333' },
  input:     {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 6,
    paddingHorizontal: 12, paddingVertical: Platform.select({ ios: 12, android: 8 }),
    fontSize: 16, backgroundColor: '#fafafa',
  },
  button:    { marginTop: 32, backgroundColor: '#007AFF', paddingVertical: 14, borderRadius: 8, alignItems: 'center' },
  buttonText:{ color: '#fff', fontSize: 18, fontWeight: '500' },
});