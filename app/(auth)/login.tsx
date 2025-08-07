import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Smartphone, Lock } from 'lucide-react-native';

export default function LoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const router = useRouter();

  const handleSendOTP = () => {
    if (phoneNumber.length < 10) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return;
    }
    setShowOTP(true);
    Alert.alert('OTP Sent', 'Please enter the OTP sent to your phone');
  };

  const handleVerifyOTP = () => {
    if (otp.length === 4) {
      // Mock OTP verification - in production this would be real
      router.replace('/(tabs)');
    } else {
      Alert.alert('Error', 'Please enter the 4-digit OTP');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>CediExpress</Text>
        <Text style={styles.subtitle}>Rider App</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Smartphone color="#1F2937" size={24} />
          <TextInput
            style={styles.input}
            placeholder="Phone Number (+233...)"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            editable={!showOTP}
          />
        </View>

        {showOTP && (
          <View style={styles.inputGroup}>
            <Lock color="#1F2937" size={24} />
            <TextInput
              style={styles.input}
              placeholder="Enter 4-digit OTP"
              value={otp}
              onChangeText={setOtp}
              keyboardType="numeric"
              maxLength={4}
            />
          </View>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={showOTP ? handleVerifyOTP : handleSendOTP}
        >
          <Text style={styles.buttonText}>
            {showOTP ? 'Verify & Login' : 'Send OTP'}
          </Text>
        </TouchableOpacity>

        {showOTP && (
          <TouchableOpacity
            style={styles.resendButton}
            onPress={() => Alert.alert('OTP Resent', 'New OTP sent to your phone')}
          >
            <Text style={styles.resendText}>Resend OTP</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#DC2626',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#6B7280',
    fontWeight: '600',
  },
  form: {
    width: '100%',
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1F2937',
  },
  button: {
    backgroundColor: '#DC2626',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resendButton: {
    alignItems: 'center',
    marginTop: 16,
  },
  resendText: {
    color: '#DC2626',
    fontSize: 16,
    fontWeight: '600',
  },
});