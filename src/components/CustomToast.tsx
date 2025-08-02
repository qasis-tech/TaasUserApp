import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Toast, { BaseToast, ErrorToast, InfoToast } from 'react-native-toast-message';

const { width } = Dimensions.get('window');

const CustomToast = () => {
  const toastConfig = {
    success: (props: any) => (
      <BaseToast
        {...props}
        style={[styles.successToast, styles.baseToast]}
        contentContainerStyle={styles.contentContainer}
        text1Style={styles.titleText}
        text2Style={styles.messageText}
        renderLeadingIcon={() => (
          <View style={[styles.iconContainer, styles.successIcon]}>
            <Text style={styles.iconText}>✓</Text>
          </View>
        )}
      />
    ),
    error: (props: any) => (
      <ErrorToast
        {...props}
        style={[styles.errorToast, styles.baseToast]}
        contentContainerStyle={styles.contentContainer}
        text1Style={styles.titleText}
        text2Style={styles.messageText}
        renderLeadingIcon={() => (
          <View style={[styles.iconContainer, styles.errorIcon]}>
            <Text style={styles.iconText}>✕</Text>
          </View>
        )}
      />
    ),
    info: (props: any) => (
      <InfoToast
        {...props}
        style={[styles.infoToast, styles.baseToast]}
        contentContainerStyle={styles.contentContainer}
        text1Style={styles.titleText}
        text2Style={styles.messageText}
        renderLeadingIcon={() => (
          <View style={[styles.iconContainer, styles.infoIcon]}>
            <Text style={styles.iconText}>ℹ</Text>
          </View>
        )}
      />
    ),
    warning: (props: any) => (
      <BaseToast
        {...props}
        style={[styles.warningToast, styles.baseToast]}
        contentContainerStyle={styles.contentContainer}
        text1Style={styles.titleText}
        text2Style={styles.messageText}
        renderLeadingIcon={() => (
          <View style={[styles.iconContainer, styles.warningIcon]}>
            <Text style={styles.iconText}>⚠</Text>
          </View>
        )}
      />
    ),
  };

  return <Toast config={toastConfig} />;
};

const styles = StyleSheet.create({
  baseToast: {
    width: width - 32,
    marginHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
    borderLeftWidth: 0,
    minHeight: 60,
  },
  successToast: {
    backgroundColor: '#FFFFFF',
    borderLeftColor: '#27AE60',
    borderLeftWidth: 4,
  },
  errorToast: {
    backgroundColor: '#FFFFFF',
    borderLeftColor: '#E74C3C',
    borderLeftWidth: 4,
  },
  infoToast: {
    backgroundColor: '#FFFFFF',
    borderLeftColor: '#3498DB',
    borderLeftWidth: 4,
  },
  warningToast: {
    backgroundColor: '#FFFFFF',
    borderLeftColor: '#F39C12',
    borderLeftWidth: 4,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  messageText: {
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 20,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  successIcon: {
    backgroundColor: '#27AE60',
  },
  errorIcon: {
    backgroundColor: '#E74C3C',
  },
  infoIcon: {
    backgroundColor: '#3498DB',
  },
  warningIcon: {
    backgroundColor: '#F39C12',
  },
  iconText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default CustomToast; 