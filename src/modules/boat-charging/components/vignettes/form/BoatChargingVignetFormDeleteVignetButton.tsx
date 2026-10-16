import {useCallback} from 'react'
import {Button} from '@/components/ui/buttons/Button'
import {useBoatChargingDeleteVignetMutation} from '@/modules/boat-charging/service'
import type {Vignet} from '@/modules/boat-charging/types'

type Props = {
  onError: () => void
  onSuccess: () => void
  vignetId: Vignet['id']
}

export const BoatChargingVignetFormDeleteVignetButton = ({
  vignetId,
  onError,
  onSuccess,
}: Props) => {
  const [deleteVignet, state] = useBoatChargingDeleteVignetMutation()

  const onDeleteVignet = useCallback(
    () => deleteVignet(vignetId).unwrap().then(onSuccess, onError),
    [deleteVignet, onSuccess, onError, vignetId],
  )

  return (
    <Button
      {...state}
      icon={{name: 'trash-bin'}}
      label="Vignet verwijderen"
      onPress={onDeleteVignet}
      testID="BoatChargingVignetFormDeleteButton"
      variant="tertiaryDestructive"
    />
  )
}
