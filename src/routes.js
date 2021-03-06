import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Login from './pages/autenticar/Login'
import Register from './pages/autenticar/Register'
import DashboardUser from './pages/usuario/Dashboard'
import ProfileMe from './pages/usuario/Profile'
import DashboardAdm from './pages/administrador/Dashboard'
import UserList from './pages/administrador/UserList'
import ProfileUser from './pages/administrador/ProfileUser'
import UserAlter from './pages/administrador/UserAlter'
import UserAlter2 from './pages/usuario/UserAlter2'
//Login, Register, Dashboard, DashboardU

const Routes = createAppContainer(
  createStackNavigator(
    {
      Login: {
        screen: Login,
        navigationOptions: {
          title: 'Login',
        },
      },
      Register: {
        screen: Register,
        navigationOptions: {
          title: 'Registrar',
        },
      },
      DashboardUser: {
        screen: DashboardUser,
        navigationOptions: {
          title: 'Home',
        },
      },
      ProfileMe: {
        screen: ProfileMe,
        navigationOptions: {
          title: 'Profile',
        },
      },
      DashboardAdm: {
        screen: DashboardAdm,
        navigationOptions: {
          title: 'Dashboard',
        },
      },
      UserList: {
        screen: UserList,
        navigationOptions: {
          title: 'List',
        },
      },
      ProfileUser: {
        screen: ProfileUser,
        navigationOptions: {
          title: 'Profile',
        },
      },
      UserAlter: {
        screen: UserAlter,
        navigationOptions: {
          title: 'UserAlter',
        },
      },
      UserAlter2: {
        screen: UserAlter2,
        navigationOptions: {
          title: 'UserAlter2',
        },
      },
    },

    {
      defaultNavigationOptions: {
        headerTintColor: '#fff',
        headerBackTitleVisible: false,
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
        },
        headerShown: false,
      },
    }
  )
)

export default Routes
