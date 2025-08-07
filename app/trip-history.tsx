import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Search, MapPin, Clock, DollarSign, Star, Filter } from 'lucide-react-native';

const mockTripHistory = [
  {
    id: 'GH12345',
    date: '2025-01-10',
    time: '14:30',
    pickup: 'KFC Osu Branch',
    dropoff: 'Cantonments Residential',
    distance: '3.5 km',
    duration: '18 mins',
    baseFare: 8.00,
    bonus: 2.00,
    tip: 2.00,
    total: 12.00,
    rating: 5,
    status: 'completed',
  },
  {
    id: 'GH12344',
    date: '2025-01-10',
    time: '13:15',
    pickup: 'Shoprite East Legon',
    dropoff: 'Airport Hills',
    distance: '2.8 km',
    duration: '15 mins',
    baseFare: 6.50,
    bonus: 1.50,
    tip: 0.00,
    total: 8.00,
    rating: 4,
    status: 'completed',
  },
  {
    id: 'GH12343',
    date: '2025-01-10',
    time: '12:00',
    pickup: 'Game Stores Accra Mall',
    dropoff: 'Teshie',
    distance: '5.2 km',
    duration: '25 mins',
    baseFare: 12.00,
    bonus: 3.00,
    tip: 0.00,
    total: 15.00,
    rating: 5,
    status: 'completed',
  },
  {
    id: 'GH12342',
    date: '2025-01-09',
    time: '18:45',
    pickup: 'Melcom Circle',
    dropoff: 'Adabraka',
    distance: '1.8 km',
    duration: '12 mins',
    baseFare: 5.50,
    bonus: 0.00,
    tip: 1.00,
    total: 6.50,
    rating: 4,
    status: 'completed',
  },
  {
    id: 'GH12341',
    date: '2025-01-09',
    time: '17:20',
    pickup: 'Palace Mall',
    dropoff: 'Dzorwulu',
    distance: '2.1 km',
    duration: '14 mins',
    baseFare: 7.00,
    bonus: 0.00,
    tip: 0.00,
    total: 7.00,
    rating: 3,
    status: 'completed',
  },
  {
    id: 'GH12340',
    date: '2025-01-09',
    time: '16:10',
    pickup: 'Max Mart Tema',
    dropoff: 'Community 25',
    distance: '4.1 km',
    duration: '20 mins',
    baseFare: 10.00,
    bonus: 2.50,
    tip: 2.50,
    total: 15.00,
    rating: 5,
    status: 'completed',
  },
  {
    id: 'GH12339',
    date: '2025-01-08',
    time: '19:30',
    pickup: 'Pizza Hut Spintex',
    dropoff: 'Baatsona',
    distance: '3.0 km',
    duration: '16 mins',
    baseFare: 8.50,
    bonus: 1.50,
    tip: 0.00,
    total: 10.00,
    rating: 4,
    status: 'completed',
  },
];

