import {LogBox} from 'react-native'

// logs matching these strings/regexps will be ignored
const ignoreList = [
  // HtmlContent has one additional render due to the use of onLayout, which triggers these warnings; these can safely be ignored
  /^You seem to update props of the "TRenderEngineProvider".*/,
  /^You seem to update the renderersProps prop\(s\) of the "RenderHTML".*/,
]

LogBox.ignoreLogs(ignoreList)

// ignore all log notifications, enable for demos
LogBox.ignoreAllLogs(false)
