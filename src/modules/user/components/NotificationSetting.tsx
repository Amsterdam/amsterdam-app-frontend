import {ReactNode, useCallback} from 'react'
import {Box} from '@/components/ui/containers/Box'
import {Switch} from '@/components/ui/forms/Switch'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {ApiSlug} from '@/environment'
import {
  useAddDisabledPushModuleMutation,
  useDeleteDisabledPushModuleMutation,
} from '@/modules/user/service'
import {NotificationModule} from '@/modules/user/types'
import {accessibleText} from '@/utils/accessibility/accessibleText'

type Props = {
  isDisabled: boolean
  notificationModule: NotificationModule
}

export const NotificationSetting = ({
  isDisabled,
  notificationModule: {description, module},
}: Props) => {
  const [addDisabledPushModule] = useAddDisabledPushModuleMutation()
  const [deleteDisabledPushModule] = useDeleteDisabledPushModuleMutation()

  const onChange = useCallback(
    (apiSlug: ApiSlug) => {
      if (isDisabled) {
        void deleteDisabledPushModule(apiSlug)
      } else {
        void addDisabledPushModule(apiSlug)
      }
    },
    [isDisabled, addDisabledPushModule, deleteDisabledPushModule],
  )

  return (
    <Column gutter="sm">
      <Switch
        accessibilityLabel={accessibleText(module, description)}
        label={
          <Title
            level="h5"
            text={module} // TODO: Change to module name once implemented in endpoint (#152107)
          />
        }
        onChange={() => onChange(module)}
        testID={`NotificationSetting${module}Switch`}
        value={!isDisabled}
        wrapper={SwitchWrapper}
      />
      <Box insetHorizontal="md">
        <Phrase
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
