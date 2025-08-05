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
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    borderLeftWidth: 0,
    minHeight: 70,
    flexDirection: 'row',
    alignItems: 'center',
  },
  successToast: {
    backgroundColor: '#FFFFFF',
    borderLeftColor: '#10b981',
    borderLeftWidth: 4,
  },
  errorToast: {
    backgroundColor: '#FFFFFF',
    borderLeftColor: '#ef4444',
    borderLeftWidth: 4,
  },
  infoToast: {
    backgroundColor: '#FFFFFF',
    borderLeftColor: '#6366f1',
    borderLeftWidth: 4,
  },
  warningToast: {
    backgroundColor: '#FFFFFF',
    borderLeftColor: '#f59e0b',
    borderLeftWidth: 4,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingLeft: 0, // Remove left padding since icon is outside
  },
  titleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
    lineHeight: 20,
  },
  messageText: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 18,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  successIcon: {
    backgroundColor: '#10b981',
  },
  errorIcon: {
    backgroundColor: '#ef4444',
  },
  infoIcon: {
    backgroundColor: '#6366f1',
  },
  warningIcon: {
    backgroundColor: '#f59e0b',
  },
  iconText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default CustomToast; 