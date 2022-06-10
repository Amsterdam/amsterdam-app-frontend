import React from 'react'
import {Column} from '../../../../components/ui/layout'
import {Title} from '../../../../components/ui/typography'
import {RenderHTML} from '../../../../components/ui/typography/RenderHTML'
import {tagsStyles} from '../../../../styles/html'
import {font} from '../../../../tokens'
import {Section} from '../../../../types'
import {regexLibrary} from '../../../../utils'

type Props = {
  sections: Section[]
}

export const ProjectContentSections = ({sections}: Props) => {
  return (
    <>
      {sections.map(section => (
        <Column gutter="sm" key={section.title}>
          <Title level="h2" text={section.title} />
          <RenderHTML
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
    </>
  )
}
