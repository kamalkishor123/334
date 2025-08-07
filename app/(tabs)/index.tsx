import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Power, Star, DollarSign, Clock, Bell, TrendingUp, MapPin, Zap } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function DashboardScreen() {
  const [isOnline, setIsOnline] = useState(false);
  const [todayEarnings, setTodayEarnings] = useState(45.50);
  const [weeklyEarnings, setWeeklyEarnings] = useState(312.75);
  const [rating, setRating] = useState(4.8);
  const [completedTrips, setCompletedTrips] = useState(8);
  const [currentTime, setCurrentTime] = useState(new Date());
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNotifications = () => {
    router.push('/notifications');
  };

  const handleTripHistory = () => {
    router.push('/trip-history');
  };

  useEffect(() => {
    if (isOnline) {
      // Simulate order requests when online
      const timer = setTimeout(() => {
        router.push('/order-request');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOnline]);

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
    if (!isOnline) {
      Alert.alert(
        'Going Online',
        'You are now available to receive delivery requests',
        [{ text: 'OK' }]
      );
    } else {
      Alert.alert(
        'Going Offline',
        'You will no longer receive delivery requests',
        [{ text: 'OK' }]
      );
    }
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header with Background Image */}
      <View style={styles.headerContainer}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800' }}
          style={styles.headerBackground}
        />
        <LinearGradient
          colors={['rgba(220, 38, 38, 0.8)', 'rgba(220, 38, 38, 0.9)']}
          style={styles.headerOverlay}
        />
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.greeting}>{getGreeting()}, Kwame!</Text>
            <Text style={styles.date}>
              {currentTime.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'short', 
                day: 'numeric' 
              })}
            </Text>
            <Text style={styles.time}>
              {currentTime.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </Text>
          </View>
          <TouchableOpacity style={styles.notificationButton} onPress={handleNotifications}>
            <View style={styles.notificationIconContainer}>
              <Bell color="#FFFFFF" size={24} />
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationBadgeText}>3</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Online/Offline Status Card */}
      <View style={styles.statusSection}>
        <LinearGradient
          colors={isOnline ? ['#10B981', '#059669'] : ['#EF4444', '#DC2626']}
          style={styles.statusCard}
        >
          <View style={styles.statusHeader}>
            <View style={styles.statusIndicatorContainer}>
              <View style={[styles.statusIndicator, { backgroundColor: isOnline ? '#FFFFFF' : '#FFFFFF' }]} />
              <Text style={styles.statusText}>
                {isOnline ? 'You are ONLINE' : 'You are OFFLINE'}
              </Text>
            </View>
            <View style={styles.statusIcon}>
              <Zap color="#FFFFFF" size={24} />
            </View>
          </View>
          
          <TouchableOpacity
            style={[styles.toggleButton, { backgroundColor: 'rgba(255, 255, 255, 0.2)' }]}
            onPress={toggleOnlineStatus}
          >
            <Power color="#FFFFFF" size={28} />
            <Text style={styles.toggleText}>
              {isOnline ? 'GO OFFLINE' : 'GO ONLINE'}
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <View style={styles.statsRow}>
          <LinearGradient
            colors={['#DC2626', '#B91C1C']}
            style={[styles.statCard, styles.primaryStatCard]}
          >
            <DollarSign color="#FFFFFF" size={28} />
            <Text style={styles.primaryStatValue}>GHS {todayEarnings.toFixed(2)}</Text>
            <Text style={styles.primaryStatLabel}>Today's Earnings</Text>
          </LinearGradient>
          
          <LinearGradient
            colors={['#10B981', '#059669']}
            style={[styles.statCard, styles.primaryStatCard]}
          >
            <TrendingUp color="#FFFFFF" size={28} />
            <Text style={styles.primaryStatValue}>GHS {weeklyEarnings.toFixed(2)}</Text>
            <Text style={styles.primaryStatLabel}>This Week</Text>
          </LinearGradient>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Star color="#F59E0B" size={24} />
            <Text style={styles.statValue}>{rating.toFixed(1)}</Text>
            <Text style={styles.statLabel}>Your Rating</Text>
            <View style={styles.ratingStars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={12}
                  color={star <= Math.floor(rating) ? '#F59E0B' : '#E5E7EB'}
                  fill={star <= Math.floor(rating) ? '#F59E0B' : '#E5E7EB'}
                />
              ))}
            </View>
          </View>
          
          <View style={styles.statCard}>
            <Clock color="#6366F1" size={24} />
            <Text style={styles.statValue}>{completedTrips}</Text>
            <Text style={styles.statLabel}>Trips Today</Text>
            <Text style={styles.statSubtext}>+2 from yesterday</Text>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActionsSection}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickAction} onPress={handleTripHistory}>
            <LinearGradient
              colors={['#6366F1', '#4F46E5']}
              style={styles.quickActionGradient}
            >
              <TrendingUp color="#FFFFFF" size={24} />
            </LinearGradient>
            <Text style={styles.quickActionText}>Trip History</Text>
            <Text style={styles.quickActionSubtext}>View past deliveries</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickAction} onPress={() => router.push('/support')}>
            <LinearGradient
              colors={['#F59E0B', '#D97706']}
              style={styles.quickActionGradient}
            >
              <Bell color="#FFFFFF" size={24} />
            </LinearGradient>
            <Text style={styles.quickActionText}>Support</Text>
            <Text style={styles.quickActionSubtext}>Get help anytime</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickAction} onPress={() => router.push('/(tabs)/earnings')}>
            <LinearGradient
              colors={['#10B981', '#059669']}
              style={styles.quickActionGradient}
            >
              <DollarSign color="#FFFFFF" size={24} />
            </LinearGradient>
            <Text style={styles.quickActionText}>Earnings</Text>
            <Text style={styles.quickActionSubtext}>Track your income</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Status Message */}
      <View style={styles.messageSection}>
        <LinearGradient
          colors={isOnline ? ['#ECFDF5', '#F0FDF4'] : ['#FFFBEB', '#FEF3C7']}
          style={styles.messageCard}
        >
          <View style={styles.messageIcon}>
            <MapPin color={isOnline ? '#059669' : '#D97706'} size={20} />
          </View>
          <View style={styles.messageContent}>
            <Text style={[styles.messageTitle, { color: isOnline ? '#059669' : '#D97706' }]}>
              {isOnline ? 'Searching for Orders' : 'Ready to Start'}
            </Text>
            <Text style={[styles.messageText, { color: isOnline ? '#065F46' : '#92400E' }]}>
              {isOnline 
                ? 'Looking for delivery requests nearby...' 
                : 'Go online to start receiving delivery requests'
              }
            </Text>
          </View>
        </LinearGradient>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  headerContainer: {
    height: 200,
    position: 'relative',
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 60,
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  date: {
    fontSize: 16,
    color: '#FECACA',
    marginBottom: 2,
  },
  time: {
    fontSize: 14,
    color: '#FCA5A5',
  },
  notificationButton: {
    padding: 8,
  },
  notificationIconContainer: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FBBF24',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  notificationBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  statusSection: {
    paddingHorizontal: 20,
    marginTop: -40,
    marginBottom: 24,
  },
  statusCard: {
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  statusIndicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  statusText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  statusIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 8,
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  toggleText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  statsGrid: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 12,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryStatCard: {
    paddingVertical: 24,
  },
  primaryStatValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 12,
    marginBottom: 4,
  },
  primaryStatLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    fontWeight: '600',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    fontWeight: '600',
  },
  statSubtext: {
    fontSize: 10,
    color: '#10B981',
    marginTop: 4,
    fontWeight: '500',
  },
  ratingStars: {
    flexDirection: 'row',
    marginTop: 4,
    gap: 2,
  },
  quickActionsSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  quickAction: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  quickActionGradient: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  quickActionText: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  quickActionSubtext: {
    fontSize: 11,
    color: '#6B7280',
    textAlign: 'center',
  },
  messageSection: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  messageCard: {
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  messageIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    padding: 8,
    marginRight: 16,
  },
  messageContent: {
    flex: 1,
  },
  messageTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
});