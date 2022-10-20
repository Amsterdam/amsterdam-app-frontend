export enum AboutRouteName {
  about = 'About',
  aboutEnglish = 'AboutEnglish',
  accessibilityStatement = 'AccessibilityStatement',
  appSummary = 'AppSummary',
  privacyStatement = 'PrivacyStatement',
}

export type AboutStackParams = {
  [AboutRouteName.about]: undefined
  [AboutRouteName.aboutEnglish]: undefined
  [AboutRouteName.accessibilityStatement]: undefined
  [AboutRouteName.appSummary]: undefined
  [AboutRouteName.privacyStatement]: undefined
}
