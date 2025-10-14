export enum UserRouteName {
  aboutEnglish = 'AboutEnglish',
  accessibilityStatement = 'AccessibilityStatement',
  appSummary = 'AppSummary',
  feedback = 'Feedback',
  moduleSettings = 'ModuleSettings',
  notificationSettings = 'NotificationSettings',
  privacyStatement = 'PrivacyStatement',
  user = 'User',
  userBiometrics = 'UserBiometrics',
}

export type UserStackParams = {
  [UserRouteName.aboutEnglish]: undefined
  [UserRouteName.accessibilityStatement]: undefined
  [UserRouteName.appSummary]: undefined
  [UserRouteName.feedback]: undefined
  [UserRouteName.privacyStatement]: undefined
  [UserRouteName.moduleSettings]: undefined
  [UserRouteName.notificationSettings]: undefined
  [UserRouteName.user]: undefined
  [UserRouteName.userBiometrics]: undefined
}

export enum UserModalName {}

export type UserModalParams = Record<string, never>
