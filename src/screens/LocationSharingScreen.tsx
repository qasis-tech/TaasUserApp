import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import CommonHeader from '../components/CommonHeader';

interface LocationSharingScreenProps {
  navigation: any;
}

const { width, height } = Dimensions.get('window');

const LocationSharingScreen: React.FC<LocationSharingScreenProps> = ({ navigation }) => {
  const [isSharing, setIsSharing] = useState(false);

  // Mock location data - replace with real GPS data
  const currentLocation = {
    latitude: 19.0760,
    longitude: 72.8777,
    address: 'Mumbai, Maharashtra, India',
    accuracy: '5m',
  };

  const handleStartSharing = () => {
    setIsSharing(true);
    Alert.alert(
      'Location Sharing Started',
      'Your location is now being shared with the provider.',
      [{ text: 'OK' }]
    );
  };

  const handleStopSharing = () => {
    setIsSharing(false);
    Alert.alert(
      'Location Sharing Stopped',
      'Your location sharing has been stopped.',
      [{ text: 'OK' }]
    );
  };

  const handleShareLocation = () => {
    Alert.alert(
      'Share Location',
      'Location sharing feature coming soon with real GPS integration.',
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <CommonHeader
        title="Location Sharing"
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Hero Section with Map */}
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          style={styles.heroSection}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.mapContainer}>
            <View style={styles.mapPlaceholder}>
              <View style={styles.mapIconContainer}>
                <Text style={styles.mapIcon}>🗺️</Text>
              </View>
              <Text style={styles.mapText}>Live Location</Text>
              <Text style={styles.mapSubtext}>Real-time GPS tracking</Text>
            </View>
            <View style={styles.locationPin}>
              <View style={styles.pinGlow} />
              <Text style={styles.pinIcon}>📍</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Location Details Card */}
        <View style={styles.locationSection}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIconContainer}>
              <Text style={styles.sectionIcon}>📍</Text>
            </View>
            <Text style={styles.sectionTitle}>Current Location</Text>
          </View>
          <View style={styles.locationCard}>
            <View style={styles.locationRow}>
              <View style={styles.locationLabelContainer}>
                <Text style={styles.locationLabel}>Address</Text>
              </View>
              <Text style={styles.locationValue}>{currentLocation.address}</Text>
            </View>
            <View style={styles.locationRow}>
              <View style={styles.locationLabelContainer}>
                <Text style={styles.locationLabel}>Coordinates</Text>
              </View>
              <Text style={styles.locationValue}>
                {currentLocation.latitude.toFixed(4)}, {currentLocation.longitude.toFixed(4)}
              </Text>
            </View>
            <View style={styles.locationRow}>
              <View style={styles.locationLabelContainer}>
                <Text style={styles.locationLabel}>Accuracy</Text>
              </View>
              <Text style={styles.locationValue}>{currentLocation.accuracy}</Text>
            </View>
          </View>
        </View>

        {/* Sharing Controls */}
        <View style={styles.controlsSection}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIconContainer}>
              <Text style={styles.sectionIcon}>🎛️</Text>
            </View>
            <Text style={styles.sectionTitle}>Sharing Controls</Text>
          </View>
          
          {!isSharing ? (
            <TouchableOpacity
              style={styles.startSharingButton}
              onPress={handleStartSharing}>
              <LinearGradient
                colors={['#4facfe', '#00f2fe']}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.startSharingIcon}>📍</Text>
                <Text style={styles.startSharingText}>Start Location Sharing</Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.stopSharingButton}
              onPress={handleStopSharing}>
              <LinearGradient
                colors={['#ff6b6b', '#ee5a24']}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.stopSharingIcon}>⏹️</Text>
                <Text style={styles.stopSharingText}>Stop Location Sharing</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.shareButton}
            onPress={handleShareLocation}>
            <LinearGradient
              colors={['#a8edea', '#fed6e3']}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.shareButtonIcon}>📤</Text>
              <Text style={styles.shareButtonText}>Share Current Location</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Status Card */}
        <View style={styles.statusSection}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIconContainer}>
              <Text style={styles.sectionIcon}>📊</Text>
            </View>
            <Text style={styles.sectionTitle}>Sharing Status</Text>
          </View>
          <View style={[
            styles.statusCard,
            { 
              backgroundColor: isSharing ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
              borderColor: isSharing ? 'rgba(76, 175, 80, 0.3)' : 'rgba(244, 67, 54, 0.3)'
            }
          ]}>
            <View style={styles.statusIconContainer}>
              <Text style={[
                styles.statusIcon,
                { color: isSharing ? '#4CAF50' : '#F44336' }
              ]}>
                {isSharing ? '🟢' : '🔴'}
              </Text>
            </View>
            <View style={styles.statusText}>
              <Text style={[
                styles.statusTitle,
                { color: isSharing ? '#4CAF50' : '#F44336' }
              ]}>
                {isSharing ? 'Location Sharing Active' : 'Location Sharing Inactive'}
              </Text>
              <Text style={styles.statusDescription}>
                {isSharing 
                  ? 'Your location is being shared with the provider'
                  : 'Location sharing is currently disabled'
                }
              </Text>
            </View>
          </View>
        </View>

        {/* Privacy Notice */}
        <View style={styles.privacySection}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIconContainer}>
              <Text style={styles.sectionIcon}>🔒</Text>
            </View>
            <Text style={styles.sectionTitle}>Privacy & Security</Text>
          </View>
          <View style={styles.privacyCard}>
            <View style={styles.privacyIconContainer}>
              <Text style={styles.privacyIcon}>🔒</Text>
            </View>
            <Text style={styles.privacyTitle}>Your Privacy Matters</Text>
            <View style={styles.privacyPoints}>
              <View style={styles.privacyPoint}>
                <Text style={styles.privacyPointIcon}>✓</Text>
                <Text style={styles.privacyPointText}>Location only shared when enabled</Text>
              </View>
              <View style={styles.privacyPoint}>
                <Text style={styles.privacyPointIcon}>✓</Text>
                <Text style={styles.privacyPointText}>Data encrypted and secure</Text>
              </View>
              <View style={styles.privacyPoint}>
                <Text style={styles.privacyPointIcon}>✓</Text>
                <Text style={styles.privacyPointText}>Stop sharing anytime</Text>
              </View>
              <View style={styles.privacyPoint}>
                <Text style={styles.privacyPointIcon}>✓</Text>
                <Text style={styles.privacyPointText}>No permanent data storage</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  heroSection: {
    marginBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingBottom: 30,
  },
  mapContainer: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginHorizontal: 20,
    marginTop: 20,
  },
  mapPlaceholder: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
    padding: 30,
  },
  mapIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  mapIcon: {
    fontSize: 40,
  },
  mapText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  mapSubtext: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  locationPin: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -20,
    marginTop: -20,
  },
  pinGlow: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    top: -5,
    left: -5,
  },
  pinIcon: {
    fontSize: 30,
  },
  locationSection: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  sectionIcon: {
    fontSize: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  locationCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  locationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  locationLabelContainer: {
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  locationLabel: {
    fontSize: 14,
    color: '#6366f1',
    fontWeight: '600',
  },
  locationValue: {
    fontSize: 14,
    color: '#1e293b',
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
    marginLeft: 15,
  },
  controlsSection: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  startSharingButton: {
    marginBottom: 15,
    borderRadius: 16,
    overflow: 'hidden',
  },
  stopSharingButton: {
    marginBottom: 15,
    borderRadius: 16,
    overflow: 'hidden',
  },
  shareButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  startSharingIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  startSharingText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stopSharingIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  stopSharingText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  shareButtonIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  shareButtonText: {
    color: '#1e293b',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusSection: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 25,
    borderRadius: 20,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  statusIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  statusIcon: {
    fontSize: 24,
  },
  statusText: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statusDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  privacySection: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  privacyCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  privacyIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  privacyIcon: {
    fontSize: 28,
  },
  privacyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 20,
    textAlign: 'center',
  },
  privacyPoints: {
    width: '100%',
  },
  privacyPoint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  privacyPointIcon: {
    fontSize: 16,
    color: '#10b981',
    fontWeight: 'bold',
    marginRight: 12,
    width: 20,
    textAlign: 'center',
  },
  privacyPointText: {
    fontSize: 14,
    color: '#64748b',
    flex: 1,
    lineHeight: 20,
  },
});

export default LocationSharingScreen; 