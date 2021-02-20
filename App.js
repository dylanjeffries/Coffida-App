import {NavigationContainer} from '@react-navigation/native';
import React, {Component} from 'react';

import RootNav from './js/navigation/RootNav';

class CoffidaApp extends Component {
  render() {
    return (
      <NavigationContainer>
        <RootNav />
      </NavigationContainer>
    );
  }
}

export default CoffidaApp;
