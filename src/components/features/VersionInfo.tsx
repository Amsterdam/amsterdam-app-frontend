import React from 'react'
import {version} from '../../../package.json'
import {Text} from '../ui'

export const VersionInfo = () => <Text small>Versie {version}</Text>
