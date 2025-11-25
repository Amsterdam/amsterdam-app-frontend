import {AddLicensePlateForm} from './AddLicensePlateForm'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

const meta = {
  component: AddLicensePlateForm,
} satisfies Meta<typeof AddLicensePlateForm>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
