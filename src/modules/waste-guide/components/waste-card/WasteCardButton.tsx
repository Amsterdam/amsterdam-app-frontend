import {useSelector} from '@/hooks/redux/useSelector'
import {useIsModuleActive} from '@/hooks/useIsModuleActive'
import {ModuleSlug} from '@/modules/slugs'
import {selectHasWasteCard} from '@/modules/waste-container/slice'
import {AddWasteCardButton} from '@/modules/waste-guide/components/waste-card/AddWasteCardButton'
import {ShowWasteCardButton} from '@/modules/waste-guide/components/waste-card/ShowWasteCardButton'

type Props = {
  showAddOnly?: boolean
}

export const WasteCardButton = ({showAddOnly}: Props) => {
  const isOpenWasteContainerModuleActive = useIsModuleActive(
    ModuleSlug['waste-container'],
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
