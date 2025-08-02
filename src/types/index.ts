export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  profileImage?: string;
}

export interface Bathroom {
  id: string;
  providerId: string;
  title: string;
  description: string;
  images: string[];
  basicDetails: {
    type: 'indian' | 'european' | 'standing';
    gender: 'male' | 'female' | 'other';
    isWheelchairAccessible: boolean;
    hasBabyChanging: boolean;
    hasShower: boolean;
  };
  location: {
    address: string;
    latitude: number;
    longitude: number;
    city: string;
    state: string;
    zipCode: string;
  };
  price: {
    amount: number;
    currency: string;
    perHour: boolean;
  };
  rating: number;
  reviewCount: number;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  userId: string;
  bathroomId: string;
  providerId: string;
  startTime: Date;
  endTime: Date;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'completed' | 'failed';
  createdAt: Date;
}

export interface Review {
  id: string;
  orderId: string;
  userId: string;
  bathroomId: string;
  rating: number;
  comment: string;
  images: string[];
  createdAt: Date;
}

export interface Location {
  latitude: number;
  longitude: number;
  address: string;
}

export type RootStackParamList = {
  Splash: undefined;
  UserAuth: undefined;
  OTP: { phoneNumber: string };
  MainApp: undefined;
  BathroomDetails: { bathroomId: string };
  Payment: { orderId: string; amount: number };
  LocationSharing: undefined;
  Review: { orderId: string };
};

export type BottomTabParamList = {
  Home: undefined;
  MyBookings: undefined;
  Profile: undefined;
};

export type ProviderTabParamList = {
  Dashboard: undefined;
  AddBathroom: undefined;
  Profile: undefined;
  Orders: undefined;
};

export type UserTabParamList = {
  Home: undefined;
  Search: undefined;
  Orders: undefined;
  Profile: undefined;
}; 