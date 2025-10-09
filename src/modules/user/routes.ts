export enum AboutRouteName {
  aboutEnglish = 'AboutEnglish',
  accessibilityStatement = 'AccessibilityStatement',
  appSummary = 'AppSummary',
  feedback = 'Feedback',
  privacyStatement = 'PrivacyStatement',
}

export enum UserRouteName {
  moduleSettings = 'ModuleSettings',
  notificationSettings = 'NotificationSettings',
  user = 'User',
  userBiometrics = 'UserBiometrics',
}

export type AboutParams = {
  [AboutRouteName.aboutEnglish]: undefined
  [AboutRouteName.accessibilityStatement]: undefined
  [AboutRouteName.appSummary]: undefined
  [AboutRouteName.feedback]: undefined
  [AboutRouteName.privacyStatement]: undefined
}

export type UserStackParams = AboutParams & {
  [UserRouteName.moduleSettings]: undefined
  [UserRouteName.notificationSettings]: undefined
  [UserRouteName.user]: undefined
  [UserRouteName.userBiometrics]: undefined
}

export enum UserModalName {}

export type UserModalParams = Record<string, never>
