package com.salesforcemessaginginapp

import android.net.Uri
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.salesforce.android.smi.common.api.Result
import com.salesforce.android.smi.core.Configuration
import com.salesforce.android.smi.core.ConversationClient
import com.salesforce.android.smi.core.CoreClient
import com.salesforce.android.smi.core.CoreConfiguration
import com.salesforce.android.smi.core.data.domain.businessHours.BusinessHoursInfo
import com.salesforce.android.smi.core.data.domain.conversationEntry.entryPayload.event.typing.TypingIndicatorStatus
import com.salesforce.android.smi.core.data.domain.remoteConfiguration.RemoteConfiguration
import com.salesforce.android.smi.core.events.CoreEvent
import com.salesforce.android.smi.network.data.domain.conversationEntry.ConversationEntry
import com.salesforce.android.smi.network.data.domain.conversationEntry.entryPayload.EntryPayload
import com.salesforce.android.smi.network.data.domain.conversationEntry.entryPayload.event.entries.ParticipantClientMenu
import com.salesforce.android.smi.network.data.domain.conversationEntry.entryPayload.message.component.optionItem.OptionItem
import com.salesforce.android.smi.network.data.domain.conversationEntry.entryPayload.message.component.optionItem.titleItem.TitleItem
import com.salesforce.android.smi.network.data.domain.conversationEntry.entryPayload.message.format.ChoicesFormat
import com.salesforce.android.smi.network.data.domain.conversationEntry.entryPayload.message.format.ChoicesResponseFormat
import com.salesforce.android.smi.network.data.domain.conversationEntry.entryPayload.message.format.FormFormat
import com.salesforce.android.smi.network.data.domain.conversationEntry.entryPayload.message.format.FormResponseFormat
import com.salesforce.android.smi.network.data.domain.conversationEntry.entryPayload.message.format.StaticContentFormat
import com.salesforce.android.smi.network.data.domain.participant.Participant
import com.salesforce.android.smi.network.internal.api.sse.ServerSentEvent
import kotlinx.coroutines.Job
import kotlinx.coroutines.MainScope
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.flow.filterIsInstance
import kotlinx.coroutines.launch
import java.net.URL
import java.util.UUID

