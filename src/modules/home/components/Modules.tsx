import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {FlatList, StyleSheet, View} from 'react-native'
import {useSelector} from 'react-redux'
import {RootStackParamList} from '../../../app/navigation'
import {Box, Button, Image, PleaseWait, Text} from '../../../components/ui'
import {ScrollView} from '../../../components/ui/layout'
import {selectTheme, Theme, useThemable} from '../../../themes'
import {color} from '../../../tokens'
import {combineClientAndServerModules} from '../../../utils'
import {module as homeModule} from '../../home'
import {clientModules} from '../../index'
import {Module} from '../../types'
import {ModuleButton} from '../components'
import {icons} from '../config'
import {homeRoutes} from '../routes'
import {useGetModulesQuery} from '../services'
import {selectModules} from '../store'

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
  const {data: serverModules, isLoading} = useGetModulesQuery()
  const {modules: storedModuleSlugs} = useSelector(selectModules)
  const {theme} = useSelector(selectTheme)
  const styles = useThemable(createStyles)

  if (isLoading) {
    return <PleaseWait />
  }

  const modules = combineClientAndServerModules(
    clientModules,
    serverModules,
  ).filter(m => storedModuleSlugs.includes(m.slug))
  // .filter(m => m.status === 1)

  if (!modules.length) {
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
              onPress={() =>
                navigation.navigate(homeModule.name, {
                  screen: homeRoutes(theme).settings.name,
                })
              }
              text="Terug"
            />
          </Box>
        </View>
      </ScrollView>
    )
  }

  return (
    <Box>
      <FlatList
        data={modules}
        renderItem={({item}) => renderModuleButton(item)}
      />
    </Box>
  )
}

const createStyles = ({size}: Theme) =>
  StyleSheet.create({
    box: {
      flex: 1,
      padding: size.spacing.md,
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
  })
