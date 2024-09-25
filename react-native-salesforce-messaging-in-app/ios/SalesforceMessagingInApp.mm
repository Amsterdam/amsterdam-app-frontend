#import "SalesforceMessagingInApp.h"
#import <SMIClientCore/SMIClientCore.h>

@implementation SalesforceMessagingInApp
{
  bool hasListeners;
}
RCT_EXPORT_MODULE()

SMICoreConfiguration *config;
id<SMICoreClient> coreClient;
id<SMIConversationClient> conversationClient;

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
        coreClient = [SMICoreFactory createWithConfig:config];

        // Assuming successful creation of the core client, resolve the promise
        if (coreClient != nil) {
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
    NSError *error = [NSError errorWithDomain:@"checkIfInBusinessHours Exception"
                                             code:500
                                            userInfo:@{NSLocalizedDescriptionKey: @"not implemented"}];
    reject(@"not_implemented_exception", @"not implemented", error);
}

RCT_EXPORT_METHOD(createConversationClient:(NSString *)conversationId
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    @try {
        NSUUID *uuid;
        
        // Check if the conversationId is nil or an empty string
        if (conversationId == nil || [conversationId isEqualToString:@""]) {
            // Generate a new UUID if conversationId is nil
            uuid = [NSUUID UUID];
        } else {
            // Convert the input string to NSUUID
            uuid = [[NSUUID alloc] initWithUUIDString:conversationId];
            
            // Check if the conversion was successful
            if (uuid == nil) {
                NSError *error = [NSError errorWithDomain:@"Invalid UUID"
                                                    code:400
                                                userInfo:@{NSLocalizedDescriptionKey: @"The provided conversation ID is not a valid UUID."}];
                reject(@"invalid_uuid", @"Invalid UUID", error);
                return;
            }
        }
        conversationClient = [coreClient conversationClientWithId:uuid];
        if (conversationClient != nil) {

            resolve(conversationClient.identifier.UUIDString);
        } else {
            NSError *error = [NSError errorWithDomain:@"ConversationClient Creation Failed"
                                                code:500
                                            userInfo:@{NSLocalizedDescriptionKey: @"Failed to create ConversationClient."}];
            reject(@"conversation_client_creation_failed", @"ConversationClient creation failed", error);
        }
    } @catch (NSException *exception) {
        // Handle exceptions by rejecting the promise
        NSError *error = [NSError errorWithDomain:@"ConversationClient Creation Exception"
                                             code:500
                                         userInfo:@{NSLocalizedDescriptionKey: [exception reason]}];
        reject(@"conversation_client_creation_exception", @"An exception occurred during ConversationClient creation", error);
    }
    /*
    NSError *error = [NSError errorWithDomain:@"checkIfInBusinessHours Exception"
                                             code:500
                                            userInfo:@{NSLocalizedDescriptionKey: @"not implemented"}];
    reject(@"not_implemented_exception", @"not implemented", error);*/
}

