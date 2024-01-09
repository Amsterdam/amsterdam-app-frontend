// Source: https://github.com/ArturKalach/react-native-a11y/blob/master/docs/AndroidInput.md
package nl.amsterdam.app.textinput

import android.content.Context
import android.graphics.Rect
import com.facebook.react.views.textinput.ReactEditText

class RCTEditText(context: Context?) : ReactEditText(context) {
    override fun requestFocus(direction: Int, previouslyFocusedRect: Rect?): Boolean {
        if (direction == FOCUS_FORWARD || direction == FOCUS_BACKWARD) {
            requestFocusFromJS()
        }
        return super.requestFocus(direction, previouslyFocusedRect)
    }
}