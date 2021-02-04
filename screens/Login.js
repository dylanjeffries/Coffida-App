import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {Colors} from '../resources/colors.js';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
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

  isEmailPasswordEntered = () => {
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
          <TouchableOpacity
            style={
              this.isEmailPasswordEntered()
                ? styles.login
                : [styles.login, styles.loginDisabled]
            }
            onPress={() => this.login(navigation)}
            disabled={!this.isEmailPasswordEntered()}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
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
    borderWidth: 10,
    borderColor: 'black',
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
  login: {
    backgroundColor: Colors.blue_7,
    padding: 10,
    borderRadius: 30,
    marginBottom: 30,
    width: '30%',
    alignItems: 'center',
  },
  loginDisabled: {
    opacity: 0.4,
  },
  loginText: {
    color: 'white',
  },
  signUpContainer: {
    flexDirection: 'row',
  },
  signUpText: {
    color: 'white',
  }
});

export default Login;
