import React, {Component} from 'react';
import {ToastAndroid} from 'react-native';
import {View, Text, StyleSheet} from 'react-native';
import API from '../API';
import Button from '../components/Button';
import TextInputWithError from '../components/TextInputWithError';
import {Colors} from '../resources/Colors';

class SignUpScr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  isDetailsValid = () => {
    return this.isNameValid(this.state.firstName) &&
      this.isNameValid(this.state.lastName) &&
      this.isEmailValid(this.state.email) &&
      this.state.password.length > 5 &&
      this.state.password === this.state.confirmPassword
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

  submit() {
    let body = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
    };

    API.postUser(body)
      .then((response) => {
        if (response.status === 201) {
          // Switch back to Login screen and show success message
          this.props.navigation.navigate('Login');
          ToastAndroid.show('Account created', ToastAndroid.SHORT);
        } else {
          ToastAndroid.show('Submission failed', ToastAndroid.SHORT);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Enter your details below.</Text>
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
          <TextInputWithError
            containerStyle={styles.textInput}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
            errorText="Password must be at least 6 characters long."
            showError={this.state.password.length < 6}
          />
          <TextInputWithError
            containerStyle={styles.textInput}
            placeholder="Confirm Password"
            secureTextEntry={true}
            onChangeText={(confirmPassword) => this.setState({confirmPassword})}
            value={this.state.confirmPassword}
            errorText="Passwords do not match."
            showError={this.state.password !== this.state.confirmPassword}
          />
        </View>
        <View style={styles.submit}>
          <Button
            text="Submit"
            onPress={() => this.submit()}
            disabled={!this.isDetailsValid()}
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
  },
  headerText: {
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
  submit: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
});

export default SignUpScr;
