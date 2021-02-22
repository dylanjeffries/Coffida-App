import React, {Component} from 'react';
import { Image } from 'react-native';
import {View, Text, StyleSheet, ToastAndroid} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import API from '../API';
import Button from '../components/Button';
import Header from '../components/Header';
import PhotoInput from '../components/PhotoInput';
import Selector from '../components/Selector';
import TextInputWithError from '../components/TextInputWithError';
import {Colors} from '../resources/Colors';

const ratingItems = [
  {label: '---', value: -1},
  {label: '0', value: 0},
  {label: '1', value: 1},
  {label: '2', value: 2},
  {label: '3', value: 3},
  {label: '4', value: 4},
  {label: '5', value: 5},
];

class AddReviewScr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overallRating: -1,
      priceRating: -1,
      qualityRating: -1,
      clenlinessRating: -1,
      reviewBody: '',
      photo: null,
    };
    // Create bad-words filter for review body profanity check
    var Filter = require('bad-words');
    this.filter = new Filter();
    this.filter.addWords('tea', 'cake', 'cakes', 'pastry', 'pastries');
  }

  // Use API to create new account using entered details
  submit = async () => {
    let params = {loc_id: this.props.route.params.location_id};
    let body = {
      overall_rating: this.state.overallRating,
      price_rating: this.state.priceRating,
      quality_rating: this.state.qualityRating,
      clenliness_rating: this.state.clenlinessRating,
      review_body: this.state.reviewBody,
    };
    let response = await API.postLocationReview(params, body);
    if (response.status === 201) {
      // Show success message and switch back to Location screen
      ToastAndroid.show('Review added', ToastAndroid.SHORT);
      this.props.navigation.navigate('Location');
    } else {
      ToastAndroid.show('Submission failed', ToastAndroid.SHORT);
    }
  };

  isFormValid = () => {
    return this.isRatingsValid() && this.isReviewBodyValid() ? true : false;
  };

  isRatingsValid = () => {
    return this.state.overallRating !== -1 &&
      this.state.priceRating !== -1 &&
      this.state.qualityRating !== -1 &&
      this.state.clenlinessRating !== -1
      ? true
      : false;
  };

  isReviewBodyValid = () => {
    return this.state.reviewBody !== '' &&
      !this.filter.isProfane(this.state.reviewBody)
      ? true
      : false;
  };

  render() {
    console.log(this.state.photo);
    return (
      <View style={styles.container}>
        <Header style={styles.header} />
        <View style={styles.body}>
          <View style={styles.title}>
            <Text style={styles.titleText}>Enter your review below.</Text>
          </View>
          <View style={styles.row}>
            <Selector
              containerStyle={styles.separator}
              items={ratingItems}
              text="Overall"
              icon={{name: 'checkmark-circle', size: 20, color: 'white'}}
              onValueChange={(overallRating) => this.setState({overallRating})}
              value={this.state.overallRating}
            />
            <Selector
              containerStyle={styles.separator}
              items={ratingItems}
              text="Price"
              icon={{name: 'cash', size: 20, color: 'white'}}
              onValueChange={(priceRating) => this.setState({priceRating})}
              value={this.state.priceRating}
            />
          </View>
          <View style={styles.row}>
            <Selector
              containerStyle={styles.separator}
              items={ratingItems}
              text="Quality"
              icon={{name: 'ribbon', size: 20, color: 'white'}}
              onValueChange={(qualityRating) => this.setState({qualityRating})}
              value={this.state.qualityRating}
            />
            <Selector
              containerStyle={styles.separator}
              items={ratingItems}
              text="Clenliness"
              icon={{name: 'trash', size: 20, color: 'white'}}
              onValueChange={(clenlinessRating) =>
                this.setState({clenlinessRating})
              }
              value={this.state.clenlinessRating}
            />
          </View>
          <Text
            style={
              this.isRatingsValid()
                ? [styles.error, styles.transparent]
                : styles.error
            }>
            Each rating must have a value.
          </Text>
          <TextInputWithError
            containerStyle={[styles.separator, styles.textInputContainer]}
            inputStyle={styles.textInput}
            placeholder="Body Text"
            onChangeText={(reviewBody) => this.setState({reviewBody})}
            value={this.state.reviewBody}
            textAlign="left"
            errorText="Body must not be empty and should only mention relevant topics."
            showError={!this.isReviewBodyValid()}
          />
          <PhotoInput onPhotoChange={(photo) => this.setState({photo})} />
          <View style={styles.submit}>
            <Button
              text="Submit"
              onPress={() => this.submit()}
              disabled={!this.isFormValid()}
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flex: 1,
  },
  body: {
    flex: 14,
    alignItems: 'center',
    width: '70%',
  },
  title: {
    marginVertical: 20,
    justifyContent: 'center',
  },
  titleText: {
    padding: 10,
    fontSize: 18,
    backgroundColor: Colors.blue_7,
    color: 'white',
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  separator: {
    marginBottom: 10,
  },
  textInputContainer: {
    width: '100%',
  },
  textInput: {
    height: 150,
    padding: 20,
    textAlignVertical: 'top',
  },
  error: {
    padding: 5,
    marginTop: 5,
    marginBottom: 10,
    alignSelf: 'center',
    fontSize: 12,
    color: 'red',
    backgroundColor: 'white',
  },
  transparent: {
    opacity: 0,
  },
  submit: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
});

export default AddReviewScr;
