import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  showSuccessToast,
  showErrorToast,
  showInfoToast,
} from '../utils/toastUtils';
import { 
  formatPhoneNumber, 
  validatePhoneNumber, 
  sendOTP, 
  verifyOTP as verifyOTPUtil,
  cleanPhoneNumber 
} from '../utils/otpUtils';

interface OTPScreenProps {
  navigation: any;
  route: any;
}

const OTPScreen: React.FC<OTPScreenProps> = ({ navigation, route }) => {
  const [phoneNumber, setPhoneNumber] = useState(route.params?.phoneNumber || '');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [expectedOTP, setExpectedOTP] = useState('');
  
  const otpInputRefs = useRef<TextInput[]>([]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  // Auto-send OTP when screen loads with phone number
  useEffect(() => {
    if (phoneNumber && !isOtpSent) {
      sendOTPHandler();
    }
  }, []);

  const handlePhoneNumberChange = (text: string) => {
    const formatted = formatPhoneNumber(text);
    setPhoneNumber(formatted);
  };

  const sendOTPHandler = async () => {
    if (!validatePhoneNumber(phoneNumber)) {
      showErrorToast('Error', 'Please enter a valid 10-digit phone number');
      return;
    }

    setIsLoading(true);
    try {
      const generatedOTP = await sendOTP(cleanPhoneNumber(phoneNumber));
      setExpectedOTP(generatedOTP);
      setIsOtpSent(true);
      setCountdown(60); // 60 seconds countdown
      showSuccessToast('Success', 'OTP sent successfully to your phone number');
    } catch (error) {
      showErrorToast('Error', 'Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto-focus next input
    if (text && index < 3) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyPress = (e: any, index: number) => {
    // Handle backspace
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const verifyOTPHandler = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 4) {
      showErrorToast('Error', 'Please enter the complete 4-digit OTP');
      return;
    }

    setIsLoading(true);
    try {
      const isValid = await verifyOTPUtil(
        cleanPhoneNumber(phoneNumber), 
        otpString, 
        expectedOTP
      );
      
      if (isValid) {
        showSuccessToast('Success', 'Phone number verified successfully!');
        setTimeout(() => {
          navigation.replace('MainApp');
        }, 1500);
      } else {
        showErrorToast('Error', 'Invalid OTP. Please try again.');
        setOtp(['', '', '', '']);
        otpInputRefs.current[0]?.focus();
      }
    } catch (error) {
      showErrorToast('Error', 'Failed to verify OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resendOTPHandler = async () => {
    if (countdown > 0) return;
    
    setIsLoading(true);
    try {
      const generatedOTP = await sendOTP(cleanPhoneNumber(phoneNumber));
      setExpectedOTP(generatedOTP);
      setCountdown(60);
      showSuccessToast('Success', 'OTP resent successfully');
    } catch (error) {
      showErrorToast('Error', 'Failed to resend OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      
      <KeyboardAvoidingView 
        style={styles.keyboardContainer} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Phone Verification</Text>
          <Text style={styles.subtitle}>
            {isOtpSent 
              ? 'Enter the 4-digit code sent to your phone'
              : 'Enter your phone number to receive a verification code'
            }
          </Text>
        </View>

        <View style={styles.form}>
          {!isOtpSent && !phoneNumber ? (
            // Phone Number Input Section (only show if no phone number provided)
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input}
                value={phoneNumber}
                onChangeText={handlePhoneNumberChange}
                placeholder="(123) 456-7890"
                placeholderTextColor="#95A5A6"
                keyboardType="phone-pad"
                maxLength={14}
              />
              
              <TouchableOpacity
                style={[styles.primaryButton, isLoading && styles.disabledButton]}
                onPress={sendOTPHandler}
                disabled={isLoading}>
                <Text style={styles.primaryButtonText}>
                  {isLoading ? 'Sending...' : 'Send OTP'}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            // OTP Verification Section
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Enter OTP</Text>
              <Text style={styles.phoneDisplay}>
                {phoneNumber}
              </Text>
              
              <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => {
                      if (ref) otpInputRefs.current[index] = ref;
                    }}
                    style={styles.otpInput}
                    value={digit}
                    onChangeText={(text) => handleOtpChange(text, index)}
                    onKeyPress={(e) => handleOtpKeyPress(e, index)}
                    placeholder="0"
                    placeholderTextColor="#95A5A6"
                    keyboardType="numeric"
                    maxLength={1}
                    textAlign="center"
                  />
                ))}
              </View>

              <TouchableOpacity
                style={[styles.primaryButton, isLoading && styles.disabledButton]}
                onPress={verifyOTPHandler}
                disabled={isLoading}>
                <Text style={styles.primaryButtonText}>
                  {isLoading ? 'Verifying...' : 'Verify OTP'}
                </Text>
              </TouchableOpacity>

              <View style={styles.resendContainer}>
                <Text style={styles.resendText}>Didn't receive the code? </Text>
                <TouchableOpacity
                  onPress={resendOTPHandler}
                  disabled={countdown > 0 || isLoading}>
                  <Text style={[
                    styles.resendButton,
                    (countdown > 0 || isLoading) && styles.disabledText
                  ]}>
                    {countdown > 0 ? `Resend in ${countdown}s` : 'Resend'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => {
              if (isOtpSent) {
                setIsOtpSent(false);
                setOtp(['', '', '', '']);
              } else {
                navigation.goBack();
              }
            }}>
            <Text style={styles.secondaryButtonText}>
              {isOtpSent ? 'Change Phone Number' : 'Back'}
            </Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  keyboardContainer: {
    flex: 1,
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
    lineHeight: 22,
  },
  form: {
    flex: 1,
    gap: 20,
  },
  inputContainer: {
    gap: 20,
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
  phoneDisplay: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    textAlign: 'center',
    paddingVertical: 10,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  otpInput: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    fontSize: 24,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: '#E74C3C',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: '#BDC3C7',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  resendText: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  resendButton: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E74C3C',
  },
  disabledText: {
    color: '#BDC3C7',
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
});

export default OTPScreen; 