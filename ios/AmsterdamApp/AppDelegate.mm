#import "AppDelegate.h"

// required for react-native-orientation-locker
#import "Orientation.h"

// required for splashscreen
#import "RNBootSplash.h"

// required for firebase
#import <Firebase.h>

// required for deeplinks
#import <React/RCTLinkingManager.h>

#import <React/RCTBundleURLProvider.h>

// For certificate pinning
#import <TrustKit/TrustKit.h>

@implementation AppDelegate

// required for react-native-orientation-locker
- (UIInterfaceOrientationMask)application:(UIApplication *)application supportedInterfaceOrientationsForWindow:(UIWindow *)window {
  return [Orientation getOrientation];
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  // required for certificate pinning
  NSDictionary *trustKitConfig =
    @{
    kTSKSwizzleNetworkDelegates: @YES,
    kTSKPinnedDomains: @{
      @"ontw.app.amsterdam.nl" : @{
        kTSKPublicKeyHashes: @[
          @"Gy75+d3BkwDslWfDE8gxDA71rPZ/ooQNdy9cJxuELhM=", // ontw.app.amsterdam.nl
          @"lXt3ip5lkns+fBxV/S9MSfUx0UUdhBEmhXz5PkrAWGg=", // DigiCert G2 TLS EU RSA4096 SHA384 2022 CA1
          @"i7WTqTvh0OioIruIfFR4kMPnBqrS2rdiVPl/s2uC/CY=", // DigiCert Global Root G2
        ],
        kTSKEnforcePinning: @YES,
        kTSKIncludeSubdomains: @NO,
        kTSKDisableDefaultReportUri: @YES,
      },
      @"test.app.amsterdam.nl" : @{
        kTSKPublicKeyHashes: @[
          @"phZEpdzfo4JocyH23+aQrL0QBSuoWBeJ/PfR5c5n2kE=", // test.app.amsterdam.nl
          @"lXt3ip5lkns+fBxV/S9MSfUx0UUdhBEmhXz5PkrAWGg=", // DigiCert G2 TLS EU RSA4096 SHA384 2022 CA1 
          @"tYkfFN27P1GUjH5ME128BCg302dL2iwOYhz5wwFJb50=", // QuoVadis Global SSL ICA G2
          @"i7WTqTvh0OioIruIfFR4kMPnBqrS2rdiVPl/s2uC/CY=", // DigiCert Global Root G2
        ],
        kTSKEnforcePinning: @YES,
        kTSKIncludeSubdomains: @NO,
        kTSKDisableDefaultReportUri: @YES,
      },
      @"acc.app.amsterdam.nl" : @{
        kTSKPublicKeyHashes: @[
          @"6fXqTLHGGwijHIfl1WGZUElGgmdQ4dZqVug9l6caJm4=", // acc.app.amsterdam.nl
          @"lXt3ip5lkns+fBxV/S9MSfUx0UUdhBEmhXz5PkrAWGg=", // DigiCert G2 TLS EU RSA4096 SHA384 2022 CA1 
          @"tYkfFN27P1GUjH5ME128BCg302dL2iwOYhz5wwFJb50=", // QuoVadis Global SSL ICA G2
          @"i7WTqTvh0OioIruIfFR4kMPnBqrS2rdiVPl/s2uC/CY=", // DigiCert Global Root G2
        ],
        kTSKEnforcePinning: @YES,
        kTSKIncludeSubdomains: @NO,
        kTSKDisableDefaultReportUri: @YES,
      },
      @"app.amsterdam.nl" : @{
        kTSKPublicKeyHashes: @[
          @"aWo/H7b6jYpKas1mQinYbeyZptbXpKOKROf2FOQEV3s=", // app.amsterdam.nl
          @"lXt3ip5lkns+fBxV/S9MSfUx0UUdhBEmhXz5PkrAWGg=", // DigiCert G2 TLS EU RSA4096 SHA384 2022 CA1 
          @"tYkfFN27P1GUjH5ME128BCg302dL2iwOYhz5wwFJb50=", // QuoVadis Global SSL ICA G2
          @"i7WTqTvh0OioIruIfFR4kMPnBqrS2rdiVPl/s2uC/CY=", // DigiCert Global Root G2
        ],
        kTSKEnforcePinning: @YES,
        kTSKIncludeSubdomains: @NO,
        kTSKDisableDefaultReportUri: @YES,
      }
    }
  };
  [TrustKit initSharedInstanceWithConfiguration:trustKitConfig];
  
  self.moduleName = @"AmsterdamApp";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  [super application:application didFinishLaunchingWithOptions:launchOptions];

  // show splashscreen
  [RNBootSplash initWithStoryboard:@"BootSplash" rootView:self.window.rootViewController.view];

  // initialize firebase
  [FIRApp configure];
  
  // set default accessibilityLanguage
  application.accessibilityLanguage = @"nl-NL";

  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}
- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

// required for deeplinks
- (BOOL)application:(UIApplication *)application
   openURL:(NSURL *)url
   options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  return [RCTLinkingManager application:application openURL:url options:options];
}

@end
