import {render} from '@testing-library/react-native'
import {Button} from '@/components/ui/buttons/Button'
import {StoreProvider} from '@/providers/store.provider'

it('Button renders correctly', () => {
  render(
    <StoreProvider>
      <Button testID="Button" />
    </StoreProvider>,
  )
})
