// Source: https://github.com/ArturKalach/react-native-a11y/blob/master/docs/AndroidInput.md
package nl.amsterdam.app.textinput

import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.views.textinput.ReactEditText
import com.facebook.react.views.textinput.ReactTextInputManager

internal class RCTEditTextManager : ReactTextInputManager() {
    // Copied react native text input manager, just copy pasted
    override fun createViewInstance(context: ThemedReactContext): ReactEditText {
        //Changed this line
        val editText: ReactEditText = RCTEditText(context)
        val inputType = editText.inputType
        editText.inputType = inputType and -131073
        editText.returnKeyType = "done"
        return editText
    }
}