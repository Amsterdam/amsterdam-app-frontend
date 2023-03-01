import {CSSProperties} from 'react'
import {FlexStyle} from 'react-native'
import {baseColor} from '@/themes/tokens/base-color'

type Props = {
  flex?: FlexStyle['flex']
  label?: string
}

export const Block = ({flex, label}: Props) => {
  const styles = createStyles(flex)

  return <div style={styles}>{!!label && <span>{label}</span>}</div>
}

const createStyles = (flex: Props['flex']): CSSProperties => ({
  backgroundColor: baseColor.primary.blue,
  color: baseColor.primary.white,
  display: 'flex',
  flex,
  fontFamily: 'AmsterdamSans-Regular',
  justifyContent: 'center',
  padding: 32,
})
