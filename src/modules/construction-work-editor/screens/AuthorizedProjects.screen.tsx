import {RouteProp, useRoute} from '@react-navigation/core'
import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
  addConstructionWorkEditorId,
  selectConstructionWorkEditorHasSeenWelcomeMessage,
  selectConstructionWorkEditorId,
  setHasSeenWelcomeMessage,
} from '../slice'
import {RootStackParams} from '@/app/navigation'
import {Alert} from '@/components/ui'
import {Screen} from '@/components/ui/layout'
import {AuthorizedProjects} from '@/modules/construction-work-editor/components'
import {ConstructionWorkEditorRouteName} from '@/modules/construction-work-editor/routes'
import {setAlert} from '@/store'
import {Variant} from '@/types'

export const AuthorizedProjectsScreen = () => {
  const dispatch = useDispatch()
  const hasSeenWelcomeMessage = useSelector(
    selectConstructionWorkEditorHasSeenWelcomeMessage,
  )
  const constructionWorkEditorId = useSelector(selectConstructionWorkEditorId)

  const route =
    useRoute<
      RouteProp<
        RootStackParams,
        ConstructionWorkEditorRouteName.authorizedProjects
      >
    >()
  const deeplinkId = route.params?.id ?? undefined

  useEffect(() => {
    if (deeplinkId) {
      dispatch(addConstructionWorkEditorId(deeplinkId))
    }
  }, [deeplinkId, dispatch])

  useEffect(() => {
    if (!hasSeenWelcomeMessage && constructionWorkEditorId) {
      dispatch(
        setAlert({
          content: {
            text: 'Gelukt, de app herkent je nu als omgevingsmanager voor onderstaande projecten. Klik op het project waarvoor je een bericht wilt plaatsen, om een bericht te maken.',
          },
          variant: Variant.information,
          isVisible: true,
        }),
      )
      dispatch(setHasSeenWelcomeMessage())
    }
  }, [constructionWorkEditorId, dispatch, hasSeenWelcomeMessage])

  return (
    <Screen scroll={false} stickyHeader={<Alert />}>
      <AuthorizedProjects />
    </Screen>
  )
}
