import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import screens
import SplashScreen from '../screens/SplashScreen';
import UserAuthScreen from '../screens/UserAuthScreen';
import OTPScreen from '../screens/OTPScreen';
import BathroomDetailsScreen from '../screens/BathroomDetailsScreen';
import PaymentScreen from '../screens/PaymentScreen';
import LocationSharingScreen from '../screens/LocationSharingScreen';
import ReviewScreen from '../screens/ReviewScreen';

// Import navigators
import BottomTabNavigator from './BottomTabNavigator';

// Import components
import CustomToast from '../components/CustomToast';

import { RootStackParamList } from '../types';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            cardStyleInterpolator: ({ current, layouts }) => {
              return {
                cardStyle: {
                  transform: [
                    {
                      translateX: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [layouts.screen.width, 0],
                      }),
                    },
                  ],
                },
              };
            },
          }}>
          
          {/* Splash Screen */}
          <Stack.Screen name="Splash" component={SplashScreen} />
          
          {/* User Authentication */}
          <Stack.Screen name="UserAuth" component={UserAuthScreen} />
          <Stack.Screen name="OTP" component={OTPScreen} />
          
          {/* Main App with Bottom Tabs */}
          <Stack.Screen name="MainApp" component={BottomTabNavigator} />
          
          {/* Modal Screens */}
          <Stack.Screen name="BathroomDetails" component={BathroomDetailsScreen} />
          <Stack.Screen name="Payment" component={PaymentScreen} />
          <Stack.Screen name="LocationSharing" component={LocationSharingScreen} />
          <Stack.Screen name="Review" component={ReviewScreen} />
          
        </Stack.Navigator>
        <CustomToast />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppNavigator; 