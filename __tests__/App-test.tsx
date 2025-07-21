import ReactTestRenderer from 'react-test-renderer'
import {App} from '@/app/App'

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />)
  })
})
