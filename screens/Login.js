import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

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
          throw Error(response.statusText);
        }
      })
      .then((json) => {
        this.setState({invalidShow: false});
        this.props.navigation.navigate('SignedIn');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  isEmailPasswordEntered = () => {
    return this.state.email.includes('@' && '.') && this.state.password !== ''
      ? true
      : false;
  };

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../resources/logo.png')} />
        <View style={styles.credentials}>
          <TextInput
            placeholder="Email"
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
            textAlign={'center'}
          />
        </View>
        <View style={styles.credentials}>
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
            textAlign={'center'}
          />
        </View>
        {this.state.invalidShow ? (
          <Text style={styles.invalid}>Invalid Email or Password</Text>
        ) : null}
        <TouchableOpacity
          style={styles.login}
          onPress={() => this.login()}
          disabled={!this.isEmailPasswordEntered()}>
          <Text style={styles.login_text}>Login</Text>
        </TouchableOpacity>
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
  logo: {
    resizeMode: 'contain',
    width: '90%',
  },
  credentials: {
    backgroundColor: '#eeeeee',
    borderRadius: 30,
    width: '70%',
    marginBottom: 30,
    alignItems: 'center',
  },
  login: {
    backgroundColor: '#0a293b',
    borderRadius: 30,
    width: '30%',
    padding: 10,
    marginTop: 60,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  login_text: {
    color: 'white',
  },
  invalid: {
    backgroundColor: '#eeeeee',
    color: 'red',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Login;
