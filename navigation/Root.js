import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import SignedInBranch from './SignedInBranch';

const Stack = createStackNavigator();

class Root extends Component {
  render() {
    return (
      <Stack.Navigator screenOptions={({route}) => ({headerShown: false})}>
        <Stack.Screen name="Sign In" component={SignIn} />
        <Stack.Screen name="Sign Up" component={SignUp} />
        <Stack.Screen name="Signed In" component={SignedInBranch} />
      </Stack.Navigator>
    );
  }
}

export default Root;
