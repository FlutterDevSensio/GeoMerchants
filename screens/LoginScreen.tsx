// 📁 screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { saveUser } from '../utils/storage';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = (): JSX.Element => {
  const [username, setUsername] = useState<string>('');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Login'>>();

  const handleLogin = async () => {
    if (!username.trim()) {
      Alert.alert('Username Required', 'Please enter a valid username.');
      return;
    }
    await saveUser(username);
    navigation.replace('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Username:</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Enter your username"
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  label: { fontSize: 16, marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});
