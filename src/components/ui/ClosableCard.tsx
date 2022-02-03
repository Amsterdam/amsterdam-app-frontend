import ChevronDown from '@amsterdam/asc-assets/static/icons/ChevronDown.svg'
import ChevronUp from '@amsterdam/asc-assets/static/icons/ChevronUp.svg'
import React, {ReactNode, useState} from 'react'
import {StyleSheet, TouchableOpacity, View} from 'react-native'
import {color} from '../../tokens'
import {Card, CardBody, CardHeader} from './Card'
import {Title} from './Title'
import {Row} from './layout'

type Props = {
  children: ReactNode
  title: string
}

export const ClosableCard = ({children, title}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <Card>
      <CardHeader>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityState={{expanded: isOpen}}
          onPress={() => setIsOpen(!isOpen)}>
          <Row align="between" valign="center">
            <Title level={2} text={title} />
            <View style={styles.toggle}>
              {isOpen ? (
                <ChevronUp fill={color.font.regular} />
              ) : (
                <ChevronDown fill={color.font.regular} />
              )}
            </View>
          </Row>
        </TouchableOpacity>
      </CardHeader>
      {isOpen && <CardBody>{children}</CardBody>}
    </Card>
  )
}

const styles = StyleSheet.create({
  toggle: {
    width: 20,
    aspectRatio: 1,
  },
})
