
#import <React/RCTEventEmitter.h>

#ifdef RCT_NEW_ARCH_ENABLED
#import "RNSalesforceMessagingInAppSpec.h"

@interface SalesforceMessagingInApp : RCTEventEmitter <NativeSalesforceMessagingInAppSpec>
#else
#import <React/RCTBridgeModule.h>

@interface SalesforceMessagingInApp : RCTEventEmitter <RCTBridgeModule>
#endif

@end
