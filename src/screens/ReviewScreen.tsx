import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Alert,
} from 'react-native';

interface ReviewScreenProps {
  navigation: any;
  route: any;
}

const ReviewScreen: React.FC<ReviewScreenProps> = ({ navigation, route }) => {
  const { orderId } = route.params;
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);

  const stars = [1, 2, 3, 4, 5];

  const handleStarPress = (star: number) => {
    setRating(star);
  };

  const handleAddPhoto = () => {
    // Here you would integrate with image picker
    Alert.alert('Add Photo', 'Photo upload functionality coming soon');
  };

  const handleSubmitReview = () => {
    if (rating === 0) {
      Alert.alert('Error', 'Please select a rating');
      return;
    }

    if (comment.trim().length === 0) {
      Alert.alert('Error', 'Please write a review comment');
      return;
    }

    // Here you would submit the review to your backend
    Alert.alert(
      'Review Submitted!',
      'Thank you for your review.',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack()
        }
      ]
    );
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
        <Text style={styles.headerTitle}>Write Review</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Order Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Details</Text>
          <View style={styles.orderCard}>
            <Text style={styles.bathroomName}>Clean Bathroom - Downtown Mall</Text>
            <Text style={styles.orderDate}>January 15, 2024 • 14:30 - 15:30</Text>
            <Text style={styles.orderAmount}>₹50</Text>
          </View>
        </View>

        {/* Rating */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rate your experience</Text>
          <View style={styles.ratingContainer}>
            {stars.map((star) => (
              <TouchableOpacity
                key={star}
                style={styles.starButton}
                onPress={() => handleStarPress(star)}>
                <Text style={[
                  styles.star,
                  rating >= star ? styles.starFilled : styles.starEmpty
                ]}>
                  {rating >= star ? '★' : '☆'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.ratingText}>
            {rating === 0 && 'Tap to rate'}
            {rating === 1 && 'Poor'}
            {rating === 2 && 'Fair'}
            {rating === 3 && 'Good'}
            {rating === 4 && 'Very Good'}
            {rating === 5 && 'Excellent'}
          </Text>
        </View>

        {/* Comment */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Write your review</Text>
          <TextInput
            style={styles.commentInput}
            value={comment}
            onChangeText={setComment}
            placeholder="Share your experience with this bathroom..."
            placeholderTextColor="#95A5A6"
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
          <Text style={styles.charCount}>{comment.length}/500</Text>
        </View>

        {/* Photos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Add Photos (Optional)</Text>
          <TouchableOpacity
            style={styles.addPhotoButton}
            onPress={handleAddPhoto}>
            <Text style={styles.addPhotoIcon}>📷</Text>
            <Text style={styles.addPhotoText}>Add Photos</Text>
          </TouchableOpacity>
          {photos.length > 0 && (
            <View style={styles.photosContainer}>
              {photos.map((photo, index) => (
                <View key={index} style={styles.photoItem}>
                  <Text style={styles.photoPlaceholder}>🖼️</Text>
                  <TouchableOpacity
                    style={styles.removePhotoButton}
                    onPress={() => {
                      const newPhotos = photos.filter((_, i) => i !== index);
                      setPhotos(newPhotos);
                    }}>
                    <Text style={styles.removePhotoText}>×</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Guidelines */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Review Guidelines</Text>
          <View style={styles.guidelinesContainer}>
            <Text style={styles.guidelineText}>• Be honest and specific about your experience</Text>
            <Text style={styles.guidelineText}>• Focus on cleanliness, facilities, and service</Text>
            <Text style={styles.guidelineText}>• Avoid personal information or inappropriate content</Text>
            <Text style={styles.guidelineText}>• Your review helps other users make informed decisions</Text>
          </View>
        </View>
      </ScrollView>

      {/* Submit Button */}
      <View style={styles.bottomAction}>
        <TouchableOpacity
          style={[
            styles.submitButton,
            (rating === 0 || comment.trim().length === 0) && styles.submitButtonDisabled
          ]}
          disabled={rating === 0 || comment.trim().length === 0}
          onPress={handleSubmitReview}>
          <Text style={styles.submitButtonText}>Submit Review</Text>
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
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 16,
  },
  orderCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
  },
  bathroomName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 4,
  },
  orderAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E74C3C',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
  },
  starButton: {
    padding: 8,
  },
  star: {
    fontSize: 40,
  },
  starFilled: {
    color: '#F39C12',
  },
  starEmpty: {
    color: '#E5E7EB',
  },
  ratingText: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
    fontWeight: '600',
  },
  commentInput: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minHeight: 120,
  },
  charCount: {
    fontSize: 12,
    color: '#95A5A6',
    textAlign: 'right',
    marginTop: 8,
  },
  addPhotoButton: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  addPhotoIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  addPhotoText: {
    fontSize: 16,
    color: '#7F8C8D',
    fontWeight: '600',
  },
  photosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 16,
  },
  photoItem: {
    width: 80,
    height: 80,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  photoPlaceholder: {
    fontSize: 24,
  },
  removePhotoButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 20,
    height: 20,
    backgroundColor: '#E74C3C',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removePhotoText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  guidelinesContainer: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
  },
  guidelineText: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 8,
    lineHeight: 20,
  },
  bottomAction: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  submitButton: {
    backgroundColor: '#E74C3C',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#95A5A6',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ReviewScreen; 