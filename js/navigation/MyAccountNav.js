import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import MyAccountScr from '../screens/MyAccountScr';
import EditAccountScr from '../screens/EditAccountScr';

const Stack = createStackNavigator();

class MyAccountNav extends Component {
  render() {
    return (
      <Stack.Navigator screenOptions={({route}) => ({headerShown: false})}>
        <Stack.Screen name="My Account" component={MyAccountScr} />
        <Stack.Screen name="Edit Account" component={EditAccountScr} />
      </Stack.Navigator>
    );
  }
}

export default MyAccountNav;
