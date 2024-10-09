package com.salesforcemessaginginapp

import androidx.paging.map
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.salesforce.android.smi.common.api.Result
import com.salesforce.android.smi.core.Configuration
import com.salesforce.android.smi.core.ConversationClient
import com.salesforce.android.smi.core.CoreClient
import com.salesforce.android.smi.core.CoreConfiguration
import com.salesforce.android.smi.core.data.domain.businessHours.BusinessHoursInfo
import com.salesforce.android.smi.core.data.domain.remoteConfiguration.RemoteConfiguration
import com.salesforce.android.smi.core.events.CoreEvent
import com.salesforce.android.smi.network.data.domain.conversationEntry.ConversationEntry
import com.salesforce.android.smi.network.data.domain.conversationEntry.entryPayload.EntryPayload
import com.salesforce.android.smi.network.data.domain.conversationEntry.entryPayload.event.entries.ParticipantClientMenu
import com.salesforce.android.smi.network.data.domain.conversationEntry.entryPayload.message.component.optionItem.OptionItem
import com.salesforce.android.smi.network.data.domain.conversationEntry.entryPayload.message.format.ChoicesFormat
import com.salesforce.android.smi.network.data.domain.conversationEntry.entryPayload.message.format.ChoicesResponseFormat
import com.salesforce.android.smi.network.data.domain.conversationEntry.entryPayload.message.format.FormFormat
import com.salesforce.android.smi.network.data.domain.conversationEntry.entryPayload.message.format.FormResponseFormat
import com.salesforce.android.smi.network.data.domain.conversationEntry.entryPayload.message.format.StaticContentFormat
import com.salesforce.android.smi.network.data.domain.participant.Participant
import java.net.URL
import java.util.UUID
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.flow.filterIsInstance
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.launch

