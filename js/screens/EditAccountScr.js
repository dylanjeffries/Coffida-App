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

  isDetailsValid = () => {
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

  save = () => {
    let body = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email: this.state.email,
    };

    API.patchUser(body)
      .then((response) => {
        if (response.status === 200) {
          // Update user info in AsyncStorage
          this.setUserInfo();
          // Update AsyncStorage email
          AsyncStorage.setItem('email', this.state.email);
          // Switch screens and show success message
          this.props.navigation.navigate('My Account');
          ToastAndroid.show('Save successful', ToastAndroid.SHORT);
        } else {
          ToastAndroid.show('Save failed', ToastAndroid.SHORT);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Use API to get user info and set in AsyncStorage
  setUserInfo = async () => {
    await AsyncStorage.setItem('first_name', this.state.firstName);
    await AsyncStorage.setItem('last_name', this.state.lastName);
    await AsyncStorage.setItem('email', this.state.email);
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
              disabled={!this.isDetailsValid()}
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
