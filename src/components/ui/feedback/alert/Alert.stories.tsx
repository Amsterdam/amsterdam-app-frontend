import {Meta, StoryObj} from '@storybook/react'
import {
  AlertContent,
  AlertProps,
  AlertVariant,
} from '@/components/ui/feedback/alert/Alert.types'
import {AlertBase} from '@/components/ui/feedback/alert/AlertBase'

const title = 'Titel'
const text = 'U kunt een dagontheffing of jaarontheffing aanvragen'

type Contents = {
  [key in 'With title' | 'Without title']: AlertContent
}

const contents: Contents = {
  ['With title']: {
    title,
    text,
  },
  ['Without title']: {
    title: '',
    text,
  },
}

const meta: Meta<typeof AlertBase> = {
  component: AlertBase,
  argTypes: {
    content: {
      control: {
        type: 'radio',
      },
      options: [...Object.keys(contents)],
      mapping: contents,
    },
    hasCloseIcon: {
      type: 'boolean',
    },
    inset: {
      table: {
        disable: true,
      },
    },
    testID: {
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
  args: {
    content: {
      title,
      text,
    },
  },
}

export default meta

type Story = StoryObj<Omit<AlertProps, 'testID' | 'inset'>>

export const Default: Story = {}
