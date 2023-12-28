import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';

import * as Location from 'expo-location';

export default function App() {
  const getLocation = async () => {
      
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }

    const location = await Location.getCurrentPositionAsync({});

    await axios('http://localhost:3000/location', {
      method: 'POST',
      data: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        timestamp: location.timestamp,
     },
    })
  };

  setInterval(() => {
    getLocation()
  }, 10000);
  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Estamos capturando sua localização...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