export default function TripHistoryScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'today' | 'week' | 'month'>('all');
  const [trips, setTrips] = useState(mockTripHistory);
  const router = useRouter();

  const filterTrips = () => {
    let filtered = mockTripHistory;
    
    // Apply date filter
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    switch (selectedFilter) {
      case 'today':
        filtered = filtered.filter(trip => trip.date === todayStr);
        break;
      case 'week':
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        filtered = filtered.filter(trip => new Date(trip.date) >= weekAgo);
        break;
      case 'month':
        const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
        filtered = filtered.filter(trip => new Date(trip.date) >= monthAgo);
        break;
    }
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(trip =>
        trip.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.pickup.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.dropoff.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  };

  const renderRatingStars = (rating: number) => {
    return (
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={12}
            color={star <= rating ? '#F59E0B' : '#E5E7EB'}
            fill={star <= rating ? '#F59E0B' : '#E5E7EB'}
          />
        ))}
      </View>
    );
  };

  const renderTripItem = ({ item }: { item: typeof mockTripHistory[0] }) => (
    <View style={styles.tripCard}>
      <View style={styles.tripHeader}>
        <View>
          <Text style={styles.tripId}>#{item.id}</Text>
          <Text style={styles.tripDateTime}>{item.date} • {item.time}</Text>
        </View>
        <View style={styles.tripEarnings}>
          <Text style={styles.tripTotal}>GHS {item.total.toFixed(2)}</Text>
          {renderRatingStars(item.rating)}
        </View>
      </View>

      <View style={styles.tripRoute}>
        <View style={styles.routeItem}>
          <View style={[styles.routeDot, { backgroundColor: '#10B981' }]} />
          <Text style={styles.routeText}>{item.pickup}</Text>
        </View>
        <View style={styles.routeLine} />
        <View style={styles.routeItem}>
          <View style={[styles.routeDot, { backgroundColor: '#EF4444' }]} />
          <Text style={styles.routeText}>{item.dropoff}</Text>
        </View>
      </View>

      <View style={styles.tripStats}>
        <View style={styles.statItem}>
          <MapPin color="#6B7280" size={14} />
          <Text style={styles.statText}>{item.distance}</Text>
        </View>
        <View style={styles.statItem}>
          <Clock color="#6B7280" size={14} />
          <Text style={styles.statText}>{item.duration}</Text>
        </View>
      </View>

      <View style={styles.tripBreakdown}>
        <View style={styles.breakdownRow}>
          <Text style={styles.breakdownLabel}>Base Fare</Text>
          <Text style={styles.breakdownAmount}>GHS {item.baseFare.toFixed(2)}</Text>
        </View>
        {item.bonus > 0 && (
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Bonus</Text>
            <Text style={[styles.breakdownAmount, styles.bonusAmount]}>
              +GHS {item.bonus.toFixed(2)}
            </Text>
          </View>
        )}
        {item.tip > 0 && (
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Tip</Text>
            <Text style={[styles.breakdownAmount, styles.tipAmount]}>
              +GHS {item.tip.toFixed(2)}
            </Text>
          </View>
        )}
      </View>
    </View>
  );

  const filteredTrips = filterTrips();
  const totalEarnings = filteredTrips.reduce((sum, trip) => sum + trip.total, 0);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft color="#FFFFFF" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Trip History</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Search and Filter */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Search color="#6B7280" size={20} />
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search trips..."
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterTabs}>
        {[
          { key: 'all', label: 'All' },
          { key: 'today', label: 'Today' },
          { key: 'week', label: 'This Week' },
          { key: 'month', label: 'This Month' },
        ].map((filter) => (
          <TouchableOpacity
            key={filter.key}
            style={[
              styles.filterTab,
              selectedFilter === filter.key && styles.activeFilterTab
            ]}
            onPress={() => setSelectedFilter(filter.key as any)}
          >
            <Text style={[
              styles.filterTabText,
              selectedFilter === filter.key && styles.activeFilterTabText
            ]}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Summary */}
      <View style={styles.summary}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>{filteredTrips.length}</Text>
          <Text style={styles.summaryLabel}>Trips</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>GHS {totalEarnings.toFixed(2)}</Text>
          <Text style={styles.summaryLabel}>Total Earnings</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>
            {filteredTrips.length > 0 ? (totalEarnings / filteredTrips.length).toFixed(2) : '0.00'}
          </Text>
          <Text style={styles.summaryLabel}>Avg per Trip</Text>
        </View>
      </View>

      {/* Trip List */}
      {filteredTrips.length > 0 ? (
        <FlatList
          data={filteredTrips}
          renderItem={renderTripItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          style={styles.tripsList}
          contentContainerStyle={styles.tripsListContent}
        />
      ) : (
        <View style={styles.emptyState}>
          <MapPin color="#9CA3AF" size={64} />
          <Text style={styles.emptyTitle}>No Trips Found</Text>
          <Text style={styles.emptyDescription}>
            {searchQuery ? 'Try adjusting your search terms' : 'Complete your first delivery to see trip history'}
          </Text>
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
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
  },
  placeholder: {
    width: 24,
  },
  searchSection: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#1F2937',
  },
  filterTabs: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  filterTab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#F3F4F6',
  },
  activeFilterTab: {
    backgroundColor: '#DC2626',
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  activeFilterTabText: {
    color: '#FFFFFF',
  },
  summary: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginVertical: 16,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  tripsList: {
    flex: 1,
  },
  tripsListContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  tripCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  tripId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#DC2626',
  },
  tripDateTime: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  tripEarnings: {
    alignItems: 'flex-end',
  },
  tripTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  tripRoute: {
    marginBottom: 16,
  },
  routeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  routeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  routeText: {
    fontSize: 14,
    color: '#1F2937',
    flex: 1,
  },
  routeLine: {
    width: 1,
    height: 16,
    backgroundColor: '#E5E7EB',
    marginLeft: 4,
    marginBottom: 8,
  },
  tripStats: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  tripBreakdown: {
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 12,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  breakdownLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  breakdownAmount: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1F2937',
  },
  bonusAmount: {
    color: '#10B981',
  },
  tipAmount: {
    color: '#3B82F6',
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
  },
});