import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import API from '../API';
import {Colors} from '../resources/Colors';
import Button from './Button';
import IconText from './IconText';

class ReviewItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: this.props.item.review.liked,
      photoUrl: '',
      params: {
        loc_id: this.props.item.location.location_id,
        rev_id: this.props.item.review.review_id,
      },
    };
  }

  componentDidMount() {
    this.getPhoto();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.item !== this.props.item) {
      this.setLiked();
    }
  }

  setLiked = () => {
    this.setState({liked: this.props.item.review.liked});
  };

  getPhoto = () => {
    API.getLocationReviewPhoto(this.state.params).then((response) => {
      if (response.status === 200) {
        this.setState({
          photoUrl: response.url,
        });
      }
    });
  };

  toggleLike = () => {
    if (this.state.liked) {
      API.deleteLocationReviewLike(this.state.params).then((response) => {
        if (response.status === 200) {
          this.setState({liked: false});
          this.props.refresh();
        }
      });
    } else {
      API.postLocationReviewLike(this.state.params).then((response) => {
        if (response.status === 200) {
          this.setState({liked: true});
          this.props.refresh();
        }
      });
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
            />
          </View>
        ) : null}
        <View style={styles.mainSection}>
          {this.state.photoUrl ? (
            <View style={styles.photoContainer}>
              <Image style={styles.photo} source={{uri: this.state.photoUrl}} />
            </View>
          ) : null}
          <View style={styles.info}>
            <View style={styles.ratings}>
              <IconText
                iconName="checkmark-circle"
                iconSize={20}
                iconColor="white"
                text={this.props.item.review.overall_rating}
              />
              <IconText
                iconName="cash"
                iconSize={20}
                iconColor="white"
                text={this.props.item.review.price_rating}
              />
              <IconText
                iconName="ribbon"
                iconSize={20}
                iconColor="white"
                text={this.props.item.review.quality_rating}
              />
              <IconText
                iconName="trash"
                iconSize={20}
                iconColor="white"
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
