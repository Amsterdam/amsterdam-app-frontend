import {ComponentMeta, Story} from '@storybook/react'
import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {Alert} from '@/components/ui/feedback'
import {
  AlertCloseType,
  AlertVariant,
} from '@/components/ui/feedback/Alert.types'
import {AlertState, Content, setAlert} from '@/store/slices/alert'

const title = 'Title'
const text = 'U kunt een dagontheffing of jaarontheffing aanvragen'

type Contents = {
  [key in 'withTitle' | 'withoutTitle']: Content
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
  component: Alert,
  argTypes: {
    closeType: {
      options: AlertCloseType,
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
} as ComponentMeta<typeof Alert>

const AlertStory: Story<AlertState> = ({...alertState}) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setAlert({...alertState}))
  })
  return <Alert />
}

export const Default = AlertStory.bind({})
Default.args = {
  closeType: AlertCloseType.withoutButton,
  content: {
    title,
    text,
  },
  variant: AlertVariant.information,
  withIcon: false,
}
