import 'react-native'

// Note: import explicitly to use the types shiped with jest.
import {it} from '@jest/globals'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'
import {Tag} from '@/components/ui/text/Tag'
import {StoreProvider} from '@/providers/store.provider'

it('Tag renders correctly', () => {
  renderer.create(
    <StoreProvider>
      <Tag label="Label" />
    </StoreProvider>,
  )
})
