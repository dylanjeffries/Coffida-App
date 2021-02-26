import AsyncStorage from '@react-native-async-storage/async-storage';

class API {
  // 1 - Add a new user
  static postUser = async (body) => {
    try {
      let response = await fetch('http://10.0.2.2:3333/api/1.0.0/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (response.status === 201) {
        return response;
      } else {
        throw Error(response.statusText);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // 2 - Log into an account
  static postUserLogin = async (body) => {
    try {
      let response = await fetch('http://10.0.2.2:3333/api/1.0.0/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      switch (response.status) {
        case 200: // OK
          let json = await response.json();
          return {status: 200, json: json};
        case 400: // Invalid email/password
          return {status: 400};
        default:
          throw Error(response.statusText);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // 3 - Log out of an account
  static postUserLogout = async () => {
    try {
      let token = await AsyncStorage.getItem('token');
      let response = await fetch('http://10.0.2.2:3333/api/1.0.0/user/logout', {
        method: 'POST',
        headers: {
          'X-Authorization': token,
        },
      });
      if (response.status === 200) {
        return response;
      } else {
        throw Error(response.statusText);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // 4 - Get user information
  static getUser = async () => {
    try {
      let user_id = await AsyncStorage.getItem('user_id');
      let token = await AsyncStorage.getItem('token');
      let response = await fetch(
        'http://10.0.2.2:3333/api/1.0.0/user/' + user_id,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token,
          },
        },
      );
      switch (response.status) {
        case 200: // OK
          let json = await response.json();
          return {status: 200, json: json};
        case 401: // Unauthorised
          return {status: 401};
        default:
          throw Error(response.statusText);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // 5 - Update user information
  static patchUser = async (body) => {
    try {
      let user_id = await AsyncStorage.getItem('user_id');
      let token = await AsyncStorage.getItem('token');
      let response = await fetch(
        'http://10.0.2.2:3333/api/1.0.0/user/' + user_id,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token,
          },
          body: JSON.stringify(body),
        },
      );
      if (response.status === 200) {
        return response;
      } else {
        throw Error(response.statusText);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // 6 - Add a new review
  static postLocationReview = async (params, body) => {
    try {
      let token = await AsyncStorage.getItem('token');
      let response = await fetch(
        'http://10.0.2.2:3333/api/1.0.0/location/' + params.loc_id + '/review',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token,
          },
          body: JSON.stringify(body),
        },
      );
      if (response.status === 201) {
        return response;
      } else {
        throw Error(response.statusText);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // 7 - Update a review
  static patchLocationReview = async (params, body) => {
    try {
      let token = await AsyncStorage.getItem('token');
      let response = await fetch(
        'http://10.0.2.2:3333/api/1.0.0/location/' +
          params.loc_id +
          '/review/' +
          params.rev_id,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token,
          },
          body: JSON.stringify(body),
        },
      );
      if (response.status === 200) {
        return response;
      } else {
        throw Error(response.statusText);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // 8 - Delete a review
  static deleteLocationReview = async (params) => {
    try {
      let token = await AsyncStorage.getItem('token');
      let response = await fetch(
        'http://10.0.2.2:3333/api/1.0.0/location/' +
          params.loc_id +
          '/review/' +
          params.rev_id,
        {
          method: 'DELETE',
          headers: {
            'X-Authorization': token,
          },
        },
      );
      if (response.status === 200) {
        return response;
      } else {
        throw Error(response.statusText);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // 9 - Get a photo for a review
  static getLocationReviewPhoto = async (params) => {
    try {
      let response = await fetch(
        'http://10.0.2.2:3333/api/1.0.0/location/' +
          params.loc_id +
          '/review/' +
          params.rev_id +
          '/photo?t=' +
          Date.now(),
        {
          method: 'GET',
        },
      );
      switch (response.status) {
        case 200:
          return {status: 200, url: response.url};
        case 404:
          return {status: 404};
        default:
          throw Error(response.statusText);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // 10 - Add a photo to a review
  static postLocationReviewPhoto = async (params, body) => {
    try {
      let token = await AsyncStorage.getItem('token');
      let response = await fetch(
        'http://10.0.2.2:3333/api/1.0.0/location/' +
          params.loc_id +
          '/review/' +
          params.rev_id +
          '/photo',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'image/jpeg',
            'X-Authorization': token,
          },
          body: body,
        },
      );
      if (response.status === 200) {
        return response;
      } else {
        throw Error(response.statusText);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // 11 - Delete a photo from a review
  static deleteLocationReviewPhoto = async (params) => {
    try {
      let token = await AsyncStorage.getItem('token');
      let response = await fetch(
        'http://10.0.2.2:3333/api/1.0.0/location/' +
          params.loc_id +
          '/review/' +
          params.rev_id +
          '/photo',
        {
          method: 'DELETE',
          headers: {
            'X-Authorization': token,
          },
        },
      );
      if (response.status === 200) {
        return response;
      } else {
        throw Error(response.statusText);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // 12 - Like a review
  static postLocationReviewLike = async (params) => {
    try {
      let token = await AsyncStorage.getItem('token');
      let response = await fetch(
        'http://10.0.2.2:3333/api/1.0.0/location/' +
          params.loc_id +
          '/review/' +
          params.rev_id +
          '/like',
        {
          method: 'POST',
          headers: {
            'X-Authorization': token,
          },
        },
      );
      if (response.status === 200) {
        return response;
      } else {
        throw Error(response.statusText);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // 13 - Remove a like from a review
  static deleteLocationReviewLike = async (params) => {
    try {
      let token = await AsyncStorage.getItem('token');
      let response = await fetch(
        'http://10.0.2.2:3333/api/1.0.0/location/' +
          params.loc_id +
          '/review/' +
          params.rev_id +
          '/like',
        {
          method: 'DELETE',
          headers: {
            'X-Authorization': token,
          },
        },
      );
      if (response.status === 200) {
        return response;
      } else {
        throw Error(response.statusText);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // 14 - Get location info
  static getLocation = async (params) => {
    try {
      let response = await fetch(
        'http://10.0.2.2:3333/api/1.0.0/location/' + params.loc_id,
        {
          method: 'GET',
        },
      );
      if (response.status === 200) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // 15 - Favourite a location
  static postLocationFavourite = async (params) => {
    try {
      let token = await AsyncStorage.getItem('token');
      let response = await fetch(
        'http://10.0.2.2:3333/api/1.0.0/location/' +
          params.loc_id +
          '/favourite',
        {
          method: 'POST',
          headers: {
            'X-Authorization': token,
          },
        },
      );
      if (response.status === 200) {
        return response;
      } else {
        throw Error(response.statusText);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // 16 - Unfavourite a location
  static deleteLocationFavourite = async (params) => {
    try {
      let token = await AsyncStorage.getItem('token');
      let response = await fetch(
        'http://10.0.2.2:3333/api/1.0.0/location/' +
          params.loc_id +
          '/favourite',
        {
          method: 'DELETE',
          headers: {
            'X-Authorization': token,
          },
        },
      );
      if (response.status === 200) {
        return response;
      } else {
        throw Error(response.statusText);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // 17 - Find locations
  static getFind = async (params) => {
    try {
      let token = await AsyncStorage.getItem('token');
      let response = await fetch(
        'http://10.0.2.2:3333/api/1.0.0/find?q=' +
          params.q +
          '&overall_rating=' +
          params.overall_rating +
          '&price_rating=' +
          params.price_rating +
          '&quality_rating=' +
          params.quality_rating +
          '&clenliness_rating=' +
          params.clenliness_rating,
        {
          method: 'GET',
          headers: {
            'X-Authorization': token,
          },
        },
      );
      if (response.status === 200) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    } catch (err) {
      console.warn(err);
    }
  };
}

export default API;
