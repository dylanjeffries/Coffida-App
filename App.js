import {NavigationContainer} from '@react-navigation/native';
import React, {Component} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from './screens/Home';

const Tab = createBottomTabNavigator();

class CoffidaApp extends Component {
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={Home} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

export default CoffidaApp;
