import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Send, Phone } from 'lucide-react-native';

const mockMessages = [
  {
    id: '1',
    text: 'Hi! I\'m on my way to deliver your order',
    timestamp: '14:30',
    sender: 'rider',
  },
  {
    id: '2',
    text: 'Great! Please call when you arrive',
    timestamp: '14:31',
    sender: 'customer',
  },
  {
    id: '3',
    text: 'Will do. ETA is about 5 minutes',
    timestamp: '14:32',
    sender: 'rider',
  },
  {
    id: '4',
    text: 'Please leave at the gate if no one answers',
    timestamp: '14:33',
    sender: 'customer',
  },
];

export default function ChatScreen() {
  const { type, name, orderId } = useLocalSearchParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(mockMessages);
  const flatListRef = useRef<FlatList>(null);
  const router = useRouter();

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const sendMessage = () => {
    if (message.trim().length === 0) return;

    const newMessage = {
      id: Date.now().toString(),
      text: message.trim(),
      timestamp: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      }),
      sender: 'rider' as const,
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');

    // Simulate customer/support response after a delay
    setTimeout(() => {
      const responses = [
        'Thanks for the update!',
        'Okay, sounds good',
        'Perfect, see you soon',
        'Understood',
      ];
      
      const response = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date().toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        }),
        sender: type as 'customer' | 'support',
      };

      setMessages(prev => [...prev, response]);
    }, 1000);
  };

  const handleCall = () => {
    // This would open the phone dialer in a real app
    console.log('Calling customer...');
  };

  const renderMessage = ({ item }: { item: typeof messages[0] }) => (
    <View style={[
      styles.messageContainer,
      item.sender === 'rider' ? styles.riderMessage : styles.otherMessage
    ]}>
      <Text style={[
        styles.messageText,
        item.sender === 'rider' ? styles.riderMessageText : styles.otherMessageText
      ]}>
        {item.text}
      </Text>
      <Text style={[
        styles.timestamp,
        item.sender === 'rider' ? styles.riderTimestamp : styles.otherTimestamp
      ]}>
        {item.timestamp}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft color="#FFFFFF" size={24} />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerName}>{name}</Text>
          {orderId && (
            <Text style={styles.headerOrderId}>Order #{orderId}</Text>
          )}
        </View>
        {type === 'customer' && (
          <TouchableOpacity style={styles.callButton} onPress={handleCall}>
            <Phone color="#FFFFFF" size={20} />
          </TouchableOpacity>
        )}
      </View>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          placeholderTextColor="#9CA3AF"
          multiline
          maxLength={500}
        />
        <TouchableOpacity 
          style={[styles.sendButton, !message.trim() && styles.sendButtonDisabled]}
          onPress={sendMessage}
          disabled={!message.trim()}
        >
          <Send color="#FFFFFF" size={20} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
  headerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerOrderId: {
    fontSize: 14,
    color: '#FECACA',
    marginTop: 2,
  },
  callButton: {
    padding: 8,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
  },
  messageContainer: {
    marginBottom: 16,
    maxWidth: '80%',
  },
  riderMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DC2626',
    borderRadius: 18,
    borderBottomRightRadius: 4,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  riderMessageText: {
    color: '#FFFFFF',
  },
  otherMessageText: {
    color: '#1F2937',
  },
  timestamp: {
    fontSize: 12,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  riderTimestamp: {
    color: '#FECACA',
    textAlign: 'right',
  },
  otherTimestamp: {
    color: '#9CA3AF',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    maxHeight: 100,
    marginRight: 12,
  },
  sendButton: {
    backgroundColor: '#DC2626',
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
});