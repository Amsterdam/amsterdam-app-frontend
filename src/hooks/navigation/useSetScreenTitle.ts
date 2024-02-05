import {useLayoutEffect} from 'react'
import {RootStackParams, TitleParams} from '@/app/navigation/types'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useRoute} from '@/hooks/navigation/useRoute'

/**
 * Set the screen title, using the `screenHeaderTitle` param as defined in type `TitleParams`.
 */
export const useSetScreenTitle = <RouteName extends keyof RootStackParams>(
  defaultTitle = '',
) => {
  const navigation = useNavigation<RouteName>()
  const {params} = useRoute<RouteName>()

  const {screenHeaderTitle} = params as unknown as TitleParams

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: screenHeaderTitle ?? defaultTitle,
    })
  }, [defaultTitle, navigation, screenHeaderTitle])
}
