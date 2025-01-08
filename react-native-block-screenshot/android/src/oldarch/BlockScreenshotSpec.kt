package com.blockscreenshot

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.Callback

abstract class BlockScreenshotSpec internal constructor(context: ReactApplicationContext) :
  ReactContextBaseJavaModule(context) {

  abstract fun enableBlockScreenshot(params: ReadableMap, promise: Promise)
  abstract fun disableBlockScreenshot(promise: Promise)
  abstract fun addEventListener(callback: Callback)
}
