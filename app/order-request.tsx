import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { MapPin, Clock, DollarSign, Navigation, X, Zap } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const mockOrder = {
  id: 'GH12345',
  pickupLocation: 'KFC Osu Branch',
  pickupAddress: 'Oxford Street, Osu',
  dropoffLocation: 'Cantonments Residential',
  dropoffAddress: 'GA-123-4567 (GhanaPostGPS)',
  estimatedEarnings: 12.00,
  distance: '3.5 km',
  estimatedTime: '15 mins',
  items: ['2x Krushems', '1x Family Feast', '1x Coleslaw'],
  priority: 'high',
};

export default function OrderRequestScreen() {
  const [timeLeft, setTimeLeft] = useState(30);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Auto-decline if time runs out
          handleDecline();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAccept = () => {
    Alert.alert(
      'Order Accepted!',
      'Navigate to pickup location to collect the order',
      [
        {
          text: 'OK',
          onPress: () => router.replace('/delivery-flow?step=pickup'),
        },
      ]
    );
  };

  const handleDecline = () => {
    Alert.alert(
      'Order Declined',
      'You will be shown the next available order',
      [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]
    );
  };

  const getTimerColor = () => {
    if (timeLeft > 20) return '#10B981';
    if (timeLeft > 10) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        {/* Header */}
        <LinearGradient
          colors={['#DC2626', '#B91C1C']}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
              <Zap color="#FFFFFF" size={24} />
              <Text style={styles.title}>New Delivery Request</Text>
            </View>
            <View style={[styles.timerContainer, { backgroundColor: getTimerColor() }]}>
              <Clock color="#FFFFFF" size={16} />
              <Text style={styles.timer}>{timeLeft}s</Text>
            </View>
          </View>
          {mockOrder.priority === 'high' && (
            <View style={styles.priorityBadge}>
              <Text style={styles.priorityText}>🔥 HIGH PRIORITY</Text>
            </View>
          )}
        </LinearGradient>

        {/* Order Details */}
        <View style={styles.content}>
          <View style={styles.routeSection}>
            <View style={styles.locationRow}>
              <View style={styles.locationDot}>
                <View style={[styles.dot, { backgroundColor: '#10B981' }]} />
              </View>
              <View style={styles.locationInfo}>
                <Text style={styles.locationLabel}>PICKUP</Text>
                <Text style={styles.locationTitle}>{mockOrder.pickupLocation}</Text>
                <Text style={styles.locationAddress}>{mockOrder.pickupAddress}</Text>
              </View>
            </View>

            <View style={styles.routeLine} />

            <View style={styles.locationRow}>
              <View style={styles.locationDot}>
                <View style={[styles.dot, { backgroundColor: '#EF4444' }]} />
              </View>
              <View style={styles.locationInfo}>
                <Text style={styles.locationLabel}>DROP-OFF</Text>
                <Text style={styles.locationTitle}>{mockOrder.dropoffLocation}</Text>
                <Text style={styles.locationAddress}>{mockOrder.dropoffAddress}</Text>
              </View>
            </View>
          </View>

          {/* Trip Info Cards */}
          <View style={styles.infoGrid}>
            <LinearGradient
              colors={['#10B981', '#059669']}
              style={styles.earningsCard}
            >
              <DollarSign color="#FFFFFF" size={28} />
              <Text style={styles.earningsValue}>GHS {mockOrder.estimatedEarnings.toFixed(2)}</Text>
              <Text style={styles.earningsLabel}>Estimated Earnings</Text>
            </LinearGradient>
            
            <View style={styles.infoRow}>
              <View style={styles.infoCard}>
                <Navigation color="#6366F1" size={20} />
                <Text style={styles.infoValue}>{mockOrder.distance}</Text>
                <Text style={styles.infoLabel}>Distance</Text>
              </View>
              <View style={styles.infoCard}>
                <Clock color="#F59E0B" size={20} />
                <Text style={styles.infoValue}>{mockOrder.estimatedTime}</Text>
                <Text style={styles.infoLabel}>Est. Time</Text>
              </View>
            </View>
          </View>

          {/* Items */}
          <View style={styles.itemsContainer}>
            <Text style={styles.itemsTitle}>Items to collect:</Text>
            <View style={styles.itemsList}>
              {mockOrder.items.map((item, index) => (
                <View key={index} style={styles.itemRow}>
                  <View style={styles.itemDot} />
                  <Text style={styles.item}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.declineButton} onPress={handleDecline}>
            <LinearGradient
              colors={['#EF4444', '#DC2626']}
              style={styles.declineGradient}
            >
              <X color="#FFFFFF" size={20} />
              <Text style={styles.declineText}>DECLINE</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
            <LinearGradient
              colors={['#10B981', '#059669']}
              style={styles.acceptGradient}
            >
              <Text style={styles.acceptText}>ACCEPT ORDER</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 20,
  },
  header: {
    padding: 20,
    paddingBottom: 16,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  timer: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 4,
  },
  priorityBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  priorityText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  routeSection: {
    marginBottom: 24,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  locationDot: {
    marginRight: 16,
    marginTop: 4,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  locationInfo: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#6B7280',
    marginBottom: 4,
    letterSpacing: 1,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 2,
  },
  locationAddress: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  routeLine: {
    width: 2,
    height: 20,
    backgroundColor: '#E5E7EB',
    marginLeft: 5,
    marginBottom: 8,
  },
  infoGrid: {
    marginBottom: 24,
  },
  earningsCard: {
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 12,
  },
  earningsValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 8,
    marginBottom: 4,
  },
  earningsLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
  },
  infoRow: {
    flexDirection: 'row',
    gap: 12,
  },
  infoCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flex: 1,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 8,
    marginBottom: 4,
  },
  infoLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    fontWeight: '600',
  },
  itemsContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 16,
    marginBottom: 8,
  },
  itemsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  itemsList: {
    gap: 8,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#DC2626',
    marginRight: 12,
  },
  item: {
    fontSize: 14,
    color: '#4B5563',
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  declineButton: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  declineGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  declineText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  acceptButton: {
    flex: 2,
    borderRadius: 16,
    overflow: 'hidden',
  },
  acceptGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  acceptText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});