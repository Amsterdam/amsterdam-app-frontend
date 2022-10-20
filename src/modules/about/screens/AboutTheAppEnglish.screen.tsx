/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react'
import {Box, HorizontalSafeArea} from '@/components/ui/containers'
import {Column, Screen} from '@/components/ui/layout'
import {Icon, Image} from '@/components/ui/media'
import {Paragraph, Title} from '@/components/ui/text'

export const AboutTheAppEnglishScreen = () => (
  <Screen withLeftInset={false} withRightInset={false}>
    <Column gutter="lg">
      <Image source={require('@/modules/about/assets/traffic-cycling.jpeg')} />
      <HorizontalSafeArea>
        <Box>
          <Column gutter="lg">
            <Column gutter="sm">
              <Title text="1 app for all the citizens of Amsterdam" />
              <Paragraph variant="intro">
                With the Amsterdam app you quickly get information tailored for
                you. You can easily arrange topics like:
              </Paragraph>
            </Column>
            <Column gutter="sm">
              <Icon name="trash-bin" size={32} />
              <Title level="h5" text="Waste information" />
              <Paragraph>
                If you enter your address (optional) you can lookup where to
                deposit your bulky (oversized) waste. It also helps you where to
                find the nearest waste or glass containers
              </Paragraph>
            </Column>
            <Column gutter="sm">
              <Icon name="construction-work" size={32} />
              <Title level="h5" text="Road work" />
              <Paragraph>
                The municipality often has maintenance on streets, quays,
                bridges and buildings. In 'Werkzaamheden' you can see the
                projects of your area. You can follow a project in the app. If
                you follow a project, you are always up to date with any
                activities.
              </Paragraph>
            </Column>
            <Column gutter="sm">
              <Icon name="alert" size={32} />
              <Title level="h5" text="Report it" />
              <Paragraph>
                Is the waste container full, the lamppost not working or rubbish
                on the street? You can report all of that within the app. We
                will solve these problems for you as soon as possible.
              </Paragraph>
            </Column>
          </Column>
        </Box>
      </HorizontalSafeArea>{' '}
      <Image source={require('@/modules/about/assets/people-in-park.jpeg')} />
      <HorizontalSafeArea>
        <Box>
          <Column gutter="lg">
            <Column gutter="sm">
              <Title
                level="h2"
                text="1 app for all the citizens of Amsterdam and Weesp"
              />
              <Paragraph>
                We make one app for all the people who live in Amsterdam and
                Weesp. The app is designed so that anyone can use it.
              </Paragraph>
            </Column>
            <Column gutter="sm">
              <Title level="h2" text="More topics in the future" />
              <Paragraph>
                This version of the Amsterdam app has topics that will benefit
                everyone. This is the start of many more topics and languages to
                come. This is how we keep improving the app.
              </Paragraph>
            </Column>
          </Column>
        </Box>
      </HorizontalSafeArea>
    </Column>
  </Screen>
)
