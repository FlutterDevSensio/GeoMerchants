// // 📁 screens/HomeScreen.tsx
// import React, { useEffect, useState } from 'react';
// import { View, Text, Button, FlatList, StyleSheet, Alert, PermissionsAndroid, Platform } from 'react-native';
// import Geolocation from 'react-native-geolocation-service';
// import merchants from '../data/merchants';
// import { getUser, removeUser } from '../utils/storage';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../App';
// import { useNavigation } from '@react-navigation/native';

// const HomeScreen = (): JSX.Element => {
//   const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
//   const [username, setUsername] = useState<string>('');
//   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();

//   useEffect(() => {
//     const init = async () => {
//       const user = await getUser();
//       if (!user) {
//         navigation.replace('Login');
//       } else {
//         setUsername(user);
//       }
//       getLocation();
//     };

//     init();
//   }, []);

//   const hasLocationPermission = async (): Promise<boolean> => {
//     if (Platform.OS === 'ios') return true;

//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         {
//           title: 'Location Permission',
//           message: 'This app needs access to your location.',
//           buttonNeutral: 'Ask Me Later',
//           buttonNegative: 'Cancel',
//           buttonPositive: 'OK',
//         }
//       );
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     } catch (err) {
//       console.warn(err);
//       return false;
//     }
//   };

//   const getLocation = async () => {
//     const permission = await hasLocationPermission();
//     if (!permission) {
//       Alert.alert('Permission Denied', 'Location permission is required');
//       return;
//     }

//     Geolocation.getCurrentPosition(
//       (position) => setLocation(position.coords),
//       (error) => Alert.alert('Location Error', error.message),
//       { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//     );
//   };

//   const handleLogout = async () => {
//     await removeUser();
//     navigation.replace('Login');
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Welcome, {username} 👋</Text>

//       <Text style={styles.subHeader}>Current Location:</Text>
//       {location ? (
//         <Text style={styles.location}>
//           Latitude: {location.latitude.toFixed(4)}, Longitude: {location.longitude.toFixed(4)}
//         </Text>
//       ) : (
//         <Text>Fetching location...</Text>
//       )}

//       <Text style={styles.subHeader}>Merchants:</Text>
//       <FlatList
//         data={merchants}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
//       />

//       <View style={{ marginTop: 20 }}>
//         <Button title="Logout" onPress={handleLogout} color="red" />
//       </View>
//     </View>
//   );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, marginTop: 30 },
//   header: { fontSize: 22, fontWeight: '600', marginBottom: 20 },
//   subHeader: { fontSize: 18, marginTop: 10, fontWeight: '500' },
//   location: { marginBottom: 10 },
//   item: {
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderColor: '#ddd',
//   },
// });

import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  Button, 
  FlatList, 
  StyleSheet, 
  Alert, 
  PermissionsAndroid, 
  Platform 
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import merchants from '../data/merchants';
import { getUser, removeUser } from '../utils/storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = (): JSX.Element => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [username, setUsername] = useState<string>('');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();

  useEffect(() => {
    const init = async () => {
      const user = await getUser();
      if (!user) {
        navigation.replace('Login');
      } else {
        setUsername(user);
      }
      await getLocation();
    };

    init();
  }, []);

  const hasLocationPermission = async (): Promise<boolean> => {
    if (Platform.OS === 'ios') {
      return true; // iOS handles permissions via Info.plist
    }

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'GeoMerchants needs access to your location to function correctly.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn('Permission error:', err);
      return false;
    }
  };

  const getLocation = async () => {
    const granted = await hasLocationPermission();
    if (!granted) {
      Alert.alert('Permission Denied', 'Location access is required to show your current location.');
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => setLocation(position.coords),
      (error) => {
        console.log('Location error:', error);
        Alert.alert('Error', 'Unable to fetch location: ' + error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const handleLogout = async () => {
    await removeUser();
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome, {username} 👋</Text>

      <Text style={styles.subHeader}>Current Location:</Text>
      {location ? (
        <Text style={styles.location}>
          Latitude: {location.latitude.toFixed(4)}, Longitude: {location.longitude.toFixed(4)}
        </Text>
      ) : (
        <Text>Fetching location...</Text>
      )}

      <Text style={styles.subHeader}>Merchants:</Text>
      <FlatList
        data={merchants}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
      />

      <View style={{ marginTop: 20 }}>
        <Button title="Logout" onPress={handleLogout} color="red" />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 30 },
  header: { fontSize: 22, fontWeight: '600', marginBottom: 20 },
  subHeader: { fontSize: 18, marginTop: 10, fontWeight: '500' },
  location: { marginBottom: 10 },
  item: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
});