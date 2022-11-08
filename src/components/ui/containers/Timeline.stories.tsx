import {ComponentMeta, ComponentStoryObj} from '@storybook/react'
import {Timeline} from '@/components/ui/containers'

export default {
  component: Timeline,
} as ComponentMeta<typeof Timeline>

export const Default: ComponentStoryObj<typeof Timeline> = {
  args: {
    items: [
      {
        collapsed: false,
        content: [
          {
            title: 'Lorem ipsum 1',
            body: {
              html: '<p>Dolor sit amet 1</p>',
              text: 'Dolor sit amet 1',
            },
          },
        ],
        progress: 'Afgelopen',
        title: 'Titel 1',
      },
      {
        collapsed: true,
        content: [
          {
            title: 'Lorem ipsum 2',
            body: {
              html: '<p>Dolor sit amet 2</p>',
              text: 'Dolor sit amet 2',
            },
          },
        ],
        progress: 'Huidig',
        title: 'Titel 2',
      },
      {
        collapsed: true,
        content: [
          {
            title: 'Lorem ipsum 3',
            body: {
              html: '<p>Dolor sit amet 3</p>',
              text: 'Dolor sit amet 3',
            },
          },
        ],
        progress: 'Toekomst',
        title: 'Titel 3',
      },
    ],
  },
}
