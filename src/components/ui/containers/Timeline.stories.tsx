import {ComponentMeta, ComponentStoryObj} from '@storybook/react'
import {Timeline} from '@/components/ui/containers/Timeline'

export default {
  component: Timeline,
} as ComponentMeta<typeof Timeline>

export const Default: ComponentStoryObj<typeof Timeline> = {
  args: {
    items: [
      {
        collapsed: false,
        body: '<p>Dolor sit amet 1</p>',
        date: '',
        items: [
          {
            title: 'Lorem ipsum 1.1',
            body: '<p>Dolor sit amet 1.1</p>',
            date: '',
          },
          {
            title: 'Lorem ipsum 1.2',
            body: '<p>Dolor sit amet 1.2</p>',
            date: '',
          },
        ],
        progress: 'Afgelopen',
        title: 'Titel 1',
      },
      {
        collapsed: true,
        body: '<p>Dolor sit amet 2</p>',
        date: '',
        items: [
          {
            title: 'Lorem ipsum 2.1',
            body: '<p>Dolor sit amet 2.1</p>',
            date: '',
          },
        ],
        progress: 'Huidig',
        title: 'Titel 2',
      },
      {
        collapsed: true,
        body: '<p>Dolor sit amet 3</p>',
        date: '',
        items: [
          {
            title: 'Lorem ipsum 3.1',
            body: '<p>Dolor sit amet 3.1</p>',
            date: '',
          },
          {
            title: 'Lorem ipsum 3.2',
            body: '<p>Dolor sit amet 3.2</p>',
            date: '',
          },
        ],
        progress: 'Aankomend',
        title: 'Titel 3',
      },
    ],
  },
}
