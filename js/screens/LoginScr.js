import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';
import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import API from '../API.js';
import Button from '../components/Button.js';
import {Colors} from '../resources/Colors';

class LoginScr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      showInvalid: false,
      autoLogin: false,
    };
    this.checkAutoLogin();
  }

  resetState = () => {
    this.setState({
      email: '',
      password: '',
      showInvalid: false,
      autoLogin: false,
    });
  };

  // Uses API to test token and user id from AsyncStorage for auto login
  checkAutoLogin = async () => {
    let autoLogin = await AsyncStorage.getItem('auto_login');
    if (autoLogin === 'true') {
      let response = await API.getUser();
      if (response.status === 200) {
        // Switch screens
        this.props.navigation.navigate('Logged In');
      }
    }
  };

  //Use API to login the user using entered credentials
  login = async () => {
    let body = {
      email: this.state.email,
      password: this.state.password,
    };
    let loginResponse = await API.postUserLogin(body);
    switch (loginResponse.status) {
      case 200: // OK
        await AsyncStorage.setItem('user_id', loginResponse.json.id.toString());
        await AsyncStorage.setItem('token', loginResponse.json.token);
        await AsyncStorage.setItem('email', this.state.email);
        await AsyncStorage.setItem(
          'auto_login',
          this.state.autoLogin.toString(),
        );
        let infoResponse = await API.getUser();
        if (infoResponse.status === 200) {
          // Save first and last names to AsyncStorage
          await AsyncStorage.setItem(
            'first_name',
            infoResponse.json.first_name,
          );
          await AsyncStorage.setItem('last_name', infoResponse.json.last_name);
          // Reset state
          this.resetState();
          // Switch screens
          this.props.navigation.navigate('Logged In');
        }
        break;

      case 400: // Invalid email/password
        this.setState({showInvalid: true});
        break;
    }
  };

  signUp = () => {
    // Reset state
    this.resetState();
    // Go to Sign Up screen
    this.props.navigation.navigate('Sign Up');
  };

  isCredentialsValid = () => {
    let emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(this.state.email) &&
      this.state.password !== null &&
      this.state.password.length > 5
      ? true
      : false;
  };

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../resources/logo.png')} />
        <View style={styles.credentials}>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
            textAlign={'center'}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
            textAlign={'center'}
          />
          <View style={styles.flexRow}>
            <Text style={styles.whiteText}>Remember me? </Text>
            <CheckBox
              value={this.state.autoLogin}
              onValueChange={(value) => this.setState({autoLogin: value})}
              tintColors={{true: 'white', false: 'white'}}
            />
          </View>
          {this.state.showInvalid ? (
            <Text style={styles.invalid}>Invalid Email or Password</Text>
          ) : null}
        </View>
        <View style={styles.loginSignUp}>
          <Button
            text="Login"
            onPress={() => this.login()}
            disabled={!this.isCredentialsValid()}
            buttonStyle={styles.loginButton}
          />
          <View style={styles.flexRow}>
            <Text style={styles.whiteText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => this.signUp()}>
              <Text style={styles.whiteText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  whiteText: {
    textAlignVertical: 'center',
    color: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.blue_5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    flex: 3,
    resizeMode: 'contain',
    width: '70%',
  },
  credentials: {
    flex: 4,
    width: '70%',
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: 30,
    marginBottom: 30,
  },
  invalid: {
    backgroundColor: 'white',
    color: 'red',
    padding: 10,
    marginTop: 30,
    alignSelf: 'center',
  },
  loginSignUp: {
    flex: 3,
    width: '100%',
    alignItems: 'center',
  },
  loginButton: {
    marginBottom: 30,
  },
});

export default LoginScr;