RCT_EXPORT_METHOD(retrieveRemoteConfiguration:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    // Ensure that the coreClient has been initialized
    if (coreClient == nil) {
        NSError *error = [NSError errorWithDomain:@"CoreClient Not Initialized"
                                             code:500
                                         userInfo:@{NSLocalizedDescriptionKey: @"CoreClient is not initialized."}];
        reject(@"core_client_not_initialized", @"CoreClient is not initialized", error);
        return;
    }
    
    // Call retrieveRemoteConfigurationWithCompletion on coreClient
    [coreClient retrieveRemoteConfigurationWithCompletion:^(id<SMIRemoteConfiguration> _Nullable remoteConfig, NSError * _Nullable error) {
        if (error != nil) {
            // Handle the error by rejecting the promise
            reject(@"retrieve_remote_config_failed", @"Failed to retrieve remote configuration", error);
        } else if (remoteConfig != nil) {
            // Manually construct a dictionary from the properties of remoteConfig
            NSMutableDictionary *configData = [NSMutableDictionary dictionary];
            
            // Add name
            [configData setObject:remoteConfig.name forKey:@"name"];
            
            // Add deploymentType
            [configData setObject:remoteConfig.deploymentType forKey:@"deploymentType"];
            
            // Add timestamp (converted to string)
            NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
            [dateFormatter setDateFormat:@"yyyy-MM-dd'T'HH:mm:ssZ"];
            NSString *timestampString = [dateFormatter stringFromDate:remoteConfig.timestamp];
            [configData setObject:timestampString forKey:@"timestamp"];
            
            // Add preChatConfiguration if available (assuming it's an array of objects you can convert)
            if (remoteConfig.preChatConfiguration != nil) {
                NSMutableArray *preChatConfigs = [NSMutableArray array];
                for (id<SMIPreChatConfiguration> preChatConfig in remoteConfig.preChatConfiguration) {
                    NSMutableDictionary *preChatConfigDict = [NSMutableDictionary dictionary];

                    // Add formType (assuming it's an enum, convert to string or number)
                    preChatConfigDict[@"formType"] = preChatConfig.formType;
                    
                    // Handle preChatFields
                    NSMutableArray *preChatFieldsArray = [NSMutableArray array];
                    for (id<SMIPreChatField> preChatField in preChatConfig.preChatFields) {
                        // Construct dictionary for each preChatField
                        NSMutableDictionary *preChatFieldDict = [NSMutableDictionary dictionary];
                        preChatFieldDict[@"identifier"] = preChatField.identifier;
                        preChatFieldDict[@"type"] = preChatField.type;
                        preChatFieldDict[@"label"] = preChatField.label;
                        preChatFieldDict[@"name"] = preChatField.name;
                        preChatFieldDict[@"required"] = @(preChatField.required);
                        preChatFieldDict[@"maxLength"] = @(preChatField.maxLength);
                        preChatFieldDict[@"order"] = @(preChatField.order);
                        preChatFieldDict[@"value"] = preChatField.value ?: [NSNull null]; // Use NSNull for nullable value
                        preChatFieldDict[@"isHidden"] = @(preChatField.isHidden);
                        preChatFieldDict[@"editable"] = @(preChatField.isEditable);
                        
                        [preChatFieldsArray addObject:preChatFieldDict];
                    }
                    preChatConfigDict[@"preChatFields"] = preChatFieldsArray;
                    
                    // Handle hiddenPreChatFields
                    NSMutableArray *hiddenPreChatFieldsArray = [NSMutableArray array];
                    for (id<SMIHiddenPreChatField> hiddenField in preChatConfig.hiddenPreChatFields) {
                        // Construct dictionary for each hiddenPreChatField
                        NSMutableDictionary *hiddenFieldDict = [NSMutableDictionary dictionary];
                        hiddenFieldDict[@"identifier"] = hiddenField.identifier;
                        hiddenFieldDict[@"type"] = hiddenField.type;
                        hiddenFieldDict[@"label"] = hiddenField.label;
                        hiddenFieldDict[@"name"] = hiddenField.name;
                        hiddenFieldDict[@"required"] = @(hiddenField.required);
                        hiddenFieldDict[@"maxLength"] = @(hiddenField.maxLength);
                        hiddenFieldDict[@"order"] = @(hiddenField.order);
                        hiddenFieldDict[@"value"] = hiddenField.value ?: [NSNull null];
                        hiddenFieldDict[@"isHidden"] = @(hiddenField.isHidden);
                        hiddenFieldDict[@"editable"] = @(hiddenField.isEditable);
                        
                        [hiddenPreChatFieldsArray addObject:hiddenFieldDict];
                    }
                    preChatConfigDict[@"hiddenPreChatFields"] = hiddenPreChatFieldsArray;
                    
                    [preChatConfigs addObject:preChatConfigDict];
                }
                [configData setObject:preChatConfigs forKey:@"preChatConfiguration"];
            }
            
            // Add choiceListConfiguration if available
            if (remoteConfig.choiceListConfiguration != nil) {
                NSMutableDictionary *choiceListConfigDict = [NSMutableDictionary dictionary];
                
                // Handle choiceLists
                if (remoteConfig.choiceListConfiguration.choiceLists != nil) {
                    NSMutableArray *choiceListsArray = [NSMutableArray array];
                    for (id<SMIChoiceList> choiceList in remoteConfig.choiceListConfiguration.choiceLists) {
                        NSMutableDictionary *choiceListDict = [NSMutableDictionary dictionary];
                        choiceListDict[@"identifier"] = choiceList.identifier;
                        
                        // Handle choiceList values
                        NSMutableArray *choiceListValuesArray = [NSMutableArray array];
                        for (id<SMIChoiceListValue> choiceListValue in choiceList.values) {
                            NSMutableDictionary *choiceListValueDict = [NSMutableDictionary dictionary];
                            choiceListValueDict[@"valueId"] = choiceListValue.valueId;
                            choiceListValueDict[@"order"] = @(choiceListValue.order);
                            choiceListValueDict[@"label"] = choiceListValue.label ?: [NSNull null];
                            choiceListValueDict[@"isDefaultValue"] = @(choiceListValue.isDefaultValue);
                            choiceListValueDict[@"valueName"] = choiceListValue.valueName;
                            
                            [choiceListValuesArray addObject:choiceListValueDict];
                        }
                        choiceListDict[@"values"] = choiceListValuesArray;
                        
                        [choiceListsArray addObject:choiceListDict];
                    }
                    choiceListConfigDict[@"choiceLists"] = choiceListsArray;
                }
                
                // Handle valueDependencies
                NSMutableArray *valueDependenciesArray = [NSMutableArray array];
                for (id<SMIChoiceListDependency> dependency in remoteConfig.choiceListConfiguration.valueDependencies) {
                    NSMutableDictionary *dependencyDict = [NSMutableDictionary dictionary];
                    dependencyDict[@"parentId"] = dependency.parentId;
                    dependencyDict[@"childId"] = dependency.childId;
                    
                    [valueDependenciesArray addObject:dependencyDict];
                }
                choiceListConfigDict[@"valueDependencies"] = valueDependenciesArray;
                
                [configData setObject:choiceListConfigDict forKey:@"choiceListConfiguration"];
            }
            
            // Add termsAndConditions if available
            if (remoteConfig.termsAndConditions != nil) {
                NSMutableDictionary *termsAndConditionsDict = [NSMutableDictionary dictionary];
                
                // Convert NSAttributedString to NSString for the label
                NSString *termsLabelString = [remoteConfig.termsAndConditions.label string];
                termsAndConditionsDict[@"label"] = termsLabelString ?: [NSNull null];
                
                // Add isRequired and isEnabled
                termsAndConditionsDict[@"isRequired"] = @(remoteConfig.termsAndConditions.isRequired);
                termsAndConditionsDict[@"isEnabled"] = @(remoteConfig.termsAndConditions.isEnabled);
                
                [configData setObject:termsAndConditionsDict forKey:@"termsAndConditions"];
            }

            // Resolve the promise with the constructed dictionary
            resolve(configData);
        } else {
            NSError *unexpectedError = [NSError errorWithDomain:@"UnexpectedError"
                                                           code:500
                                                       userInfo:@{NSLocalizedDescriptionKey: @"Unknown error retrieving remote configuration."}];
            reject(@"unexpected_error", @"Unknown error", unexpectedError);
        }
    }];
}
RCT_EXPORT_METHOD(sendMessage:(NSString *)message
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{

    @try {
        // Ensure that the coreClient has been initialized
        if (conversationClient == nil) {
            NSError *error = [NSError errorWithDomain:@"ConversationClient Not Initialized"
                                                code:500
                                            userInfo:@{NSLocalizedDescriptionKey: @"ConversationClient is not initialized."}];
            reject(@"send_message_exception", @"ConversationClient is not initialized", error);
            return;
        }

        [conversationClient sendMessage:message];
        resolve(@(YES));

    } @catch (NSException *exception) {
        // Handle exceptions by rejecting the promise
        NSError *error = [NSError errorWithDomain:@"sendMessage Exception"
                                             code:500
                                         userInfo:@{NSLocalizedDescriptionKey: [exception reason]}];
        reject(@"send_message_exception", @"An exception occurred during sendMessage", error);
    }
}

// Will be called when this module's first listener is added.
-(void)startObserving {
    hasListeners = YES;
    // Set up any upstream listeners or background tasks as necessary
}

// Will be called when this module's last listener is removed, or on dealloc.
-(void)stopObserving {
    hasListeners = NO;
    // Remove upstream listeners, stop unnecessary background tasks
}

// Override method to specify which events to support
- (NSArray<NSString *> *)supportedEvents {
    return @[@"onNewMessage"]; // List all events your module will emit
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
