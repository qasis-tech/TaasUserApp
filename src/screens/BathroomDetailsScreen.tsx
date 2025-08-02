import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';

interface BathroomDetailsScreenProps {
  navigation: any;
  route: any;
}

const BathroomDetailsScreen: React.FC<BathroomDetailsScreenProps> = ({ navigation, route }) => {
  const { bathroomId } = route.params;

  // Mock data - replace with real data from your backend
  const bathroom = {
    id: bathroomId,
    title: 'Clean Bathroom - Downtown Mall',
    description: 'A clean and well-maintained bathroom located in the heart of downtown. Features modern amenities and is wheelchair accessible.',
    images: ['🚽', '🚽', '🚽'],
    basicDetails: {
      type: 'indian',
      gender: 'other',
      isWheelchairAccessible: true,
      hasBabyChanging: true,
      hasShower: false,
    },
    location: {
      address: '123 Main Street, Downtown',
      city: 'Mumbai',
      state: 'Maharashtra',
      zipCode: '400001',
    },
    price: {
      amount: 50,
      currency: '₹',
      perHour: true,
    },
    rating: 4.5,
    reviewCount: 12,
    isAvailable: true,
    provider: {
      name: 'John Doe',
      rating: 4.8,
      responseTime: '5 min',
    },
  };

  const reviews = [
    {
      id: '1',
      user: 'Alice Johnson',
      rating: 5,
      comment: 'Very clean and well-maintained bathroom. Highly recommended!',
      date: '2024-01-15',
    },
    {
      id: '2',
      user: 'Bob Smith',
      rating: 4,
      comment: 'Good location and clean facilities. Will use again.',
      date: '2024-01-14',
    },
  ];

  const handleBookNow = () => {
    Alert.alert(
      'Confirm Booking',
      `Book this bathroom for ₹${bathroom.price.amount}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Book Now', 
          onPress: () => navigation.navigate('Payment', { 
            orderId: 'temp-order-id', 
            amount: bathroom.price.amount 
          })
        },
      ]
    );
  };

  const handleShareLocation = () => {
    navigation.navigate('LocationSharing');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bathroom Details</Text>
        <TouchableOpacity
          style={styles.shareButton}
          onPress={handleShareLocation}>
          <Text style={styles.shareButtonText}>📍</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Images Section */}
        <View style={styles.imagesSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {bathroom.images.map((image, index) => (
              <View key={index} style={styles.imageContainer}>
                <Text style={styles.imagePlaceholder}>{image}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Basic Info */}
        <View style={styles.section}>
          <Text style={styles.title}>{bathroom.title}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>⭐ {bathroom.rating}</Text>
            <Text style={styles.reviewCount}>({bathroom.reviewCount} reviews)</Text>
          </View>
          <Text style={styles.description}>{bathroom.description}</Text>
        </View>

        {/* Price Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pricing</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>₹{bathroom.price.amount}</Text>
            <Text style={styles.priceUnit}>
              {bathroom.price.perHour ? '/hour' : '/use'}
            </Text>
          </View>
        </View>

        {/* Basic Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bathroom Details</Text>
          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Type</Text>
              <Text style={styles.detailValue}>
                {bathroom.basicDetails.type.charAt(0).toUpperCase() + 
                 bathroom.basicDetails.type.slice(1)}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Gender</Text>
              <Text style={styles.detailValue}>
                {bathroom.basicDetails.gender === 'other' ? 'Unisex' : 
                 bathroom.basicDetails.gender.charAt(0).toUpperCase() + 
                 bathroom.basicDetails.gender.slice(1)}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Wheelchair</Text>
              <Text style={styles.detailValue}>
                {bathroom.basicDetails.isWheelchairAccessible ? 'Yes' : 'No'}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Baby Changing</Text>
              <Text style={styles.detailValue}>
                {bathroom.basicDetails.hasBabyChanging ? 'Yes' : 'No'}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Shower</Text>
              <Text style={styles.detailValue}>
                {bathroom.basicDetails.hasShower ? 'Yes' : 'No'}
              </Text>
            </View>
          </View>
        </View>

        {/* Location */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          <View style={styles.locationContainer}>
            <Text style={styles.locationIcon}>📍</Text>
            <View style={styles.locationText}>
              <Text style={styles.address}>{bathroom.location.address}</Text>
              <Text style={styles.cityState}>
                {bathroom.location.city}, {bathroom.location.state} {bathroom.location.zipCode}
              </Text>
            </View>
          </View>
        </View>

        {/* Provider Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Provider</Text>
          <View style={styles.providerContainer}>
            <View style={styles.providerInfo}>
              <Text style={styles.providerName}>{bathroom.provider.name}</Text>
              <View style={styles.providerRating}>
                <Text style={styles.providerRatingText}>⭐ {bathroom.provider.rating}</Text>
                <Text style={styles.responseTime}>Response: {bathroom.provider.responseTime}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Reviews */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reviews</Text>
          {reviews.map((review) => (
            <View key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewerName}>{review.user}</Text>
                <Text style={styles.reviewRating}>⭐ {review.rating}</Text>
              </View>
              <Text style={styles.reviewComment}>{review.comment}</Text>
              <Text style={styles.reviewDate}>{review.date}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Action */}
      <View style={styles.bottomAction}>
        <TouchableOpacity
          style={[
            styles.bookButton,
            !bathroom.isAvailable && styles.bookButtonDisabled
          ]}
          disabled={!bathroom.isAvailable}
          onPress={handleBookNow}>
          <Text style={styles.bookButtonText}>
            {bathroom.isAvailable ? 'Book Now' : 'Unavailable'}
          </Text>
        </TouchableOpacity>
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
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareButtonText: {
    fontSize: 20,
  },
  content: {
    flex: 1,
  },
  imagesSection: {
    paddingVertical: 20,
  },
  imageContainer: {
    width: 200,
    height: 150,
    backgroundColor: 'white',
    marginHorizontal: 10,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imagePlaceholder: {
    fontSize: 48,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F39C12',
  },
  reviewCount: {
    fontSize: 14,
    color: '#7F8C8D',
    marginLeft: 8,
  },
  description: {
    fontSize: 16,
    color: '#2C3E50',
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#E74C3C',
  },
  priceUnit: {
    fontSize: 16,
    color: '#7F8C8D',
    marginLeft: 8,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  detailItem: {
    flex: 1,
    minWidth: '45%',
  },
  detailLabel: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  locationIcon: {
    fontSize: 20,
    marginRight: 12,
    marginTop: 2,
  },
  locationText: {
    flex: 1,
  },
  address: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  cityState: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  providerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  providerInfo: {
    flex: 1,
  },
  providerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  providerRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  providerRatingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F39C12',
  },
  responseTime: {
    fontSize: 14,
    color: '#7F8C8D',
    marginLeft: 12,
  },
  reviewCard: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
  },
  reviewRating: {
    fontSize: 14,
    color: '#F39C12',
  },
  reviewComment: {
    fontSize: 14,
    color: '#2C3E50',
    lineHeight: 20,
    marginBottom: 8,
  },
  reviewDate: {
    fontSize: 12,
    color: '#95A5A6',
  },
  bottomAction: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  bookButton: {
    backgroundColor: '#E74C3C',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  bookButtonDisabled: {
    backgroundColor: '#95A5A6',
  },
  bookButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BathroomDetailsScreen; 