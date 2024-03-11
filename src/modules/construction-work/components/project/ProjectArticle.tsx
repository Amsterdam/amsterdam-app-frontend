import {ReactNode} from 'react'
import {Box} from '@/components/ui/containers/Box'
import {HorizontalSafeArea} from '@/components/ui/containers/HorizontalSafeArea'
import {Column} from '@/components/ui/layout/Column'
import {LazyImage} from '@/components/ui/media/LazyImage'
import {HtmlContent} from '@/components/ui/text/HtmlContent'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {ArticleType} from '@/modules/construction-work/types/api'
import {ApiImage} from '@/types/api'
import {formatDate} from '@/utils/datetime/formatDate'

type Props = {
  body: string | null
  children?: ReactNode
  id: number
  image?: ApiImage | null
  intro?: string | null
  publicationDate: string
  title: string
  type?: ArticleType
}

export const ProjectArticle = ({
  body,
  children,
  id,
  image,
  intro,
  publicationDate,
  title,
  type = 'article',
}: Props) => (
  <>
    <LazyImage
      accessibilityLabel={image?.alternativeText ?? undefined}
      accessible={!!image?.alternativeText}
      aspectRatio="wide"
      source={image?.sources}
      testID={`ConstructionWorkProjectArticle${id}Image`}
      withMissingSourceFallback={type === 'warning'}
    />
    <HorizontalSafeArea>
      <Box>
        <Column gutter="md">
          {!!publicationDate && (
            <Paragraph testID={`ConstructionWorkProjectArticle${id}Date`}>
              {formatDate(publicationDate)}
            </Paragraph>
          )}
          {!!title && (
            <Title
              testID={`ConstructionWorkProjectArticle${id}Title`}
              text={title}
            />
          )}
          {!!intro && (
            <HtmlContent
              content={intro}
              isIntro
              testID={`ConstructionWorkProjectArticle${id}Intro`}
            />
          )}
          {!!body && (
            <HtmlContent
              content={body}
              testID={`ConstructionWorkProjectArticle${id}Body`}
            />
          )}
        </Column>
      </Box>
      {children}
    </HorizontalSafeArea>
  </>
)
