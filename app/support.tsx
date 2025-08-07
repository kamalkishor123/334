import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Phone, MessageCircle, Mail, CircleHelp as HelpCircle, FileText, TriangleAlert as AlertTriangle, Send } from 'lucide-react-native';

const supportOptions = [
  {
    id: 'emergency',
    title: 'Emergency Support',
    description: '24/7 immediate assistance',
    icon: AlertTriangle,
    color: '#EF4444',
    action: 'call',
    contact: '+233 30 123 4567',
  },
  {
    id: 'general',
    title: 'General Support',
    description: 'Questions about orders, payments, app',
    icon: HelpCircle,
    color: '#3B82F6',
    action: 'chat',
  },
  {
    id: 'technical',
    title: 'Technical Issues',
    description: 'App bugs, login problems',
    icon: Phone,
    color: '#6366F1',
    action: 'call',
    contact: '+233 30 123 4568',
  },
  {
    id: 'feedback',
    title: 'Feedback & Suggestions',
    description: 'Help us improve CediExpress',
    icon: Mail,
    color: '#10B981',
    action: 'email',
    contact: 'feedback@cediexpress.com',
  },
];

const faqData = [
  {
    question: 'How do I go online to receive orders?',
    answer: 'Tap the "GO ONLINE" button on your dashboard. Make sure you have a stable internet connection and your location services are enabled.',
  },
  {
    question: 'What should I do if I can\'t find the customer?',
    answer: 'First, call the customer using the in-app call button. If they don\'t answer, use the chat feature. If you still can\'t reach them, contact support immediately.',
  },
  {
    question: 'How are my earnings calculated?',
    answer: 'Your earnings include base fare (distance-based), time bonuses, peak hour multipliers, and customer tips. You can see the breakdown in the Earnings tab.',
  },
  {
    question: 'What if my motorcycle breaks down during delivery?',
    answer: 'Contact emergency support immediately. We\'ll help arrange alternative delivery and provide roadside assistance information.',
  },
  {
    question: 'How do I update my vehicle information?',
    answer: 'Go to Profile > Settings > Vehicle Information. You may need to upload new documents for verification.',
  },
  {
    question: 'When do I get paid?',
    answer: 'Earnings are processed daily and transferred to your mobile money account within 24 hours of completion.',
  },
];

