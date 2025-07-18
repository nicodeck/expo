import { requireOptionalNativeModule } from 'expo';

const SplashModule = requireOptionalNativeModule('ExpoSplashScreen');

let _initializedErrorHandler = false;

export function hide() {
  if (!SplashModule) {
    return;
  }

  SplashModule.hide();
}

export async function hideAsync(): Promise<void> {
  hide();
}

export async function preventAutoHideAsync() {
  if (!SplashModule) {
    return;
  }

  return SplashModule.preventAutoHideAsync();
}

export async function _internal_preventAutoHideAsync(): Promise<boolean> {
  // The internal function might be missing if an app is using an older version of the SplashModule
  if (!SplashModule || !SplashModule.internalPreventAutoHideAsync) {
    return false;
  }

  if (!_initializedErrorHandler) {
    // Append error handling to ensure any uncaught exceptions result in the splash screen being hidden.
    // This prevents the splash screen from floating over error screens.
    if (ErrorUtils?.getGlobalHandler) {
      const originalHandler = ErrorUtils.getGlobalHandler();
      ErrorUtils.setGlobalHandler((error, isFatal) => {
        hide();
        originalHandler(error, isFatal);
      });
    }

    _initializedErrorHandler = true;
  }

  return SplashModule.internalPreventAutoHideAsync();
}

export async function _internal_maybeHideAsync() {
  // The internal function might be missing if an app is using an older version of the SplashModule
  if (!SplashModule || !SplashModule.internalMaybeHideAsync) {
    return false;
  }

  return SplashModule.internalMaybeHideAsync();
}
