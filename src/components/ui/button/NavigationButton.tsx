import ChevronRight from '@amsterdam/asc-assets/static/icons/ChevronRight.svg'
import React from 'react'
import {StyleSheet} from 'react-native'
import {useSelector} from 'react-redux'
import {selectTheme, Theme, useThemable} from '../../../themes'
import {Row} from '../layout'
import {Icon} from '../media'
import {Link} from '../typography'
import {BlockLink} from './BlockLink'

type Props = {
  label: string
  onPress: () => void
}

export const NavigationButton = ({label, onPress}: Props) => {
  const {theme} = useSelector(selectTheme)
  const styles = useThemable(createStyles)

  return (
    <BlockLink onPress={onPress} style={styles.button}>
      <Row align="between">
        <Link label={label} />
        <Icon size={24}>
          <ChevronRight fill={theme.color.pressable.navigation} />
        </Icon>
      </Row>
    </BlockLink>
  )
}

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    button: {
      paddingHorizontal: theme.size.spacing.md,
      paddingVertical: theme.size.spacing.sm,
    },
  })
