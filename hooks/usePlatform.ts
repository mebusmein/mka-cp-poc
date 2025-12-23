import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

import { isWeb, isNative, isIOS, isAndroid } from '@/utils/platform';

const DESKTOP_MIN_WIDTH = 1024;

/**
 * Hook that returns platform information and responds to window size changes
 */
export function usePlatform() {
  const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setWindowWidth(window.width);
    });

    return () => subscription.remove();
  }, []);

  const isDesktopWeb = isWeb && windowWidth >= DESKTOP_MIN_WIDTH;
  const isMobileWeb = isWeb && windowWidth < DESKTOP_MIN_WIDTH;

  return {
    isWeb,
    isNative,
    isIOS,
    isAndroid,
    isDesktopWeb,
    isMobileWeb,
    windowWidth,
  };
}

