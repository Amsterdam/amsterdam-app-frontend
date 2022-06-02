import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {FlatList, StyleSheet, View} from 'react-native'
import {Box, Button, Image, PleaseWait, Text} from '../../../components/ui'
import {ScrollView} from '../../../components/ui/layout'
import {Theme, useThemable} from '../../../themes'
import {color} from '../../../tokens'
import {Module} from '../../types'
import {icons} from '../config'
import {useModules} from '../hooks'
import {HomeRouteName, HomeStackParams} from '../routes'
import {ModuleButton} from './ModuleButton'

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
    useNavigation<StackNavigationProp<HomeStackParams, HomeRouteName>>()
  const {modules, isLoading} = useModules({includeDeselected: false})
  const styles = useThemable(createStyles)

  if (isLoading) {
    return <PleaseWait />
  }

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
              onPress={() => navigation.navigate(HomeRouteName.settings)}
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
