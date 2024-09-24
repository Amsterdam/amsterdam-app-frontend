package com.salesforcemessaginginapp

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.Promise

abstract class SalesforceMessagingInAppSpec internal constructor(context: ReactApplicationContext) :
  ReactContextBaseJavaModule(context) {

  abstract fun createCoreClient(
    url: String,
    organizationId: String,
    developerName: String, 
    promise: Promise)
  abstract fun retrieveRemoteConfiguration(promise: Promise)
  abstract fun createConversationClient(clientID: String?, promise: Promise)
  abstract fun sendMessage(message: String, promise: Promise)
  abstract fun checkIfInBusinessHours(promise: Promise)
  abstract fun addListener(eventName: String)
  abstract fun removeListeners(count: Int)
}
