import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { User, Star, Settings, CircleHelp as HelpCircle, LogOut, Phone, Mail, Truck, History, Bell, Shield, Award } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const riderProfile = {
  name: 'Kwame Asante',
  phone: '+233 24 412 3456',
  email: 'kwame.asante@gmail.com',
  rating: 4.8,
  totalDeliveries: 1247,
  joinDate: 'March 2023',
  motorcycle: {
    make: 'Honda',
    model: 'CB125F',
    plate: 'GR 2045-23',
  },
  avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
};

export default function ProfileScreen() {
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => router.replace('/(auth)/login')
        },
      ]
    );
  };

  const handleSupport = () => {
    Alert.alert(
      'Contact Support',
      'Call CediExpress support line?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call Now', onPress: () => console.log('Calling support...') },
      ]
    );
  };

  const handleTripHistory = () => {
    router.push('/trip-history');
  };

  const handleNotifications = () => {
    router.push('/notifications');
  };

  const menuItems = [
    {
      icon: History,
      title: 'Trip History',
      subtitle: 'View past deliveries',
      onPress: handleTripHistory,
      color: '#3B82F6',
    },
    {
      icon: Bell,
      title: 'Notifications',
      subtitle: 'Manage alerts',
      onPress: handleNotifications,
      color: '#F59E0B',
    },
    {
      icon: Settings,
      title: 'Settings',
      subtitle: 'App preferences',
      onPress: () => {},
      color: '#6B7280',
    },
    {
      icon: Shield,
      title: 'Safety',
      subtitle: 'Safety features',
      onPress: () => {},
      color: '#10B981',
    },
    {
      icon: HelpCircle,
      title: 'Help & Support',
      subtitle: '24/7 assistance',
      onPress: handleSupport,
      color: '#8B5CF6',
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient
        colors={['#DC2626', '#B91C1C']}
        style={styles.header}
      >
        <Text style={styles.title}>Profile</Text>
      </LinearGradient>

      {/* Profile Card */}
      <View style={styles.profileSection}>
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Image source={{ uri: riderProfile.avatar }} style={styles.avatar} />
              <LinearGradient
                colors={['#10B981', '#059669']}
                style={styles.statusBadge}
              >
                <Text style={styles.statusText}>ACTIVE</Text>
              </LinearGradient>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.name}>{riderProfile.name}</Text>
              <View style={styles.ratingContainer}>
                <Star color="#F59E0B" size={16} fill="#F59E0B" />
                <Text style={styles.rating}>{riderProfile.rating}</Text>
                <Text style={styles.deliveries}>• {riderProfile.totalDeliveries} deliveries</Text>
              </View>
              <Text style={styles.memberSince}>Member since {riderProfile.joinDate}</Text>
            </View>
          </View>

          {/* Achievement Badge */}
          <LinearGradient
            colors={['#FEF3C7', '#FDE68A']}
            style={styles.achievementBadge}
          >
            <Award color="#D97706" size={20} />
            <Text style={styles.achievementText}>Top Performer This Month</Text>
          </LinearGradient>
        </View>
      </View>

      {/* Contact Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <View style={styles.contactCard}>
          <View style={styles.contactRow}>
            <View style={styles.contactIcon}>
              <Phone color="#3B82F6" size={20} />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Phone Number</Text>
              <Text style={styles.contactValue}>{riderProfile.phone}</Text>
            </View>
          </View>
          <View style={styles.contactDivider} />
          <View style={styles.contactRow}>
            <View style={styles.contactIcon}>
              <Mail color="#10B981" size={20} />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Email Address</Text>
              <Text style={styles.contactValue}>{riderProfile.email}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Vehicle Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Vehicle Information</Text>
        <View style={styles.vehicleCard}>
          <LinearGradient
            colors={['#DC2626', '#B91C1C']}
            style={styles.vehicleIcon}
          >
            <Truck color="#FFFFFF" size={24} />
          </LinearGradient>
          <View style={styles.vehicleInfo}>
            <Text style={styles.vehicleMake}>
              {riderProfile.motorcycle.make} {riderProfile.motorcycle.model}
            </Text>
            <Text style={styles.vehiclePlate}>License: {riderProfile.motorcycle.plate}</Text>
            <View style={styles.vehicleStatus}>
              <View style={styles.statusDot} />
              <Text style={styles.vehicleStatusText}>Verified & Active</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Menu Options */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <TouchableOpacity key={index} style={styles.menuItem} onPress={item.onPress}>
                <View style={[styles.menuIcon, { backgroundColor: `${item.color}15` }]}>
                  <Icon color={item.color} size={20} />
                </View>
                <View style={styles.menuContent}>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                </View>
                <View style={styles.menuArrow}>
                  <Text style={styles.arrowText}>›</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Logout */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LinearGradient
            colors={['#EF4444', '#DC2626']}
            style={styles.logoutGradient}
          >
            <LogOut color="#FFFFFF" size={20} />
            <Text style={styles.logoutText}>Logout</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.version}>CediExpress Rider v1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  profileSection: {
    paddingHorizontal: 20,
    marginTop: -10,
    marginBottom: 24,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  statusBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: 'bold',
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rating: {
    fontSize: 14,
    color: '#1F2937',
    marginLeft: 4,
    fontWeight: '600',
  },
  deliveries: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  memberSince: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  achievementBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  achievementText: {
    color: '#D97706',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 8,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  contactCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  contactIcon: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 8,
    marginRight: 16,
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '600',
  },
  contactDivider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 12,
  },
  vehicleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  vehicleIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  vehicleInfo: {
    flex: 1,
  },
  vehicleMake: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  vehiclePlate: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  vehicleStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
    marginRight: 8,
  },
  vehicleStatusText: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '600',
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 12,
    color: '#6B7280',
  },
  menuArrow: {
    marginLeft: 12,
  },
  arrowText: {
    fontSize: 20,
    color: '#D1D5DB',
    fontWeight: '300',
  },
  logoutButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  logoutGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 32,
    paddingTop: 16,
  },
  version: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});