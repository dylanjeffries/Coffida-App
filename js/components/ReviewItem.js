import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../resources/Colors';
import IconButton from './IconButton';
import IconText from './IconText';

class ReviewItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.editable ? (
          <View style={styles.topSection}>
            <Text style={styles.location}>
              {this.props.item.location.location_name +
                ', ' +
                this.props.item.location.location_town}
            </Text>
            <IconButton
              buttonStyle={styles.editableButton}
              name="pencil"
              size={20}
              color="orange"
            />
            <IconButton
              buttonStyle={styles.editableButton}
              name="close"
              size={24}
              color="red"
            />
          </View>
        ) : null}
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
            name="thumbs-up"
            size={20}
            color="white"
          />
          <Text style={styles.likesText}>{this.props.item.review.likes}</Text>
          <IconButton
            buttonStyle={styles.likesButton}
            name="thumbs-down"
            size={20}
            color="white"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    marginBottom: 10,
    backgroundColor: Colors.blue_7,
  },
  topSection: {
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
  editableButton: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  ratings: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 5,
  },
  reviewBody: {
    flex: 1,
    paddingBottom: 5,
  },
  reviewText: {
    color: 'white',
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
