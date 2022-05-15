import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {FlatList, StyleSheet, View} from 'react-native'
import {useSelector} from 'react-redux'
import {RootStackParamList} from '../../../app/navigation'
import {Box, Button, Image, Text} from '../../../components/ui'
import {ScrollView} from '../../../components/ui/layout'
import {Theme, useThemable} from '../../../themes'
import {color} from '../../../tokens'
import {combineClientAndServerModules} from '../../../utils'
import {clientModules} from '../../index'
import {module as settingsModule} from '../../settings'
import {Module, ServerModule} from '../../types'
import {ModuleButton} from '../components'
import {icons} from '../config'
import {selectModules} from '../store'
import serverModulesMock from '../store/server-modules.mock.json'

const serverModules = serverModulesMock.modules as ServerModule[]
const modules = combineClientAndServerModules(clientModules, serverModules)

const iconProps = {
  width: 24,
  aspectRatio: 1,
  fill: color.font.regular,
}

const renderModuleButton = (module: Module) => {
  const {icon, name, slug, title} = module
  const Icon = icons[icon]

  return (
    <ModuleButton
      icon={<Icon {...iconProps} />}
      key={slug}
      label={title}
      name={name}
    />
  )
}

export const Modules = () => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'HomeModule'>>()

  const {modules: storedModuleSlugs} = useSelector(selectModules)
  const availableModules = modules
    .filter(m => m.status === 1)
    .filter(m => storedModuleSlugs.includes(m.slug))

  const styles = useThemable(createStyles)

  if (!availableModules.length) {
    return (
      <ScrollView>
        <View style={styles.figure}>
          <Image
            source={require('../../../assets/images/sagittarius-a.jpg')}
            style={styles.image}
          />
        </View>
        <View style={styles.box}>
          <Text intro inverse>
            Je hebt het einde van het internet bereikt!
          </Text>
          <Text inverse>Tik op ‘Terug’ om verder te gaan.</Text>
          <Box insetVertical="lg">
            <Button
              onPress={() => navigation.navigate(settingsModule.name)}
              text="Terug"
            />
          </Box>
        </View>
      </ScrollView>
    )
  }

  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={availableModules}
      renderItem={({item}) => renderModuleButton(item)}
    />
  )
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    box: {
      flex: 1,
      padding: theme.size.spacing.md,
      backgroundColor: '#000',
    },
    figure: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      aspectRatio: 1080 / 1920,
      flexShrink: 1,
    },
    list: {
      paddingVertical: theme.size.spacing.md,
    },
  })
