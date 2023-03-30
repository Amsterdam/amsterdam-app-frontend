import {useDispatch, useSelector} from 'react-redux'
import {RadioGroup, RadioGroupOption} from '@/components/ui/forms'
import {selectContract, setContract} from '@/modules/waste-guide/slice'
import {ContractType} from '@/modules/waste-guide/types'

const contractOptions: RadioGroupOption<ContractType>[] = [
  {
    label:
      'Ik heb minder dan 9 zakken afval per week en betaal reinigingsrecht.',
    value: ContractType.noContract,
  },
  {
    label: 'Ik heb een contract voor mijn afval.',
    value: ContractType.contract,
  },
]

type Props = {
  bagNummeraanduidingId: string
}

export const SelectContract = ({bagNummeraanduidingId}: Props) => {
  const dispatch = useDispatch()
  const contract = useSelector(selectContract)

  const handleChange = (value: ContractType) => {
    dispatch(
      setContract({
        bagNummeraanduidingId,
        type: value,
      }),
    )
  }

  return (
    <RadioGroup<ContractType>
      onChange={handleChange}
      options={contractOptions}
      value={contract?.type}
    />
  )
}
