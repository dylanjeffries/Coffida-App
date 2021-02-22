import React, {Component} from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import API from '../API';
import {Colors} from '../resources/Colors';
import Button from './Button';
import IconText from './IconText';

class LocationItem extends Component {
  constructor(props) {
    super(props);
    this.state = props.item;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.item !== this.props.item) {
      this.setLocation();
    }
  }

  setLocation = () => {
    this.setState(this.props.item);
  };

  viewLocation = () => {
    this.props.navigation.navigate('Location', {
      location_id: this.state.location_id,
      favourite: this.state.favourite,
    });
  };

  toggleFavourite = () => {
    let params = {loc_id: this.state.location_id};
    if (this.state.favourite) {
      API.deleteLocationFavourite(params).then((response) => {
        if (response.status === 200) {
          this.setState({favourite: false});
        }
      });
    } else {
      API.postLocationFavourite(params).then((response) => {
        if (response.status === 200) {
          this.setState({favourite: true});
        }
      });
    }
  };

  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        disabled={this.props.disabled}
        onPress={() => this.viewLocation()}>
        <Image
          style={styles.photo}
          source={{
            uri: this.state.photo_path,
          }}
        />
        <View style={styles.info}>
          <View style={styles.topSection}>
            <View style={styles.nameTown}>
              <View>
                <Text style={styles.name}>{this.state.location_name}</Text>
              </View>
              <View>
                <Text style={styles.town}>{this.state.location_town}</Text>
              </View>
            </View>
            <Button
              style={styles.favourite}
              icon={{
                name: this.state.favourite ? 'star' : 'star-outline',
                size: 25,
                color: this.state.favourite ? 'yellow' : 'white',
              }}
              onPress={() => this.toggleFavourite()}
            />
          </View>
          <View style={styles.ratings}>
            <IconText
              iconName="checkmark-circle"
              iconSize={20}
              iconColor="white"
              text={
                this.state.avg_overall_rating !== undefined &&
                this.state.avg_overall_rating !== null
                  ? this.state.avg_overall_rating.toFixed(1)
                  : 0.0
              }
            />
            <IconText
              iconName="cash"
              iconSize={20}
              iconColor="white"
              text={
                this.state.avg_price_rating !== undefined &&
                this.state.avg_price_rating !== null
                  ? this.state.avg_price_rating.toFixed(1)
                  : 0.0
              }
            />
            <IconText
              iconName="ribbon"
              iconSize={20}
              iconColor="white"
              text={
                this.state.avg_quality_rating !== undefined &&
                this.state.avg_quality_rating !== null
                  ? this.state.avg_quality_rating.toFixed(1)
                  : 0.0
              }
            />
            <IconText
              iconName="trash"
              iconSize={20}
              iconColor="white"
              text={
                this.state.avg_clenliness_rating !== undefined &&
                this.state.avg_clenliness_rating !== null
                  ? this.state.avg_clenliness_rating.toFixed(1)
                  : 0.0
              }
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 5,
    marginBottom: 20,
    backgroundColor: Colors.blue_7,
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 20,
    margin: 5,
  },
  info: {
    flex: 1,
    paddingLeft: 5,
  },
  topSection: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    marginBottom: 5,
  },
  nameTown: {
    flex: 3,
  },
  name: {
    fontSize: 18,
    color: 'white',
  },
  town: {
    color: 'white',
  },
  favourite: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  ratings: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  rating: {
    width: 'auto',
    flexDirection: 'row',
  },
  ratingText: {
    marginLeft: 5,
    color: 'white',
    textAlignVertical: 'center',
  },
});

export default LocationItem;
