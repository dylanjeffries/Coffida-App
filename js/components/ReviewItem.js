import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import API from '../API';
import {Colors} from '../resources/Colors';
import IconButton from './IconButton';
import IconText from './IconText';

class ReviewItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  getPhoto = () => {
    API.getLocationReviewPhoto(this.state.params).then((response) => {
      if (response.status === 200) {
        this.setState({
          photoUrl: response.url,
        });
      }
    });
  };

  addLike = () => {
    API.postLocationReviewLike(this.state.params).then((response) => {
      this.props.refresh();
    });
  };

  removeLike = () => {
    API.deleteLocationReviewLike(this.state.params).then((response) => {
      this.props.refresh();
    });
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
            <IconButton
              buttonStyle={styles.editButton}
              name="pencil"
              size={20}
              color="orange"
            />
            <IconButton
              buttonStyle={styles.editButton}
              name="close"
              size={24}
              color="red"
            />
          </View>
        ) : null}
        <View style={styles.mainSection}>
          {this.state.photoUrl ? (
            <Image style={styles.photo} source={{uri: this.state.photoUrl}} />
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
            <View style={styles.likes}>
              <IconButton
                buttonStyle={styles.likesButton}
                onPress={() => this.addLike()}
                name="thumbs-up"
                size={20}
                color="lime"
              />
              <Text style={styles.likesText}>
                {this.props.item.review.likes}
              </Text>
              <IconButton
                buttonStyle={styles.likesButton}
                onPress={() => this.removeLike()}
                name="thumbs-down"
                size={20}
                color="red"
              />
            </View>
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
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    marginBottom: 5,
  },
  location: {
    flex: 12,
    color: 'white',
    textAlignVertical: 'center',
  },
  editButton: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  mainSection: {
    flexDirection: 'row',
    paddingTop: 5,
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 20,
    margin: 5,
  },
  info: {
    flex: 1,
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
    flexDirection: 'row',
    alignSelf: 'center',
  },
  likesButton: {
    backgroundColor: 'transparent',
  },
  likesText: {
    marginHorizontal: 5,
    color: 'white',
    textAlignVertical: 'center',
  },
});

export default ReviewItem;
