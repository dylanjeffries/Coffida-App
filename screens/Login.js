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
    };
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
        this.setState({invalidShow: false});
        navigation.navigate('SignedIn');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  signUp = (navigation) => {
    navigation.navigate('SignUp');
  };

  isCredentialsValid = () => {
    let emailRegex = /\w+@\w+\.\w+/;
    return emailRegex.test(this.state.email) && this.state.password !== ''
      ? true
      : false;
  };

  render() {
    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../resources/logo.png')} />
        <View style={styles.emailPassword}>
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
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => this.signUp(navigation)}>
              <Text style={styles.signUpText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blue_4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    flex: 4,
    resizeMode: 'contain',
    width: '70%',
  },
  emailPassword: {
    flex: 3,
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
    alignSelf: 'center',
  },
  loginSignUp: {
    flex: 3,
    width: '100%',
    alignItems: 'center',
  },
  signUpContainer: {
    flexDirection: 'row',
  },
  signUpText: {
    color: 'white',
  },
});

export default Login;
