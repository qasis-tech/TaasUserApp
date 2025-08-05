import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { Ionicons } from '@react-native-vector-icons/ionicons';

interface CommonHeaderProps {
  title: string;
  onBackPress?: () => void;
  rightAction?: {
    icon?: string;
    onPress: () => void;
    text?: string;
  };
  showBackButton?: boolean;
}

const CommonHeader: React.FC<CommonHeaderProps> = ({
  title,
  onBackPress,
  rightAction,
  showBackButton = true,
}) => {
  return (
    <LinearGradient
      colors={['#667eea', '#764ba2']}
      style={styles.header}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 0 }}
    >
      {showBackButton ? (
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBackPress}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}
      
      <Text style={styles.headerTitle}>{title}</Text>
      
      {rightAction ? (
        <TouchableOpacity
          style={styles.rightButton}
          onPress={rightAction.onPress}>
          {rightAction.text ? (
            <Text style={styles.rightButtonText}>{rightAction.text}</Text>
          ) : (
            rightAction.icon && <Ionicons name={rightAction.icon as any} size={24} color="white" />
          )}
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
    textAlign: 'center',
  },
  rightButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
  placeholder: {
    width: 40,
    height: 40,
  },
});

export default CommonHeader; 