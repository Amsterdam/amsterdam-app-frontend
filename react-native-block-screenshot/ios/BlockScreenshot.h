
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNBlockScreenshotSpec.h"
#import <React/RCTEventEmitter.h>

@interface BlockScreenshot : RCTEventEmitter <NativeBlockScreenshotSpec>
#else
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface BlockScreenshot : RCTEventEmitter <RCTBridgeModule>
#endif

@end
