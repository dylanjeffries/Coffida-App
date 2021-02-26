import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {View, StyleSheet, ToastAndroid} from 'react-native';
import API from '../API';
import Button from '../components/Button';
import Header from '../components/Header';
import Title from '../components/Title';
import ValidatedTextInput from '../components/ValidatedTextInput';
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

  // Fetch user information from AsyncStorage
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

  // Use API to update user details
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
      // Show success message and switch screens
      ToastAndroid.show('Account edited', ToastAndroid.SHORT);
      this.props.navigation.navigate('My Account');
    } else {
      // Show failure message
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

  isEmailValid = () => {
    let regex = /^\S+@\S+\.\S+$/;
    return regex.test(this.state.email) ? true : false;
  };

  render() {
    return (
      <View style={styles.container}>
        <Header style={styles.header} />
        <View style={styles.body}>
          <Title style={styles.title} text="Edit your details below." />
          <ValidatedTextInput
            style={styles.textInput}
            placeholder="First Name"
            validationText="Name must only contain letters."
            hide={this.isNameValid(this.state.firstName)}
            onTextChange={(firstName) => this.setState({firstName})}
            value={this.state.firstName}
          />
          <ValidatedTextInput
            style={styles.textInput}
            placeholder="Last Name"
            validationText="Name must only contain letters."
            hide={this.isNameValid(this.state.lastName)}
            onTextChange={(lastName) => this.setState({lastName})}
            value={this.state.lastName}
          />
          <ValidatedTextInput
            style={styles.textInput}
            placeholder="Email"
            validationText="Email must match format: example@email.com"
            hide={this.isEmailValid()}
            onTextChange={(email) => this.setState({email})}
            value={this.state.email}
          />
          <View style={styles.saveContainer}>
            <Button
              style={styles.save}
              text="Save"
              disabled={!this.isFormValid()}
              onPress={() => this.save()}
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
    alignItems: 'center',
    backgroundColor: Colors.blue_5,
  },
  header: {
    flex: 1,
  },
  body: {
    width: '70%',
    flex: 14,
    paddingVertical: 10,
  },
  title: {
    flex: 1,
    marginBottom: 15,
  },
  textInput: {
    flex: 1,
    marginBottom: 15,
  },
  saveContainer: {
    flex: 3,
    justifyContent: 'center',
  },
  save: {
    width: '30%',
    alignSelf: 'center',
  },
});

export default EditAccountScr;
