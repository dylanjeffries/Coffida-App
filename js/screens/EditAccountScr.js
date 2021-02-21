import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {View, Text, StyleSheet, ToastAndroid} from 'react-native';
import API from '../API';
import Button from '../components/Button';
import Header from '../components/Header';
import TextInputWithError from '../components/TextInputWithError';
import {Colors} from '../resources/Colors';

class EditAccountScr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
    };
    this.getUserInfo();
  }

  getUserInfo = async () => {
    let first_name = await AsyncStorage.getItem('first_name');
    let last_name = await AsyncStorage.getItem('last_name');
    let email = await AsyncStorage.getItem('email');
    this.setState({
      firstName: first_name,
      lastName: last_name,
      email: email,
    });
  };

  save = async () => {
    let body = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email: this.state.email,
    };
    let response = await API.patchUser(body);
    if (response.status === 200) {
      // Update user info in AsyncStorage
      await AsyncStorage.setItem('first_name', this.state.firstName);
      await AsyncStorage.setItem('last_name', this.state.lastName);
      await AsyncStorage.setItem('email', this.state.email);
      // Show success message and witch screens
      ToastAndroid.show('Account edited', ToastAndroid.SHORT);
      this.props.navigation.navigate('My Account');
    } else {
      ToastAndroid.show('Save failed', ToastAndroid.SHORT);
    }
  };

  isFormValid = () => {
    return this.isNameValid(this.state.firstName) &&
      this.isNameValid(this.state.lastName) &&
      this.isEmailValid(this.state.email)
      ? true
      : false;
  };

  isNameValid = (name) => {
    let regex = /^[a-zA-Z]+$/;
    return regex.test(name) ? true : false;
  };

  isEmailValid = (email) => {
    let regex = /^\S+@\S+\.\S+$/;
    return regex.test(email) ? true : false;
  };

  render() {
    return (
      <View style={styles.container}>
        <Header style={styles.header} />
        <View style={styles.body}>
          <View style={styles.title}>
            <Text style={styles.titleText}>Edit your details below.</Text>
          </View>
          <View style={styles.inputs}>
            <TextInputWithError
              containerStyle={styles.textInput}
              placeholder="First Name"
              onChangeText={(firstName) => this.setState({firstName})}
              value={this.state.firstName}
              errorText="Name must only contain letters."
              showError={!this.isNameValid(this.state.firstName)}
            />
            <TextInputWithError
              containerStyle={styles.textInput}
              placeholder="Last Name"
              onChangeText={(lastName) => this.setState({lastName})}
              value={this.state.lastName}
              errorText="Name must only contain letters."
              showError={!this.isNameValid(this.state.lastName)}
            />
            <TextInputWithError
              containerStyle={styles.textInput}
              placeholder="Email"
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
              errorText="Email must match format: name@email.com"
              showError={!this.isEmailValid(this.state.email)}
            />
          </View>
          <View style={styles.save}>
            <Button
              text="Save"
              onPress={() => this.save()}
              disabled={!this.isFormValid()}
            />
          </View>
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
  title: {
    flex: 1,
    justifyContent: 'center',
  },
  titleText: {
    padding: 10,
    fontSize: 18,
    backgroundColor: Colors.blue_7,
    color: 'white',
  },
  inputs: {
    flex: 4,
    width: '70%',
  },
  textInput: {
    marginBottom: 10,
  },
  save: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
});

export default EditAccountScr;
