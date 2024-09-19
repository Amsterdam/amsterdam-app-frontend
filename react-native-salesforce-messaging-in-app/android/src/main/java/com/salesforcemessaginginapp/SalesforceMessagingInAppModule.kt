package com.salesforcemessaginginapp

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

import com.salesforce.android.smi.core.Configuration
import com.salesforce.android.smi.core.CoreClient
import com.salesforce.android.smi.core.CoreConfiguration
import com.salesforce.android.smi.core.ConversationClient
import com.salesforce.android.smi.network.data.domain.conversationEntry.ConversationEntry
import com.salesforce.android.smi.core.data.domain.remoteConfiguration.RemoteConfiguration
import com.salesforce.android.smi.common.api.Result

import java.net.URL
import java.util.UUID
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.launch

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
            promise.resolve(remoteConfig.toString())
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
            promise.resolve(result.toString())
        } catch (e: Exception) {
            promise.reject("Error", e.message, e)
        }
      }
    } catch (e: Exception) {
        // Catch any exception and reject the promise
        promise.reject("Error", "An error occurred: ${e.message}", e)
    }
  }

  companion object {
    const val NAME = "SalesforceMessagingInApp"
  }
}
