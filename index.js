// somehow required for the redux devtools
Symbol.asyncIterator ??= Symbol.for('Symbol.asyncIterator')
/* eslint-disable no-restricted-imports */
import 'react-native-gesture-handler'
import {AppRegistry} from 'react-native'
import {name as appName} from './app.json'
import {App} from './src/app/App'

AppRegistry.registerComponent(appName, () => App)
