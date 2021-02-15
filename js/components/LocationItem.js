import React, {Component} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {Colors} from '../resources/Colors';

class LocationItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.photo}
          source={{
            uri: this.props.item.photo_path,
          }}
        />
        <View style={styles.details}>
          <Text style={styles.fontSize18}>{this.props.item.location_name}</Text>
          <Text style={styles.paddingBottom3}>
            {this.props.item.location_town}
          </Text>
          <View style={styles.rating_reviews}>
            <Text style={styles.flexOne}>
              Overall Rating: {this.props.item.avg_overall_rating}
            </Text>
            <Text style={styles.flexOne}>
              Reviews: {this.props.item.location_reviews.length}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  fontSize18: {
    fontSize: 18,
  },
  paddingBottom3: {
    paddingBottom: 3,
  },
  container: {
    backgroundColor: Colors.blue_2,
    flexDirection: 'row',
    padding: 6,
    marginBottom: 20,
    borderRadius: 6,
  },
  photo: {
    backgroundColor: '#1d7cb0',
    resizeMode: 'contain',
    height: 70,
    width: 70,
  },
  details: {
    flex: 1,
    paddingLeft: 6,
  },
  rating_reviews: {
    flexDirection: 'row',
    paddingTop: 3,
    borderTopWidth: 1,
    borderTopColor: 'black',
  },
});

export default LocationItem;
