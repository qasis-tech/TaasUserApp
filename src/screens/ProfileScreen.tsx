import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';

interface ProfileScreenProps {
  navigation: any;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  // Mock user data - replace with real data from your backend
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    profileImage: '👤',
    joinDate: 'January 2024',
  };

  const menuItems = [
    {
      id: 'orders',
      title: 'Order History',
      icon: '📋',
      onPress: () => navigation.navigate('OrderHistory'),
    },
    {
      id: 'location',
      title: 'Location Sharing',
      icon: '📍',
      onPress: () => navigation.navigate('LocationSharing'),
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: '🔔',
      onPress: () => Alert.alert('Notifications', 'Notification settings coming soon'),
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      icon: '🔒',
      onPress: () => Alert.alert('Privacy', 'Privacy settings coming soon'),
    },
    {
      id: 'help',
      title: 'Help & Support',
      icon: '❓',
      onPress: () => Alert.alert('Help', 'Help & support coming soon'),
    },
    {
      id: 'about',
      title: 'About Taas',
      icon: 'ℹ️',
      onPress: () => Alert.alert('About', 'Taas - Find Bathrooms Near You\nVersion 1.0.0'),
    },
  ];

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => navigation.navigate('UserAuth')
        },
      ]
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
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => Alert.alert('Edit Profile', 'Edit profile coming soon')}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.profileImage}>
            <Text style={styles.profileImageText}>{user.profileImage}</Text>
          </View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          <Text style={styles.userPhone}>{user.phone}</Text>
          <Text style={styles.joinDate}>Member since {user.joinDate}</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Total Bookings</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>4.8</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>₹850</Text>
            <Text style={styles.statLabel}>Total Spent</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={item.onPress}>
              <View style={styles.menuItemLeft}>
                <Text style={styles.menuIcon}>{item.icon}</Text>
                <Text style={styles.menuTitle}>{item.title}</Text>
              </View>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <View style={styles.logoutSection}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  editButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#3498DB',
    borderRadius: 16,
  },
  editButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImageText: {
    fontSize: 48,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#7F8C8D',
    marginBottom: 4,
  },
  userPhone: {
    fontSize: 16,
    color: '#7F8C8D',
    marginBottom: 8,
  },
  joinDate: {
    fontSize: 14,
    color: '#95A5A6',
  },
  statsSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3498DB',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    textAlign: 'center',
  },
  menuSection: {
    backgroundColor: 'white',
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F8F9FA',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  menuTitle: {
    fontSize: 16,
    color: '#2C3E50',
  },
  menuArrow: {
    fontSize: 18,
    color: '#95A5A6',
  },
  logoutSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  logoutButton: {
    backgroundColor: '#E74C3C',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen; 