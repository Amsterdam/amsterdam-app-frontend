import {ComponentMeta, Story} from '@storybook/react'
import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {AlertContent, AlertVariant} from '@/components/ui/feedback/Alert.types'
import {AlertTopOfScreen} from '@/components/ui/feedback/AlertTopOfScreen'
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
  component: AlertTopOfScreen,
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
} as ComponentMeta<typeof AlertTopOfScreen>

const AlertStory: Story<AlertState> = ({...alertState}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setAlert({...alertState}))
  })

  return <AlertTopOfScreen />
}

export const Default = AlertStory.bind({})
Default.args = {
  content: {
    title,
    text,
  },
  variant: AlertVariant.information,
}
