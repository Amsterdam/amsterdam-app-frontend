import {type ReactNode, useCallback} from 'react'
import type {Module} from '@/modules/types'
import type {NotificationModule} from '@/modules/user/types'
import {Box} from '@/components/ui/containers/Box'
import {Switch} from '@/components/ui/forms/Switch'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {
  useAddDisabledPushModuleMutation,
  useDeleteDisabledPushModuleMutation,
} from '@/modules/user/service'
import {accessibleText} from '@/utils/accessibility/accessibleText'

type Props = {
  isDisabled: boolean
  notificationModule: NotificationModule & Module
}

export const NotificationSetting = ({
  isDisabled,
  notificationModule: {description, module, title},
}: Props) => {
  const [addDisabledPushModule, {isLoading: isLoadingDisable}] =
    useAddDisabledPushModuleMutation()
  const [deleteDisabledPushModule, {isLoading: isLoadingEnable}] =
    useDeleteDisabledPushModuleMutation()

  const isLoading = isLoadingDisable || isLoadingEnable

  const onChange = useCallback(() => {
    if (isLoading) {
      return
    }

    if (isDisabled) {
      void deleteDisabledPushModule(module)
    } else {
      void addDisabledPushModule(module)
    }
  }, [
    isLoading,
    isDisabled,
    deleteDisabledPushModule,
    module,
    addDisabledPushModule,
  ])

  return (
    <Column gutter="sm">
      <Switch
        accessibilityLabel={accessibleText(module, description)}
        disabled={isLoading}
        label={
          <Title
            level="h5"
            text={title}
          />
        }
        onChange={onChange}
        testID={`NotificationSetting${module}Switch`}
        value={!isDisabled}
        wrapper={SwitchWrapper}
      />
      <Box insetHorizontal="md">
        <Phrase
          accessible={false}
          testID={`NotificationSetting${module}Description`}
          variant="small">
          {description}
        </Phrase>
      </Box>
    </Column>
  )
}

type SwitchWrapperProps = {
  children: ReactNode
}

const SwitchWrapper = ({children}: SwitchWrapperProps) => (
  <Box
    insetHorizontal="md"
    insetVertical="sm"
    variant="distinct">
    {children}
  </Box>
)
