import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MapPin, Navigation, Phone, MessageCircle, Camera, CircleCheck as CheckCircle, Clock } from 'lucide-react-native';

const mockOrder = {
  id: 'GH12345',
  pickupLocation: 'KFC Osu Branch',
  pickupAddress: 'Oxford Street, Osu',
  dropoffLocation: 'Cantonments Residential',
  dropoffAddress: 'GA-123-4567 (GhanaPostGPS)',
  customerName: 'Ama Asante',
  customerPhone: '+233244123456',
  landmarks: 'White gate, blue fence, opposite MTN office',
  estimatedEarnings: 12.00,
  items: ['2x Krushems', '1x Family Feast', '1x Coleslaw'],
};

export default function DeliveryFlowScreen() {
  const { step } = useLocalSearchParams();
  const [currentStep, setCurrentStep] = useState(step || 'pickup');
  const [itemsVerified, setItemsVerified] = useState(false);
  const router = useRouter();

  const handleNavigate = () => {
    Alert.alert(
      'Opening Navigation',
      'This will open your maps app with the route',
      [{ text: 'OK' }]
    );
  };

  const handleArrivedAtStore = () => {
    setCurrentStep('verify');
  };

  const handleStartDelivery = () => {
    if (!itemsVerified) {
      Alert.alert('Error', 'Please verify all items before starting delivery');
      return;
    }
    setCurrentStep('dropoff');
  };

  const handleArrivedAtCustomer = () => {
    setCurrentStep('confirm');
  };

  const handleTakePhoto = () => {
    router.push('/camera');
  };

  const handleCallCustomer = () => {
    Alert.alert(
      'Calling Customer',
      `This will call ${mockOrder.customerName} at ${mockOrder.customerPhone}`,
      [{ text: 'OK' }]
    );
  };

  const handleChatCustomer = () => {
    router.push('/chat?type=customer');
  };

  const renderPickupStep = () => (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Navigate to Pickup</Text>
        <Text style={styles.orderId}>Order #{mockOrder.id}</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.locationHeader}>
          <MapPin color="#10B981" size={24} />
          <Text style={styles.locationTitle}>Pickup Location</Text>
        </View>
        <Text style={styles.locationName}>{mockOrder.pickupLocation}</Text>
        <Text style={styles.locationAddress}>{mockOrder.pickupAddress}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.secondaryButton} onPress={handleNavigate}>
          <Navigation color="#FFFFFF" size={20} />
          <Text style={styles.secondaryButtonText}>Open Maps</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.primaryButton} onPress={handleArrivedAtStore}>
          <Text style={styles.primaryButtonText}>Arrived at Store</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderVerifyStep = () => (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Verify Order Items</Text>
        <Text style={styles.orderId}>Order #{mockOrder.id}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Items to collect:</Text>
        {mockOrder.items.map((item, index) => (
          <View key={index} style={styles.checklistItem}>
            <TouchableOpacity
              style={[styles.checkbox, itemsVerified && styles.checkboxChecked]}
              onPress={() => setItemsVerified(true)}
            >
              {itemsVerified && <CheckCircle color="#FFFFFF" size={16} />}
            </TouchableOpacity>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.primaryButton, !itemsVerified && styles.disabledButton]}
        onPress={handleStartDelivery}
        disabled={!itemsVerified}
      >
        <Text style={styles.primaryButtonText}>Confirm Items & Start Delivery</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderDropoffStep = () => (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Deliver to Customer</Text>
        <Text style={styles.orderId}>Order #{mockOrder.id}</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.locationHeader}>
          <MapPin color="#EF4444" size={24} />
          <Text style={styles.locationTitle}>Delivery Address</Text>
        </View>
        <Text style={styles.locationName}>{mockOrder.dropoffLocation}</Text>
        <Text style={styles.locationAddress}>{mockOrder.dropoffAddress}</Text>
        <Text style={styles.landmarks}>📍 {mockOrder.landmarks}</Text>
      </View>

      <View style={styles.customerCard}>
        <Text style={styles.customerName}>{mockOrder.customerName}</Text>
        <View style={styles.contactButtons}>
          <TouchableOpacity style={styles.contactButton} onPress={handleCallCustomer}>
            <Phone color="#FFFFFF" size={20} />
            <Text style={styles.contactButtonText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactButton} onPress={handleChatCustomer}>
            <MessageCircle color="#FFFFFF" size={20} />
            <Text style={styles.contactButtonText}>Chat</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.secondaryButton} onPress={handleNavigate}>
          <Navigation color="#FFFFFF" size={20} />
          <Text style={styles.secondaryButtonText}>Open Maps</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.primaryButton} onPress={handleArrivedAtCustomer}>
          <Text style={styles.primaryButtonText}>Arrived at Customer</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderConfirmStep = () => (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Confirm Delivery</Text>
        <Text style={styles.orderId}>Order #{mockOrder.id}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Final Step</Text>
        <Text style={styles.instructionText}>
          Take a clear photo of the delivered items at the customer's location to complete the delivery.
        </Text>
      </View>

      <TouchableOpacity style={styles.cameraButton} onPress={handleTakePhoto}>
        <Camera color="#FFFFFF" size={32} />
        <Text style={styles.cameraButtonText}>Take Confirmation Photo</Text>
      </TouchableOpacity>

      <View style={styles.earningsCard}>
        <Text style={styles.earningsText}>You'll earn:</Text>
        <Text style={styles.earningsAmount}>GHS {mockOrder.estimatedEarnings.toFixed(2)}</Text>
      </View>
    </ScrollView>
  );

  return (
    <>
      {currentStep === 'pickup' && renderPickupStep()}
      {currentStep === 'verify' && renderVerifyStep()}
      {currentStep === 'dropoff' && renderDropoffStep()}
      {currentStep === 'confirm' && renderConfirmStep()}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 20,
    paddingTop: 60,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  orderId: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 8,
  },
  locationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  locationAddress: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  landmarks: {
    fontSize: 14,
    color: '#059669',
    fontStyle: 'italic',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  itemText: {
    fontSize: 16,
    color: '#1F2937',
  },
  customerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  customerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  contactButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  contactButton: {
    backgroundColor: '#6366F1',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  contactButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 'auto',
  },
  primaryButton: {
    backgroundColor: '#DC2626',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    flex: 2,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#6B7280',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    flex: 1,
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  disabledButton: {
    backgroundColor: '#9CA3AF',
  },
  instructionText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  cameraButton: {
    backgroundColor: '#10B981',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  cameraButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  earningsCard: {
    backgroundColor: '#ECFDF5',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  earningsText: {
    fontSize: 14,
    color: '#059669',
    marginBottom: 4,
  },
  earningsAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#059669',
  },
});