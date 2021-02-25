import React, {Component} from 'react';
import {ToastAndroid} from 'react-native';
import {View, Text, StyleSheet} from 'react-native';
import API from '../API';
import Button from '../components/Button';
import TextInputWithError from '../components/TextInputWithError';
import Title from '../components/Title';
import ValidatedTextInput from '../components/ValidatedTextInput';
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

  // Use API to create new account using entered details
  submit = async () => {
    let body = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
    };
    let response = await API.postUser(body);
    if (response.status === 201) {
      // Show success message and switch back to Login screen
      ToastAndroid.show('Account created', ToastAndroid.SHORT);
      this.props.navigation.navigate('Login');
    } else {
      ToastAndroid.show('Submission failed', ToastAndroid.SHORT);
    }
  };

  isFormValid = () => {
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

  isEmailValid = () => {
    let regex = /^\S+@\S+\.\S+$/;
    return regex.test(this.state.email) ? true : false;
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <Title style={styles.title} text="Enter your details below." />
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
          <ValidatedTextInput
            style={styles.textInput}
            placeholder="Password"
            validationText="Password must be at least 6 characters long."
            hide={this.state.password.length > 5}
            onTextChange={(password) => this.setState({password})}
            value={this.state.password}
            secureTextEntry={true}
          />
          <ValidatedTextInput
            style={styles.textInput}
            placeholder="Confirm Password"
            validationText="Passwords must match."
            hide={this.state.password === this.state.confirmPassword}
            onTextChange={(confirmPassword) => this.setState({confirmPassword})}
            value={this.state.confirmPassword}
            secureTextEntry={true}
          />
          <View style={styles.submitContainer}>
            <Button
              style={styles.submit}
              text="Submit"
              disabled={!this.isFormValid()}
              onPress={() => this.submit()}
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
  submitContainer: {
    flex: 2,
    justifyContent: 'flex-start',
  },
  submit: {
    width: '30%',
    alignSelf: 'center',
  },
});

export default SignUpScr;
