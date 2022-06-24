import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {RootStackParamList} from '_app/navigation'
import {
  ConstructionWorkRouteName,
  ProjectsStackParams,
} from '_modules/construction-work/routes'
import React from 'react'
import {Edit} from '@/assets/icons'
import {Box, IconButton} from '@/components/ui'
import {Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Paragraph} from '@/components/ui/text'
import {AddressRouteName} from '@/modules/address/routes'
import {useTheme} from '@/themes'

type Props = {
  address: string
}

export const ProjectsByDistanceListHeader = ({address}: Props) => {
  const {color} = useTheme()
  const navigation =
    useNavigation<
      StackNavigationProp<
        RootStackParamList & ProjectsStackParams,
        ConstructionWorkRouteName.projects
      >
    >()

  return (
    <Box>
      <Row gutter="sm" valign="center">
        <Paragraph accessibilityLabel={`Projecten dichtbij ${address}`}>
          Dichtbij {address}
        </Paragraph>
        <IconButton
          accessibilityLabel="Wijzig het adres"
          icon={
            <Icon size={32}>
              <Edit fill={color.pressable.default.background} />
            </Icon>
          }
          onPress={
            // TODO Open as modal
            () =>
              navigation.navigate('AddressModule', {
                screen: AddressRouteName.addressForm,
              })
          }
        />
      </Row>
    </Box>
  )
}
