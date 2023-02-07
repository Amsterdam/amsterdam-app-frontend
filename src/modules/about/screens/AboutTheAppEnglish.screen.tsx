import React, {useContext} from 'react'
import {ImageURISource} from 'react-native'
import {Box, HorizontalSafeArea} from '@/components/ui/containers'
import {Column, Row, Screen} from '@/components/ui/layout'
import {Icon, Image} from '@/components/ui/media'
import {Paragraph, Title} from '@/components/ui/text'
import {DeviceContext} from '@/providers'

export const AboutTheAppEnglishScreen = () => {
  const {isLandscape} = useContext(DeviceContext)
  const Track = isLandscape ? Row : Column

  return (
    <Screen
      testID="AboutScreenAboutTheAppEnglish"
      withLeftInset={false}
      withRightInset={false}>
      <Column gutter="lg">
        <Image
          source={
            require('@/modules/about/assets/traffic-cycling.1280.50.jpg') as ImageURISource
          }
        />
        <HorizontalSafeArea>
          <Box>
            <Column gutter="lg">
              <Column gutter="sm">
                <Title
                  text="1 app for all citizens of Amsterdam"
                  accessibilityLanguage="en-US"
                />
                <Paragraph variant="intro" accessibilityLanguage="en-US">
                  The Amsterdam app quickly provides information tailored to
                  you. Take care of affairs with ease, like:
                </Paragraph>
              </Column>
              <Track gutter="lg">
                <Column gutter="sm">
                  <Icon name="trash-bin" size="xl" />
                  <Title
                    level="h5"
                    text="Waste information"
                    accessibilityLanguage="en-US"
                  />
                  <Paragraph accessibilityLanguage="en-US">
                    You can enter your address to look up where to dispose of
                    bulky (oversized) waste. This also helps to locate the
                    nearest waste and glass containers.
                  </Paragraph>
                </Column>
                <Column gutter="sm">
                  <Icon name="construction-work" size="xl" />
                  <Title
                    level="h5"
                    text="Road work"
                    accessibilityLanguage="en-US"
                  />
                  <Paragraph accessibilityLanguage="en-US">
                    The City often performs maintenance on streets, bridges,
                    quays, and buildings. ‘Werkzaamheden’ lists the projects in
                    your area. You can follow a project in the app. If you do
                    so, we keep you up-to-date with any construction work.
                  </Paragraph>
                </Column>
                <Column gutter="sm">
                  <Icon name="alert" size="xl" />
                  <Title
                    level="h5"
                    text="Report it"
                    accessibilityLanguage="en-US"
                  />
                  <Paragraph accessibilityLanguage="en-US">
                    Is a waste container full, a lamppost not working, or is
                    rubbish lying on the street? You can report any of that
                    within the app. We will take care of these problems as
                    quickly as possible.
                  </Paragraph>
                </Column>
              </Track>
            </Column>
          </Box>
        </HorizontalSafeArea>
        <Image
          source={
            require('@/modules/about/assets/people-in-park.1280.50.jpg') as ImageURISource
          }
        />
        <HorizontalSafeArea>
          <Box>
            <Track gutter="lg">
              <Column gutter="sm">
                <Title
                  level="h2"
                  text="1 app for all citizens of Amsterdam and Weesp"
                  accessibilityLanguage="en-US"
                />
                <Paragraph accessibilityLanguage="en-US">
                  We make 1 app for everyone living in Amsterdam or Weesp. The
                  app has been designed to be usable for anyone.
                </Paragraph>
              </Column>
              <Column gutter="sm">
                <Title
                  level="h2"
                  text="More topics in the future"
                  accessibilityLanguage="en-US"
                />
                <Paragraph accessibilityLanguage="en-US">
                  This version of the Amsterdam app offers topics that benefit
                  everyone. It is the start of more features and languages to
                  come. We’ll keep improving the app this way.
                </Paragraph>
              </Column>
            </Track>
          </Box>
        </HorizontalSafeArea>
      </Column>
    </Screen>
  )
}
