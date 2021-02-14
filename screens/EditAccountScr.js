import React, {Component} from 'react';
import {Image, ToastAndroid} from 'react-native';
import {View, Text, StyleSheet} from 'react-native';
import Button from '../components/Button';
import TextInputWithError from '../components/TextInputWithError';
import {Colors} from '../resources/Colors';

class EditAccountScr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
    };
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
          firstName: json.first_name,
          lastName: json.last_name,
          email: json.email,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  isDetailsValid = () => {
    return this.isNameValid(this.state.firstName) &&
      this.isNameValid(this.state.lastName) &&
      this.isEmailValid(this.state.email)
      ? true
      : false;
  };

  isNameValid = (name) => {
    let regex = /^[a-zA-Z]+$/;
    return regex.test(name) ? true : false;
  };

  isEmailValid = (email) => {
    let regex = /^\S+@\S+\.\S+$/;
    return regex.test(email) ? true : false;
  };

  save = () => {
    let body = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email: this.state.email,
    };

    fetch('http://10.0.2.2:3333/api/1.0.0/user/' + global.user.id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': global.user.token,
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.status === 200) {
          this.props.navigation.navigate('My Account');
          ToastAndroid.show('Save successful', ToastAndroid.SHORT);
        } else {
          ToastAndroid.show('Save failed', ToastAndroid.SHORT);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.logo}
            source={require('../resources/logo.png')}
          />
        </View>
        <View style={styles.body}>
          <View style={styles.title}>
            <Text style={styles.titleText}>Edit your details below.</Text>
          </View>
          <View style={styles.inputs}>
            <TextInputWithError
              containerStyle={styles.textInput}
              placeholder="First Name"
              onChangeText={(firstName) => this.setState({firstName})}
              value={this.state.firstName}
              errorText="Name must only contain letters."
              showError={!this.isNameValid(this.state.firstName)}
            />
            <TextInputWithError
              containerStyle={styles.textInput}
              placeholder="Last Name"
              onChangeText={(lastName) => this.setState({lastName})}
              value={this.state.lastName}
              errorText="Name must only contain letters."
              showError={!this.isNameValid(this.state.lastName)}
            />
            <TextInputWithError
              containerStyle={styles.textInput}
              placeholder="Email"
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
              errorText="Email must match format: name@email.com"
              showError={!this.isEmailValid(this.state.email)}
            />
          </View>
          <View style={styles.save}>
            <Button
              text="Save"
              onPress={() => this.save()}
              disabled={!this.isDetailsValid()}
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
  title: {
    flex: 1,
    justifyContent: 'center',
  },
  titleText: {
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
  save: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
});

export default EditAccountScr;
