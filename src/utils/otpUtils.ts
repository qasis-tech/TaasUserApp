// OTP Utility Functions

/**
 * Generate a random 4-digit OTP
 * @returns string - 4-digit OTP
 */
export const generateOTP = (): string => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

/**
 * Validate if the provided OTP is a valid 4-digit number
 * @param otp - The OTP to validate
 * @returns boolean - True if valid, false otherwise
 */
export const validateOTP = (otp: string): boolean => {
  const otpRegex = /^\d{4}$/;
  return otpRegex.test(otp);
};

/**
 * Format phone number for display
 * @param phoneNumber - Raw phone number
 * @returns string - Formatted phone number
 */
export const formatPhoneNumber = (phoneNumber: string): string => {
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  if (cleaned.length <= 3) {
    return cleaned;
  } else if (cleaned.length <= 6) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
  } else {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
  }
};

/**
 * Validate phone number format
 * @param phoneNumber - Phone number to validate
 * @returns boolean - True if valid, false otherwise
 */
export const validatePhoneNumber = (phoneNumber: string): boolean => {
  const cleaned = phoneNumber.replace(/\D/g, '');
  return cleaned.length === 10;
};

/**
 * Clean phone number (remove formatting)
 * @param phoneNumber - Formatted phone number
 * @returns string - Clean phone number
 */
export const cleanPhoneNumber = (phoneNumber: string): string => {
  return phoneNumber.replace(/\D/g, '');
};

/**
 * Simulate OTP sending (for demo purposes)
 * @param phoneNumber - Phone number to send OTP to
 * @returns Promise<string> - Generated OTP
 */
export const sendOTP = async (phoneNumber: string): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Generate OTP
  const otp = generateOTP();
  
  // In a real app, this would be sent via SMS service
  console.log(`OTP ${otp} sent to ${phoneNumber}`);
  
  return otp;
};

/**
 * Simulate OTP verification (for demo purposes)
 * @param phoneNumber - Phone number
 * @param otp - OTP to verify
 * @param expectedOTP - Expected OTP (in real app, this would be stored securely)
 * @returns Promise<boolean> - True if verified, false otherwise
 */
export const verifyOTP = async (
  phoneNumber: string, 
  otp: string, 
  expectedOTP: string
): Promise<boolean> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // For demo purposes, accept '1234' as valid OTP
  if (otp === '1234') {
    return true;
  }
  
  return otp === expectedOTP;
};

/**
 * Calculate remaining time for OTP expiry
 * @param expiryTime - OTP expiry timestamp
 * @returns number - Remaining seconds
 */
export const getRemainingTime = (expiryTime: number): number => {
  const now = Date.now();
  const remaining = Math.max(0, Math.floor((expiryTime - now) / 1000));
  return remaining;
};

/**
 * Check if OTP has expired
 * @param expiryTime - OTP expiry timestamp
 * @returns boolean - True if expired, false otherwise
 */
export const isOTPExpired = (expiryTime: number): boolean => {
  return Date.now() > expiryTime;
}; 