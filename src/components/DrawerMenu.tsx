import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

interface DrawerMenuProps {
  isVisible: boolean;
  onClose: () => void;
  navigation: any;
}

const DrawerMenu: React.FC<DrawerMenuProps> = ({ isVisible, onClose, navigation }) => {
  if (!isVisible) return null;

  const menuItems = [
    {
      id: 'home',
      title: 'Home',
      icon: 'home-outline',
      onPress: () => {
        onClose();
        navigation.navigate('Home');
      },
    },
    {
      id: 'bookings',
      title: 'My Bookings',
      icon: 'calendar-outline',
      onPress: () => {
        onClose();
        navigation.navigate('MyBookings');
      },
    },
    {
      id: 'profile',
      title: 'Profile',
      icon: 'person-outline',
      onPress: () => {
        onClose();
        navigation.navigate('Profile');
      },
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: 'settings-outline',
      onPress: () => {
        onClose();
        // Navigate to settings when available
      },
    },
    {
      id: 'help',
      title: 'Help & Support',
      icon: 'help-circle-outline',
      onPress: () => {
        onClose();
        // Navigate to help when available
      },
    },
    {
      id: 'about',
      title: 'About',
      icon: 'information-circle-outline',
      onPress: () => {
        onClose();
        // Navigate to about when available
      },
    },
  ];

  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.backdrop} onPress={onClose} />
      <View style={styles.drawer}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <Icon name="person" size={32} color="#E74C3C" />
            </View>
            <View style={styles.userDetails}>
              <Text style={styles.userName}>John Doe</Text>
              <Text style={styles.userEmail}>john.doe@example.com</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon name="close" size={24} color="#2C3E50" />
          </TouchableOpacity>
        </View>

        {/* Menu Items */}
        <ScrollView style={styles.menuContainer} showsVerticalScrollIndicator={false}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <View style={styles.menuItemContent}>
                <Icon name={item.icon} size={24} color="#2C3E50" />
                <Text style={styles.menuItemText}>{item.title}</Text>
              </View>
              <Icon name="chevron-forward" size={20} color="#95A5A6" />
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.logoutButton}>
            <Icon name="log-out-outline" size={20} color="#E74C3C" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width * 0.8,
    height: '100%',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    flex: 1,
    paddingTop: 10,
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
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemText: {
    fontSize: 16,
    color: '#2C3E50',
    marginLeft: 16,
    fontWeight: '500',
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#FEF2F2',
  },
  logoutText: {
    fontSize: 16,
    color: '#E74C3C',
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default DrawerMenu; 