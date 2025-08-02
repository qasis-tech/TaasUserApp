import Geolocation from '@react-native-community/geolocation';
import { Platform, PermissionsAndroid } from 'react-native';

export interface LocationData {
  latitude: number;
  longitude: number;
  address?: string;
  accuracy?: number;
  timestamp?: number;
}

export interface LocationError {
  code: number;
  message: string;
}

/**
 * Check current location permission status
 */
export const checkLocationPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'ios') {
    // For iOS, we can't check permission status without triggering the request
    return false;
  }

  try {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
    console.log('Current permission status:', granted);
    return granted;
  } catch (err) {
    console.warn('Error checking location permission:', err);
    return false;
  }
};

/**
 * Request location permissions for Android
 */
export const requestLocationPermission = async (): Promise<boolean> => {
  console.log('Requesting location permission for platform:', Platform.OS);
  
  if (Platform.OS === 'ios') {
    console.log('iOS platform - permissions handled through Info.plist');
    // For iOS, we need to actually trigger the permission request by calling getCurrentPosition
    // The permission dialog will appear automatically when we try to get location
    return true;
  }

  try {
    console.log('Requesting Android location permission...');
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'This app needs access to your location to show nearby bathrooms.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );
    console.log('Android permission result:', granted);
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn('Error requesting location permission:', err);
    return false;
  }
};

/**
 * Get current location
 */
export const getCurrentLocation = (): Promise<LocationData> => {
  console.log('Getting current location...');
  
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log('Location obtained successfully:', position);
        const locationData: LocationData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp,
        };
        resolve(locationData);
      },
      (error) => {
        console.log('Location error:', error);
        const locationError: LocationError = {
          code: error.code,
          message: error.message,
        };
        reject(locationError);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      }
    );
  });
};

/**
 * Watch location changes
 */
export const watchLocation = (
  onLocationUpdate: (location: LocationData) => void,
  onError: (error: LocationError) => void
): number => {
  return Geolocation.watchPosition(
    (position) => {
      const locationData: LocationData = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        timestamp: position.timestamp,
      };
      onLocationUpdate(locationData);
    },
    (error) => {
      const locationError: LocationError = {
        code: error.code,
        message: error.message,
      };
      onError(locationError);
    },
    {
      enableHighAccuracy: true,
      distanceFilter: 10, // Update every 10 meters
      interval: 5000, // Update every 5 seconds
    }
  );
};

/**
 * Stop watching location
 */
export const stopWatchingLocation = (watchId: number): void => {
  Geolocation.clearWatch(watchId);
};

/**
 * Reverse geocoding to get address from coordinates
 * Note: This is a mock implementation. In production, use a real geocoding service
 */
export const getAddressFromCoordinates = async (
  latitude: number,
  longitude: number
): Promise<string> => {
  try {
    // Mock implementation - in production, use Google Maps API or similar
    // const response = await fetch(
    //   `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_API_KEY`
    // );
    // const data = await response.json();
    // return data.results[0]?.formatted_address || 'Unknown location';
    
    // For demo purposes, return a mock address
    return `Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`;
  } catch (error) {
    console.error('Error getting address:', error);
    return 'Unknown location';
  }
};

/**
 * Calculate distance between two coordinates in kilometers
 */
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
};

/**
 * Format distance for display
 */
export const formatDistance = (distance: number): string => {
  if (distance < 1) {
    return `${Math.round(distance * 1000)}m`;
  } else {
    return `${distance.toFixed(1)}km`;
  }
};

/**
 * Handle location errors and show appropriate messages
 */
export const handleLocationError = (error: LocationError): void => {
  let message = 'Unable to get your location.';
  
  switch (error.code) {
    case 1:
      message = 'Location permission denied. Please enable location access in settings.';
      break;
    case 2:
      message = 'Location service is unavailable. Please check your GPS settings.';
      break;
    case 3:
      message = 'Location request timed out. Please try again.';
      break;
    default:
      message = 'An error occurred while getting your location.';
  }
  
  // Note: This function is now deprecated in favor of toast notifications
  // The calling component should handle errors with showErrorToast
  console.error('Location Error:', message);
}; 