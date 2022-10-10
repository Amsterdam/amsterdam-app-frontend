import {ComponentMeta, ComponentStory} from '@storybook/react'
import React from 'react'
import {Link} from './Link'

export default {
  component: Link,
} as ComponentMeta<typeof Link>

export const Default: ComponentStory<typeof Link> = args => <Link {...args} />
Default.args = {
  label: 'Klik mij ik ben een link',
  variant: 'default',
}
