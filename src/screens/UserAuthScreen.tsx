import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { showErrorToast } from '../utils/toastUtils';

interface UserAuthScreenProps {
  navigation: any;
}

const UserAuthScreen: React.FC<UserAuthScreenProps> = ({ navigation }) => {
  const [phone, setPhone] = useState('');

  const handleContinueWithOTP = () => {
    if (!phone) {
      showErrorToast('Error', 'Please enter your phone number');
      return;
    }
    // Navigate to OTP screen with phone number
    navigation.navigate('OTP', { phoneNumber: phone });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      <ScrollView contentContainerStyle={styles.content}>
      
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to Taas</Text>
        <Text style={styles.subtitle}>Enter your phone number to continue</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter your phone number"
            placeholderTextColor="#95A5A6"
            keyboardType="phone-pad"
          />
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleContinueWithOTP}>
          <Text style={styles.primaryButtonText}>
            Continue with OTP
          </Text>
        </TouchableOpacity>

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            We'll send you a verification code to verify your phone number
          </Text>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    paddingTop: 100,
    paddingBottom: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
  },
  form: {
    flex: 1,
    gap: 20,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  primaryButton: {
    backgroundColor: '#E74C3C',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    alignItems: 'center',
    padding: 16,
  },
  secondaryButtonText: {
    color: '#E74C3C',
    fontSize: 14,
    fontWeight: '600',
  },
  otpButton: {
    backgroundColor: '#3498DB',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  infoContainer: {
    alignItems: 'center',
    padding: 16,
    marginTop: 20,
  },
  infoText: {
    fontSize: 14,
    color: '#7F8C8D',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default UserAuthScreen; 