import {FormProvider, SubmitHandler, useForm} from 'react-hook-form'
import {type NavigationProps} from '@/app/navigation/types'
import {Box} from '@/components/ui/containers/Box'
import {TextInputField} from '@/components/ui/forms/input/TextInputField'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Link} from '@/components/ui/text/Link'
import {Title} from '@/components/ui/text/Title'
import {useSetScreenTitle} from '@/hooks/navigation/useSetScreenTitle'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {ImagePreview} from '@/modules/construction-work-editor/components/ImagePreview'
import {LoginBoundaryScreen} from '@/modules/construction-work-editor/components/LoginBoundaryScreen'
import {
  selectCurrentProjectId,
  selectMainImage,
  selectMainImageDescription,
  selectProject,
  setMainImage,
  setMainImageDescription,
} from '@/modules/construction-work-editor/messageDraftSlice'
import {ConstructionWorkEditorRouteName} from '@/modules/construction-work-editor/routes'

type Props =
  NavigationProps<ConstructionWorkEditorRouteName.addMainImageToMessage>

const maxCharacters = {
  title: 54,
}

type FormData = {
  title: string
}

export const AddMainImageToMessageScreen = ({navigation}: Props) => {
  const dispatch = useDispatch()
  const currentProjectId = useSelector(selectCurrentProjectId)
  const project = useSelector(selectProject(currentProjectId))
  const image = useSelector(selectMainImage(currentProjectId))
  const imageDescription = useSelector(
    selectMainImageDescription(currentProjectId),
  )
  const form = useForm<FormData>()
  const {handleSubmit} = form

  useSetScreenTitle(project?.title)

  const resetAndGoBack = () => {
    dispatch(setMainImage({projectId: currentProjectId, mainImage: undefined}))
    navigation.goBack()
  }

  const onSubmit: SubmitHandler<FormData> = ({title}) => {
    dispatch(
      setMainImageDescription({
        projectId: currentProjectId,
        mainImageDescription: title,
      }),
    )
    navigation.navigate(ConstructionWorkEditorRouteName.confirmMessage, {
      screenHeaderTitle: project?.title ?? '',
    })
  }

  if (!image) {
    return null
  }

  return (
    <LoginBoundaryScreen
      keyboardAware
      testID="ConstructionWorkEditorAddMainImageToMessageScreen">
      <Column grow={1}>
        <Box>
          <Column
            grow={1}
            gutter="md">
            <Title text="Foto toevoegen" />
            <ImagePreview
              image={image}
              onPress={resetAndGoBack}
              testID="ConstructionWorkEditorAddMainImagePreview"
            />
            <FormProvider {...form}>
              <TextInputField
                autoFocus
                defaultValue={imageDescription ?? ''}
                label="Beschrijf kort wat er op de foto staat"
                maxCharacters={maxCharacters.title}
                name="title"
                numberOfLines={3}
                placeholder="Voer een tekst in …"
                rules={{
                  maxLength: {
                    value: maxCharacters.title,
                    message: 'Het maximum aantal tekens is bereikt',
                  },
                  required: 'Vul een tekst in',
                }}
                testID="ConstructionWorkEditorCreateMessageImageDescription"
              />
            </FormProvider>
          </Column>
        </Box>
      </Column>
      <Box>
        <Row align="between">
          <Link
            label="Vorige"
            onPress={navigation.goBack}
            testID="ConstructionWorkEditorAddImageToMessagePreviousButton"
            variant="backward"
          />
          <Link
            label="Volgende"
            onPress={handleSubmit(onSubmit)}
            testID="ConstructionWorkEditorAddImageToMessageNextButton"
            variant="forward"
          />
        </Row>
      </Box>
    </LoginBoundaryScreen>
  )
}
