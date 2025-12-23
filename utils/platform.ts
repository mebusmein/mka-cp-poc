import { Platform, Dimensions } from 'react-native';

const DESKTOP_MIN_WIDTH = 1024;

/**
 * Check if the app is running on web platform
 */
export const isWeb = Platform.OS === 'web';

/**
 * Check if the app is running on a desktop web browser
 * Returns true if on web AND viewport width >= 1024px
 */
export function isDesktopWeb(): boolean {
    if (!isWeb) return false;

    const { width } = Dimensions.get('window');
    return width >= DESKTOP_MIN_WIDTH;
}

/**
 * Check if the app is running on a mobile web browser
 * Returns true if on web AND viewport width < 1024px
 */
export function isMobileWeb(): boolean {
    if (!isWeb) return false;

    const { width } = Dimensions.get('window');
    return width < DESKTOP_MIN_WIDTH;
}

/**
 * Check if the app is running on a native mobile platform (iOS or Android)
 */
export const isNative = Platform.OS === 'ios' || Platform.OS === 'android';

/**
 * Check if the app is running on iOS
 */
export const isIOS = Platform.OS === 'ios';

/**
 * Check if the app is running on Android
 */
export const isAndroid = Platform.OS === 'android';

