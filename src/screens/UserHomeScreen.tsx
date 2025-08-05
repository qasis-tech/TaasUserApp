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
  Modal,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'react-native-linear-gradient';
import { Ionicons } from '@react-native-vector-icons/ionicons';
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

const { width, height } = Dimensions.get('window');

interface UserHomeScreenProps {
  navigation: any;
}

const UserHomeScreen: React.FC<UserHomeScreenProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
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
      const matchesFilter =
        selectedFilters.length === 0 ||
        selectedFilters.includes('all') ||
        selectedFilters.includes(bathroom.type) ||
        selectedFilters.includes(bathroom.gender);
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => a.distance - b.distance); // Sort by distance

  const toggleFilter = (key: string) => {
    setSelectedFilters((prev) =>
      prev.includes(key) ? prev.filter(f => f !== key) : [...prev, key]
    );
  };

  const clearFilters = () => setSelectedFilters([]);

  const isFilterSelected = (key: string) => selectedFilters.includes(key);

  const renderBathroomCard = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.bathroomCard}
      onPress={() => navigation.navigate('BathroomDetails', { bathroomId: item.id })}>
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.95)']}
        style={styles.cardGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.cardHeader}>
          <View style={styles.bathroomImageContainer}>
            <Text style={styles.bathroomImage}>{item.image}</Text>
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.bathroomTitle}>{item.title}</Text>
            <View style={styles.distanceContainer}>
              <Ionicons name="location" size={14} color="#6366f1" />
              <Text style={styles.bathroomDistance}>{item.distanceText}</Text>
            </View>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>₹{item.price}</Text>
            <Text style={styles.priceUnit}>/hour</Text>
          </View>
        </View>
        
        <View style={styles.cardDetails}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#f59e0b" />
            <Text style={styles.rating}>{item.rating}</Text>
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
            { backgroundColor: item.isAvailable ? '#10b981' : '#ef4444' }
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
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      {/* Hero Header */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.heroHeader}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerTop}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => setIsDrawerVisible(true)}>
            <Ionicons name="menu" size={24} color="white" />
          </TouchableOpacity>
          <View style={styles.locationHeader}>
            <View style={styles.locationIconContainer}>
              <Ionicons name="location" size={20} color="white" />
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
            <Ionicons name="person" size={24} color="white" />
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
      </LinearGradient>

      {/* Search Section */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color="#6366f1" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search bathrooms..."
            placeholderTextColor="#94a3b8"
          />
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setIsFilterModalVisible(true)}>
            <Ionicons name="filter" size={22} color="#6366f1" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Selected Filters Display */}
      {selectedFilters.length > 0 && (
        <View style={styles.selectedFiltersContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {selectedFilters.map((filterKey) => {
              const filter = filters.find(f => f.key === filterKey);
              return (
                <View key={filterKey} style={styles.selectedFilterChip}>
                  <Text style={styles.selectedFilterText}>{filter?.label}</Text>
                  <TouchableOpacity
                    onPress={() => toggleFilter(filterKey)}
                    style={styles.removeFilterButton}>
                    <Ionicons name="close" size={14} color="white" />
                  </TouchableOpacity>
                </View>
              );
            })}
            <TouchableOpacity
              style={styles.clearAllFiltersButton}
              onPress={clearFilters}>
              <Text style={styles.clearAllFiltersText}>Clear All</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}

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
      
      {/* Filter Modal */}
      <Modal
        visible={isFilterModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsFilterModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filter Bathrooms</Text>
              <TouchableOpacity
                onPress={() => setIsFilterModalVisible(false)}
                style={styles.closeModalButton}>
                <Ionicons name="close" size={24} color="#1e293b" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.filterList}>
              {filters.map(filter => (
                <TouchableOpacity
                  key={filter.key}
                  style={styles.filterOption}
                  onPress={() => toggleFilter(filter.key)}
                >
                  <Ionicons
                    name={isFilterSelected(filter.key) ? "checkbox" : "square-outline"}
                    size={22}
                    color={isFilterSelected(filter.key) ? "#6366f1" : "#64748b"}
                    style={styles.filterCheckbox}
                  />
                  <Text style={styles.filterOptionText}>{filter.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            
            <View style={styles.modalFooter}>
              <TouchableOpacity 
                style={styles.clearFiltersButton}
                onPress={clearFilters}>
                <Text style={styles.clearFiltersText}>Clear All</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.applyFiltersButton}
                onPress={() => setIsFilterModalVisible(false)}>
                <Text style={styles.applyFiltersText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      
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
    backgroundColor: '#f8fafc',
  },
  heroHeader: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
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
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
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
    color: 'white',
    marginBottom: 2,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 16,
    paddingHorizontal: 15,
    flex: 1,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1e293b',
  },
  filterButton: {
    padding: 8,
  },
  selectedFiltersContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  selectedFilterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6366f1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  selectedFilterText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    marginRight: 4,
  },
  removeFilterButton: {
    marginLeft: 4,
  },
  clearAllFiltersButton: {
    backgroundColor: '#94a3b8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginLeft: 8,
  },
  clearAllFiltersText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
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
    color: '#1e293b',
  },
  resultCount: {
    fontSize: 14,
    color: '#64748b',
  },
  listContainer: {
    paddingBottom: 20,
  },
  bathroomCard: {
    marginBottom: 15,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  cardGradient: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  bathroomImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  bathroomImage: {
    fontSize: 24,
  },
  cardInfo: {
    flex: 1,
  },
  bathroomTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bathroomDistance: {
    fontSize: 14,
    color: '#6366f1',
    marginLeft: 4,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ef4444',
  },
  priceUnit: {
    fontSize: 12,
    color: '#94a3b8',
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f59e0b',
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 12,
    color: '#94a3b8',
    marginLeft: 4,
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  tag: {
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#6366f1',
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
    backgroundColor: '#6366f1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  bookButtonDisabled: {
    backgroundColor: '#94a3b8',
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
  locationIconContainer: {
    marginRight: 10,
  },
  locationLoadingText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginLeft: 8,
  },
  locationAddress: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
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
    color: '#fecaca',
    fontWeight: '600',
  },
  forceRequestButton: {
    alignSelf: 'flex-start',
  },
  forceRequestText: {
    fontSize: 14,
    color: '#bfdbfe',
    fontWeight: '600',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  closeModalButton: {
    padding: 4,
  },
  filterList: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  filterCheckbox: {
    marginRight: 12,
  },
  filterOptionText: {
    fontSize: 16,
    color: '#1e293b',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  clearFiltersButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
  },
  clearFiltersText: {
    color: '#64748b',
    fontWeight: '600',
  },
  applyFiltersButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#6366f1',
  },
  applyFiltersText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default UserHomeScreen; 