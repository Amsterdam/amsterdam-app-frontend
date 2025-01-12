package com.salesforcemessaginginapp

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReadableMap

abstract class SalesforceMessagingInAppSpec internal constructor(context: ReactApplicationContext) :
  ReactContextBaseJavaModule(context) {

  abstract fun createCoreClient(
    url: String,
    organizationId: String,
    developerName: String,
    promise: Promise,
  )

  abstract fun generateUUID(): String
  abstract fun retrieveRemoteConfiguration(promise: Promise)
  abstract fun submitRemoteConfiguration(
    remoteConfiguration: ReadableMap,
    createConversationOnSubmit: Boolean,
    promise: Promise,
  )

  abstract fun createConversationClient(clientID: String?, promise: Promise)
  abstract fun destroyStorageAndAuthorization(promise: Promise)
  abstract fun markAsRead(entryDict: ReadableMap, promise: Promise)
  abstract fun sendMessage(message: String, promise: Promise)
  abstract fun sendReply(choice: ReadableMap, promise: Promise)
  abstract fun sendTypingEvent(promise: Promise)
  abstract fun sendPDF(filePath: String, fileName: String, promise: Promise)
  abstract fun sendImage(imageBase64: String, fileName: String, uri: String, promise: Promise)
  abstract fun checkIfInBusinessHours(promise: Promise)
  abstract fun addListener(eventName: String)
  abstract fun removeListeners(count: Int)
  abstract fun retrieveTranscript(promise: Promise)
}
