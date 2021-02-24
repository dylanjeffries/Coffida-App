import React, {Component} from 'react';
import {View, StyleSheet, ToastAndroid} from 'react-native';
import API from '../API';
import Button from '../components/Button';
import Header from '../components/Header';
import Title from '../components/Title';
import PhotoInput from '../components/PhotoInput';
import {Colors} from '../resources/Colors';

class EditPhotoScr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      originalPhoto: props.route.params.photo,
      photo: props.route.params.photo,
    };
  }

  // API calls for either adding or removing the review photo
  save = async () => {
    let params = this.props.route.params.params;
    let body = this.state.photo;
    // If new photo is not null (New photo or replacement photo)
    if (this.state.photo !== null) {
      // Use API to add photo to review
      let response = await API.postLocationReviewPhoto(params, body);
      if (response.status === 200) {
        ToastAndroid.show('Photo edited', ToastAndroid.SHORT);
        this.props.navigation.navigate('My Reviews');
      } else {
        ToastAndroid.show('Save failed', ToastAndroid.SHORT);
      }
    }
    // If original photo was not null but the new photo is null (Remove)
    else if (this.state.originalPhoto !== null && this.state.photo === null) {
      // Use API to remove photo from review
      let response = await API.deleteLocationReviewPhoto(params);
      if (response.status === 200) {
        ToastAndroid.show('Photo removed', ToastAndroid.SHORT);
        this.props.navigation.navigate('My Reviews');
      } else {
        ToastAndroid.show('Save failed', ToastAndroid.SHORT);
      }
    }
    // If original photo and new photo are both null (No changes)
    else {
      ToastAndroid.show('No changes made', ToastAndroid.SHORT);
      this.props.navigation.navigate('My Reviews');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Header style={styles.header} />
        <View style={styles.body}>
          <Title style={styles.title} text="Edit review photo below." />
          <PhotoInput
            style={styles.photo}
            photo={this.state.photo}
            onPhotoChange={(photo) => this.setState({photo})}
          />
          <View style={styles.submitContainer}>
            <Button
              style={styles.submit}
              text="Save"
              onPress={() => this.save()}
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
    alignItems: 'center',
    backgroundColor: Colors.blue_5,
  },
  header: {
    flex: 1,
  },
  body: {
    width: '80%',
    flex: 14,
    paddingVertical: 10,
  },
  title: {
    flex: 1,
    marginBottom: 15,
  },
  photo: {
    flex: 2,
  },
  submitContainer: {
    flex: 5,
    justifyContent: 'center',
  },
  submit: {
    width: '30%',
    alignSelf: 'center',
  },
});

export default EditPhotoScr;
