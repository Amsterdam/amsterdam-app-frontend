import {RouteProp} from '@react-navigation/core'
import {RootStackParamList} from '../../App'

type ProjectManagerScreenRouteProp = RouteProp<
  RootStackParamList,
  'ProjectManager'
>

type Props = {
  route: ProjectManagerScreenRouteProp
}

/*
1. manager enters app with id (amsterdam://project-manager/id)
1.1 open modal
1.2 call manager/projects with id
1.3 write new projectManager to store
1.4 setProjectManager
1.5 show projects
1.6 check back-button when app opens from quit state
*/

export const ProjectManagerScreen = ({route}: Props) => {
  console.log(route)
  // const [projectManager, setProjectManager] = useState<Manager | undefined>()
  // const asyncStorage = useAsyncStorage()
}
