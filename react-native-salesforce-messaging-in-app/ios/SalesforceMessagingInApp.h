
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNSalesforceMessagingInAppSpec.h"

@interface SalesforceMessagingInApp : NSObject <NativeSalesforceMessagingInAppSpec>
#else
#import <React/RCTBridgeModule.h>

@interface SalesforceMessagingInApp : NSObject <RCTBridgeModule>
#endif

@end
