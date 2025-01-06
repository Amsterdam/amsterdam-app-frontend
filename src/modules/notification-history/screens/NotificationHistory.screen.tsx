import {useFocusEffect} from '@react-navigation/core'
import {useCallback} from 'react'
import {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {FullScreenError} from '@/components/ui/feedback/error/FullScreenError'
import {ConstructionWorkFigure} from '@/components/ui/media/errors/ConstructionWorkFigure'
import {NotificationHistory} from '@/modules/notification-history/components/NotificationHistory'
import {NotificationHistoryEmpty} from '@/modules/notification-history/components/NotificationHistoryEmpty'
import {NotificationHistoryRouteName} from '@/modules/notification-history/routes'
import {useGetNotificationsQuery} from '@/modules/notification-history/service'

type Props = NavigationProps<NotificationHistoryRouteName.NotificationHistory>

export const NotificationHistoryScreen = ({navigation}: Props) => {
  const {data, isLoading, isError, error, refetch} = useGetNotificationsQuery()

  useFocusEffect(
    useCallback(() => {
      void refetch()
    }, [refetch]),
  )

  if (isLoading) {
    return <PleaseWait testID="NotificationHistoryPleaseWait" />
  }

  if (isError) {
    return (
      <FullScreenError
        buttonLabel="Ga terug"
        error={error}
        Image={ConstructionWorkFigure}
        onPress={() => navigation.goBack()}
        testID="NotificationHistoryError"
        title="Er kunnen geen meldingen worden getoond"
      />
    )
  }

  if (data?.length === 0) {
    return <NotificationHistoryEmpty />
  }

  return (
    <Screen
      scroll={false}
      testID="NotificationHistoryScreen">
      <NotificationHistory data={data} />
    </Screen>
  )
}