class SalesforceMessagingInAppModule internal constructor(context: ReactApplicationContext) :
        SalesforceMessagingInAppSpec(context) {

  private var config: Configuration? = null
  private var coreClient: CoreClient? = null
  private var conversationClient: ConversationClient? = null
  private var supervisorJob = SupervisorJob()
  private var scope = CoroutineScope(Dispatchers.Main + this.supervisorJob)
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
      if (config == null) {
        promise.reject("Error", "Invalid configuration.")
        return
      }
      coreClient = CoreClient.Factory.create(reactApplicationContext, config!!)
      if (coreClient != null) {
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
  override fun retrieveRemoteConfiguration(promise: Promise) {
    try {
      if (coreClient == null) {
        promise.reject("Error", "CoreClient not created.")
        return
      }
      scope.launch {
        try {
          // Since retrieveRemoteConfiguration is a suspend function, we can call it here
          val remoteConfig: Result<RemoteConfiguration> =
                  coreClient?.retrieveRemoteConfiguration()
                          ?: throw IllegalStateException("Failed to retrieve remote configuration")
          // remoteConfig.data
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
  override fun createConversationClient(clientID: String?, promise: Promise) {
    try {
      if (coreClient == null) {
        promise.reject("Error", "CoreClient not created.")
        return
      }
      val uuid = if (clientID != null) UUID.fromString(clientID) else UUID.randomUUID()
      conversationClient = coreClient?.conversationClient(uuid)
      scope.launch {
        try {

          conversationClient
                  ?.events
                  ?.filterIsInstance<CoreEvent.ConversationEvent.Entry>()
                  ?.map { it.conversationEntry }
                  ?.collect { entry: ConversationEntry ->
                    val params = convertEntryToMap(entry)
                    sendEvent("onNewMessage", params)
                  }
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

  private fun parseRole(role: String?): String? {
    return when(role) {
      "EndUser" -> "USER"
      else -> role
    }
  }

  private fun convertParticipantToMap(participant: Participant): WritableMap {
    val map = Arguments.createMap()
    map.putString("subject", participant.subject)
    map.putString("role", parseRole(participant.role))
    map.putBoolean("local", participant.isLocal)
    map.putString("displayName", participant.displayName)
    map.putArray("options", convertParticipantClientMenuToMapArray(participant.clientMenu))
    return map
  }

  private fun convertParticipantClientMenuOptionItemToMap(
          option: OptionItem.TypedOptionItem.ParticipantClientMenuOptionItem
  ): WritableMap {
    val optionMap = Arguments.createMap()
    optionMap.putString("title", option.title)
    optionMap.putString("optionValue", option.optionValue)
    optionMap.putString("optionId", option.optionId)
    optionMap.putString("parentEntryId", option.parentMessageId)
    return optionMap
  }

  private fun convertParticipantClientMenuToMapArray(
          options: ParticipantClientMenu?
  ): WritableArray {
    val array = Arguments.createArray()
    options?.optionItems?.forEach { option ->
      array.pushMap(convertParticipantClientMenuOptionItemToMap(option))
    }
    return array
  }

  private fun convertTypedOptionItemToMap(option: OptionItem.TypedOptionItem): WritableMap {
    when (option) {
      is OptionItem.TypedOptionItem.ParticipantClientMenuOptionItem -> {
        return convertParticipantClientMenuOptionItemToMap(option)
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
        return optionMap
      }
    }
  }

  private fun convertEntryToMap(entry: ConversationEntry): WritableMap {
    val map = Arguments.createMap()
    entry.entryType
    map.putString("entryId", entry.entryId)
    map.putMap("sender", convertParticipantToMap(entry.sender))
    map.putString("senderDisplayName", entry.senderDisplayName)
    map.putString("messageType", entry.entryType.toString())
    map.putInt("timestamp", entry.timestamp.toInt())
    map.putString("conversationId", entry.conversationId.toString())
    map.putString("status", entry.status.toString())
    map.putString("format", entry.payload.entryType.toString())
    map.putString("payloadId", entry.payload.id)
    map.merge(convertPayloadToMap(entry.payload))

    return map
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
          is StaticContentFormat.AttachmentsFormat -> {
            // TODO
          }
          is StaticContentFormat.RichLinkFormat -> {
            // TODO
          }
          is StaticContentFormat.WebViewFormat -> {
            // TODO
          }
          is ChoicesFormat.DisplayableOptionsFormat -> {
            val optionsArray = Arguments.createArray()
            content.optionItems.forEach { option ->
              optionsArray.pushMap(convertTypedOptionItemToMap(option))
            }
            map.putArray("options", optionsArray)
          }
          is ChoicesFormat.CarouselFormat -> {
            // TODO
          }
          is ChoicesFormat.QuickRepliesFormat -> {
            // TODO
          }
          is ChoicesResponseFormat.ChoicesResponseSelectionsFormat -> {
            // TODO
          }
          is FormFormat.InputsFormat -> {
            // TODO
          }
          is FormResponseFormat.InputsFormResponseFormat -> {
            // TODO
          }
          is FormResponseFormat.ResultFormResponseFormat -> {
            // TODO
          }
        }
      }
      is EntryPayload.AcknowledgeDeliveryPayload -> {
        // TODO
      }
      is EntryPayload.AcknowledgeReadPayload -> {
        // TODO
      }
      is EntryPayload.ParticipantChangedPayload -> {
        val entriesArray = Arguments.createArray()
        payload.entries.forEach { entry ->
          val entryMap = Arguments.createMap()
          entryMap.putMap("participant",convertParticipantToMap(entry.participant))
//          entryMap.putString("displayName", entry.displayName) // not available on iOS
          entryMap.putString("type", entry.operation.value) // made to match iOS
          entriesArray.pushMap(entryMap)
        }
        map.putArray("operations", entriesArray) // named to match iOS
      }
      is EntryPayload.RoutingResultPayload -> {
        // TODO
      }
      is EntryPayload.RoutingWorkResultPayload -> {
        // TODO
      }
      is EntryPayload.TypingIndicatorPayload -> {
        // TODO
      }
      is EntryPayload.TypingStartedIndicatorPayload -> {
        // TODO
      }
      is EntryPayload.TypingStoppedIndicatorPayload -> {
        // TODO
      }
      is EntryPayload.UnknownEntryPayload -> {
        // TODO
      }
    }

    return map
  }

  @ReactMethod
  override fun sendMessage(message: String, promise: Promise) {
    try {
      if (conversationClient == null) {
        promise.reject("Error", "conversationClient not created.")
        return
      }
      scope.launch {
        try {
          // Since retrieveRemoteConfiguration is a suspend function, we can call it here
          val result: Result<ConversationEntry> =
                  conversationClient?.sendMessage(message)
                          ?: throw IllegalStateException("Failed to send message")
          if (result is Result.Success) {
            val messageText = result.data.toString()
            val params = Arguments.createMap()
            params.putString("message", messageText)
            // Emit the event with message data
//            sendEvent("onNewMessage", params)
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
  override fun checkIfInBusinessHours(promise: Promise) {
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

  companion object {
    const val NAME = "SalesforceMessagingInApp"
  }
}
