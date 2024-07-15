package com.blockscreenshot

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import android.view.WindowManager;
import android.os.Bundle;
import android.app.Activity;

class BlockScreenshotModule internal constructor(reactContext: ReactApplicationContext) :
  BlockScreenshotSpec(reactContext) {

  private val currentReactContext: ReactApplicationContext = reactContext

  override fun getName(): String {
    return NAME
  }

  // Example method
  // See https://reactnative.dev/docs/native-modules-android
  @ReactMethod
  override fun multiply(a: Double, b: Double, promise: Promise) {
    promise.resolve(a * b)
  }

  @ReactMethod
  fun enableBlockScreenshot(promise: Promise) {
    val activity: Activity? = currentReactContext.currentActivity
    if (activity != null) {
      activity.runOnUiThread {
        activity.window.setFlags(WindowManager.LayoutParams.FLAG_SECURE, WindowManager.LayoutParams.FLAG_SECURE)
        promise.resolve(null)
      }
    } else {
      promise.reject("E_NO_ACTIVITY", "No activity found")
    }
  }

  @ReactMethod
  fun disableBlockScreenshot(promise: Promise) {
    val activity: Activity? = currentReactContext.currentActivity
    if (activity != null) {
      activity.runOnUiThread {
        activity.window.clearFlags(WindowManager.LayoutParams.FLAG_SECURE)
        promise.resolve(null)
      }
    } else {
      promise.reject("E_NO_ACTIVITY", "No activity found")
    }
  }

  companion object {
    const val NAME = "BlockScreenshot"
  }
}