export default function SupportScreen() {
  const [selectedTab, setSelectedTab] = useState<'contact' | 'faq' | 'report'>('contact');
  const [reportMessage, setReportMessage] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const router = useRouter();

  const handleSupportAction = (option: typeof supportOptions[0]) => {
    switch (option.action) {
      case 'call':
        Alert.alert(
          'Call Support',
          `This will call ${option.contact}`,
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Call', onPress: () => Linking.openURL(`tel:${option.contact}`) },
          ]
        );
        break;
      case 'email':
        Linking.openURL(`mailto:${option.contact}`);
        break;
      case 'chat':
        router.push('/chat?type=support&name=CediExpress Support');
        break;
    }
  };

  const submitReport = () => {
    if (reportMessage.trim().length === 0) {
      Alert.alert('Error', 'Please describe the issue');
      return;
    }
    
    Alert.alert(
      'Report Submitted',
      'Your report has been submitted. Our team will investigate and respond within 24 hours.',
      [{ text: 'OK', onPress: () => setReportMessage('') }]
    );
  };

  const renderContactTab = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <Text style={styles.sectionTitle}>How can we help you?</Text>
      
      {supportOptions.map((option) => {
        const Icon = option.icon;
        return (
          <TouchableOpacity
            key={option.id}
            style={styles.supportOption}
            onPress={() => handleSupportAction(option)}
          >
            <View style={[styles.supportIcon, { backgroundColor: option.color }]}>
              <Icon color="#FFFFFF" size={24} />
            </View>
            <View style={styles.supportContent}>
              <Text style={styles.supportTitle}>{option.title}</Text>
              <Text style={styles.supportDescription}>{option.description}</Text>
              {option.contact && (
                <Text style={styles.supportContact}>{option.contact}</Text>
              )}
            </View>
          </TouchableOpacity>
        );
      })}

      <View style={styles.operatingHours}>
        <Text style={styles.operatingTitle}>Operating Hours</Text>
        <Text style={styles.operatingText}>Emergency Support: 24/7</Text>
        <Text style={styles.operatingText}>General Support: 6:00 AM - 10:00 PM</Text>
        <Text style={styles.operatingText}>Technical Support: 8:00 AM - 8:00 PM</Text>
      </View>
    </ScrollView>
  );

  const renderFaqTab = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
      
      {faqData.map((faq, index) => (
        <TouchableOpacity
          key={index}
          style={styles.faqItem}
          onPress={() => setExpandedFaq(expandedFaq === index ? null : index)}
        >
          <Text style={styles.faqQuestion}>{faq.question}</Text>
          {expandedFaq === index && (
            <Text style={styles.faqAnswer}>{faq.answer}</Text>
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderReportTab = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <Text style={styles.sectionTitle}>Report an Issue</Text>
      <Text style={styles.sectionDescription}>
        Describe the problem you're experiencing. Include as much detail as possible.
      </Text>
      
      <View style={styles.reportForm}>
        <TextInput
          style={styles.reportInput}
          value={reportMessage}
          onChangeText={setReportMessage}
          placeholder="Describe the issue you're experiencing..."
          multiline
          numberOfLines={8}
          textAlignVertical="top"
        />
        
        <TouchableOpacity style={styles.submitButton} onPress={submitReport}>
          <Send color="#FFFFFF" size={20} />
          <Text style={styles.submitButtonText}>Submit Report</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.reportTips}>
        <Text style={styles.reportTipsTitle}>💡 Helpful Tips</Text>
        <Text style={styles.reportTip}>• Include screenshots if possible</Text>
        <Text style={styles.reportTip}>• Mention the time when the issue occurred</Text>
        <Text style={styles.reportTip}>• Describe what you were trying to do</Text>
        <Text style={styles.reportTip}>• Include any error messages you saw</Text>
      </View>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft color="#FFFFFF" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabNavigation}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'contact' && styles.activeTab]}
          onPress={() => setSelectedTab('contact')}
        >
          <Text style={[styles.tabText, selectedTab === 'contact' && styles.activeTabText]}>
            Contact
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'faq' && styles.activeTab]}
          onPress={() => setSelectedTab('faq')}
        >
          <Text style={[styles.tabText, selectedTab === 'faq' && styles.activeTabText]}>
            FAQ
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'report' && styles.activeTab]}
          onPress={() => setSelectedTab('report')}
        >
          <Text style={[styles.tabText, selectedTab === 'report' && styles.activeTabText]}>
            Report Issue
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      {selectedTab === 'contact' && renderContactTab()}
      {selectedTab === 'faq' && renderFaqTab()}
      {selectedTab === 'report' && renderReportTab()}
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
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
  },
  placeholder: {
    width: 24,
  },
  tabNavigation: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#DC2626',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#DC2626',
  },
  tabContent: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 24,
    lineHeight: 20,
  },
  supportOption: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  supportIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  supportContent: {
    flex: 1,
  },
  supportTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  supportDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  supportContact: {
    fontSize: 14,
    color: '#DC2626',
    fontWeight: '600',
  },
  operatingHours: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginTop: 16,
  },
  operatingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  operatingText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  faqItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  reportForm: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  reportInput: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: '#1F2937',
    minHeight: 120,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#DC2626',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 8,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  reportTips: {
    backgroundColor: '#FFFBEB',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  reportTipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#92400E',
    marginBottom: 12,
  },
  reportTip: {
    fontSize: 14,
    color: '#92400E',
    marginBottom: 8,
    lineHeight: 20,
  },
});