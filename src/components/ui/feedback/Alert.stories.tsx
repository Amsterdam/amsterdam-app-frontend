import {ComponentMeta, Story} from '@storybook/react'
import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {AlertContent, AlertVariant} from '@/components/ui/feedback/Alert.types'
import {StatefulAlert} from '@/components/ui/feedback/AlertStateful'
import {AlertState, setAlert} from '@/store/slices/alert'

const title = 'Title'
const text = 'U kunt een dagontheffing of jaarontheffing aanvragen'

type Contents = {
  [key in 'withTitle' | 'withoutTitle']: AlertContent
}

const contents: Contents = {
  withTitle: {
    title,
    text,
  },
  withoutTitle: {
    title: '',
    text,
  },
}

export default {
  component: StatefulAlert,
  argTypes: {
    closeType: {
      control: {type: 'radio'},
    },
    content: {
      control: {
        type: 'radio',
      },
      options: [...Object.keys(contents)],
      mapping: contents,
    },
    isVisible: {
      table: {
        disable: true,
      },
    },
    variant: {
      options: AlertVariant,
      control: {
        type: 'radio',
      },
    },
  },
} as ComponentMeta<typeof StatefulAlert>

const AlertStory: Story<AlertState> = ({...alertState}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setAlert({...alertState}))
  })

  return <StatefulAlert />
}

export const Default = AlertStory.bind({})
Default.args = {
  content: {
    title,
    text,
  },
  variant: AlertVariant.information,
  hasIcon: false,
}
