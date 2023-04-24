import {useDispatch, useSelector} from 'react-redux'
import {RadioGroup, RadioGroupOption} from '@/components/ui/forms'
import {selectContracts, addContract} from '@/modules/waste-guide/slice'

const contractOptions: RadioGroupOption<boolean>[] = [
  {
    label:
      'Ik heb minder dan 9 zakken afval per week en betaal reinigingsrecht.',
    value: false,
  },
  {
    label: 'Ik heb een contract voor mijn afval.',
    value: true,
  },
]

type Props = {
  bagNummeraanduidingId: string
}

export const SelectContract = ({bagNummeraanduidingId}: Props) => {
  const dispatch = useDispatch()
  const contracts = useSelector(selectContracts)

  const handleChange = (value: boolean) => {
    dispatch(
      addContract({
        [bagNummeraanduidingId]: {
          hasContract: value,
        },
      }),
    )
  }

  return (
    <RadioGroup<boolean>
      onChange={handleChange}
      options={contractOptions}
      value={contracts?.[bagNummeraanduidingId]?.hasContract}
    />
  )
}
