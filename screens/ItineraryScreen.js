// screens/ItineraryScreen.js
import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

export default function ItineraryScreen({ route }) {
  const {
    originText,
    destText,
    plannedDistance,
    plannedDuration,
    routeSteps,
  } = route.params;

  const hours   = Math.floor(plannedDuration / 3600);
  const minutes = Math.round((plannedDuration % 3600) / 60);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Itinerary</Text>
      <Text style={styles.sub}>{originText} → {destText}</Text>

      <View style={styles.summary}>
        <Text style={styles.summaryText}>Distance: {plannedDistance} mi</Text>
        <Text style={styles.summaryText}>Est. Time: {hours}h{minutes}m</Text>
      </View>

      <View style={styles.stepsSection}>
        <Text style={styles.sectionHeader}>Route Steps:</Text>
        {routeSteps.map((step, idx) => (
          <Text key={idx} style={styles.stepText}>
            {idx + 1}. {step.instruction} ({(step.distance / 1609.34).toFixed(1)} mi)
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:    { flex: 1, padding: 20, backgroundColor: '#fff' },
  title:        { fontSize: 28, fontWeight: '600', marginBottom: 8 },
  sub:          { fontSize: 16, color: '#555', marginBottom: 16 },
  summary:      { marginBottom: 24, padding: 12, backgroundColor: '#f0f8ff', borderRadius: 6 },
  summaryText:  { fontSize: 16, marginVertical: 2 },
  stepsSection: { marginTop: 8 },
  sectionHeader:{ fontSize: 18, fontWeight: '500', marginBottom: 8 },
  stepText:     { fontSize: 14, marginBottom: 6, lineHeight: 20 },
});