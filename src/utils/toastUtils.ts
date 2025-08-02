import Toast from 'react-native-toast-message';

export interface ToastConfig {
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
  duration?: number;
}

/**
 * Show a success toast notification
 */
export const showSuccessToast = (title: string, message?: string, duration: number = 3000) => {
  Toast.show({
    type: 'success',
    text1: title,
    text2: message,
    visibilityTime: duration,
    autoHide: true,
    topOffset: 60,
  });
};

/**
 * Show an error toast notification
 */
export const showErrorToast = (title: string, message?: string, duration: number = 4000) => {
  Toast.show({
    type: 'error',
    text1: title,
    text2: message,
    visibilityTime: duration,
    autoHide: true,
    topOffset: 60,
  });
};

/**
 * Show an info toast notification
 */
export const showInfoToast = (title: string, message?: string, duration: number = 3000) => {
  Toast.show({
    type: 'info',
    text1: title,
    text2: message,
    visibilityTime: duration,
    autoHide: true,
    topOffset: 60,
  });
};

/**
 * Show a warning toast notification
 */
export const showWarningToast = (title: string, message?: string, duration: number = 3500) => {
  Toast.show({
    type: 'warning',
    text1: title,
    text2: message,
    visibilityTime: duration,
    autoHide: true,
    topOffset: 60,
  });
};

/**
 * Show a custom toast with configuration
 */
export const showToast = (config: ToastConfig) => {
  Toast.show({
    type: config.type,
    text1: config.title,
    text2: config.message,
    visibilityTime: config.duration || 3000,
    autoHide: true,
    topOffset: 60,
  });
};

/**
 * Hide all toasts
 */
export const hideToast = () => {
  Toast.hide();
}; 