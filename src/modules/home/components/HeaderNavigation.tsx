import PersonalLogin from '@amsterdam/asc-assets/static/icons/PersonalLogin.svg'
import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {RootStackParamList} from '../../../app/navigation/RootStackNavigator'
import {Settings} from '../../../assets/icons'
import {IconButton} from '../../../components/ui'
import {Row} from '../../../components/ui/layout'
import {module as homeModule} from '../../../modules/home'
import {module as userModule} from '../../../modules/user'
import {ThemeContext} from '../../../themes'
import {color} from '../../../tokens'
import {homeRoutes} from '../routes'

const iconProps = {
  fill: color.touchable.primary,
}

export const HeaderNavigation = () => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'HomeModule'>>()
  const {theme} = useContext(ThemeContext)

  return (
    <Row gutter="md">
      <IconButton
        icon={<PersonalLogin {...iconProps} />}
        label="Mijn profiel"
        onPress={() => navigation.navigate(userModule.name)}
      />
      <IconButton
        icon={<Settings {...iconProps} />}
        label="Instellingen"
        onPress={() =>
          navigation.navigate(homeModule.name, {
            screen: homeRoutes(theme).settings.name,
          })
        }
      />
    </Row>
  )
}
