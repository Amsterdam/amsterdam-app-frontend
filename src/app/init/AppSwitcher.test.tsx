import 'react-native'

// Note: import explicitly to use the types shiped with jest.
import {it} from '@jest/globals'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'
import {AppSwitcher} from '@/app/init/AppSwitcher'
import {StoreProvider} from '@/providers/store.provider'

it('AppSwitcher renders correctly', () => {
  renderer.create(
    <StoreProvider>
      <AppSwitcher />
    </StoreProvider>,
  )
})
