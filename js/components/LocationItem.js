import React, {Component} from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import API from '../API';
import {Colors} from '../resources/Colors';
import IconButton from './IconButton';
import IconText from './IconText';

class LocationItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favourite: false,
    };
  }

  componentDidMount() {
    this.setFavourite();
  }

  setFavourite = () => {
    this.setState({favourite: this.props.item.favourite});
  };

  viewLocation = () => {
    this.props.navigation.navigate('Location', {
      location_id: this.props.item.location_id,
    });
  };

  toggleFavourite = () => {
    let params = {loc_id: this.props.item.location_id};
    if (this.state.favourite) {
      API.deleteLocationFavourite(params);
      this.setState({favourite: false});
    } else {
      API.postLocationFavourite(params);
      this.setState({favourite: true});
    }
  };

  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => this.viewLocation()}>
        <Image
          style={styles.photo}
          source={{
            uri: this.props.item.photo_path,
          }}
        />
        <View style={styles.info}>
          <View style={styles.topSection}>
            <View style={styles.nameTown}>
              <View>
                <Text style={styles.name}>{this.props.item.location_name}</Text>
              </View>
              <View>
                <Text style={styles.town}>{this.props.item.location_town}</Text>
              </View>
            </View>
            <IconButton
              buttonStyle={styles.favourite}
              onPress={() => this.toggleFavourite()}
              name={this.state.favourite ? 'star' : 'star-outline'}
              size={25}
              color={this.state.favourite ? 'yellow' : 'white'}
            />
          </View>
          <View style={styles.ratings}>
            <IconText
              iconName="checkmark-circle"
              iconSize={20}
              iconColor="white"
              text={this.props.item.avg_overall_rating}
            />
            <IconText
              iconName="cash"
              iconSize={20}
              iconColor="white"
              text={this.props.item.avg_price_rating}
            />
            <IconText
              iconName="ribbon"
              iconSize={20}
              iconColor="white"
              text={this.props.item.avg_quality_rating}
            />
            <IconText
              iconName="trash"
              iconSize={20}
              iconColor="white"
              text={this.props.item.avg_clenliness_rating}
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
    backgroundColor: 'red',
  },
  info: {
    flex: 1,
    paddingLeft: 5,
  },
  topSection: {
    flex: 1,
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
    flex: 3,
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
