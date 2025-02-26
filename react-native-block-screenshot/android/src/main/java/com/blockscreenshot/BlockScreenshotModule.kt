package com.blockscreenshot

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.Promise
import com.facebook.react.module.annotations.ReactModule
import android.view.WindowManager;
import android.os.Bundle;
import android.app.Activity;
import com.facebook.react.bridge.Callback

@ReactModule(name = BlockScreenshotModule.NAME)
class BlockScreenshotModule(reactContext: ReactApplicationContext) :
  NativeBlockScreenshotSpec(reactContext) {

  private val currentReactContext: ReactApplicationContext = reactContext

  override fun getName(): String {
    return NAME
  }

  override fun enableBlockScreenshot(params: ReadableMap) {
    val activity: Activity? = currentReactContext.currentActivity
    activity?.runOnUiThread {
      activity.window.setFlags(
        WindowManager.LayoutParams.FLAG_SECURE,
        WindowManager.LayoutParams.FLAG_SECURE
      )
    }
  }

  override fun addListener(eventName: String) {
    // Not implemented
  }
  override fun removeListeners(count: Double) {
    // Not implemented
  }

  override fun disableBlockScreenshot() {
    val activity: Activity? = currentReactContext.currentActivity
    activity?.runOnUiThread {
      activity.window.clearFlags(WindowManager.LayoutParams.FLAG_SECURE)
    }
  }

  companion object {
    const val NAME = "BlockScreenshot"
  }
}
