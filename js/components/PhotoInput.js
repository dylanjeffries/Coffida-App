import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  PermissionsAndroid,
  ToastAndroid,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Button from './Button';

class PhotoInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: props.photo,
    };
  }

  requestCameraPermission = async () => {
    try {
      let granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  takePhoto = async () => {
    let permissionGranted = await this.requestCameraPermission();
    if (permissionGranted) {
      let options = {
        mediaType: 'photo',
        quality: 0.5,
        includeBase64: true,
      };
      launchCamera(options, (response) => {
        if (!('didCancel' in response)) {
          this.setState({photo: response});
          this.props.onPhotoChange(response);
        }
      });
    } else {
      ToastAndroid.show('Camera Error', ToastAndroid.SHORT);
    }
  };

  chooseFromFiles = () => {
    let options = {
      mediaType: 'photo',
      quality: 0.5,
      includeBase64: true,
    };
    launchImageLibrary(options, (response) => {
      if (!('didCancel' in response)) {
        this.setState({photo: response});
        this.props.onPhotoChange(response);
      }
    });
  };

  removePhoto = () => {
    this.setState({photo: null});
    this.props.onPhotoChange(null);
  };

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        {this.state.photo === undefined || this.state.photo === null ? (
          <View style={styles.buttonContainer}>
            <Button text="Take Photo" onPress={() => this.takePhoto()} />
            <Button
              text="Choose from files"
              onPress={() => this.chooseFromFiles()}
            />
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            <Button text="Remove Photo" onPress={() => this.removePhoto()} />
          </View>
        )}
        <View style={styles.photoContainer}>
          <Image
            style={styles.photo}
            source={
              this.state.photo === undefined || this.state.photo === null
                ? require('../resources/nophoto.jpeg')
                : {uri: this.state.photo.uri}
            }
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  photoContainer: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: 'black',
  },
  photo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default PhotoInput;
