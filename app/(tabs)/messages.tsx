import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { MessageCircle, Phone, Clock, Search } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const mockConversations = [
  {
    id: '1',
    type: 'customer',
    name: 'Ama Asante',
    lastMessage: 'Please leave at the gate',
    time: '2 min ago',
    unread: true,
    orderId: 'GH12345',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    id: '2',
    type: 'support',
    name: 'CediExpress Support',
    lastMessage: 'Your payment has been processed',
    time: '1 hour ago',
    unread: false,
    orderId: null,
    avatar: null,
  },
  {
    id: '3',
    type: 'customer',
    name: 'Kwaku Mensah',
    lastMessage: 'Thank you for the delivery!',
    time: '3 hours ago',
    unread: false,
    orderId: 'GH12344',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    id: '4',
    type: 'support',
    name: 'CediExpress Support',
    lastMessage: 'Weekly earnings summary available',
    time: '1 day ago',
    unread: false,
    orderId: null,
    avatar: null,
  },
];

export default function MessagesScreen() {
  const router = useRouter();

  const handleChatPress = (conversation: typeof mockConversations[0]) => {
    router.push(`/chat?type=${conversation.type}&name=${conversation.name}&orderId=${conversation.orderId}`);
  };

  const renderConversation = ({ item }: { item: typeof mockConversations[0] }) => (
    <TouchableOpacity
      style={[styles.conversationCard, item.unread && styles.unreadCard]}
      onPress={() => handleChatPress(item)}
    >
      <View style={styles.avatarContainer}>
        {item.avatar ? (
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
        ) : (
          <LinearGradient
            colors={item.type === 'customer' ? ['#3B82F6', '#1D4ED8'] : ['#10B981', '#059669']}
            style={styles.avatarGradient}
          >
            {item.type === 'customer' ? (
              <Phone color="#FFFFFF" size={20} />
            ) : (
              <MessageCircle color="#FFFFFF" size={20} />
            )}
          </LinearGradient>
        )}
        {item.unread && <View style={styles.onlineIndicator} />}
      </View>
      
      <View style={styles.conversationContent}>
        <View style={styles.conversationHeader}>
          <View style={styles.nameContainer}>
            <Text style={[styles.conversationName, item.unread && styles.unreadName]}>
              {item.name}
            </Text>
            {item.orderId && (
              <View style={styles.orderBadge}>
                <Text style={styles.orderBadgeText}>#{item.orderId}</Text>
              </View>
            )}
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.conversationTime}>{item.time}</Text>
            {item.unread && <View style={styles.unreadDot} />}
          </View>
        </View>
        <Text
          style={[styles.lastMessage, item.unread && styles.unreadMessage]}
          numberOfLines={2}
        >
          {item.lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const unreadCount = mockConversations.filter(c => c.unread).length;

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#DC2626', '#B91C1C']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.title}>Messages</Text>
            {unreadCount > 0 && (
              <Text style={styles.unreadCount}>{unreadCount} unread message{unreadCount > 1 ? 's' : ''}</Text>
            )}
          </View>
          <TouchableOpacity style={styles.searchButton}>
            <Search color="#FFFFFF" size={20} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {mockConversations.length > 0 ? (
        <FlatList
          data={mockConversations}
          renderItem={renderConversation}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          style={styles.conversationsList}
          contentContainerStyle={styles.conversationsContent}
        />
      ) : (
        <View style={styles.emptyState}>
          <LinearGradient
            colors={['#F3F4F6', '#E5E7EB']}
            style={styles.emptyIcon}
          >
            <MessageCircle color="#9CA3AF" size={48} />
          </LinearGradient>
          <Text style={styles.emptyTitle}>No Messages Yet</Text>
          <Text style={styles.emptyDescription}>
            Customer messages and support notifications will appear here
          </Text>
        </View>
      )}
    </View>
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
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  unreadCount: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  searchButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 8,
  },
  conversationsList: {
    flex: 1,
  },
  conversationsContent: {
    padding: 20,
  },
  conversationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#DC2626',
    backgroundColor: '#FFFBF5',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  avatarGradient: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  conversationContent: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  conversationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  unreadName: {
    fontWeight: 'bold',
    color: '#DC2626',
  },
  orderBadge: {
    backgroundColor: '#FEE2E2',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 8,
  },
  orderBadgeText: {
    fontSize: 10,
    color: '#DC2626',
    fontWeight: '600',
  },
  timeContainer: {
    alignItems: 'flex-end',
  },
  conversationTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DC2626',
    marginTop: 4,
  },
  lastMessage: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  unreadMessage: {
    fontWeight: '600',
    color: '#374151',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
});