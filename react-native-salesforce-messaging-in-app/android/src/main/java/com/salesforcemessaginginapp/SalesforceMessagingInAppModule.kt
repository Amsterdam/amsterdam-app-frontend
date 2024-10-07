package com.salesforcemessaginginapp

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.Arguments
import com.facebook.react.modules.core.DeviceEventManagerModule

import com.salesforce.android.smi.core.Configuration
import com.salesforce.android.smi.core.CoreClient
import com.salesforce.android.smi.core.CoreConfiguration
import com.salesforce.android.smi.core.ConversationClient
import com.salesforce.android.smi.network.data.domain.conversationEntry.ConversationEntry
import com.salesforce.android.smi.core.data.domain.remoteConfiguration.RemoteConfiguration
import com.salesforce.android.smi.common.api.Result
import com.salesforce.android.smi.core.data.domain.businessHours.BusinessHoursInfo
import com.salesforce.android.smi.network.data.domain.conversationEntry.entryPayload.EntryPayload
import com.salesforce.android.smi.network.data.domain.conversationEntry.entryPayload.message.format.StaticContentFormat

import java.net.URL
import java.util.UUID
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.launch
import kotlinx.coroutines.flow.collectLatest
import kotlinx.coroutines.flow.filterIsInstance
import kotlinx.coroutines.flow.map
import androidx.paging.PagingData
import androidx.paging.map
import com.facebook.react.bridge.WritableArray
import com.salesforce.android.smi.core.events.CoreEvent
import com.salesforce.android.smi.network.data.domain.conversationEntry.entryPayload.event.entries.ParticipantClientMenu
import com.salesforce.android.smi.network.data.domain.conversationEntry.entryPayload.message.component.optionItem.OptionItem
import com.salesforce.android.smi.network.data.domain.conversationEntry.entryPayload.message.format.ChoicesFormat
import com.salesforce.android.smi.network.data.domain.conversationEntry.entryPayload.message.format.ChoicesResponseFormat
import com.salesforce.android.smi.network.data.domain.conversationEntry.entryPayload.message.format.FormFormat
import com.salesforce.android.smi.network.data.domain.conversationEntry.entryPayload.message.format.FormResponseFormat

