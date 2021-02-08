import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import Button from '../components/Button';
import TextInputWithError from '../components/TextInputWithError';
import { Colors } from '../resources/colors';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      firstNameInvalid: false,
      lastNameInvalid: false,
      emailInvalid: false,
      confirmPasswordInvalid: false,
    };
  }

  login() {
    let request = {
      email: this.state.email,
      password: this.state.password,
    };

    fetch('http://10.0.2.2:3333/api/1.0.0/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          this.setState({invalidShow: true});
        }
      })
      .then((json) => {
        this.setState({invalidShow: false});
        this.props.navigation.navigate('Home');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  isDetailsFilled = () => {
    return this.state.email.includes('@' && '.') && this.state.password !== ''
      ? true
      : false;
  };

  pressTest = () => {
    this.setState({
      firstNameInvalid: true,
      lastNameInvalid: true,
      emailInvalid: true,
      confirmPasswordInvalid: true,
    });
  };

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
            showError={this.state.firstNameInvalid}
          />
          <TextInputWithError
            containerStyle={styles.textInput}
            placeholder="Last Name"
            onChangeText={(lastName) => this.setState({lastName})}
            value={this.state.lastName}
            errorText="Name must only contain letters."
            showError={this.state.lastNameInvalid}
          />
          <TextInputWithError
            containerStyle={styles.textInput}
            placeholder="Email"
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
            errorText="Email must match format: name@email.com"
            showError={this.state.emailInvalid}
          />
          <TextInputWithError
            containerStyle={styles.textInput}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
            errorText="Passwords do not match."
            showError={this.state.confirmPasswordInvalid}
          />
          <TextInputWithError
            containerStyle={styles.textInput}
            placeholder="Confirm Password"
            secureTextEntry={true}
            onChangeText={(confirmPassword) => this.setState({confirmPassword})}
            value={this.state.confirmPassword}
            errorText="Passwords do not match."
            showError={this.state.confirmPasswordInvalid}
          />
        </View>
        <View style={styles.submit}>
          <Button text="Submit" onPress={() => this.pressTest()} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#33A1DE',
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

export default SignUp;
