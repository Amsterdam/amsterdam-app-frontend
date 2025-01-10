import {useSelector} from '@/hooks/redux/useSelector'
import {useIsModuleActive} from '@/hooks/useIsModuleActive'
import {selectHasWasteCard} from '@/modules/open-waste-container/slice'
import {ModuleSlug} from '@/modules/slugs'
import {AddWasteCardButton} from '@/modules/waste-guide/components/waste-card/AddWasteCardButton'
import {ShowWasteCardButton} from '@/modules/waste-guide/components/waste-card/ShowWasteCardButton'

type Props = {
  showAddOnly?: boolean
}

export const WasteCardButton = ({showAddOnly}: Props) => {
  const isOpenWasteContainerModuleActive = useIsModuleActive(
    ModuleSlug['open-waste-container'],
  )
  const hasWasteCard = useSelector(selectHasWasteCard)
  const isContainerWithinRange = true // TODO: implement this once the API is ready

  if (!isOpenWasteContainerModuleActive) {
    return null
  }

  if (hasWasteCard && !showAddOnly) {
    return <ShowWasteCardButton />
  }

  if (isContainerWithinRange) {
    return <AddWasteCardButton />
  }

  return null
}
