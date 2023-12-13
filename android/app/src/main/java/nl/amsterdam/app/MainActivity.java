package nl.amsterdam.app

// Needed by react-navigation:
import android.os.Bundle

// Required for splashscreen
import com.zoontek.rnbootsplash.RNBootSplash

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = 

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
  DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
  }

  // Needed by react-navigation:
  override fun onCreate(Bundle savedInstanceState) {
    RNBootSplash.init(this); // initialize the splashscreen
    super.onCreate(null);
  }
}