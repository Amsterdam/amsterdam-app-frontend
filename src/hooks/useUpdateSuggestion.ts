import {useCallback, useEffect} from 'react'
import {Alert} from 'react-native'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useAppState} from '@/hooks/useAppState'
import {useOpenStore} from '@/hooks/useOpenStore'
import {VersionInfo} from '@/services/modules.service'
import {setLastSeenTimestamp, useLastSeenTimestamp} from '@/store/slices/update'
import {shouldShowUpdateSuggestion} from '@/utils/shouldShowUpdateSuggestion'

export const useUpdateSuggestion = (
  snoozeTimeInHours: number,
  versionInfo?: VersionInfo,
) => {
  const lastSeenTimestamp = useLastSeenTimestamp()
  const dispatch = useDispatch()
  const openStore = useOpenStore()

  const showUpdateSuggestion = useCallback(() => {
    if (
      !versionInfo?.deprecated ||
      !versionInfo?.supported ||
      !shouldShowUpdateSuggestion(snoozeTimeInHours, lastSeenTimestamp)
    ) {
      return
    }

    dispatch(setLastSeenTimestamp(Date.now()))

    Alert.alert(
      'Update de app',
      `Versie ${versionInfo.latest} is beschikbaar`,
      [
        {
          text: 'Naar de app',
          style: 'cancel',
        },
        {
          text: 'Nu updaten',
          onPress: openStore,
          style: 'default',
        },
      ],
      {
        cancelable: true,
      },
    )
  }, [
    versionInfo?.deprecated,
    versionInfo?.supported,
    versionInfo?.latest,
    snoozeTimeInHours,
    lastSeenTimestamp,
    dispatch,
    openStore,
  ])

  useAppState({
    onForeground: showUpdateSuggestion,
  })

  useEffect(showUpdateSuggestion, [showUpdateSuggestion])
}
