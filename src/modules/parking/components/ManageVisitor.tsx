import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {ManageVisitorCreateAccount} from '@/modules/parking/components/manageVisitor/ManageVisitorCreateAccount'
import {ManageVisitorCredentialsOverview} from '@/modules/parking/components/manageVisitor/ManageVisitorCredentialsOverview'
import {ManageVisitorIntro} from '@/modules/parking/components/manageVisitor/ManageVisitorIntro'
import {ManageVisitorTimeBalanceOverview} from '@/modules/parking/components/manageVisitor/ManageVisitorTimeBalanceOverview'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'

export const ManageVisitor = () => {
  const currentPermit = useCurrentParkingPermit()

  return (
    <Box>
      {currentPermit.visitor_account ? (
        <Column gutter="xl">
          <ManageVisitorIntro />
          <ManageVisitorTimeBalanceOverview />
          <ManageVisitorCredentialsOverview />
        </Column>
      ) : (
        <ManageVisitorCreateAccount />
      )}
    </Box>
  )
}