class SalesforceMessagingInAppModule internal constructor(context: ReactApplicationContext) :
  SalesforceMessagingInAppSpec(context) {

  private var config: Configuration? = null;
  private var coreClient: CoreClient? = null;
  private var conversationClient: ConversationClient? = null;
  private var supervisorJob = SupervisorJob();
  private var scope = CoroutineScope(Dispatchers.Main + this.supervisorJob);
  // private var scope = CoroutineScope(Dispatchers.IO + this.supervisorJob)

  override fun getName(): String {
    return NAME
  }

  // Function to emit events to React Native
  private fun sendEvent(eventName: String, params: WritableMap?) {
    reactApplicationContext
        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
        .emit(eventName, params)
  }
  private var listenerCount = 0

  @ReactMethod
  override fun addListener(eventName: String) {
    if (listenerCount == 0) {
      // Set up any upstream listeners or background tasks as necessary
    }

    listenerCount += 1
  }

  @ReactMethod
  override fun removeListeners(count: Int) {
    listenerCount -= count
    if (listenerCount == 0) {
      // Remove upstream listeners, stop unnecessary background tasks
    }
  }
  
  @ReactMethod
  override fun createCoreClient(
    url: String,
    organizationId: String,
    developerName: String, 
    promise: Promise
  ) {
    try {
      config = CoreConfiguration(URL(url), organizationId, developerName)
      if (config == null){
        promise.reject("Error", "Invalid configuration.")
        return
      }
      coreClient = CoreClient.Factory.create(reactApplicationContext, config!!)
      if (coreClient != null){
        coreClient?.start(scope)
        promise.resolve(true)
      } else {
        promise.reject("Error", "Failed to create CoreClient.")
      }
    } catch (e: Exception) {
        // Catch any exception and reject the promise
        promise.reject("Error", "An error occurred: ${e.message}", e)
    }
  }

  @ReactMethod
  override fun retrieveRemoteConfiguration(
    promise: Promise
  ) {
    try {
      if (coreClient == null) {
        promise.reject("Error", "CoreClient not created.")
        return
      }
      scope.launch {
        try {
            // Since retrieveRemoteConfiguration is a suspend function, we can call it here
            val remoteConfig: Result<RemoteConfiguration> = coreClient?.retrieveRemoteConfiguration()
                ?: throw IllegalStateException("Failed to retrieve remote configuration")
            //remoteConfig.data
            if (remoteConfig is Result.Success) {
            promise.resolve(remoteConfig.toString())
            } else {
              promise.reject("Error", remoteConfig.toString())
            }
        } catch (e: Exception) {
            promise.reject("Error", e.message, e)
        }
      }
    } catch (e: Exception) {
        // Catch any exception and reject the promise
        promise.reject("Error", "An error occurred: ${e.message}", e)
    }
  }

  @ReactMethod
  override fun createConversationClient(
    clientID: String?,
    promise: Promise
  ) {
    try{
      if (coreClient == null) {
        promise.reject("Error", "CoreClient not created.")
        return
      }
      val uuid = if (clientID != null) UUID.fromString(clientID) else UUID.randomUUID()
      conversationClient = coreClient?.conversationClient(uuid)
      scope.launch {
        println("scope loaunched")
        try {
            /*val conversationEntries = conversationClient?.conversationEntriesPaged()
                ?.filterIsInstance<Result.Success<PagingData<ConversationEntry>>>()
                ?.map { it.data }
            println("scope conversationEntries: " + conversationEntries?.toString())
//            conversationEntries.

            conversationEntries?.collectLatest { pagingData ->
                pagingData.map { entry ->
                    println("Debug: Processing ConversationEntry - ${entry.toString()}")
                    val messageText = entry.toString()//getText(entry)
                    val params = Arguments.createMap()
                    params.putString("message", messageText)
                    // Emit the event with message data
                    sendEvent("onNewMessage", params)

                }
            }*/

            conversationClient?.events
                    ?.filterIsInstance<CoreEvent.ConversationEvent.Entry>()
                    ?.map { it.conversationEntry }
                    ?.collect { entry: ConversationEntry ->
                        val params = convertEntryToMap(entry)
                        /*val messageText = payload.toString()//getText(entry)
                        val params = Arguments.createMap()
                        params.putString("message", messageText)*/
                        // Emit the event with message data
                        sendEvent("onNewMessage", params)
                        /*when (payload) {
                            is EntryPayload.MessagePayload -> when (val content = payload.content) {
                                is StaticContentFormat.TextFormat -> {
//                                    sendEventToReactNative(payload.entryType.toString(), content.text)
                                    sendEvent("onNewMessage", payload.entryType.toString())
                                }
                                is ChoicesFormat.DisplayableOptionsFormat -> {
//                                    logEntry(payload.entryType, content.optionItems.toString())
//                                    sendEventToReactNative(payload.entryType.toString(), content.optionItems.toString())
                                    sendEvent("onNewMessage", payload.entryType.toString())
                                }
                                else -> {
//                                    logEntry(payload.entryType, content.formatType.toString())
//                                    sendEventToReactNative(payload.entryType.toString(), content.formatType.toString())
                                    sendEvent("onNewMessage", payload.entryType.toString())
                                }
                            }
                            else -> {
//                                logEntry(payload.entryType)
//                                sendEventToReactNative(payload.entryType.toString(), null)

                                sendEvent("onNewMessage", payload.entryType.toString())
                            }
                        }*/
                    }
//                    ?.collect() // Collect the flow to trigger processing
/*
            conversationClient?.events
                    ?.filterIsInstance<CoreEvent.ConversationEvent.Entry>()
                    ?.map { it.conversationEntry.payload }
                    .onEach {
                        val messageText = it.toString()//getText(entry)
                        val params = Arguments.createMap()
                        params.putString("message", messageText)
                        // Emit the event with message data
                        sendEvent("onNewMessage", params)
                        when (it) {
                            is EntryPayload.MessagePayload -> when (val content = it.content) {
                                is StaticContentFormat.TextFormat -> {
//                                    logEntry(it.entryType, content.text)
                                    val messageText = it.toString()//getText(entry)
                                    val params = Arguments.createMap()
                                    params.putString("message", messageText)
                                    // Emit the event with message data
                                    sendEvent("onNewMessage", params)
                                }
//                                is ChoicesFormat.DisplayableOptionsFormat ->
//                                    logEntry(it.entryType, content.optionItems.toString())
//                                else ->
//                                    logEntry(it.entryType, content.formatType.toString())
                            }
//                            else -> logEntry(it.entryType)
                        }
                    }.collect()*/
        } catch (e: Exception) {
            promise.reject("Error", "Failed to listen for messages: ${e.message}", e)
        }
      }
      promise.resolve(uuid.toString())

    } catch (e: Exception) {
      // Catch any exception and reject the promise
      promise.reject("Error", "An error occurred: ${e.message}", e)
    }
  }

    private fun convertEntryToMap(entry: ConversationEntry): WritableMap {
        val map = Arguments.createMap()
        map.putString("entryId", entry.entryId)
        map.putString("senderSubject", entry.sender.subject)
        map.putString("senderRole", entry.sender.role)
        map.putBoolean("senderLocal", entry.sender.isLocal)
        map.putString("senderDisplayName", entry.sender.displayName)
        map.putArray("senderOptions", convertOptionsToMapArray(entry.sender.clientMenu))
        map.putString("messageType", entry.entryType.toString())
        map.putInt("timestamp", entry.timestamp.toInt())
        map.putString("conversationId", entry.conversationId.toString())
        map.putString("status", entry.status.toString())
        map.putString("format", entry.payload.entryType.toString())
        map.putString("payloadId", entry.payload.id)
        map.merge(convertPayloadToMap(entry.payload))

        return map
    }

    private fun convertOptionsToMapArray(options: ParticipantClientMenu?): WritableArray {
        val array = Arguments.createArray()
        options?.optionItems?.forEach { option ->
            val optionMap = Arguments.createMap()
            optionMap.putString("optionId", option.optionId)
            optionMap.putString("title", option.title)
            optionMap.putString("optionValue", option.optionValue)
            optionMap.putString("parentEntryId", option.parentMessageId)
            array.pushMap(optionMap)
        }
        return array
    }

    // Utility function to convert an EntryPayload object to WritableMap
    private fun convertPayloadToMap(payload: EntryPayload): WritableMap {
        val map = Arguments.createMap()

        // General properties of EntryPayload
        map.putString("entryType", payload.entryType.toString())
        // If the payload is of type MessagePayload, handle its specific properties
        when (payload) {
            is EntryPayload.MessagePayload -> {
                val content = payload.content
                map.putString("format", content.formatType.toString())
                map.putString("inReplyToEntryId", payload.inReplyToMessageId)
                map.putString("messageReason", payload.messageReason.toString())

                when (content) {
                    is StaticContentFormat.TextFormat -> {
                        map.putString("text", content.text)
                    }
                    is StaticContentFormat.AttachmentsFormat -> TODO()
                    is StaticContentFormat.RichLinkFormat -> TODO()
                    is StaticContentFormat.WebViewFormat -> TODO()
                    is ChoicesFormat.DisplayableOptionsFormat -> {
                        val optionsArray = Arguments.createArray()
                        content.optionItems.forEach { option ->
                            when (option) {
                                is OptionItem.TypedOptionItem.ParticipantClientMenuOptionItem -> {
                                    val optionMap = Arguments.createMap()
                                    optionMap.putString("title", option.title)
                                    optionMap.putString("optionValue", option.optionValue)
                                    optionMap.putString("optionId", option.optionId)
                                    optionMap.putString("parentEntryId", option.parentMessageId)
                                    optionsArray.pushMap(optionMap)
                                }
                                is OptionItem.TypedOptionItem.TitleOptionItem -> {
                                    val optionMap = Arguments.createMap()
                                    // deze title items bevatten nog meer properties
                                    optionMap.putString("incomplete", "true")
                                    optionMap.putString("title", option.titleItem.title)
                                    optionMap.putString("itemType", option.titleItem.itemType.toString())
                                    optionMap.putString("subTitle", option.titleItem.subTitle)
                                    optionMap.putString("optionValue", option.optionValue.title)
                                    optionMap.putString("optionId", option.optionId)
                                    optionMap.putString("parentEntryId", option.parentMessageId)
                                    optionsArray.pushMap(optionMap)
                                }
                            }
                        }
                        map.putArray("options", optionsArray)
                    }
                    is ChoicesFormat.CarouselFormat -> TODO()
                    is ChoicesFormat.QuickRepliesFormat -> TODO()
                    is ChoicesResponseFormat.ChoicesResponseSelectionsFormat -> TODO()
                    is FormFormat.InputsFormat -> TODO()
                    is FormResponseFormat.InputsFormResponseFormat -> TODO()
                    is FormResponseFormat.ResultFormResponseFormat -> TODO()
                }
            }

            is EntryPayload.AcknowledgeDeliveryPayload -> TODO()
            is EntryPayload.AcknowledgeReadPayload -> TODO()
            is EntryPayload.ParticipantChangedPayload -> TODO()
            is EntryPayload.RoutingResultPayload -> TODO()
            is EntryPayload.RoutingWorkResultPayload -> TODO()
            is EntryPayload.TypingIndicatorPayload -> TODO()
            is EntryPayload.TypingStartedIndicatorPayload -> TODO()
            is EntryPayload.TypingStoppedIndicatorPayload -> TODO()
            is EntryPayload.UnknownEntryPayload -> TODO()
        }

        return map
    }

  @ReactMethod
  override fun sendMessage(
    message: String,
    promise: Promise
  ) {
    try {
      if (conversationClient == null) {
        promise.reject("Error", "conversationClient not created.")
        return
      }
      scope.launch {
        try {
            // Since retrieveRemoteConfiguration is a suspend function, we can call it here
            val result: Result<ConversationEntry> = conversationClient?.sendMessage(message)
                ?: throw IllegalStateException("Failed to send message")
            if (result is Result.Success) {
              val messageText = result.data.toString()
              val params = Arguments.createMap()
              params.putString("message", messageText)
              // Emit the event with message data
              sendEvent("onNewMessage", params)
              promise.resolve(result.toString())
            } else {
              promise.reject("Error", result.toString())
            }
        } catch (e: Exception) {
            promise.reject("Error", e.message, e)
        }
      }
    } catch (e: Exception) {
        // Catch any exception and reject the promise
        promise.reject("Error", "An error occurred: ${e.message}", e)
    }
  }

  @ReactMethod
  override fun checkIfInBusinessHours(
    promise: Promise) {
    if (coreClient == null) {
      promise.reject("Error", "CoreClient not created.")
      return
    }
    scope.launch {
      try {
          val result = coreClient?.retrieveBusinessHours()
          if (result is Result.Success) {
            val businessHoursInfo: BusinessHoursInfo? = (result as? Result.Success)?.data
            promise.resolve(businessHoursInfo?.isWithinBusinessHours())
          } else {
            promise.reject("Error", result.toString())
          }

        } catch (e: Exception) {
          // Catch any exception and reject the promise
          promise.reject("Error", "An error occurred: ${e.message}", e)
      }
    }
  }

  private fun getText(item: ConversationEntry?): String =
      when (val payload = item?.payload) {
          is EntryPayload.MessagePayload -> {
              when (val content = payload.abstractMessage.content) {
                  is StaticContentFormat.TextFormat -> content.text
                  else -> content.formatType.toString() // Handle other formats
              }
          }
          else -> payload?.entryType.toString() // Handle other entry types
      }

  companion object {
    const val NAME = "SalesforceMessagingInApp"
  }
}
