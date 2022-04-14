package com.stadsapp;

import com.facebook.react.ReactActivity;
import android.os.Bundle;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "StadsApp";
  }

  /**
   * Added as part of the react-native-screens setup, see: https://github.com/software-mansion/react-native-screens#android
   */
  @Override
  protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(null);
  }
}
