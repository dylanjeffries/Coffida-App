import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Colors} from '../resources/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';
import API from '../API';

class MyProfileScr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
    };
  }

  // Set Focus Listener for screen refresh
  componentDidMount() {
    this.props.navigation.addListener('focus', () => this.onFocus());
  }

  // When screen comes into focus
  onFocus = async () => {
    let first_name = await AsyncStorage.getItem('first_name');
    let last_name = await AsyncStorage.getItem('last_name');
    let email = await AsyncStorage.getItem('email');
    this.setState({
      name: first_name + ' ' + last_name,
      email: email,
    });
  };

  editAccount = () => {
    // Go back to Login screen
    this.props.navigation.navigate('Edit Account');
  };

  logout = async () => {
    let response = await API.postUserLogout();
    if (response.status === 200) {
      // Set auto login to false in AsyncStorage
      await AsyncStorage.setItem('auto_login', 'false');
      // Go back to Login screen
      this.props.navigation.navigate('Login');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Header style={styles.header} />
        <View style={styles.body}>
          <Ionicons name="person-circle-outline" size={250} color="white" />
          <Text style={styles.name}>{this.state.name}</Text>
          <Text style={styles.email}>{this.state.email}</Text>
          <Button
            style={styles.edit}
            text="Edit Account"
            onPress={() => this.editAccount()}
          />
          <Button
            style={styles.logout}
            text="Logout"
            onPress={() => this.logout()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blue_5,
  },
  header: {
    flex: 2,
  },
  body: {
    flex: 28,
    alignItems: 'center',
  },
  name: {
    fontSize: 28,
    color: 'white',
  },
  email: {
    fontSize: 20,
    color: 'white',
  },
  edit: {
    width: '30%',
    marginTop: 80,
  },
  logout: {
    width: '20%',
    marginTop: 20,
  },
});

export default MyProfileScr;
