import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Bell, MessageCircle, DollarSign, TriangleAlert as AlertTriangle, Settings } from 'lucide-react-native';

const mockNotifications = [
  {
    id: '1',
    type: 'order',
    title: 'New Order Available',
    message: 'Pickup from KFC Osu - GHS 12.00 estimated earnings',
    time: '2 minutes ago',
    read: false,
    icon: Bell,
    color: '#DC2626',
  },
  {
    id: '2',
    type: 'message',
    title: 'Customer Message',
    message: 'Ama Asante: "Please call when you arrive"',
    time: '15 minutes ago',
    read: false,
    icon: MessageCircle,
    color: '#3B82F6',
  },
  {
    id: '3',
    type: 'earnings',
    title: 'Payment Received',
    message: 'GHS 45.50 has been added to your wallet',
    time: '1 hour ago',
    read: true,
    icon: DollarSign,
    color: '#10B981',
  },
  {
    id: '4',
    type: 'system',
    title: 'App Update Available',
    message: 'Version 2.1.0 includes performance improvements',
    time: '3 hours ago',
    read: true,
    icon: Settings,
    color: '#6366F1',
  },
  {
    id: '5',
    type: 'alert',
    title: 'Weather Alert',
    message: 'Heavy rain expected in Accra. Drive safely!',
    time: '5 hours ago',
    read: true,
    icon: AlertTriangle,
    color: '#F59E0B',
  },
];

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [settings, setSettings] = useState({
    orderAlerts: true,
    messageAlerts: true,
    earningsAlerts: true,
    systemAlerts: true,
    weatherAlerts: true,
  });
  const router = useRouter();

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const renderNotification = ({ item }: { item: typeof mockNotifications[0] }) => {
    const Icon = item.icon;
    
    return (
      <TouchableOpacity
        style={[styles.notificationCard, !item.read && styles.unreadCard]}
        onPress={() => markAsRead(item.id)}
      >
        <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
          <Icon color="#FFFFFF" size={20} />
        </View>
        <View style={styles.notificationContent}>
          <Text style={[styles.notificationTitle, !item.read && styles.unreadTitle]}>
            {item.title}
          </Text>
          <Text style={styles.notificationMessage} numberOfLines={2}>
            {item.message}
          </Text>
          <Text style={styles.notificationTime}>{item.time}</Text>
        </View>
        {!item.read && <View style={styles.unreadDot} />}
      </TouchableOpacity>
    );
  };

  const renderSettings = () => (
    <View style={styles.settingsSection}>
      <Text style={styles.sectionTitle}>Notification Settings</Text>
      
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Order Alerts</Text>
        <Switch
          value={settings.orderAlerts}
          onValueChange={(value) => setSettings(prev => ({ ...prev, orderAlerts: value }))}
          trackColor={{ false: '#E5E7EB', true: '#DC2626' }}
          thumbColor="#FFFFFF"
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Message Alerts</Text>
        <Switch
          value={settings.messageAlerts}
          onValueChange={(value) => setSettings(prev => ({ ...prev, messageAlerts: value }))}
          trackColor={{ false: '#E5E7EB', true: '#DC2626' }}
          thumbColor="#FFFFFF"
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Earnings Notifications</Text>
        <Switch
          value={settings.earningsAlerts}
          onValueChange={(value) => setSettings(prev => ({ ...prev, earningsAlerts: value }))}
          trackColor={{ false: '#E5E7EB', true: '#DC2626' }}
          thumbColor="#FFFFFF"
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>System Updates</Text>
        <Switch
          value={settings.systemAlerts}
          onValueChange={(value) => setSettings(prev => ({ ...prev, systemAlerts: value }))}
          trackColor={{ false: '#E5E7EB', true: '#DC2626' }}
          thumbColor="#FFFFFF"
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Weather Alerts</Text>
        <Switch
          value={settings.weatherAlerts}
          onValueChange={(value) => setSettings(prev => ({ ...prev, weatherAlerts: value }))}
          trackColor={{ false: '#E5E7EB', true: '#DC2626' }}
          thumbColor="#FFFFFF"
        />
      </View>
    </View>
  );

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft color="#FFFFFF" size={24} />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>Notifications</Text>
          {unreadCount > 0 && (
            <Text style={styles.unreadCount}>{unreadCount} unread</Text>
          )}
        </View>
        <View style={styles.placeholder} />
      </View>

      {/* Action Buttons */}
      {notifications.length > 0 && (
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={markAllAsRead}>
            <Text style={styles.actionButtonText}>Mark All Read</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={clearAll}>
            <Text style={styles.actionButtonText}>Clear All</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Notifications List */}
      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          renderItem={renderNotification}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          style={styles.notificationsList}
          ListFooterComponent={renderSettings}
        />
      ) : (
        <View style={styles.emptyState}>
          <Bell color="#9CA3AF" size={64} />
          <Text style={styles.emptyTitle}>No Notifications</Text>
          <Text style={styles.emptyDescription}>
            You're all caught up! New notifications will appear here.
          </Text>
          {renderSettings()}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#DC2626',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  backButton: {
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  unreadCount: {
    fontSize: 14,
    color: '#FECACA',
    marginTop: 2,
  },
  placeholder: {
    width: 24,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    gap: 12,
  },
  actionButton: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  actionButtonText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '600',
  },
  notificationsList: {
    flex: 1,
  },
  notificationCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#DC2626',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  unreadTitle: {
    color: '#DC2626',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 8,
  },
  notificationTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DC2626',
    marginTop: 8,
  },
  settingsSection: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 12,
    padding: 20,
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingLabel: {
    fontSize: 16,
    color: '#1F2937',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
});