import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import MyProfile from '../screens/MyProfile';
import UpdateProfile from '../screens/UpdateProfile';

const Stack = createStackNavigator();

class MyProfileBranch extends Component {
  render() {
    return (
      <Stack.Navigator screenOptions={({route}) => ({headerShown: false})}>
        <Stack.Screen name="My Profile" component={MyProfile} />
        <Stack.Screen name="Update Profile" component={UpdateProfile} />
      </Stack.Navigator>
    );
  }
}

export default MyProfileBranch;
