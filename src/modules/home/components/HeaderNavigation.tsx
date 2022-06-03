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

const iconProps = {
  fill: color.touchable.primary,
}

export const HeaderNavigation = () => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'HomeModule'>>()

  return (
    <Row gutter="md">
      {isDevApp && (
        <IconButton
          icon={<Api {...iconProps} />}
          label="Omgeving selecteren"
          onPress={() => navigation.navigate(HomeRouteName.admin)}
        />
      )}
      <IconButton
        icon={<PersonalLogin {...iconProps} />}
        label="Mijn profiel"
        onPress={() => navigation.navigate(userModule.name)}
      />
      <IconButton
        icon={<Settings {...iconProps} />}
        label="Instellingen"
        onPress={() => navigation.navigate(HomeRouteName.settings)}
      />
    </Row>
  )
}
