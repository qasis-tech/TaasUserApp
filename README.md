# Taas - Bathroom Finding App

A React Native application that helps users find and book clean, accessible bathrooms nearby. The app provides a seamless experience for users to discover, book, and review bathroom facilities.

## Features

### User Features
- **Authentication**: Login/Register with email and password
- **Home Screen**: Browse nearby bathrooms with search and filters
- **Bathroom Details**: View comprehensive information including:
  - Photos and basic details
  - Location and pricing
  - Provider information
  - Reviews and ratings
- **Booking & Payment**: Secure payment processing with multiple options
- **Order History**: Track past bookings and write reviews
- **Location Sharing**: Share location with providers for better service
- **Profile Management**: View booking history and manage account

## Screens Overview

### User Screens
1. **SplashScreen** - App launch screen with animations
2. **UserAuthScreen** - Login/Register with email/password
3. **UserHomeScreen** - Browse and search nearby bathrooms
4. **BathroomDetailsScreen** - Detailed bathroom information
5. **PaymentScreen** - Payment processing with multiple methods
6. **OrderHistoryScreen** - Past bookings and review management
7. **ReviewScreen** - Write reviews with star ratings and photos
8. **LocationSharingScreen** - Share location with providers
9. **ProfileScreen** - User profile and settings

## Technical Stack

- **React Native**: 0.79.4
- **TypeScript**: For type safety
- **React Navigation**: For screen navigation
- **React Native Safe Area Context**: For safe area handling

## Project Structure

```
src/
├── screens/                 # All app screens
│   ├── SplashScreen.tsx
│   ├── UserAuthScreen.tsx
│   ├── UserHomeScreen.tsx
│   ├── BathroomDetailsScreen.tsx
│   ├── PaymentScreen.tsx
│   ├── ProfileScreen.tsx
│   ├── OrderHistoryScreen.tsx
│   ├── LocationSharingScreen.tsx
│   └── ReviewScreen.tsx
├── navigation/              # Navigation configuration
│   └── AppNavigator.tsx
├── types/                   # TypeScript type definitions
│   └── index.ts
├── components/              # Reusable components
├── utils/                   # Utility functions
└── assets/                  # Images, fonts, etc.
```

## Key Features Implemented

### 1. Search and Filtering
- Real-time search functionality
- Multiple filter options (type, gender, etc.)
- Dynamic result updates

### 2. Payment Integration
- Multiple payment methods (UPI, Cards, Net Banking, Wallets)
- Secure payment processing
- Order summary and confirmation

### 3. Review System
- Star rating system
- Photo upload capability
- Review guidelines and moderation

### 4. Location Services
- GPS integration (placeholder)
- Location sharing controls
- Privacy-focused design

### 5. Modern UI/UX
- Clean, modern design
- Consistent color scheme
- Responsive layouts
- Smooth animations

## Getting Started

### Prerequisites
- Node.js (>= 18)
- React Native CLI
- Android Studio / Xcode

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd TaasUserApp
```

2. Install dependencies:
```bash
npm install
```

3. For iOS (macOS only):
```bash
cd ios && pod install && cd ..
```

4. Run the app:
```bash
# For Android
npm run android

# For iOS
npm run ios
```

## Configuration

### Environment Setup
- Update API endpoints in the respective screen files
- Configure payment gateway credentials
- Set up push notification services
- Configure location services

### Backend Integration
The app is currently using mock data. To integrate with a backend:

1. Replace mock data in screen files with API calls
2. Implement proper error handling
3. Add loading states
4. Set up authentication tokens
5. Configure image upload services

## User Flow

1. **Splash Screen** → App introduction
2. **Authentication** → Login or register
3. **Home Screen** → Browse nearby bathrooms
4. **Bathroom Details** → View full information
5. **Payment** → Book and pay
6. **Order History** → Track bookings
7. **Reviews** → Rate and review experiences
8. **Profile** → Manage account settings

## Future Enhancements

### Planned Features
- Real-time chat with providers
- Push notifications for booking updates
- Emergency bathroom finder
- Multiple language support
- Offline mode support
- Social media integration
- Accessibility improvements

### Technical Improvements
- State management (Redux/Context API)
- Image caching and optimization
- Performance optimization
- Unit and integration tests
- CI/CD pipeline
- App store deployment

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team.

---

**Note**: This is a prototype/demo version. For production use, additional security measures, proper backend integration, and thorough testing are required.
