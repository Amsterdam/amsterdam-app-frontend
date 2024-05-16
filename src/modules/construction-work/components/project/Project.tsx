import {Box} from '@/components/ui/containers/Box'
import {HorizontalSafeArea} from '@/components/ui/containers/HorizontalSafeArea'
import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {Column} from '@/components/ui/layout/Column'
import {FullScreenError} from '@/components/ui/layout/FullScreenError'
import {FigureWithFacadesBackground} from '@/components/ui/media/FigureWithFacadesBackground'
import {LazyImage} from '@/components/ui/media/LazyImage'
import {ConstructionWorkDetailFigure} from '@/components/ui/media/errors/ConstructionWorkDetailFigure'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useSetScreenTitle} from '@/hooks/navigation/useSetScreenTitle'
import {useSelectedAddress} from '@/modules/address/hooks/useSelectedAddress'
import {getAddressParam} from '@/modules/address/utils/getAddressParam'
import ProjectWarningFallbackImage from '@/modules/construction-work/assets/images/project-warning-fallback.svg'
import {ArticleOverview} from '@/modules/construction-work/components/article/ArticleOverview'
import {ProjectFollow} from '@/modules/construction-work/components/project/ProjectFollow'
import {ProjectSegmentMenu} from '@/modules/construction-work/components/project/ProjectSegmentMenu'
import {getAccessibleDistanceText} from '@/modules/construction-work/components/projects/utils/getAccessibleDistanceText'
import {ProjectTraits} from '@/modules/construction-work/components/shared/ProjectTraits'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'
import {useProjectDetailsQuery} from '@/modules/construction-work/service'
import {accessibleText} from '@/utils/accessibility/accessibleText'

type Props = {
  id: number
}

export const Project = ({id}: Props) => {
  const {address} = useSelectedAddress()
  const navigation = useNavigation()
  const addressParam = getAddressParam(address)
  const {
    data: project,
    isLoading,
    isFetching,
    error: projectError,
  } = useProjectDetailsQuery({id, ...addressParam})

  useSetScreenTitle(project?.title)

  if (isLoading) {
    return <PleaseWait testID="ConstructionWorkProjectLoadingSpinner" />
  }

  if (!project) {
    return (
      <FullScreenError
        backgroundVisible={false}
        buttonLabel="Ga terug"
        error={projectError}
        Image={ConstructionWorkDetailFigure}
        onPress={() =>
          navigation.navigate(ConstructionWorkRouteName.constructionWork)
        }
        testProps={{
          testID: 'ProjectDetailErrorScreen',
        }}
        title="Geen project gevonden"
      />
    )
  }

  const {image, followed, followers, meter, strides, subtitle, title} = project

  return (
    <Column>
      <LazyImage
        aspectRatio="wide"
        fallbackInheritsAspectRatio={false}
        missingSourceFallback={
          <FigureWithFacadesBackground testID="ConstructionWorkProjectImageFallback">
            <ProjectWarningFallbackImage />
          </FigureWithFacadesBackground>
        }
        source={image?.sources}
        testID="ConstructionWorkProjectImage"
      />
      <HorizontalSafeArea>
        <Box>
          <Column gutter="lg">
            <ProjectFollow
              followers={followers}
              isFetchingProject={isFetching}
              isProjectFollowed={followed}
              projectId={id}
              projectTitle={title}
            />
            <Column gutter="md">
              <ProjectTraits
                accessibilityLabel={accessibleText(
                  getAccessibleDistanceText(meter, strides),
                )}
                byDistance={!!address}
                project={project}
              />
              <SingleSelectable
                accessibilityLabel={accessibleText(title, subtitle)}
                accessibilityRole="header">
                {!!title && (
                  <Title
                    testID="ConstructionWorkProjectTitle"
                    text={title}
                  />
                )}
                {!!subtitle && (
                  <Title
                    level="h4"
                    testID="ConstructionWorkProjectSubtitle"
                    text={subtitle}
                  />
                )}
              </SingleSelectable>
            </Column>
            <ProjectSegmentMenu project={project} />
            <ArticleOverview
              projectId={id}
              projectTitle={title}
              title="Nieuws"
            />
          </Column>
        </Box>
      </HorizontalSafeArea>
    </Column>
  )
}
