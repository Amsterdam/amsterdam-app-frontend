#import "SalesforceMessagingInApp.h"
#import <SMIClientCore/SMIClientCore.h>

@interface SalesforceMessagingInApp () <SMICoreDelegate> {
  bool hasListeners;
}

@end

@implementation SalesforceMessagingInApp
RCT_EXPORT_MODULE()

SMICoreConfiguration *config;
id<SMICoreClient> coreClient;
id<SMIConversationClient> conversationClient;
NSMutableArray<id<SMIChoice>> *receivedChoices;

RCT_EXPORT_METHOD(createCoreClient:(NSString *)url
                  organizationId:(NSString *)organizationId
                  developerName:(NSString *)developerName
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    @try {
        if (coreClient != nil) {
            [coreClient stop];
        }
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
            [coreClient start];
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
        if (conversationClient != nil) {
            [coreClient removeDelegate:self]; 
        }
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
        receivedChoices = [NSMutableArray array];
        if (conversationClient != nil) {
            [coreClient addDelegate:self];  // Set the delegate to self after creating the conversation client to receive events for the conversation client.
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
RCT_EXPORT_METHOD(sendReply:(NSDictionary *)replyDict
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    @try {
        // Ensure that the conversation client has been initialized
        if (conversationClient == nil) {
            NSError *error = [NSError errorWithDomain:@"ConversationClient Not Initialized"
                                                code:500
                                            userInfo:@{NSLocalizedDescriptionKey: @"ConversationClient is not initialized."}];
            reject(@"send_reply_exception", @"ConversationClient is not initialized", error);
            return;
        }

        // Create a SMIChoice object from the provided reply dictionary
        NSString *optionId = replyDict[@"optionId"];
        id<SMIChoice> reply = nil;
        for (id<SMIChoice> choice in receivedChoices) {
            if ([choice.optionId isEqualToString:optionId]) { // Match by optionId
                reply = choice;
                break; // Exit loop once the correct choice is found
            }
        }

        // If the choice was found, send the reply
        if (reply) {
            [conversationClient sendReply:reply];
            resolve(@(YES));
        } else {
            NSError *error = [NSError errorWithDomain:@"send_reply_exception"
                                                code:404
                                            userInfo:@{NSLocalizedDescriptionKey: @"SMIChoice not found for the provided optionId."}];
            reject(@"send_reply_not_found", @"SMIChoice not found", error);
        }

    } @catch (NSException *exception) {
        // Handle exceptions by rejecting the promise
        NSError *error = [NSError errorWithDomain:@"sendReply Exception"
                                             code:500
                                         userInfo:@{NSLocalizedDescriptionKey: [exception reason]}];
        reject(@"send_reply_exception", @"An exception occurred during sendReply", error);
    }
}

RCT_EXPORT_METHOD(sendTypingEvent:(RCTPromiseResolveBlock)resolve
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

        [conversationClient sendTypingEvent];
        resolve(@(YES));

    } @catch (NSException *exception) {
        // Handle exceptions by rejecting the promise
        NSError *error = [NSError errorWithDomain:@"sendMessage Exception"
                                             code:500
                                         userInfo:@{NSLocalizedDescriptionKey: [exception reason]}];
        reject(@"send_message_exception", @"An exception occurred during sendMessage", error);
    }
}

- (NSDictionary *)parseChoiceToDictionary:(id<SMIChoice>)choice
{
    [receivedChoices addObject:choice];
    NSMutableDictionary *choiceDict = [NSMutableDictionary dictionary];
    choiceDict[@"optionId"] = choice.optionId;
    choiceDict[@"title"] = choice.title;
    choiceDict[@"optionValue"] = choice.optionValue;
    choiceDict[@"parentEntryId"] = choice.parentEntryId;
    return [choiceDict copy];
}

- (NSMutableArray *)parseChoiceArrayToDictionaryArray:(NSArray<id<SMIChoice>> *)choices
{
    NSMutableArray *choiceArray = [NSMutableArray array];
    for (id<SMIChoice> choice in choices) {
        [choiceArray addObject:[self parseChoiceToDictionary:choice]];
    }
    return choiceArray;
}

- (NSDictionary *)parseParticipantToDictionary:(id<SMIParticipant>)participant
{
    NSMutableDictionary *participantDict = [NSMutableDictionary dictionary];
    participantDict[@"subject"] = participant.subject;
    participantDict[@"role"] = participant.role;
    participantDict[@"local"] = @(participant.local);
    participantDict[@"displayName"] = participant.displayName ?: [NSNull null];
    participantDict[@"options"] = [self parseChoiceArrayToDictionaryArray:participant.clientMenu.options];
    return [participantDict copy];
}

// Helper function to parse entry into a dictionary
- (NSDictionary *)parseEntryToDictionary:(id<SMIConversationEntry>)entry
{
    // You can add other fields from the `entry` or `payload` if needed
    // Example: NSString *format = entry.format;
    // messageDict[@"format"] = format;
    NSString *format = entry.format;

    // Extract fields from payload, assuming `entry.payload` conforms to `SMIEntryPayload`
    id<SMIEntryPayload> payload = entry.payload;

    // NSString *replyToEntryId = payload.replyTo ? payload.replyTo.identifier : @"";  // Handle replyTo entry
    // Convert the extracted properties into a dictionary
    NSMutableDictionary *messageDict = [NSMutableDictionary dictionary];
    messageDict[@"entryId"] = entry.identifier;
    messageDict[@"payloadDescription"] = entry.payload ? [entry.payload description] : @"";
    // messageDict[@"senderDisplayName"] = senderDisplayName ?: [NSNull null];
    messageDict[@"sender"] = [self parseParticipantToDictionary:entry.sender];
    messageDict[@"senderDisplayName"] = entry.senderDisplayName ?: [NSNull null];
    messageDict[@"messageType"] = entry.messageType ?: [NSNull null];
    messageDict[@"timestamp"] = @([entry.timestamp timeIntervalSince1970]);
    messageDict[@"conversationId"] = entry.conversationId.UUIDString;
    messageDict[@"status"] = entry.status;
    messageDict[@"format"] = format;
    messageDict[@"payloadId"] = payload.identifier ?: @"";
    messageDict[@"inReplyToEntryId"] = payload.inReplyToEntryId ?: @"";
    NSString * type = entry.type;
    messageDict[@"type"] = type;
    if (format == SMIConversationFormatTypesAttachments) {
        id<SMIAttachments> attachmentsPayload = (id<SMIAttachments>)payload;
        //https://salesforce-async-messaging.github.io/messaging-in-app-ios/Protocols/SMIAttachments.html#/c:objc(pl)SMIAttachments(py)attachments

        NSMutableArray *attachmentsArray = [NSMutableArray array];
        for (id<SMIFileAsset> attachment in attachmentsPayload.attachments) {
            NSMutableDictionary *attachmentDict = [NSMutableDictionary dictionary];
            attachmentDict[@"name"] = attachment.name;
            attachmentDict[@"identifier"] = attachment.identifier;
            attachmentDict[@"mimeType"] = attachment.mimeType;
            attachmentDict[@"url"] = attachment.url ? [attachment.url absoluteString] : nil;
            NSString *stringFromData = [[NSString alloc] initWithData:attachment.file encoding:NSUTF8StringEncoding];
            if (stringFromData) {
                attachmentDict[@"file"] = stringFromData;
            }
            
            [attachmentsArray addObject:attachmentDict];
        }
        messageDict[@"attachments"] = attachmentsArray;
    }
    if (format == SMIConversationFormatTypesCarousel) {
        id<SMICarousel> carouselPayload = (id<SMICarousel>)payload;
        //https://salesforce-async-messaging.github.io/messaging-in-app-ios/Protocols/SMICarousel.html#/c:objc(pl)SMICarousel(py)items
        NSMutableArray *itemArray = [NSMutableArray array];
        for (id<SMITitleLinkItem> item in carouselPayload.items) {
            NSMutableDictionary *itemDict = [NSMutableDictionary dictionary];
            itemDict[@"interactionItems"] = [self parseChoiceArrayToDictionaryArray:item.interactionItems];
            itemDict[@"itemType"] = item.titleItem.itemType;
            itemDict[@"title"] = item.titleItem.title;
            itemDict[@"subTitle"] = item.titleItem.subTitle;
            itemDict[@"secondarySubTitle"] = item.titleItem.secondarySubTitle;
            itemDict[@"tertiarySubTitle"] = item.titleItem.tertiarySubTitle;
            itemDict[@"referenceId"] = item.titleItem.referenceId;
            
            [itemArray addObject:itemDict];
        }
        messageDict[@"items"] = itemArray;
    }
    if (format == SMIConversationFormatTypesImageMessage) {
        // id<SMIAttachments> textPayload = (id<SMIAttachments>)payload;
        // text = textPayload.text ?: @"";
    }
    if (format == SMIConversationFormatTypesInputs) {
        // id<SMIFormInputs> textPayload = (id<SMIFormInputs>)payload;
        //https://salesforce-async-messaging.github.io/messaging-in-app-ios/Protocols/SMIFormInputs.html
        //https://salesforce-async-messaging.github.io/messaging-in-app-ios/Protocols/SMIChoicesResponse.html
        // text = textPayload.text ?: @"";
    }
    if (format == SMIConversationFormatTypesRichLink) {
        id<SMIRichLinkMessage> textPayload = (id<SMIRichLinkMessage>)payload;
        //https://salesforce-async-messaging.github.io/messaging-in-app-ios/Protocols/SMIRichLinkMessage.html
        // text = textPayload.text ?: @"";
        messageDict[@"title"] = textPayload.title;
        messageDict[@"url"] = [textPayload.url absoluteString];

        NSMutableDictionary *assetDict = [NSMutableDictionary dictionary];
        assetDict[@"width"] = @(textPayload.asset.width);
        assetDict[@"height"] = @(textPayload.asset.height);
        // messageDict[@"asset"] = assetDict;
        // Fetch the image asset (assuming fetchContentWithCompletion just returns an error if there's a problem)
        [textPayload.asset fetchContentWithCompletion:^(NSError * _Nullable error) {
            if (error) {
                NSLog(@"Error fetching image: %@", error.localizedDescription);
            } else {
                // Access the image after fetching completes
                UIImage *image = textPayload.asset.image;
                if (image) {
                    // You can either add the UIImage directly or convert it to base64 string representation
                    NSData *imageData = UIImagePNGRepresentation(image);
                    if (imageData) {
                        NSString *base64String = [imageData base64EncodedStringWithOptions:NSDataBase64Encoding64CharacterLineLength];
                        assetDict[@"imageBase64"] = base64String;
                    }
                }
            }
            
            // Add the asset dictionary to messageDict
            messageDict[@"asset"] = assetDict;

        }];

    }
    if (format == SMIConversationFormatTypesListPicker) {
        id<SMIListPicker> textPayload = (id<SMIListPicker>)payload;
        //https://salesforce-async-messaging.github.io/messaging-in-app-ios/Protocols/SMIListPicker.html
        messageDict[@"text"] = textPayload.text ?: @"";
        // choices toevoegen
    }
    if (format == SMIConversationFormatTypesSelections) {
        id<SMIChoicesResponse> selectionsPayload = (id<SMIChoicesResponse>)payload;
        messageDict[@"selections"] = [self parseChoiceArrayToDictionaryArray:selectionsPayload.selections];
    }
    if (format == SMIConversationFormatTypesWebView) {
        // id<SMIAttachments> textPayload = (id<SMIAttachments>)payload;
        //https://salesforce-async-messaging.github.io/messaging-in-app-ios/Protocols/SMITemplatedURL.html
        // text = textPayload.text ?: @"";
    }
    if (format == SMIConversationFormatTypesResult) {
        // id<SMIRoutingWorkResult> textPayload = (id<SMIRoutingWorkResult>)payload;
        // text = textPayload.text ?: @"";
    }
    if (format == SMIConversationFormatTypesUnspecified) {
        // id<SMIUnknownEntry> textPayload = (id<SMIUnknownEntry>)payload;
        //https://salesforce-async-messaging.github.io/messaging-in-app-ios/Protocols.html#/c:objc(pl)SMIUnknownEntry

        // Deze zijn in ieder geval mogelijk bij unspecified
        // SMIParticipantChangedPayload (gebruiker joined bijvoorbeeld, waarschijnlijk vergelijkbaar met deze props: https://salesforce-async-messaging.github.io/messaging-in-app-android/messaging-inapp-network/com.salesforce.android.smi.network.data.domain.conversationEntry.entryPayload.event.entries/-participant-changed-entry/index.html)
        //https://salesforce-async-messaging.github.io/messaging-in-app-ios/Protocols/SMIRoutingWorkResult.html
        //https://salesforce-async-messaging.github.io/messaging-in-app-ios/Protocols/SMIRoutingResult.html
        //https://salesforce-async-messaging.github.io/messaging-in-app-ios/Protocols/SMITypingIndicator.html
        // text = textPayload.text ?: @"";
        if (type == SMIConversationEntryTypesParticipantChanged) {
            id<SMIParticipantChanged> participantChangedPayload = (id<SMIParticipantChanged>)payload;
            messageDict[@"format"] = @"ParticipantChanged";
            NSMutableArray *operationsArray = [NSMutableArray array];
            for (id<SMIParticipantChangedOperation> operation in participantChangedPayload.operations) {
                NSMutableDictionary *operationDict = [NSMutableDictionary dictionary];
                operationDict[@"type"] = operation.type;
                operationDict[@"participant"] = [self parseParticipantToDictionary:operation.participant];
                [operationsArray addObject:operationDict];
            }
            messageDict[@"operations"] = operationsArray;
        } else if (type == SMIConversationEntryTypesTypingIndicator) {
            id<SMITypingIndicator> typingIndicatorPayload = (id<SMITypingIndicator>)payload;
            if(typingIndicatorPayload.type == SMITypingIndicatorTypesStarted){
                messageDict[@"format"] = @"TypingStartedIndicator";
            } else {
                messageDict[@"format"] = @"TypingStoppedIndicator";
            }
            messageDict[@"startedTimestamp"] = @([typingIndicatorPayload.timestamp timeIntervalSince1970]);
        } else if (type == SMIConversationEntryTypesRoutingWorkResult) {
            id<SMIRoutingWorkResult> routingWorkResultPayload = (id<SMIRoutingWorkResult>)payload;
            messageDict[@"format"] = @"RoutingWorkResult";
            messageDict[@"workType"] = routingWorkResultPayload.workType;
        } else if (type == SMIConversationEntryTypesRoutingResult) {
            id<SMIRoutingResult> routingResultPayload = (id<SMIRoutingResult>)payload;
            messageDict[@"format"] = @"RoutingResult";
            messageDict[@"routingType"] = routingResultPayload.routingType;
            messageDict[@"failureType"] = routingResultPayload.failureType;
            messageDict[@"failureReason"] = routingResultPayload.failureReason;
            messageDict[@"recordId"] = routingResultPayload.recordId;
            messageDict[@"estimatedWaitTime"] = @(routingResultPayload.estimatedWaitTime);
            messageDict[@"isEWTAvailable"] = @(routingResultPayload.isEWTAvailable);
            messageDict[@"isEWTRequested"] = @(routingResultPayload.isEWTRequested);
        }
    }
    if (format == SMIConversationFormatTypesTextMessage) {
        id<SMITextMessage> textPayload = (id<SMITextMessage>)payload;
        messageDict[@"text"] = textPayload.text ?: @"";
    }
    if (format == SMIConversationFormatTypesQuickReplies) {
        id<SMIQuickReply> quickRepliesPayload = (id<SMIQuickReply>)payload;
        messageDict[@"text"] = quickRepliesPayload.text ?: @"";
        messageDict[@"choices"] = [self parseChoiceArrayToDictionaryArray:quickRepliesPayload.choices];
        messageDict[@"selected"] = [self parseChoiceArrayToDictionaryArray:quickRepliesPayload.selected];
    }
    //https://salesforce-async-messaging.github.io/messaging-in-app-ios/Protocols/SMIEntryAck.html

    
    return [messageDict copy]; // Return an immutable dictionary
}

// This is triggered when new entries (messages) are added to a conversation.
- (void)core:(nonnull id<SMICoreClient>)core
  conversation:(nonnull id<SMIConversation>)conversation
didReceiveEntries:(nonnull NSArray<id<SMIConversationEntry>> *)entries
        paged:(BOOL)paged
{
    if (hasListeners) {
        // NSMutableArray *messageArray = [NSMutableArray array];
        
        for (id<SMIConversationEntry> entry in entries) {
            NSDictionary *finalMessageDict = [self parseEntryToDictionary:entry];
            [self sendEventWithName:@"onNewMessage" body:finalMessageDict];
        }

        // Emit the event to JavaScript
    }
}

// Triggered when the status of entries is updated
- (void)core:(nonnull id<SMICoreClient>)core
  conversation:(nonnull id<SMIConversation>)conversation
didUpdateEntries:(nonnull NSArray<id<SMIConversationEntry>> *)entries
{
    if (hasListeners) {
        for (id<SMIConversationEntry> entry in entries) {
            NSDictionary *finalMessageDict = [self parseEntryToDictionary:entry];
            [self sendEventWithName:@"onUpdatedMessage" body:finalMessageDict];
        }
    }
}

// Triggered when network status changes
- (void)core:(nonnull id<SMICoreClient>)core
didChangeNetworkState:(nonnull SMINetworkConnectivityState)state
{
    if (hasListeners) {
        [self sendEventWithName:@"onNetworkStatusChanged" body:state];
    }
}

// Triggered when a typing event starts
- (void)core:(nonnull id<SMICoreClient>)core
didReceiveTypingStartedEvent:(nonnull id<SMIConversationEntry>)entry
{
    if (hasListeners) {
        NSDictionary *finalMessageDict = [self parseEntryToDictionary:entry];
        [self sendEventWithName:@"onTypingStarted" body:finalMessageDict];
    }
}

// Triggered when a typing event stops
- (void)core:(nonnull id<SMICoreClient>)core
didReceiveTypingStoppedEvent:(nonnull id<SMIConversationEntry>)entry
{
    if (hasListeners) {
        NSDictionary *finalMessageDict = [self parseEntryToDictionary:entry];
        [self sendEventWithName:@"onTypingStopped" body:finalMessageDict];
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

- (NSArray<NSString *> *)supportedEvents {
    return @[@"onNewMessage", @"onUpdatedMessage", @"onNetworkStatusChanged", @"onTypingStarted", @"onTypingStopped"];
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
