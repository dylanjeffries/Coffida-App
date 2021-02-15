import {NavigationContainer} from '@react-navigation/native';
import React, {Component} from 'react';

import RootNav from './navigation/RootNav';

class CoffidaApp extends Component {
  componentDidMount() {
    global.user = {
      id: 0,
      token: '',
      firstName: '',
      lastName: '',
      email: '',
    };
  }

  render() {
    return (
      <NavigationContainer>
        <RootNav />
      </NavigationContainer>
    );
  }
}

export default CoffidaApp;
