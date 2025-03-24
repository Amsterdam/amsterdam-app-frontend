import {FC} from 'react'
import {ParkingLoginForm} from './ParkingLoginForm'
import {ParkingLoginFormProvider} from './ParkingLoginFormProvider'
import type {Meta, StoryObj} from '@storybook/react'

const formProviderDecorator = (Story: FC) => (
  <ParkingLoginFormProvider>
    <Story />
  </ParkingLoginFormProvider>
)

const meta = {
  component: ParkingLoginForm,
  decorators: [formProviderDecorator],
} satisfies Meta<typeof ParkingLoginForm>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
