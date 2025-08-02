import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import DrawerMenu from '../components/DrawerMenu';
import {
  showSuccessToast,
  showErrorToast,
  showInfoToast,
  showWarningToast,
} from '../utils/toastUtils';
import {
  getCurrentLocation,
  requestLocationPermission,
  checkLocationPermission,
  getAddressFromCoordinates,
  calculateDistance,
  formatDistance,
  handleLocationError,
  LocationData,
  LocationError,
} from '../utils/locationUtils';

interface UserHomeScreenProps {
  navigation: any;
}

const UserHomeScreen: React.FC<UserHomeScreenProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null);
  const [locationAddress, setLocationAddress] = useState<string>('');
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  // Initialize location when component mounts
  useEffect(() => {
    // Add a small delay to ensure the component renders first
    const timer = setTimeout(() => {
      initializeLocation();
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const initializeLocation = async () => {
    try {
      setIsLoadingLocation(true);
      console.log('Starting location initialization...');
      
      // Check current permission status first
      const currentPermission = await checkLocationPermission();
      console.log('Current permission status:', currentPermission);
      
      // Request location permission if not already granted
      let hasPermission = currentPermission;
      if (!currentPermission) {
        hasPermission = await requestLocationPermission();
        console.log('Permission request result:', hasPermission);
      }
      
      if (!hasPermission) {
        console.log('Location permission denied');
        showWarningToast(
          'Location Permission Required',
          'This app needs location access to show nearby bathrooms. Please enable location access in settings.'
        );
        setIsLoadingLocation(false);
        return;
      }

      console.log('Location permission granted, getting current location...');

      // Get current location with timeout
      const location = await Promise.race([
        getCurrentLocation(),
        new Promise<never>((_, reject) => 
          setTimeout(() => reject(new Error('Location timeout')), 15000)
        )
      ]);
      
      console.log('Location obtained:', location);
      setCurrentLocation(location);

      // Get address from coordinates
      console.log('Getting address from coordinates...');
      const address = await getAddressFromCoordinates(location.latitude, location.longitude);
      setLocationAddress(address);
      console.log('Address obtained:', address);

    } catch (error) {
      console.log('Location initialization error:', error);
      showErrorToast(
        'Location Error',
        'Unable to get your location. Please check your GPS settings and try again.'
      );
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const refreshLocation = () => {
    console.log('Refresh location button pressed');
    initializeLocation();
  };

  const forceRequestPermission = async () => {
    console.log('Force requesting location permission...');
    try {
      // On iOS, the permission dialog appears when we try to get location
      // So we'll try to get location directly to trigger the permission request
      const location = await getCurrentLocation();
      console.log('Location obtained after force request:', location);
      setCurrentLocation(location);
      
      const address = await getAddressFromCoordinates(location.latitude, location.longitude);
      setLocationAddress(address);
      
      showSuccessToast('Success', 'Location permission granted and location obtained!');
    } catch (error) {
      console.log('Force permission request error:', error);
      showErrorToast(
        'Permission Error',
        'Location permission is required. Please enable location access in settings.'
      );
    }
  };

  const testLocation = async () => {
    console.log('Testing location functionality...');
    try {
      // Check current permission status
      const currentPermission = await checkLocationPermission();
      console.log('Current permission status:', currentPermission);
      
      // Request permission if needed
      const hasPermission = await requestLocationPermission();
      console.log('Permission request result:', hasPermission);
      
      if (hasPermission) {
        const location = await getCurrentLocation();
        console.log('Test location obtained:', location);
        showSuccessToast(
          'Location Test Success', 
          `Location: ${location.latitude}, ${location.longitude}\nAccuracy: ${location.accuracy}m`
        );
      } else {
        showErrorToast(
          'Location Test Failed', 
          'Permission denied. Please enable location access in settings.'
        );
      }
    } catch (error) {
      console.log('Test location error:', error);
      showErrorToast('Location Test Error', `Error: ${error}`);
    }
  };

  const nearbyBathrooms = [
    {
      id: '1',
      title: 'Clean Bathroom - Downtown Mall',
      latitude: 19.0760,
      longitude: 72.8777,
      price: 50,
      rating: 4.5,
      reviewCount: 12,
      type: 'indian',
      gender: 'other',
      image: '🚽',
      isAvailable: true,
    },
    {
      id: '2',
      title: 'Premium Bathroom - Central Station',
      latitude: 19.0765,
      longitude: 72.8782,
      price: 75,
      rating: 4.8,
      reviewCount: 8,
      type: 'european',
      gender: 'other',
      image: '🚽',
      isAvailable: true,
    },
    {
      id: '3',
      title: 'Quick Stop - Gas Station',
      latitude: 19.0755,
      longitude: 72.8772,
      price: 30,
      rating: 3.9,
      reviewCount: 5,
      type: 'standing',
      gender: 'male',
      image: '🚽',
      isAvailable: false,
    },
    {
      id: '4',
      title: 'Luxury Bathroom - Hotel Lobby',
      latitude: 19.0768,
      longitude: 72.8788,
      price: 100,
      rating: 4.9,
      reviewCount: 25,
      type: 'european',
      gender: 'other',
      image: '🚽',
      isAvailable: true,
    },
  ];

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'indian', label: 'Indian' },
    { key: 'european', label: 'European' },
    { key: 'standing', label: 'Standing' },
    { key: 'male', label: 'Male' },
    { key: 'female', label: 'Female' },
    { key: 'other', label: 'Unisex' },
  ];

  const filteredBathrooms = nearbyBathrooms
    .map(bathroom => {
      let distance = 0;
      let distanceText = 'Unknown';
      
      if (currentLocation) {
        try {
          distance = calculateDistance(
            currentLocation.latitude,
            currentLocation.longitude,
            bathroom.latitude,
            bathroom.longitude
          );
          distanceText = formatDistance(distance);
        } catch (error) {
          console.log('Error calculating distance:', error);
          distanceText = 'Unknown';
        }
      } else {
        // Use mock distances when location is not available
        const mockDistances = ['0.2 km', '0.5 km', '0.8 km', '1.2 km'];
        const index = parseInt(bathroom.id) - 1;
        distanceText = mockDistances[index] || 'Unknown';
      }
      
      return {
        ...bathroom,
        distance,
        distanceText,
      };
    })
    .filter(bathroom => {
      const matchesSearch = bathroom.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = selectedFilter === 'all' || 
        bathroom.type === selectedFilter || 
        bathroom.gender === selectedFilter;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => a.distance - b.distance); // Sort by distance

  const renderBathroomCard = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.bathroomCard}
      onPress={() => navigation.navigate('BathroomDetails', { bathroomId: item.id })}>
      <View style={styles.cardHeader}>
        <Text style={styles.bathroomImage}>{item.image}</Text>
        <View style={styles.cardInfo}>
          <Text style={styles.bathroomTitle}>{item.title}</Text>
          <Text style={styles.bathroomDistance}>📍 {item.distanceText}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>₹{item.price}</Text>
          <Text style={styles.priceUnit}>/hour</Text>
        </View>
      </View>
      
      <View style={styles.cardDetails}>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>⭐ {item.rating}</Text>
          <Text style={styles.reviewCount}>({item.reviewCount} reviews)</Text>
        </View>
        
        <View style={styles.tagsContainer}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>
              {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
            </Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>
              {item.gender === 'other' ? 'Unisex' : 
               item.gender.charAt(0).toUpperCase() + item.gender.slice(1)}
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.cardFooter}>
        <View style={[
          styles.availabilityBadge,
          { backgroundColor: item.isAvailable ? '#27AE60' : '#E74C3C' }
        ]}>
          <Text style={styles.availabilityText}>
            {item.isAvailable ? 'Available' : 'Unavailable'}
          </Text>
        </View>
        <TouchableOpacity
          style={[
            styles.bookButton,
            !item.isAvailable && styles.bookButtonDisabled
          ]}
          disabled={!item.isAvailable}
          onPress={() => navigation.navigate('BathroomDetails', { bathroomId: item.id })}>
          <Text style={styles.bookButtonText}>
            {item.isAvailable ? 'Book Now' : 'Unavailable'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => setIsDrawerVisible(true)}>
            <Icon name="menu" size={24} color="#2C3E50" />
          </TouchableOpacity>
          <View style={styles.locationHeader}>
            <View style={styles.locationIconContainer}>
              <Text style={styles.locationIcon}>📍</Text>
            </View>
            <View style={styles.locationTextContainer}>
              {isLoadingLocation ? (
                <Text style={styles.locationLoadingText}>Getting your location...</Text>
              ) : currentLocation ? (
                <>
                  <Text style={styles.locationTitle}>Current Location</Text>
                  <Text style={styles.locationAddress}>{locationAddress}</Text>
                </>
              ) : (
                <>
                  <Text style={styles.locationTitle}>Location</Text>
                  <Text style={styles.locationErrorText}>Not available</Text>
                </>
              )}
            </View>
          </View>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => navigation.navigate('Profile')}>
            <Icon name="person" size={24} color="#2C3E50" />
          </TouchableOpacity>
        </View>
        
        {/* Location Actions - Only show when location is not available */}
        {!currentLocation && !isLoadingLocation && (
          <View style={styles.locationActionsContainer}>
            <View style={styles.locationErrorContainer}>
              <TouchableOpacity
                style={styles.locationErrorButton}
                onPress={refreshLocation}>
                <Text style={styles.locationErrorText}>📍 Enable Location</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.forceRequestButton}
                onPress={forceRequestPermission}>
                <Text style={styles.forceRequestText}>🔧 Force Request</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search bathrooms..."
            placeholderTextColor="#95A5A6"
          />
        </View>
      </View>

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

      <View style={styles.content}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nearby Bathrooms</Text>
          <Text style={styles.resultCount}>{filteredBathrooms.length} found</Text>
        </View>
        
        <FlatList
          data={filteredBathrooms}
          renderItem={renderBathroomCard}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </View>
      
      {/* Drawer Menu */}
      <DrawerMenu
        isVisible={isDrawerVisible}
        onClose={() => setIsDrawerVisible(false)}
        navigation={navigation}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: 'white',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 15,
  },
  locationTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  locationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 2,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileButtonText: {
    fontSize: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#7F8C8D',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  testLocationButton: {
    backgroundColor: '#3498DB',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  testLocationButtonText: {
    fontSize: 16,
    color: 'white',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 15,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#2C3E50',
  },
  filtersContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  resultCount: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  listContainer: {
    paddingBottom: 20,
  },
  bathroomCard: {
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
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  bathroomImage: {
    fontSize: 32,
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
  },
  bathroomTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  bathroomDistance: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E74C3C',
  },
  priceUnit: {
    fontSize: 12,
    color: '#95A5A6',
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F39C12',
  },
  reviewCount: {
    fontSize: 12,
    color: '#95A5A6',
    marginLeft: 4,
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  tag: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#2C3E50',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  availabilityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  availabilityText: {
    fontSize: 10,
    fontWeight: '600',
    color: 'white',
  },
  bookButton: {
    backgroundColor: '#E74C3C',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  bookButtonDisabled: {
    backgroundColor: '#95A5A6',
  },
  bookButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  // Location styles
  locationActionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 12,
    marginVertical: 10,
  },
  locationIconContainer: {
    marginRight: 10,
  },
  locationIcon: {
    fontSize: 20,
  },
  locationInfo: {
    flex: 1,
  },
  locationLoading: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationLoadingText: {
    fontSize: 14,
    color: '#7F8C8D',
    marginLeft: 8,
  },
  locationAddress: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  refreshLocationButton: {
    alignSelf: 'flex-start',
  },
  refreshLocationText: {
    fontSize: 12,
    color: '#E74C3C',
    fontWeight: '600',
  },
  locationErrorContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  locationErrorButton: {
    alignSelf: 'flex-start',
  },
  locationErrorText: {
    fontSize: 14,
    color: '#E74C3C',
    fontWeight: '600',
  },
  forceRequestButton: {
    alignSelf: 'flex-start',
  },
  forceRequestText: {
    fontSize: 14,
    color: '#3498DB',
    fontWeight: '600',
  },
});

export default UserHomeScreen; 