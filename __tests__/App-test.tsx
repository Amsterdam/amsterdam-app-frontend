import 'react-native'
import renderer from 'react-test-renderer'
import {App} from '@/app/App'

// Note: test renderer must be required after react-native.

it('renders correctly', () => {
  renderer.create(<App />)
})
