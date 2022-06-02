import {RouteProp, useNavigation} from '@react-navigation/native'
import React, {useLayoutEffect} from 'react'
import {useWindowDimensions} from 'react-native'
import {RenderHTML} from 'react-native-render-html'
import {Box, NonScalingHeaderTitle, Timeline} from '../../../components/ui'
import {Column, ScrollView} from '../../../components/ui/layout'
import {Title} from '../../../components/ui/typography'
import {tagsStyles} from '../../../styles/html'
import {font} from '../../../tokens'
import {regexLibrary} from '../../../utils'
import {ProjectsRouteName, ProjectsStackParams} from '../routes'

type ProjectDetailBodyScreenRouteProp = RouteProp<
  ProjectsStackParams,
  ProjectsRouteName.projectDetailBody
>

type Props = {
  route: ProjectDetailBodyScreenRouteProp
}

export const ProjectDetailBodyScreen = ({route}: Props) => {
  const {body} = route.params
  const navigation = useNavigation()
  const {width} = useWindowDimensions()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <NonScalingHeaderTitle text={body.title} />,
    })
  })

  return (
    <ScrollView>
      <Box>
        <Column gutter="md">
          <Title text={body.title} />
          {body.sections.map(section => (
            <Column gutter="sm" key={section.title}>
              <Title level="h2" text={section.title} />
              <RenderHTML
                contentWidth={width}
                source={{
                  html: section.html
                    .replace(
                      regexLibrary.plainPublish.regex,
                      regexLibrary.plainPublish.replace,
                    )
                    .replace(
                      regexLibrary.quotePublish.regex,
                      regexLibrary.quotePublish.replace,
                    ),
                }}
                systemFonts={[font.weight.regular, font.weight.demi]}
                tagsStyles={tagsStyles}
              />
            </Column>
          ))}
          {body.timeline?.items?.length && (
            <Timeline items={body.timeline.items} />
          )}
        </Column>
      </Box>
    </ScrollView>
  )
}
