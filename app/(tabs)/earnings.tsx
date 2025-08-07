import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList, Dimensions } from 'react-native';
import { DollarSign, TrendingUp, Calendar, Filter, ArrowUp, ArrowDown } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const mockEarnings = {
  today: {
    total: 45.50,
    trips: 8,
    baseFare: 32.00,
    bonuses: 13.50,
    change: +12.5,
  },
  weekly: {
    total: 312.75,
    trips: 52,
    baseFare: 245.00,
    bonuses: 67.75,
    change: +8.3,
  },
  monthly: {
    total: 1250.80,
    trips: 185,
    baseFare: 980.00,
    bonuses: 270.80,
    change: +15.2,
  },
};

const mockTrips = [
  {
    id: '1',
    date: '2025-01-10',
    time: '14:30',
    from: 'KFC Osu',
    to: 'Cantonments',
    distance: '3.5 km',
    baseFare: 8.00,
    bonus: 2.00,
    total: 10.00,
    status: 'completed',
  },
  {
    id: '2',
    date: '2025-01-10',
    time: '13:15',
    from: 'Shoprite East Legon',
    to: 'Airport Hills',
    distance: '2.8 km',
    baseFare: 6.50,
    bonus: 1.50,
    total: 8.00,
    status: 'completed',
  },
  {
    id: '3',
    date: '2025-01-10',
    time: '12:00',
    from: 'Game Stores Accra Mall',
    to: 'Teshie',
    distance: '5.2 km',
    baseFare: 12.00,
    bonus: 3.00,
    total: 15.00,
    status: 'completed',
  },
  {
    id: '4',
    date: '2025-01-10',
    time: '11:20',
    from: 'Melcom Circle',
    to: 'Adabraka',
    distance: '1.8 km',
    baseFare: 5.50,
    bonus: 0.00,
    total: 5.50,
    status: 'completed',
  },
  {
    id: '5',
    date: '2025-01-10',
    time: '10:45',
    from: 'Palace Mall',
    to: 'Dzorwulu',
    distance: '2.1 km',
    baseFare: 7.00,
    bonus: 0.00,
    total: 7.00,
    status: 'completed',
  },
];

