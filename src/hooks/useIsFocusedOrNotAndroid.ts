/**
 * Convenience hook to fix Android-specific issues: it passes through the result of the useIsFocused hook, but only for Android. Returns true for any other OS.
 */
export const useIsFocusedOrNotAndroid = () => true
