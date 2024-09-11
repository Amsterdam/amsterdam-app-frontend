import {Header} from '@/components/features/header/Header'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useRoute} from '@/hooks/navigation/useRoute'
import {useSelector} from '@/hooks/redux/useSelector'
import {selectIsBottomSheetPresentRouteNames} from '@/store/slices/bottomSheet'

export const ScreenHeader = () => {
  const isBottomSheetPresentRouteNames = useSelector(
    selectIsBottomSheetPresentRouteNames,
  )
  const navigation = useNavigation()
  const route = useRoute()
  const isBottomSheetPresent = isBottomSheetPresentRouteNames.includes(
    route.name,
  )

  return (
    !!isBottomSheetPresent &&
    !!route && (
      <Header
        back={{}}
        navigation={navigation}
        route={route}
      />
    )
  )
}
