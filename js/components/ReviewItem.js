import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, Alert, ToastAndroid} from 'react-native';
import API from '../API';
import {Colors} from '../resources/Colors';
import Button from './Button';
import IconText from './IconText';

class ReviewItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: this.props.item.review.liked,
      photo: null,
      params: {
        loc_id: this.props.item.location.location_id,
        rev_id: this.props.item.review.review_id,
      },
    };
  }

  componentDidMount() {
    // Get Review Photo
    this.getPhoto();
    // Set Focus Listener
    this.props.navigation.addListener('focus', () => this.onFocus());
  }

  // When screen comes into focus
  onFocus = () => {
    this.getPhoto();
  };

  componentDidUpdate(prevProps) {
    if (prevProps.item !== this.props.item) {
      this.setLiked();
    }
  }

  setLiked = () => {
    this.setState({liked: this.props.item.review.liked});
  };

  getPhoto = async () => {
    let response = await API.getLocationReviewPhoto(this.state.params);
    if (response.status === 200) {
      this.setState({
        photo: {uri: response.url},
      });
    } else {
      this.setState({
        photo: null,
      });
    }
  };

  // Use the API to either like or dislike a review based on the toggle state
  toggleLike = async () => {
    if (this.state.liked) {
      let response = await API.deleteLocationReviewLike(this.state.params);
      if (response.status === 200) {
        this.setState({liked: false});
        this.props.refresh();
      }
    } else {
      let response = await API.postLocationReviewLike(this.state.params);
      if (response.status === 200) {
        this.setState({liked: true});
        this.props.refresh();
      }
    }
  };

  editPhoto = () => {
    this.props.navigation.navigate('Edit Photo', {
      photo: this.state.photo,
      params: this.state.params,
    });
  };

  editReview = () => {
    this.props.navigation.navigate('Edit Review', {
      review: this.props.item.review,
      params: this.state.params,
    });
  };

  deleteAlert = () => {
    Alert.alert(
      'Delete Review',
      'Are you sure?',
      [
        {
          text: 'No, Go Back',
          style: 'cancel',
        },
        {
          text: 'Yes, Delete',
          onPress: () => this.deleteReview(),
        },
      ],
      {cancelable: false},
    );
  };

  deleteReview = async () => {
    let response = await API.deleteLocationReview(this.state.params);
    if (response.status === 200) {
      this.props.refresh();
      ToastAndroid.show('Review deleted', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show('Delete failed', ToastAndroid.SHORT);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {this.props.editable ? (
          <View style={styles.editSection}>
            <Text style={styles.location}>
              {this.props.item.location.location_name +
                ', ' +
                this.props.item.location.location_town}
            </Text>
            <Button
              style={styles.editButtonContainer}
              iconStyle={styles.editButtonIcon}
              buttonStyle={styles.editButton}
              icon={{
                name: 'image',
                size: 20,
                color: 'cyan',
              }}
              onPress={() => this.editPhoto()}
            />
            <Button
              style={styles.editButtonContainer}
              iconStyle={styles.editButtonIcon}
              buttonStyle={styles.editButton}
              icon={{
                name: 'pencil',
                size: 20,
                color: 'orange',
              }}
              onPress={() => this.editReview()}
            />
            <Button
              style={styles.editButtonContainer}
              iconStyle={styles.editButtonIcon}
              buttonStyle={styles.editButton}
              icon={{
                name: 'close',
                size: 20,
                color: 'red',
              }}
              onPress={() => this.deleteAlert()}
            />
          </View>
        ) : null}
        <View style={styles.mainSection}>
          {this.state.photo ? (
            <View style={styles.photoContainer}>
              <Image
                style={styles.photo}
                source={{uri: this.state.photo.uri}}
              />
            </View>
          ) : null}
          <View style={styles.info}>
            <View style={styles.ratings}>
              <IconText
                icon={{
                  name: 'checkmark-circle',
                  size: 20,
                  color: 'white',
                }}
                text={this.props.item.review.overall_rating}
              />
              <IconText
                icon={{
                  name: 'cash',
                  size: 20,
                  color: 'white',
                }}
                text={this.props.item.review.price_rating}
              />
              <IconText
                icon={{
                  name: 'ribbon',
                  size: 20,
                  color: 'white',
                }}
                text={this.props.item.review.quality_rating}
              />
              <IconText
                icon={{
                  name: 'trash',
                  size: 20,
                  color: 'white',
                }}
                text={this.props.item.review.clenliness_rating}
              />
            </View>
            <View style={styles.reviewBody}>
              <Text style={styles.reviewText}>
                {this.props.item.review.review_body}
              </Text>
            </View>
            <Button
              style={styles.likes}
              icon={{
                name: 'thumbs-up-sharp',
                size: 20,
                color: this.state.liked ? 'lime' : 'grey',
              }}
              textAfter={this.props.item.review.likes}
              onPress={() => this.toggleLike()}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    marginBottom: 20,
    backgroundColor: Colors.blue_7,
  },
  editSection: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  location: {
    flex: 6,
    color: 'white',
    textAlignVertical: 'center',
  },
  editButtonContainer: {
    flex: 1,
    padding: 0,
    backgroundColor: 'transparent',
  },
  editButtonIcon: {
    marginHorizontal: 0,
  },
  editButton: {
    padding: 5,
  },
  mainSection: {
    flexDirection: 'row',
    paddingTop: 5,
  },
  photoContainer: {
    flex: 1,
  },
  photo: {
    flex: 1,
    borderRadius: 20,
    margin: 5,
    resizeMode: 'cover',
  },
  info: {
    flex: 2,
    paddingTop: 5,
  },
  ratings: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 5,
  },
  reviewBody: {
    flex: 1,
    paddingBottom: 5,
  },
  reviewText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  likes: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default ReviewItem;
