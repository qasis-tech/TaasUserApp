import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Alert,
} from 'react-native';

interface OrderHistoryScreenProps {
  navigation: any;
}

const OrderHistoryScreen: React.FC<OrderHistoryScreenProps> = ({ navigation }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock data - replace with real data from your backend
  const orders = [
    {
      id: '1',
      bathroomName: 'Clean Bathroom - Downtown Mall',
      date: '2024-01-15',
      time: '14:30 - 15:30',
      amount: 50,
      status: 'completed',
      canReview: true,
      hasReviewed: false,
    },
    {
      id: '2',
      bathroomName: 'Premium Bathroom - Central Station',
      date: '2024-01-14',
      time: '10:00 - 11:00',
      amount: 75,
      status: 'completed',
      canReview: true,
      hasReviewed: true,
    },
    {
      id: '3',
      bathroomName: 'Quick Stop - Gas Station',
      date: '2024-01-13',
      time: '16:00 - 17:00',
      amount: 30,
      status: 'cancelled',
      canReview: false,
      hasReviewed: false,
    },
    {
      id: '4',
      bathroomName: 'Luxury Bathroom - Hotel Lobby',
      date: '2024-01-12',
      time: '09:00 - 10:00',
      amount: 100,
      status: 'completed',
      canReview: true,
      hasReviewed: false,
    },
  ];

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'completed', label: 'Completed' },
    { key: 'cancelled', label: 'Cancelled' },
    { key: 'pending', label: 'Pending' },
  ];

  const filteredOrders = orders.filter(order => {
    return selectedFilter === 'all' || order.status === selectedFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#27AE60';
      case 'cancelled':
        return '#E74C3C';
      case 'pending':
        return '#F39C12';
      default:
        return '#95A5A6';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      case 'pending':
        return 'Pending';
      default:
        return status;
    }
  };

  const renderOrderCard = ({ item }: { item: any }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <Text style={styles.bathroomName}>{item.bathroomName}</Text>
        <View style={[
          styles.statusBadge,
          { backgroundColor: getStatusColor(item.status) }
        ]}>
          <Text style={styles.statusText}>
            {getStatusText(item.status)}
          </Text>
        </View>
      </View>
      
      <View style={styles.orderDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Date:</Text>
          <Text style={styles.detailValue}>{item.date}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Time:</Text>
          <Text style={styles.detailValue}>{item.time}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Amount:</Text>
          <Text style={styles.detailValue}>₹{item.amount}</Text>
        </View>
      </View>
      
      <View style={styles.orderActions}>
        {item.canReview && !item.hasReviewed && (
          <TouchableOpacity
            style={styles.reviewButton}
            onPress={() => navigation.navigate('Review', { orderId: item.id })}>
            <Text style={styles.reviewButtonText}>Write Review</Text>
          </TouchableOpacity>
        )}
        {item.hasReviewed && (
          <View style={styles.reviewedBadge}>
            <Text style={styles.reviewedText}>✓ Reviewed</Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => Alert.alert('Order Details', 'Order details coming soon')}>
          <Text style={styles.detailsButtonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order History</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterButton,
                selectedFilter === filter.key && styles.filterButtonActive
              ]}
              onPress={() => setSelectedFilter(filter.key)}>
              <Text style={[
                styles.filterButtonText,
                selectedFilter === filter.key && styles.filterButtonTextActive
              ]}>
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Orders List */}
      <View style={styles.content}>
        {filteredOrders.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateIcon}>📋</Text>
            <Text style={styles.emptyStateTitle}>No Orders Found</Text>
            <Text style={styles.emptyStateText}>
              {selectedFilter === 'all' 
                ? "You haven't made any orders yet."
                : `No ${selectedFilter} orders found.`
              }
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredOrders}
            renderItem={renderOrderCard}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 20,
    color: '#2C3E50',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  placeholder: {
    width: 40,
  },
  filtersContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    marginRight: 10,
  },
  filterButtonActive: {
    backgroundColor: '#E74C3C',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
  },
  filterButtonTextActive: {
    color: 'white',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listContainer: {
    paddingVertical: 20,
  },
  orderCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  bathroomName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  orderDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
  },
  orderActions: {
    flexDirection: 'row',
    gap: 10,
  },
  reviewButton: {
    backgroundColor: '#3498DB',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 1,
  },
  reviewButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  reviewedBadge: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 1,
  },
  reviewedText: {
    color: '#27AE60',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  detailsButton: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 1,
  },
  detailsButtonText: {
    color: '#2C3E50',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});

export default OrderHistoryScreen; 