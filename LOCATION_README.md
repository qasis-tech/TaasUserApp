# Location Services Implementation

This document describes the location services implementation in the TaasUserApp.

## Features

### 1. Location Access (`src/utils/locationUtils.ts`)
- **Permission Handling**: Automatic location permission requests
- **Current Location**: Get user's current GPS coordinates
- **Address Resolution**: Convert coordinates to readable addresses
- **Distance Calculation**: Calculate distances between locations
- **Error Handling**: Comprehensive error handling for location services

### 2. UserHomeScreen Integration
- **Location Display**: Shows current location at the top of the screen
- **Real-time Updates**: Automatically refreshes location when needed
- **Loading States**: Visual feedback during location acquisition
- **Distance Sorting**: Bathrooms sorted by distance from user
- **Refresh Functionality**: Manual location refresh option

## Implementation Details

### Location Permissions

#### iOS (Info.plist)
```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>This app needs access to your location to show nearby bathrooms and provide location-based services.</string>
<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
<string>This app needs access to your location to show nearby bathrooms and provide location-based services.</string>
```

#### Android (AndroidManifest.xml)
```xml
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
```

### Location Utilities

#### Key Functions
- `requestLocationPermission()`: Request location permissions
- `getCurrentLocation()`: Get current GPS coordinates
- `getAddressFromCoordinates()`: Convert coordinates to address
- `calculateDistance()`: Calculate distance between two points
- `formatDistance()`: Format distance for display
- `handleLocationError()`: Handle location errors

#### Usage Example
```typescript
import { getCurrentLocation, requestLocationPermission } from '../utils/locationUtils';

const initializeLocation = async () => {
  const hasPermission = await requestLocationPermission();
  if (hasPermission) {
    const location = await getCurrentLocation();
    // Use location data
  }
};
```

### UserHomeScreen Features

#### Location Display
- Shows current location address
- Loading indicator while acquiring location
- Error state with retry option
- Manual refresh button

#### Distance Calculation
- Real-time distance calculation for all bathrooms
- Automatic sorting by distance
- Formatted distance display (meters/kilometers)

## User Experience

### Location Flow
1. **App Launch**: Automatically requests location permission
2. **Permission Grant**: Shows loading indicator while getting location
3. **Location Display**: Shows current address at top of screen
4. **Distance Sorting**: Bathrooms automatically sorted by distance
5. **Refresh Option**: User can manually refresh location

### Error Handling
- **Permission Denied**: Shows alert with instructions
- **GPS Unavailable**: Shows error message with retry option
- **Timeout**: Handles location request timeouts
- **Network Issues**: Graceful fallback for address resolution

## Production Considerations

### Real Geocoding Service
Replace the mock geocoding with a real service:

```typescript
export const getAddressFromCoordinates = async (
  latitude: number,
  longitude: number
): Promise<string> => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_API_KEY`
  );
  const data = await response.json();
  return data.results[0]?.formatted_address || 'Unknown location';
};
```

### Location Accuracy
- High accuracy mode enabled for precise location
- 15-second timeout for location requests
- 10-meter distance filter for location updates

### Privacy & Security
- Only requests location when needed
- Clear permission descriptions
- No location data stored permanently
- User can disable location access

## Testing

### Manual Testing
1. Test permission requests on both platforms
2. Test location acquisition in different environments
3. Test distance calculations with known coordinates
4. Test error handling scenarios
5. Test location refresh functionality

### Simulator Testing
- iOS Simulator: Use custom location feature
- Android Emulator: Use extended controls for location

## Future Enhancements

1. **Background Location**: For continuous location tracking
2. **Geofencing**: Notify when entering bathroom areas
3. **Offline Maps**: Cache location data for offline use
4. **Location History**: Track user's location patterns
5. **Multiple Location Services**: Fallback to different providers

## Troubleshooting

### Common Issues
1. **Permission Denied**: Check device settings
2. **GPS Not Working**: Ensure location services are enabled
3. **Inaccurate Location**: Check for GPS signal strength
4. **Timeout Errors**: Increase timeout values if needed

### Debug Information
- Location coordinates logged to console
- Error codes and messages displayed
- Permission status tracked
- Distance calculations verified 