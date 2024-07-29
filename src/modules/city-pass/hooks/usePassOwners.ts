import {passOwner as passOwnerMock} from '@/modules/city-pass/mocks/passOwner'

export const usePassOwners = () => {
  const {sub_pashouders, ...pashouder} = passOwnerMock
  const passOwners = [pashouder, ...sub_pashouders]
  const passOwnersWithActivePass = passOwners.filter(({passen}) =>
    passen.some(({actief}) => actief === true),
  )

  return {passOwnersWithActivePass}
}
