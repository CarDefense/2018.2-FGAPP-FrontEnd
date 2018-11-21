import * as React from 'react';

import {StackNavigator} from 'react-navigation'

import WelcomeScreen from './screens/WelcomeScreen'
import SignUpScreen from './screens/SignUpScreen'
import RegisterCar from './screens/RegisterCar'
import PrivateNotifications from './screens/PrivateNotifications'
import PublicNotifications from './screens/PublicNotifications'
import TabHandler from './screens/TabHandler'



export default class App extends React.Component<{}> {
  render() {
    return (
      < AppStackNavigator />
    );
  }
}

const AppStackNavigator = new StackNavigator({

  WelcomeScreen:{
    screen:WelcomeScreen,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },
  SignUpScreen:{
    screen:SignUpScreen,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },
  RegisterCar:{
    screen:RegisterCar,
  },
  PrivateNotifications:{
    screen:PrivateNotifications,
  },
  PublicNotifications:{
    screen:PublicNotifications,
  },
  TabHandler:{
    screen:TabHandler,
  }
})
