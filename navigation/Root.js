import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import SignedIn from './SignedIn';

const Stack = createStackNavigator();

class Root extends Component {
  render() {
    return (
      <Stack.Navigator screenOptions={({route}) => ({headerShown: false})}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignedIn" component={SignedIn} />
      </Stack.Navigator>
    );
  }
}

export default Root;
