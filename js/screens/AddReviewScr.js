import React, {Component} from 'react';
import {View, StyleSheet, ToastAndroid} from 'react-native';
import API from '../API';
import Button from '../components/Button';
import Header from '../components/Header';
import Selector from '../components/Selector';
import Title from '../components/Title';
import ValidatedTextInput from '../components/ValidatedTextInput';
import ValidationText from '../components/ValidationText';
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
    return (
      <View style={styles.container}>
        <Header style={styles.header} />
        <View style={styles.body}>
          <Title style={styles.title} text="Enter your review below." />
          <View style={styles.row}>
            <Selector
              style={styles.selector}
              items={ratingItems}
              text="Overall"
              icon={{name: 'checkmark-circle', size: 20, color: 'white'}}
              onValueChange={(overallRating) => this.setState({overallRating})}
              value={this.state.overallRating}
            />
            <Selector
              style={styles.selector}
              items={ratingItems}
              text="Quality"
              icon={{name: 'ribbon', size: 20, color: 'white'}}
              onValueChange={(qualityRating) => this.setState({qualityRating})}
              value={this.state.qualityRating}
            />
          </View>
          <View style={styles.row}>
            <Selector
              style={styles.selector}
              items={ratingItems}
              text="Price"
              icon={{name: 'cash', size: 20, color: 'white'}}
              onValueChange={(priceRating) => this.setState({priceRating})}
              value={this.state.priceRating}
            />
            <Selector
              style={styles.selector}
              items={ratingItems}
              text="Clenliness"
              icon={{name: 'trash', size: 20, color: 'white'}}
              onValueChange={(clenlinessRating) =>
                this.setState({clenlinessRating})
              }
              value={this.state.clenlinessRating}
            />
          </View>
          <ValidationText
            style={styles.ratingValidationText}
            text="Each rating must be given a value."
            hide={this.isRatingsValid()}
          />
          <ValidatedTextInput
            style={styles.reviewBody}
            placeholder="Tell us what you think..."
            paragraphMode={true}
            validationText="Body must not be empty and should only mention relevant topics."
            hide={this.isReviewBodyValid()}
            onTextChange={(reviewBody) => this.setState({reviewBody})}
            value={this.state.reviewBody}
          />
          <View style={styles.submitContainer}>
            <Button
              style={styles.submit}
              text="Submit"
              disabled={!this.isFormValid()}
              onPress={() => this.submit()}
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
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  selector: {
    flex: 1,
  },
  ratingValidationText: {
    marginBottom: 15,
  },
  reviewBody: {
    flex: 5,
    marginBottom: 15,
  },
  submitContainer: {
    flex: 3,
    justifyContent: 'center',
  },
  submit: {
    width: '30%',
    alignSelf: 'center',
  },
});

export default AddReviewScr;