export default function EarningsScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'weekly' | 'monthly'>('today');

  const currentEarnings = mockEarnings[selectedPeriod];

  const renderTripItem = ({ item }: { item: typeof mockTrips[0] }) => (
    <View style={styles.tripCard}>
      <View style={styles.tripHeader}>
        <View style={styles.tripInfo}>
          <Text style={styles.tripTime}>{item.time}</Text>
          <Text style={styles.tripRoute}>{item.from} → {item.to}</Text>
          <Text style={styles.tripDistance}>{item.distance}</Text>
        </View>
        <View style={styles.tripEarnings}>
          <Text style={styles.tripTotal}>GHS {item.total.toFixed(2)}</Text>
          <View style={styles.tripBreakdown}>
            <Text style={styles.breakdownItem}>Base: GHS {item.baseFare.toFixed(2)}</Text>
            {item.bonus > 0 && (
              <Text style={styles.breakdownBonus}>+GHS {item.bonus.toFixed(2)}</Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#DC2626', '#B91C1C']}
        style={styles.header}
      >
        <Text style={styles.title}>Earnings</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter color="#FFFFFF" size={20} />
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Period Selector */}
        <View style={styles.periodSection}>
          <View style={styles.periodSelector}>
            {[
              { key: 'today', label: 'Today' },
              { key: 'weekly', label: 'This Week' },
              { key: 'monthly', label: 'This Month' },
            ].map((period) => (
              <TouchableOpacity
                key={period.key}
                style={[
                  styles.periodButton,
                  selectedPeriod === period.key && styles.activePeriod
                ]}
                onPress={() => setSelectedPeriod(period.key as any)}
              >
                <Text style={[
                  styles.periodText,
                  selectedPeriod === period.key && styles.activePeriodText
                ]}>
                  {period.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Main Earnings Card */}
        <View style={styles.mainEarningsSection}>
          <LinearGradient
            colors={['#10B981', '#059669']}
            style={styles.mainEarningsCard}
          >
            <View style={styles.earningsHeader}>
              <DollarSign color="#FFFFFF" size={32} />
              <View style={styles.changeIndicator}>
                <ArrowUp color="#FFFFFF" size={16} />
                <Text style={styles.changeText}>{currentEarnings.change}%</Text>
              </View>
            </View>
            <Text style={styles.mainEarningsValue}>GHS {currentEarnings.total.toFixed(2)}</Text>
            <Text style={styles.mainEarningsLabel}>Total Earnings</Text>
            <View style={styles.earningsStats}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{currentEarnings.trips}</Text>
                <Text style={styles.statLabel}>Trips</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>
                  {currentEarnings.trips > 0 ? (currentEarnings.total / currentEarnings.trips).toFixed(2) : '0.00'}
                </Text>
                <Text style={styles.statLabel}>Avg/Trip</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Breakdown Cards */}
        <View style={styles.breakdownSection}>
          <Text style={styles.sectionTitle}>Earnings Breakdown</Text>
          <View style={styles.breakdownGrid}>
            <View style={styles.breakdownCard}>
              <View style={styles.breakdownIcon}>
                <DollarSign color="#3B82F6" size={20} />
              </View>
              <Text style={styles.breakdownValue}>GHS {currentEarnings.baseFare.toFixed(2)}</Text>
              <Text style={styles.breakdownLabel}>Base Fare</Text>
              <Text style={styles.breakdownPercentage}>
                {((currentEarnings.baseFare / currentEarnings.total) * 100).toFixed(0)}%
              </Text>
            </View>
            
            <View style={styles.breakdownCard}>
              <View style={[styles.breakdownIcon, { backgroundColor: '#FEF3C7' }]}>
                <TrendingUp color="#F59E0B" size={20} />
              </View>
              <Text style={styles.breakdownValue}>GHS {currentEarnings.bonuses.toFixed(2)}</Text>
              <Text style={styles.breakdownLabel}>Bonuses</Text>
              <Text style={[styles.breakdownPercentage, { color: '#F59E0B' }]}>
                {((currentEarnings.bonuses / currentEarnings.total) * 100).toFixed(0)}%
              </Text>
            </View>
          </View>
        </View>

        {/* Recent Trips */}
        {selectedPeriod === 'today' && (
          <View style={styles.tripsSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Today's Trips</Text>
              <TouchableOpacity>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={mockTrips}
              renderItem={renderTripItem}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  filterButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 8,
  },
  periodSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
  },
  activePeriod: {
    backgroundColor: '#DC2626',
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  periodText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  activePeriodText: {
    color: '#FFFFFF',
  },
  mainEarningsSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  mainEarningsCard: {
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  earningsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  changeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  changeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  mainEarningsValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  mainEarningsLabel: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 20,
  },
  earningsStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 20,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  breakdownSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    color: '#DC2626',
    fontWeight: '600',
  },
  breakdownGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  breakdownCard: {
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
  breakdownIcon: {
    backgroundColor: '#DBEAFE',
    borderRadius: 12,
    padding: 8,
    marginBottom: 12,
  },
  breakdownValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  breakdownLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  breakdownPercentage: {
    fontSize: 12,
    color: '#3B82F6',
    fontWeight: '600',
  },
  tripsSection: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  tripCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tripInfo: {
    flex: 1,
  },
  tripTime: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
    marginBottom: 4,
  },
  tripRoute: {
    fontSize: 14,
    color: '#1F2937',
    marginBottom: 2,
  },
  tripDistance: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  tripEarnings: {
    alignItems: 'flex-end',
  },
  tripTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DC2626',
    marginBottom: 4,
  },
  tripBreakdown: {
    alignItems: 'flex-end',
  },
  breakdownItem: {
    fontSize: 11,
    color: '#6B7280',
  },
  breakdownBonus: {
    fontSize: 11,
    color: '#10B981',
    fontWeight: '600',
  },
});