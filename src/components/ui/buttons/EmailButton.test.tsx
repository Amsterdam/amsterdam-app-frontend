import 'react-native'

// Note: import explicitly to use the types shiped with jest.
import {it} from '@jest/globals'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'
import {EmailButton} from '@/components/ui/buttons/EmailButton'
import {StoreProvider} from '@/providers/store.provider'

it('EmailButton renders correctly', () => {
  renderer.create(
    <StoreProvider>
      <EmailButton
        email="test"
        testID="EmailButton"
      />
    </StoreProvider>,
  )
})