class SalesforceMessagingInAppModule internal constructor(context: ReactApplicationContext) :
  SalesforceMessagingInAppSpec(context) {

  private var config: Configuration? = null
  private var coreClient: CoreClient? = null
  private var conversationClient: ConversationClient? = null
  private var supervisorJob = SupervisorJob()
  private var scope = MainScope()
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
    promise: Promise,
  ) {
    try {
      config = CoreConfiguration(URL(url), organizationId, developerName)
      coreClient = CoreClient.Factory.create(reactApplicationContext, config!!)
      coreClient?.start(scope)
      promise.resolve(true)
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

  private var conversationJob: Job? = null

  @ReactMethod
  override fun createConversationClient(clientID: String?, promise: Promise) {
    try {
      if (coreClient == null) {
        promise.reject("Error", "CoreClient not created.")
        return
      }
      val uuid = if (clientID != null) UUID.fromString(clientID) else UUID.randomUUID()
      conversationClient = coreClient?.conversationClient(uuid)

      conversationJob?.cancel()

      conversationJob = scope.launch {
        try {
          conversationClient
            ?.events
            ?.collect { entry ->
              when (entry) {
                is CoreEvent.ConversationEvent.Entry -> {
                  val params = convertEntryToMap(entry.conversationEntry)
                  // Don't emit the event if the format is "Selections" (Quick Replies)
                  // This is because the event is already emitted when the user selects a quick reply
                  // Necessary because of SDK bug
                  if (params.getString("format") != "Selections") {
                    sendEvent("onNewMessage", params)
                  }
                }

                is CoreEvent.ConversationEvent.TypingIndicator -> {
                  val params = convertEntryToMap(entry.conversationEntry)
                  if (entry.status === TypingIndicatorStatus.Started) {
                    sendEvent("onTypingStarted", params)
                  } else {
                    sendEvent("onTypingStopped", params)
                  }
                }
              }
            }

          coreClient
            ?.events
            ?.filterIsInstance<CoreEvent.Connection>()
            ?.collect { entry: CoreEvent.Connection ->
              val params = Arguments.createMap()
              when (entry.event) {
                is ServerSentEvent.Connection.Closed -> {
                  params.putString("status", "Closed")
                }

                is ServerSentEvent.Connection.Connecting -> {
                  params.putString("status", "Connecting")
                }

                is ServerSentEvent.Connection.Open -> {
                  params.putString("status", "Open")
                }

                is ServerSentEvent.Connection.Ping -> {
                  params.putString("status", "Ping")
                }
              }
              sendEvent("onNetworkStatusChanged", params)
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
    return when (role) {
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
    option: OptionItem.TypedOptionItem.ParticipantClientMenuOptionItem,
  ): WritableMap {
    val optionMap = Arguments.createMap()
    optionMap.putString("title", option.title)
    optionMap.putString("optionValue", option.optionValue)
    optionMap.putString("optionId", option.optionId)
    optionMap.putString("parentEntryId", option.parentMessageId)
    return optionMap
  }

  private fun convertParticipantClientMenuToMapArray(
    options: ParticipantClientMenu?,
  ): WritableArray {
    val array = Arguments.createArray()
    options?.optionItems?.forEach { option ->
      array.pushMap(convertParticipantClientMenuOptionItemToMap(option))
    }
    return array
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
            val attachmentsArray = Arguments.createArray()
            content.attachments.forEach { attachment ->
              val attachmentMap = Arguments.createMap()
              attachmentMap.putString("id", attachment.id)
              attachmentMap.putString("mimeType", attachment.mimeType)
              attachmentMap.putString("name", attachment.name)
              attachment.file?.let {
                attachmentMap.putString(
                  "file",
                  Uri.fromFile(it).toString()
                ) // Convert File to URI if not null
              }
              attachmentsArray.pushMap(attachmentMap)
              attachment.url?.let {
                attachmentMap.putString("url", it)
              }
            }
            map.putArray("attachments", attachmentsArray)
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
            val choicesArray = Arguments.createArray()

            content.optionItems.forEach { option ->
              choicesArray.pushMap(convertTypedOptionItemToMap(option))
            }
            map.putArray("choices", choicesArray)
            map.putString("text", content.text)
          }

          is ChoicesResponseFormat.ChoicesResponseSelectionsFormat -> {
            val selectionsArray = Arguments.createArray()
            content.selectedOptions.forEach { selection ->
              val selectionMap = Arguments.createMap()
              selectionMap.putString("optionId", selection.optionId)
              selectionMap.putString("title", selection.title)
              selectionMap.putString("parentEntryId", selection.parentMessageId)
              selectionsArray.pushMap(selectionMap)
            }
            map.putArray("selections", selectionsArray)
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
          entryMap.putMap("participant", convertParticipantToMap(entry.participant))
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
        map.putInt("startedTimestamp", payload.startedTimestamp.toInt())
      }

      is EntryPayload.TypingStartedIndicatorPayload -> {
        map.putInt("startedTimestamp", payload.timestamp.toInt())
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
  override fun sendReply(choice: ReadableMap, promise: Promise) {
    try {
      if (conversationClient == null) {
        promise.reject("Error", "conversationClient not created.")
        return
      }
      scope.launch {
        try {
          val optionId = choice.getString("optionId")
            ?: throw IllegalArgumentException("optionId is required")
          val parentEntryId = choice.getString("parentEntryId")
          val title = choice.getString("title")
            ?: throw IllegalArgumentException("title is required")
          val optionValue = choice.getString("optionValue")
            ?: throw IllegalArgumentException("optionValue is required")

          val optionItem = OptionItem.TypedOptionItem.TitleOptionItem(
            optionId,
            parentEntryId,
            TitleItem.DefaultTitleItem(title),
            TitleItem.DefaultTitleItem(optionValue)
          )

          val result =
            conversationClient?.sendReply(optionItem)
              ?: throw IllegalStateException("Failed to send reply")

          if (result is Result.Success) {
            val params = convertEntryToMap(result.data)
            sendEvent("onNewMessage", params)
            promise.resolve("Success")
          } else {
            promise.reject("Error", result.toString())
          }
        } catch (e: Exception) {
          promise.reject("Error", e.message, e)
        }
      }
    } catch (e: Exception) {
      promise.reject("Error", "An error occurred: ${e.message}", e)
    }
  }

  @ReactMethod
  override fun sendTypingEvent(promise: Promise) {
    try {
      if (conversationClient == null) {
        promise.reject("Error", "conversationClient not created.")
        return
      }
      scope.launch {
        try {
          conversationClient?.sendTypingEvent()
            ?: throw IllegalStateException("Failed to send typing event")
          promise.resolve("Success")
        } catch (e: Exception) {
          promise.reject("Error", e.message, e)
        }
      }
    } catch (e: Exception) {
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
