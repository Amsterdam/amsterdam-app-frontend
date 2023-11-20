/* eslint-disable @typescript-eslint/no-empty-function */

/**
 * We reset the property `locationPermissionBlockedForAndroid` in the Address Redux state when the app comes to foreground. Note that the onForground callback is also triggered after the permissions dialog disappears, so the check is also done in that case.
 * This hook only has effect on Android.
 */
export const useResetLocationPermission = () => {}
