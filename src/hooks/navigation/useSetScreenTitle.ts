import {useLayoutEffect} from 'react'
import {RootStackParams, TitleParams} from '@/app/navigation/types'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useRoute} from '@/hooks/navigation/useRoute'

/**
 * Set the screen title, using the `screenHeaderTitle` param as defined in type `TitleParams`. Returns the screen title for further use.
 */
export const useSetScreenTitle = <RouteName extends keyof RootStackParams>(
  defaultTitle = '',
) => {
  const navigation = useNavigation<RouteName>()
  const {params} = useRoute<RouteName>()

  const {screenHeaderTitle} = params as unknown as TitleParams

  const headerTitle = screenHeaderTitle ?? defaultTitle

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle,
    })
  }, [headerTitle, navigation])

  return headerTitle
}
