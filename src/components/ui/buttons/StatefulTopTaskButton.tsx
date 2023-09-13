import {
  TopTaskButton,
  TopTaskButtonProps,
} from '@/components/ui/buttons/TopTaskButton'

type StatefulTopTaskButtonProps = {
  state: 'loading' | 'error' | 'default'
} & TopTaskButtonProps

export const StatefulTopTaskButton = ({
  state,
  ...topTaskButtonProps
}: StatefulTopTaskButtonProps) => {
  const {text: buttonText, iconName: buttonIconName} = topTaskButtonProps
  let iconName: TopTaskButtonProps['iconName']
  let text: TopTaskButtonProps['text']

  switch (state) {
    case 'loading':
      text = '...'
      iconName = 'spinner'
      break
    case 'error':
      text = 'Er gaat iets mis. Probeer het later nog een keer.'
      iconName = 'alert'
      break
    default:
      text = buttonText
      iconName = buttonIconName
  }

  return (
    <TopTaskButton
      {...topTaskButtonProps}
      error={state === 'error'}
      iconName={iconName}
      text={text}
    />
  )
}
