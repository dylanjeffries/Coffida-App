import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import MyReviewScr from '../screens/MyReviewsScr';
import EditPhotoScr from '../screens/EditPhotoScr';

const Stack = createStackNavigator();

class MyReviewsNav extends Component {
  render() {
    return (
      <Stack.Navigator screenOptions={({route}) => ({headerShown: false})}>
        <Stack.Screen name="My Reviews" component={MyReviewScr} />
        <Stack.Screen name="Edit Photo" component={EditPhotoScr} />
      </Stack.Navigator>
    );
  }
}

export default MyReviewsNav;
