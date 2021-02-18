import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import BrowseScr from '../screens/BrowseScr';
import LocationScr from '../screens/LocationScr';

const Stack = createStackNavigator();

class BrowseNav extends Component {
  render() {
    return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Browse" component={BrowseScr} />
        <Stack.Screen name="Location" component={LocationScr} />
      </Stack.Navigator>
    );
  }
}

export default BrowseNav;
