import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  StatusBar,
} from 'react-native';

interface PaymentScreenProps {
  navigation: any;
  route: any;
}

const PaymentScreen: React.FC<PaymentScreenProps> = ({ navigation, route }) => {
  const { orderId, amount } = route.params;
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  const paymentMethods = [
    { id: 'upi', name: 'UPI', icon: '📱' },
    { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
    { id: 'netbanking', name: 'Net Banking', icon: '🏦' },
    { id: 'wallet', name: 'Digital Wallet', icon: '👛' },
  ];

  const handlePayment = () => {
    let isValid = false;

    switch (selectedPaymentMethod) {
      case 'upi':
        isValid = upiId.length > 0;
        break;
      case 'card':
        isValid = cardNumber.length >= 16 && cardExpiry.length >= 5 && cardCvv.length >= 3;
        break;
      default:
        isValid = true;
    }

    if (!isValid) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    // Here you would process the payment
    Alert.alert(
      'Payment Successful!',
      'Your booking has been confirmed.',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('OrderHistory')
        }
      ]
    );
  };

  const renderUPIForm = () => (
    <View style={styles.formSection}>
      <Text style={styles.formLabel}>UPI ID</Text>
      <TextInput
        style={styles.input}
        value={upiId}
        onChangeText={setUpiId}
        placeholder="Enter UPI ID (e.g., user@upi)"
        placeholderTextColor="#95A5A6"
        autoCapitalize="none"
      />
    </View>
  );

  const renderCardForm = () => (
    <View style={styles.formSection}>
      <Text style={styles.formLabel}>Card Number</Text>
      <TextInput
        style={styles.input}
        value={cardNumber}
        onChangeText={setCardNumber}
        placeholder="1234 5678 9012 3456"
        placeholderTextColor="#95A5A6"
        keyboardType="numeric"
        maxLength={19}
      />
      
      <View style={styles.cardRow}>
        <View style={styles.cardField}>
          <Text style={styles.formLabel}>Expiry Date</Text>
          <TextInput
            style={styles.input}
            value={cardExpiry}
            onChangeText={setCardExpiry}
            placeholder="MM/YY"
            placeholderTextColor="#95A5A6"
            maxLength={5}
          />
        </View>
        <View style={styles.cardField}>
          <Text style={styles.formLabel}>CVV</Text>
          <TextInput
            style={styles.input}
            value={cardCvv}
            onChangeText={setCardCvv}
            placeholder="123"
            placeholderTextColor="#95A5A6"
            keyboardType="numeric"
            maxLength={4}
            secureTextEntry
          />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.orderCard}>
            <View style={styles.orderRow}>
              <Text style={styles.orderLabel}>Bathroom Booking</Text>
              <Text style={styles.orderValue}>₹{amount}</Text>
            </View>
            <View style={styles.orderRow}>
              <Text style={styles.orderLabel}>Service Fee</Text>
              <Text style={styles.orderValue}>₹10</Text>
            </View>
            <View style={[styles.orderRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>₹{amount + 10}</Text>
            </View>
          </View>
        </View>

        {/* Payment Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.paymentMethods}>
            {paymentMethods.map((method) => (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.paymentMethod,
                  selectedPaymentMethod === method.id && styles.paymentMethodActive
                ]}
                onPress={() => setSelectedPaymentMethod(method.id)}>
                <Text style={styles.paymentIcon}>{method.icon}</Text>
                <Text style={[
                  styles.paymentName,
                  selectedPaymentMethod === method.id && styles.paymentNameActive
                ]}>
                  {method.name}
                </Text>
                {selectedPaymentMethod === method.id && (
                  <Text style={styles.selectedIcon}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Payment Form */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Details</Text>
          {selectedPaymentMethod === 'upi' && renderUPIForm()}
          {selectedPaymentMethod === 'card' && renderCardForm()}
          {(selectedPaymentMethod === 'netbanking' || selectedPaymentMethod === 'wallet') && (
            <View style={styles.formSection}>
              <Text style={styles.infoText}>
                You will be redirected to complete the payment.
              </Text>
            </View>
          )}
        </View>

        {/* Security Notice */}
        <View style={styles.section}>
          <View style={styles.securityNotice}>
            <Text style={styles.securityIcon}>🔒</Text>
            <Text style={styles.securityText}>
              Your payment information is secure and encrypted
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action */}
      <View style={styles.bottomAction}>
        <TouchableOpacity
          style={styles.payButton}
          onPress={handlePayment}>
          <Text style={styles.payButtonText}>
            Pay ₹{amount + 10}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 20,
    color: '#2C3E50',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 16,
  },
  orderCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderLabel: {
    fontSize: 16,
    color: '#2C3E50',
  },
  orderValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 12,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E74C3C',
  },
  paymentMethods: {
    gap: 12,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  paymentMethodActive: {
    borderColor: '#E74C3C',
    backgroundColor: '#FFF5F5',
  },
  paymentIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  paymentName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
  },
  paymentNameActive: {
    color: '#E74C3C',
  },
  selectedIcon: {
    fontSize: 20,
    color: '#E74C3C',
    fontWeight: 'bold',
  },
  formSection: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  cardField: {
    flex: 1,
  },
  infoText: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
    padding: 20,
  },
  securityNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E8',
    padding: 16,
    borderRadius: 12,
  },
  securityIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  securityText: {
    flex: 1,
    fontSize: 14,
    color: '#27AE60',
    fontWeight: '600',
  },
  bottomAction: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  payButton: {
    backgroundColor: '#E74C3C',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  payButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PaymentScreen; 