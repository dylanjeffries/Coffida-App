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
import {Colors} from '../resources/Colors';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: '',
      email: '',
      password: '',
      invalidShow: false,
      autoSignIn: false,
    };
  }

  resetState = () => {
    this.setState({
      status: '',
      email: '',
      password: '',
      invalidShow: false,
      autoSignIn: false,
    });
  };

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
          autoSignIn: true,
        });
        this.signIn(this.props.navigation);
      }
    });
  }

  signIn = (navigation) => {
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
        // Set User Information in global scope
        global.user.id = json.id;
        global.user.token = json.token;
        // Store login details in storage
        if (this.state.autoSignIn) {
          this.storeCredentials(this.state.email, this.state.password);
        } else {
          this.storeCredentials('none', 'none');
        }
        // Reset state
        this.resetState();
        // Switch screens
        navigation.navigate('Signed In');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  signUp = (navigation) => {
    // Reset state
    this.resetState();
    // Go to Sign Up screen
    navigation.navigate('Sign Up');
  };

  isCredentialsValid = () => {
    let emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(this.state.email) && this.state.password.length > 5
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
            <Text style={styles.whiteText}>Remember me? </Text>
            <CheckBox
              value={this.state.autoSignIn}
              onValueChange={(value) => this.setState({autoSignIn: value})}
              tintColors={{true: 'white', false: 'white'}}
            />
          </View>
          {this.state.invalidShow ? (
            <Text style={styles.invalid}>Invalid Email or Password</Text>
          ) : null}
        </View>
        <View style={styles.signInSignUp}>
          <Button
            text="Sign In"
            onPress={() => this.signIn(navigation)}
            disabled={!this.isCredentialsValid()}
            buttonStyle={styles.signInButton}
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
  signInSignUp: {
    flex: 3,
    width: '100%',
    alignItems: 'center',
  },
  signInButton: {
    marginBottom: 30,
  },
});

export default SignIn;
