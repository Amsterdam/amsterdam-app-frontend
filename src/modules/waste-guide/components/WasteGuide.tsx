import {skipToken} from '@reduxjs/toolkit/dist/query'
import {Box} from '@/components/ui/containers/Box'
import {HorizontalSafeArea} from '@/components/ui/containers/HorizontalSafeArea'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {FigureWithFacadesBackground} from '@/components/ui/media/FigureWithFacadesBackground'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {ChangeLocationButton} from '@/modules/address/components/location/ChangeLocationButton'
import {AddressCity} from '@/modules/address/types'
import {ModuleSlug} from '@/modules/slugs'
import HouseholdWasteToContainerImage from '@/modules/waste-guide/assets/images/household-waste-to-container.svg'
import WasteGuideNotFoundImage from '@/modules/waste-guide/assets/images/waste-guide-not-found.svg'
import {WasteGuideForAmsterdam} from '@/modules/waste-guide/components/WasteGuideForAmsterdam'
import {WasteGuideForWeesp} from '@/modules/waste-guide/components/WasteGuideForWeesp'
import {WasteGuideNotFound} from '@/modules/waste-guide/components/WasteGuideNotFound'
import {useSelectedAddressForWasteGuide} from '@/modules/waste-guide/hooks/useSelectedAddressForWasteGuide'
import {useGetGarbageCollectionAreaQuery} from '@/modules/waste-guide/service'
import {WasteGuideResponseFraction} from '@/modules/waste-guide/types'
import {useTheme} from '@/themes/useTheme'

type FigureProps = {hasContent: boolean}

const Figure = ({hasContent}: FigureProps) => {
  const {isLandscape} = useDeviceContext()
  const {media} = useTheme()

  if (!hasContent) {
    return (
      <FigureWithFacadesBackground
        height={media.figureHeight.lg}
        Image={<WasteGuideNotFoundImage />}
        imageAspectRatio={media.illustrationAspectRatio.portrait}
        imageWidth={media.illustrationWidth.narrow}
        moveUp={isLandscape ? 128 : undefined}
      />
    )
  }

  return (
    <FigureWithFacadesBackground
      height={media.figureHeight.lg}
      Image={<HouseholdWasteToContainerImage />}
      imageAspectRatio={media.illustrationAspectRatio.landscape}
      imageWidth={media.illustrationWidth.wide}
    />
  )
}

type WasteGuideForCityProps = {
  cityIsWeesp: boolean
  data?: WasteGuideResponseFraction[]
}

const WasteGuideForCity = ({cityIsWeesp, data}: WasteGuideForCityProps) => {
  if (cityIsWeesp) {
    return <WasteGuideForWeesp />
  }

  if (!data) {
    return <WasteGuideNotFound />
  }

  return <WasteGuideForAmsterdam wasteGuide={data} />
}

export const WasteGuide = () => {
  const {
    address,
    isError: selectedAddressForWasteGuideIsError,
    isFetching: selectedAddressForWasteGuideIsFetching,
  } = useSelectedAddressForWasteGuide()

  const {
    data: wasteGuideData,
    isError: getGarbageCollectionAreaQueryIsError,
    isFetching: getGarbageCollectionAreaQueryIsFetching,
  } = useGetGarbageCollectionAreaQuery(
    address?.bagId ? {bagNummeraanduidingId: address.bagId} : skipToken,
  )

  const shouldNotRender =
    !wasteGuideData &&
    !(
      selectedAddressForWasteGuideIsFetching ||
      getGarbageCollectionAreaQueryIsFetching ||
      getGarbageCollectionAreaQueryIsError ||
      selectedAddressForWasteGuideIsError
    )

  if (shouldNotRender) {
    return null
  }

  if (
    getGarbageCollectionAreaQueryIsFetching ||
    selectedAddressForWasteGuideIsFetching
  ) {
    return <PleaseWait />
  }

  if (
    getGarbageCollectionAreaQueryIsError ||
    selectedAddressForWasteGuideIsError ||
    !address
  ) {
    return <SomethingWentWrong />
  }

  const {city} = address
  const cityIsWeesp = city === AddressCity.Weesp
  const hasContent =
    (!!wasteGuideData && Object.keys(wasteGuideData).length > 0) || cityIsWeesp

  return (
    <Column
      grow
      gutter="xl">
      <HorizontalSafeArea flex={1}>
        <Box grow>
          <Column
            flex={1}
            gutter="lg">
            <Column>
              <ChangeLocationButton
                slug={ModuleSlug['waste-guide']}
                testID="WasteGuide"
              />
            </Column>
            <WasteGuideForCity
              cityIsWeesp={cityIsWeesp}
              data={wasteGuideData}
            />
          </Column>
        </Box>
      </HorizontalSafeArea>
      <Figure hasContent={hasContent} />
    </Column>
  )
}
