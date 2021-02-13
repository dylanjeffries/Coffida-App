import React, {Component} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {Colors} from '../resources/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
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

  componentDidMount() {
    fetch('http://10.0.2.2:3333/api/1.0.0/user/' + global.user.id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': global.user.token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({
          name: json.first_name + ' ' + json.last_name,
          email: json.email,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  signOut = (navigation) => {
    // Reset asyncstorage credentials
    this.storeCredentials('none', 'none');
    // Go back to Login screen
    navigation.navigate('Login');
  };

  render() {
    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.logo}
            source={require('../resources/logo.png')}
          />
        </View>
        <View style={styles.body}>
          <Ionicons name="person-circle-outline" size={250} color="white" />
          <Text style={styles.name}>{this.state.name}</Text>
          <Text style={styles.email}>{this.state.email}</Text>
          <Button
            buttonStyle={styles.update}
            text="Update Information"
            onPress={() => this.submit()}
          />
          <Button
            buttonStyle={styles.signOut}
            text="Sign Out"
            onPress={() => this.signOut(navigation)}
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
  },
  header: {
    flex: 2,
    backgroundColor: Colors.blue_7,
  },
  logo: {
    flex: 1,
    width: '30%',
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  body: {
    flex: 28,
    alignItems: 'center',
  },
  name: {
    fontSize: 28,
    color: 'white',
  },
  email: {
    fontSize: 20,
    color: 'white',
  },
  update: {
    width: '45%',
    marginTop: 80,
  },
  signOut: {
    marginTop: 20,
  },
});

export default MyProfile;
