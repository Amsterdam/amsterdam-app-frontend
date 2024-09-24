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

class SalesforceMessagingInAppModule internal constructor(context: ReactApplicationContext) :
  SalesforceMessagingInAppSpec(context) {

  private var config: Configuration? = null;
  private var coreClient: CoreClient? = null;
  private var conversationClient: ConversationClient? = null;
  private var supervisorJob = SupervisorJob();
  private var scope = CoroutineScope(Dispatchers.Main + this.supervisorJob);

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
        try {
            val conversationEntries = conversationClient?.conversationEntriesPaged()
                ?.filterIsInstance<Result.Success<PagingData<ConversationEntry>>>()
                ?.map { it.data }

            conversationEntries?.collectLatest { pagingData ->
                pagingData.map { entry ->
                    val messageText = getText(entry)
                    val params = Arguments.createMap()
                    params.putString("message", messageText)
                    // Emit the event with message data
                    sendEvent("onNewMessage", params)
                }
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
