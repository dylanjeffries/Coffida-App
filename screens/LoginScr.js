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
      status: '',
      email: '',
      password: '',
      invalidShow: false,
      autoLogin: false,
    };
  }

  resetState = () => {
    this.setState({
      status: '',
      email: '',
      password: '',
      invalidShow: false,
      autoLogin: false,
    });
  };

  async getCredentials() {
    try {
      let email = await AsyncStorage.getItem('email');
      let password = await AsyncStorage.getItem('password');
      return [email, password];
    } catch (error) {
      console.log('Could not get credentials from AsyncStorage', error);
    }
  }

  componentDidMount() {
    this.getCredentials().then((credentials) => {
      if (credentials[0] !== 'none') {
        this.setState({
          email: credentials[0],
          password: credentials[1],
          autoLogin: true,
        });
        this.login(this.props.navigation);
      }
    });
  }

  //Use API to login the user using entered credentials
  login = () => {
    let body = {
      email: this.state.email,
      password: this.state.password,
    };

    API.postUserLogin(body).then((response) => {
      if (response.status === 200) {
        // Use API to get user info and store globally
        this.setUserInfo(response);
        // Store login details in AsyncStorage
        if (this.state.autoLogin) {
          AsyncStorage.setItem('email', this.state.email);
          AsyncStorage.setItem('password', this.state.password);
        } else {
          AsyncStorage.setItem('email', 'none');
          AsyncStorage.setItem('password', 'none');
        }
        // Reset state
        this.resetState();
        // Switch screens
        this.props.navigation.navigate('Logged In');
      } else if (response.status === 400) {
        this.setState({invalidShow: true});
      }
    });
  };

  //Use API to get user info and set global variables
  setUserInfo = (loginResponse) => {
    global.user.id = loginResponse.json.id;
    global.user.token = loginResponse.json.token;
    API.getUser().then((userResponse) => {
      global.user.firstName = userResponse.first_name;
      global.user.lastName = userResponse.last_name;
      global.user.email = userResponse.email;
    });
  };

  signUp = () => {
    // Reset state
    this.resetState();
    // Go to Sign Up screen
    this.props.navigation.navigate('Sign Up');
  };

  isCredentialsValid = () => {
    let emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(this.state.email) && this.state.password.length > 5
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
          {this.state.invalidShow ? (
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
