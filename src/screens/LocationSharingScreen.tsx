import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';

interface LocationSharingScreenProps {
  navigation: any;
}

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
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Location Sharing</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        {/* Map Placeholder */}
        <View style={styles.mapContainer}>
          <View style={styles.mapPlaceholder}>
            <Text style={styles.mapIcon}>🗺️</Text>
            <Text style={styles.mapText}>Map View</Text>
            <Text style={styles.mapSubtext}>Real-time location tracking</Text>
          </View>
          <View style={styles.locationPin}>
            <Text style={styles.pinIcon}>📍</Text>
          </View>
        </View>

        {/* Location Details */}
        <View style={styles.locationSection}>
          <Text style={styles.sectionTitle}>Current Location</Text>
          <View style={styles.locationCard}>
            <View style={styles.locationRow}>
              <Text style={styles.locationLabel}>Address:</Text>
              <Text style={styles.locationValue}>{currentLocation.address}</Text>
            </View>
            <View style={styles.locationRow}>
              <Text style={styles.locationLabel}>Coordinates:</Text>
              <Text style={styles.locationValue}>
                {currentLocation.latitude.toFixed(4)}, {currentLocation.longitude.toFixed(4)}
              </Text>
            </View>
            <View style={styles.locationRow}>
              <Text style={styles.locationLabel}>Accuracy:</Text>
              <Text style={styles.locationValue}>{currentLocation.accuracy}</Text>
            </View>
          </View>
        </View>

        {/* Sharing Controls */}
        <View style={styles.controlsSection}>
          <Text style={styles.sectionTitle}>Sharing Controls</Text>
          
          {!isSharing ? (
            <TouchableOpacity
              style={styles.startSharingButton}
              onPress={handleStartSharing}>
              <Text style={styles.startSharingIcon}>📍</Text>
              <Text style={styles.startSharingText}>Start Location Sharing</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.stopSharingButton}
              onPress={handleStopSharing}>
              <Text style={styles.stopSharingIcon}>⏹️</Text>
              <Text style={styles.stopSharingText}>Stop Location Sharing</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.shareButton}
            onPress={handleShareLocation}>
            <Text style={styles.shareButtonIcon}>📤</Text>
            <Text style={styles.shareButtonText}>Share Current Location</Text>
          </TouchableOpacity>
        </View>

        {/* Status */}
        <View style={styles.statusSection}>
          <Text style={styles.sectionTitle}>Sharing Status</Text>
          <View style={[
            styles.statusCard,
            { backgroundColor: isSharing ? '#E8F5E8' : '#FFF5F5' }
          ]}>
            <Text style={[
              styles.statusIcon,
              { color: isSharing ? '#27AE60' : '#E74C3C' }
            ]}>
              {isSharing ? '🟢' : '🔴'}
            </Text>
            <View style={styles.statusText}>
              <Text style={[
                styles.statusTitle,
                { color: isSharing ? '#27AE60' : '#E74C3C' }
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
          <Text style={styles.sectionTitle}>Privacy & Security</Text>
          <View style={styles.privacyCard}>
            <Text style={styles.privacyIcon}>🔒</Text>
            <Text style={styles.privacyTitle}>Your Privacy Matters</Text>
            <Text style={styles.privacyText}>
              • Location is only shared when you explicitly enable it{'\n'}
              • Data is encrypted and secure{'\n'}
              • You can stop sharing at any time{'\n'}
              • Location data is not stored permanently
            </Text>
          </View>
        </View>
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
    paddingHorizontal: 20,
  },
  mapContainer: {
    height: 200,
    backgroundColor: '#E8F5E8',
    borderRadius: 16,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  mapPlaceholder: {
    alignItems: 'center',
  },
  mapIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  mapText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  mapSubtext: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  locationPin: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -15,
    marginTop: -15,
  },
  pinIcon: {
    fontSize: 30,
  },
  locationSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 12,
  },
  locationCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
  },
  locationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  locationLabel: {
    fontSize: 14,
    color: '#7F8C8D',
    fontWeight: '600',
  },
  locationValue: {
    fontSize: 14,
    color: '#2C3E50',
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  controlsSection: {
    marginBottom: 20,
  },
  startSharingButton: {
    backgroundColor: '#27AE60',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  startSharingIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  startSharingText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stopSharingButton: {
    backgroundColor: '#E74C3C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  stopSharingIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  stopSharingText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  shareButton: {
    backgroundColor: '#3498DB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  shareButtonIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  shareButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusSection: {
    marginBottom: 20,
  },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
  },
  statusIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  statusText: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statusDescription: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  privacySection: {
    marginBottom: 20,
  },
  privacyCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  privacyIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  privacyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  privacyText: {
    fontSize: 14,
    color: '#7F8C8D',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default LocationSharingScreen; 