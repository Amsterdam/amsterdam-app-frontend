import {Header} from '@/components/features/header/Header'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useRoute} from '@/hooks/navigation/useRoute'

export const ScreenHeader = () => {
  const navigation = useNavigation()
  const route = useRoute()

  return (
    <Header
      back={{}}
      navigation={navigation}
      route={route}
    />
  )
}
