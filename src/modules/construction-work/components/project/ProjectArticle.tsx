import {ReactNode} from 'react'
import {Box} from '@/components/ui/containers/Box'
import {HorizontalSafeArea} from '@/components/ui/containers/HorizontalSafeArea'
import {Column} from '@/components/ui/layout/Column'
import {FigureWithFacadesBackground} from '@/components/ui/media/FigureWithFacadesBackground'
import {Image} from '@/components/ui/media/Image'
import {HtmlContent} from '@/components/ui/text/HtmlContent'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import ProjectWarningFallbackImage from '@/modules/construction-work/assets/images/project-warning-fallback.svg'
import {Article, ArticleType} from '@/modules/construction-work/types/api'
import {useTheme} from '@/themes/useTheme'
import {formatDate} from '@/utils/datetime/formatDate'

type Props = {
  article: Article
  children?: ReactNode
  type?: ArticleType
}

export const ProjectArticle = ({
  article,
  children,
  type = 'article',
}: Props) => {
  const {media} = useTheme()

  const {body, id, image, intro, publication_date, title} = article

  return (
    <>
      {!!image && (
        <Image
          accessibilityLabel={image.alternativeText ?? undefined}
          accessible={!!image.alternativeText}
          aspectRatio="wide"
          source={image.sources}
          testID={`ConstructionWorkProjectArticle${id}Image`}
        />
      )}
      {!image && type === 'warning' && (
        <FigureWithFacadesBackground
          height={media.figureHeight.md}
          Image={<ProjectWarningFallbackImage />}
          imageAspectRatio={media.aspectRatio.extraWide}
          testID={`ConstructionWorkProjectArticle${id}Image`}
        />
      )}
      <HorizontalSafeArea>
        <Box>
          <Column gutter="md">
            {!!publication_date && (
              <Paragraph testID={`ConstructionWorkProjectArticle${id}Date`}>
                {formatDate(publication_date)}
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
}
