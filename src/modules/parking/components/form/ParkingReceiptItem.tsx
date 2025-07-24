import {ReactNode} from 'react'
import {StyleSheet} from 'react-native'
import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {Row} from '@/components/ui/layout/Row'

type Props = {
  children: ReactNode
}

export const ParkingReceiptItem = ({children}: Props) => {
  const styles = createStyles()

  return (
    <SingleSelectable style={styles.container}>
      <Row
        align="between"
        flex={1}>
        {children}
      </Row>
    </SingleSelectable>
  )
}

const createStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
  })
