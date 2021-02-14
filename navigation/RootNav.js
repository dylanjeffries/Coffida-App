import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScr from '../screens/LoginScr';
import SignUpScr from '../screens/SignUpScr';
import LoggedInNav from './LoggedInNav';

const Stack = createStackNavigator();

class RootNav extends Component {
  render() {
    return (
      <Stack.Navigator screenOptions={({route}) => ({headerShown: false})}>
        <Stack.Screen name="Login" component={LoginScr} />
        <Stack.Screen name="Sign Up" component={SignUpScr} />
        <Stack.Screen name="Logged In" component={LoggedInNav} />
      </Stack.Navigator>
    );
  }
}

export default RootNav;
