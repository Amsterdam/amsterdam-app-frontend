#import "SalesforceMessagingInApp.h"
#import <SMIClientCore/SMIClientCore.h>

@implementation SalesforceMessagingInApp
RCT_EXPORT_MODULE()

SMICoreConfiguration *config;
id<SMICoreClient> coreClientId;

RCT_EXPORT_METHOD(createCoreClient:(NSString *)url
                  organizationId:(NSString *)organizationId
                  developerName:(NSString *)developerName
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    @try {
        // Convert the string URL to an NSURL
        NSURL *serviceAPIURL = [NSURL URLWithString:url];

        // Check if the URL is valid
        if (serviceAPIURL == nil) {
            // Handle the error, perhaps by rejecting the promise
            NSError *error = [NSError errorWithDomain:@"Invalid URL"
                                                code:400
                                            userInfo:@{NSLocalizedDescriptionKey: @"The provided URL is invalid."}];
            reject(@"invalid_url", @"Invalid URL", error);
            return;
        }

        // Create the Configuration object (Assuming the Configuration class is from SMIClientCore)
        config = [[SMICoreConfiguration alloc] initWithServiceAPI:serviceAPIURL
                                                        organizationId:organizationId
                                                        developerName:developerName];

        // Now create the core client using the CoreFactory's create method
        coreClientId = [SMICoreFactory createWithConfig:config];

        // Assuming successful creation of the core client, resolve the promise
        if (coreClientId != nil) {
            NSLog(@"coreClientId: %@", coreClientId);
            resolve(@(YES));
        } else {
            NSError *error = [NSError errorWithDomain:@"CoreClient Creation Failed"
                                                code:500
                                            userInfo:@{NSLocalizedDescriptionKey: @"Failed to create CoreClient."}];
            reject(@"core_client_creation_failed", @"CoreClient creation failed", error);
        }
    } @catch (NSException *exception) {
        // Handle exceptions by rejecting the promise
        NSError *error = [NSError errorWithDomain:@"CoreClient Creation Exception"
                                             code:500
                                         userInfo:@{NSLocalizedDescriptionKey: [exception reason]}];
        reject(@"core_client_creation_exception", @"An exception occurred during CoreClient creation", error);
    }
}


RCT_EXPORT_METHOD(checkIfInBusinessHours:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    reject(@"not implemented");
}

RCT_EXPORT_METHOD(createConversationClient:(NSString *)sessionID
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    reject(@"not implemented");
}

RCT_EXPORT_METHOD(retrieveRemoteConfiguration:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    reject(@"not implemented");
}
RCT_EXPORT_METHOD(sendMessage:(NSString *)message
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    reject(@"not implemented");
}

// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeSalesforceMessagingInAppSpecJSI>(params);
}
#endif

@end
