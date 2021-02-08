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
import Button from '../components/Button.js';
import {Colors} from '../resources/colors.js';

class Login extends Component {
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

  async storeCredentials(email, password) {
    try {
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('password', password);
    } catch (error) {
      console.log('Credential storage error', error);
    }
  }

  async getCredentials() {
    try {
      let email = await AsyncStorage.getItem('email');
      let password = await AsyncStorage.getItem('password');
      return [email, password];
    } catch (error) {
      console.log('Credential storage error', error);
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

  login = (navigation) => {
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
          throw Error(response.statusText);
        }
      })
      .then((json) => {
        // Remove invalid popup if showing
        this.setState({invalidShow: false});
        // Set User Information in global scope
        global.user.id = json.id;
        global.user.token = json.token;
        // Store login details in storage
        if (this.state.autoLogin) {
          this.storeCredentials(this.state.email, this.state.password);
        } else {
          this.storeCredentials('none', 'none');
        }
        // Switch screens
        navigation.navigate('SignedIn');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  signUp = (navigation) => {
    this.setState({
      email: '',
      password: '',
    });
    navigation.navigate('SignUp');
  };

  isCredentialsValid = () => {
    let emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(this.state.email) && this.state.password !== ''
      ? true
      : false;
  };

  render() {
    const navigation = this.props.navigation;
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
            <Text style={styles.whiteText}>Auto-Login </Text>
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
            onPress={() => this.login(navigation)}
            disabled={!this.isCredentialsValid()}
          />
          <View style={styles.flexRow}>
            <Text style={styles.whiteText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => this.signUp(navigation)}>
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
    backgroundColor: Colors.blue_4,
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
});

export default Login;
