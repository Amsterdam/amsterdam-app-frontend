import {useCallback} from 'react'
import {FlatList, type ListRenderItem} from 'react-native'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {FullScreenError} from '@/components/ui/feedback/error/FullScreenError'
import {ConstructionWorkFigure} from '@/components/ui/media/errors/ConstructionWorkFigure'
import {useBlurEffect} from '@/hooks/navigation/useBlurEffect'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useModules} from '@/hooks/useModules'
import {NotificationHistoryEmpty} from '@/modules/notification-history/components/NotificationHistoryEmpty'
import {NotificationHistoryItem} from '@/modules/notification-history/components/NotificationHistoryItem'
import {NotificationHistoryListFooter} from '@/modules/notification-history/components/NotificationHistoryListFooter'
import {
  useGetNotificationsQuery,
  useMarkAllNotificationsReadMutation,
} from '@/modules/notification-history/service'
import {type Notification} from '@/modules/notification-history/types'

export const NotificationHistory = () => {
  const {data, isLoading, isError, error} = useGetNotificationsQuery()
  const {enabledModules} = useModules()
  const navigation = useNavigation()

  const renderItem = useCallback<ListRenderItem<Notification>>(
    ({item}) => (
      <NotificationHistoryItem
        enabledModules={enabledModules}
        item={item}
      />
    ),
    [enabledModules],
  )
  const [markAllNotificationsRead, {}] = useMarkAllNotificationsReadMutation()

  useBlurEffect(() => {
    void markAllNotificationsRead()
  })

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
    <FlatList
      data={data}
      keyExtractor={({id}) => id}
      ListFooterComponent={NotificationHistoryListFooter}
      renderItem={renderItem}
    />
  )
}
