import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { User, Camera, Truck, FileText, CircleCheck as CheckCircle } from 'lucide-react-native';

const steps = [
  { id: 1, title: 'Personal Info', icon: User },
  { id: 2, title: 'Vehicle Details', icon: Truck },
  { id: 3, title: 'Documents', icon: FileText },
  { id: 4, title: 'Complete', icon: CheckCircle },
];

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    emergencyContact: '',
    vehicleMake: '',
    vehicleModel: '',
    licensePlate: '',
    vehicleYear: '',
    driversLicense: null,
    nationalId: null,
    vehicleRegistration: null,
  });
  const router = useRouter();

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      Alert.alert(
        'Application Submitted!',
        'Your application has been submitted for review. You will be notified within 24 hours.',
        [
          {
            text: 'OK',
            onPress: () => router.replace('/(tabs)'),
          },
        ]
      );
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const mockUploadDocument = (docType: string) => {
    Alert.alert('Document Upload', `${docType} uploaded successfully!`);
    updateFormData(docType, 'uploaded');
  };

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      {steps.map((step) => {
        const Icon = step.icon;
        const isActive = step.id === currentStep;
        const isCompleted = step.id < currentStep;
        
        return (
          <View key={step.id} style={styles.stepItem}>
            <View style={[
              styles.stepCircle,
              isActive && styles.activeStep,
              isCompleted && styles.completedStep
            ]}>
              <Icon 
                color={isActive || isCompleted ? '#FFFFFF' : '#9CA3AF'} 
                size={16} 
              />
            </View>
            <Text style={[
              styles.stepLabel,
              isActive && styles.activeStepLabel
            ]}>
              {step.title}
            </Text>
          </View>
        );
      })}
    </View>
  );

  const renderPersonalInfo = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Personal Information</Text>
      <Text style={styles.stepDescription}>
        Please provide your basic information to get started
      </Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Full Name *</Text>
        <TextInput
          style={styles.input}
          value={formData.fullName}
          onChangeText={(value) => updateFormData('fullName', value)}
          placeholder="Enter your full name"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email Address *</Text>
        <TextInput
          style={styles.input}
          value={formData.email}
          onChangeText={(value) => updateFormData('email', value)}
          placeholder="Enter your email"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Emergency Contact *</Text>
        <TextInput
          style={styles.input}
          value={formData.emergencyContact}
          onChangeText={(value) => updateFormData('emergencyContact', value)}
          placeholder="Emergency contact number"
          keyboardType="phone-pad"
        />
      </View>

      <TouchableOpacity style={styles.photoUpload}>
        <Camera color="#6B7280" size={32} />
        <Text style={styles.photoUploadText}>Upload Profile Photo</Text>
        <Text style={styles.photoUploadSubtext}>Tap to take or select photo</Text>
      </TouchableOpacity>
    </View>
  );

  const renderVehicleDetails = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Vehicle Information</Text>
      <Text style={styles.stepDescription}>
        Tell us about your motorcycle for delivery
      </Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Vehicle Make *</Text>
        <TextInput
          style={styles.input}
          value={formData.vehicleMake}
          onChangeText={(value) => updateFormData('vehicleMake', value)}
          placeholder="e.g., Honda, Yamaha, TVS"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Vehicle Model *</Text>
        <TextInput
          style={styles.input}
          value={formData.vehicleModel}
          onChangeText={(value) => updateFormData('vehicleModel', value)}
          placeholder="e.g., CB125F, YBR125"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>License Plate *</Text>
        <TextInput
          style={styles.input}
          value={formData.licensePlate}
          onChangeText={(value) => updateFormData('licensePlate', value)}
          placeholder="e.g., GR 2045-23"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Year of Manufacture</Text>
        <TextInput
          style={styles.input}
          value={formData.vehicleYear}
          onChangeText={(value) => updateFormData('vehicleYear', value)}
          placeholder="e.g., 2020"
          keyboardType="numeric"
        />
      </View>
    </View>
  );

  const renderDocuments = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Required Documents</Text>
      <Text style={styles.stepDescription}>
        Upload clear photos of the following documents
      </Text>

      <TouchableOpacity 
        style={styles.documentUpload}
        onPress={() => mockUploadDocument('driversLicense')}
      >
        <FileText color="#DC2626" size={24} />
        <View style={styles.documentInfo}>
          <Text style={styles.documentTitle}>Driver's License</Text>
          <Text style={styles.documentStatus}>
            {formData.driversLicense ? '✓ Uploaded' : 'Required'}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.documentUpload}
        onPress={() => mockUploadDocument('nationalId')}
      >
        <FileText color="#DC2626" size={24} />
        <View style={styles.documentInfo}>
          <Text style={styles.documentTitle}>National ID / Passport</Text>
          <Text style={styles.documentStatus}>
            {formData.nationalId ? '✓ Uploaded' : 'Required'}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.documentUpload}
        onPress={() => mockUploadDocument('vehicleRegistration')}
      >
        <FileText color="#DC2626" size={24} />
        <View style={styles.documentInfo}>
          <Text style={styles.documentTitle}>Vehicle Registration</Text>
          <Text style={styles.documentStatus}>
            {formData.vehicleRegistration ? '✓ Uploaded' : 'Required'}
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.documentNote}>
        <Text style={styles.documentNoteText}>
          📋 Ensure all documents are clear and readable. Blurry or incomplete documents will delay your application.
        </Text>
      </View>
    </View>
  );

  const renderComplete = () => (
    <View style={styles.stepContent}>
      <View style={styles.completionIcon}>
        <CheckCircle color="#10B981" size={64} />
      </View>
      <Text style={styles.completionTitle}>Application Complete!</Text>
      <Text style={styles.completionDescription}>
        Your application has been submitted for review. Our team will verify your information and documents within 24 hours.
      </Text>
      
      <View style={styles.nextSteps}>
        <Text style={styles.nextStepsTitle}>What happens next?</Text>
        <Text style={styles.nextStepItem}>• Document verification (2-4 hours)</Text>
        <Text style={styles.nextStepItem}>• Background check (12-24 hours)</Text>
        <Text style={styles.nextStepItem}>• Account activation notification</Text>
        <Text style={styles.nextStepItem}>• Welcome package with rider kit</Text>
      </View>
    </View>
  );

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.fullName && formData.email && formData.emergencyContact;
      case 2:
        return formData.vehicleMake && formData.vehicleModel && formData.licensePlate;
      case 3:
        return formData.driversLicense && formData.nationalId && formData.vehicleRegistration;
      default:
        return true;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>CediExpress</Text>
        <Text style={styles.subtitle}>Rider Registration</Text>
      </View>

      {renderStepIndicator()}

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {currentStep === 1 && renderPersonalInfo()}
        {currentStep === 2 && renderVehicleDetails()}
        {currentStep === 3 && renderDocuments()}
        {currentStep === 4 && renderComplete()}
      </ScrollView>

      <View style={styles.buttonContainer}>
        {currentStep > 1 && currentStep < 4 && (
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity
          style={[
            styles.nextButton,
            !canProceed() && currentStep < 4 && styles.disabledButton,
            currentStep > 1 && currentStep < 4 && { flex: 2 }
          ]}
          onPress={handleNext}
          disabled={!canProceed() && currentStep < 4}
        >
          <Text style={styles.nextButtonText}>
            {currentStep === 4 ? 'Get Started' : 'Continue'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#DC2626',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
  },
  stepItem: {
    alignItems: 'center',
    flex: 1,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  activeStep: {
    backgroundColor: '#DC2626',
  },
  completedStep: {
    backgroundColor: '#10B981',
  },
  stepLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  activeStepLabel: {
    color: '#DC2626',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  stepContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 24,
    lineHeight: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1F2937',
  },
  photoUpload: {
    backgroundColor: '#F9FAFB',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    borderRadius: 8,
    paddingVertical: 32,
    alignItems: 'center',
    marginTop: 8,
  },
  photoUploadText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginTop: 12,
  },
  photoUploadSubtext: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  documentUpload: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  documentInfo: {
    marginLeft: 16,
    flex: 1,
  },
  documentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  documentStatus: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  documentNote: {
    backgroundColor: '#FFFBEB',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  documentNoteText: {
    fontSize: 14,
    color: '#92400E',
    lineHeight: 20,
  },
  completionIcon: {
    alignItems: 'center',
    marginBottom: 24,
  },
  completionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 16,
  },
  completionDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  nextSteps: {
    backgroundColor: '#F0FDF4',
    borderRadius: 8,
    padding: 20,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  nextStepsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#166534',
    marginBottom: 12,
  },
  nextStepItem: {
    fontSize: 14,
    color: '#166534',
    marginBottom: 8,
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 12,
  },
  backButton: {
    backgroundColor: '#6B7280',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    flex: 1,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: '#DC2626',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    flex: 1,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#9CA3AF',
  },
});