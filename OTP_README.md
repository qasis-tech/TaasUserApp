# Mobile OTP Verification System

This document describes the mobile OTP (One-Time Password) verification system implemented in the TaasUserApp.

## Features

### 1. Simplified Authentication (`src/screens/UserAuthScreen.tsx`)
- **Phone Number Only**: Single phone number input field
- **Direct OTP Flow**: Immediate navigation to OTP verification
- **Clean Interface**: No email or password fields

### 2. OTP Screen (`src/screens/OTPScreen.tsx`)
- **Auto OTP Sending**: Automatically sends OTP when phone number is provided
- **OTP Verification**: 4-digit OTP input with auto-focus functionality
- **Resend OTP**: Countdown timer with resend capability
- **Navigation**: Seamless integration with the app's navigation system

### 3. OTP Utilities (`src/utils/otpUtils.ts`)
- **OTP Generation**: Random 4-digit OTP generation
- **Phone Number Validation**: Validates 10-digit phone numbers
- **Phone Number Formatting**: Formats numbers as (XXX) XXX-XXXX
- **OTP Verification**: Simulates API calls for OTP verification
- **Demo Mode**: Accepts '1234' as a valid OTP for testing

## Usage

### Authentication Flow
1. Open the app and navigate to the User Authentication screen
2. Enter your phone number
3. Click "Continue with OTP"
4. OTP is automatically sent to your phone
5. Enter the 4-digit OTP received
6. Click "Verify OTP" to complete verification

### Navigation Flow
```
UserAuthScreen (Phone Input) → OTPScreen (Auto OTP Send) → UserHomeScreen (after successful verification)
```

## Implementation Details

### Phone Number Formatting
- Automatically formats input as (XXX) XXX-XXXX
- Validates 10-digit phone numbers
- Cleans formatting for API calls

### OTP Input
- 4 separate input boxes for better UX
- Auto-focus to next input when digit is entered
- Backspace support to previous input
- Numeric keyboard only

### Resend Functionality
- 60-second countdown timer
- Disabled during countdown
- Resends new OTP when timer expires

### Demo Mode
For testing purposes, the system accepts '1234' as a valid OTP regardless of what was actually sent.

## API Integration

### Current Implementation (Demo)
- Simulates API delays (2 seconds for sending, 1.5 seconds for verification)
- Logs OTP to console for testing
- Uses utility functions for consistent behavior

### Production Integration
To integrate with real SMS services:

1. Replace `sendOTP` function in `otpUtils.ts`:
```typescript
export const sendOTP = async (phoneNumber: string): Promise<string> => {
  // Call your SMS service API
  const response = await fetch('/api/send-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phoneNumber })
  });
  
  const data = await response.json();
  return data.otp; // or handle as needed
};
```

2. Replace `verifyOTP` function:
```typescript
export const verifyOTP = async (
  phoneNumber: string, 
  otp: string, 
  expectedOTP: string
): Promise<boolean> => {
  // Call your verification API
  const response = await fetch('/api/verify-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phoneNumber, otp })
  });
  
  const data = await response.json();
  return data.verified;
};
```

## Styling

The OTP screen follows the app's design system:
- Consistent with other screens' styling
- Responsive design for different screen sizes
- Keyboard avoiding behavior
- Loading states and disabled states

## Security Considerations

### Production Implementation
1. **OTP Storage**: Store OTPs securely (encrypted, time-limited)
2. **Rate Limiting**: Implement rate limiting for OTP requests
3. **Expiration**: Set appropriate OTP expiration times
4. **Validation**: Server-side validation of all inputs
5. **Logging**: Log OTP attempts for security monitoring

### Current Demo Limitations
- OTP is logged to console (remove in production)
- No rate limiting implemented
- No server-side validation
- Demo OTP '1234' should be removed

## Testing

### Manual Testing
1. Test phone number formatting
2. Test OTP input with various scenarios
3. Test resend functionality
4. Test navigation flows
5. Test error handling

### Automated Testing
Consider adding unit tests for:
- OTP generation
- Phone number validation
- OTP verification logic
- Utility functions

## Future Enhancements

1. **Biometric Authentication**: Add fingerprint/face ID support
2. **Voice OTP**: Support for voice-based OTP delivery
3. **Email OTP**: Alternative OTP delivery method
4. **Remember Device**: Option to remember verified devices
5. **Multi-language Support**: Internationalization for OTP messages 