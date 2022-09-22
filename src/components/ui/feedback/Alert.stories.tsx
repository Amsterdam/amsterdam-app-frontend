import {ComponentMeta, Story} from '@storybook/react'
import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {Alert} from '@/components/ui/feedback'
import {AlertSliceState, Content, setAlert} from '@/store/alertSlice'
import {CloseType, Variant} from '@/types'

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
      options: CloseType,
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
      options: Variant,
      control: {
        type: 'radio',
      },
    },
  },
} as ComponentMeta<typeof Alert>

const AlertStory: Story<AlertSliceState> = ({...alertState}) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setAlert({...alertState}))
  })
  return <Alert />
}

export const Default = AlertStory.bind({})
Default.args = {
  closeType: CloseType.withoutButton,
  content: {
    title,
    text,
  },
  isVisible: true,
  variant: Variant.information,
  withIcon: false,
}
