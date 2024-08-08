import 'react-native'

// Note: import explicitly to use the types shiped with jest.
import {it} from '@jest/globals'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'
import {Button} from '@/components/ui/buttons/Button'
import {StoreProvider} from '@/providers/store.provider'

it('Button renders correctly', () => {
  renderer.create(
    <StoreProvider>
      <Button testID="Button" />
    </StoreProvider>,
  )
})
