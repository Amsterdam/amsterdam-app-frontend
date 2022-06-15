import Api from '@amsterdam/asc-assets/static/icons/Api.svg'
import PersonalLogin from '@amsterdam/asc-assets/static/icons/PersonalLogin.svg'
import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {RootStackParamList} from '../../../app/navigation/RootStackNavigator'
import {Settings} from '../../../assets/icons'
import {IconButton} from '../../../components/ui'
import {Row} from '../../../components/ui/layout'
import {module as userModule} from '../../../modules/user'
import {isDevApp} from '../../../services/development'
import {color} from '../../../tokens'
import {HomeRouteName} from '../routes'
import {Icon} from '@/components/ui/media'

const iconProps = {
  fill: color.touchable.primary,
}

export const HeaderNavigation = () => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'HomeModule'>>()

  return (
    <Row gutter="md">
      {!!isDevApp && (
        <IconButton
          accessibilityLabel="Omgeving selecteren"
          icon={
            <Icon size={24}>
              <Api {...iconProps} />
            </Icon>
          }
          onPress={() => navigation.navigate(HomeRouteName.admin)}
        />
      )}
      <IconButton
        accessibilityLabel="Mijn profiel"
        icon={
          <Icon size={24}>
            <PersonalLogin {...iconProps} />
          </Icon>
        }
        onPress={() => navigation.navigate(userModule.name)}
      />
      <IconButton
        accessibilityLabel="Instellingen"
        icon={
          <Icon size={24}>
            <Settings {...iconProps} />
          </Icon>
        }
        onPress={() => navigation.navigate(HomeRouteName.settings)}
      />
    </Row>
  )
}
