class API {
  // 1 - Add a new user
  static postUser = async (body) => {
    return await fetch('http://10.0.2.2:3333/api/1.0.0/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.status === 201) {
          return response;
        } else {
          throw Error(response.statusText);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 2 - Log into an account
  static postUserLogin = async (body) => {
    return await fetch('http://10.0.2.2:3333/api/1.0.0/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 400) {
          return {status: 400};
        } else {
          throw Error(response.statusText);
        }
      })
      .then((json) => {
        return {status: 200, json: json};
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 3 - Log out of an account
  static postUserLogout = async () => {
    return await fetch('http://10.0.2.2:3333/api/1.0.0/user/logout', {
      method: 'POST',
      headers: {
        'X-Authorization': global.user.token,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response;
        } else {
          throw Error(response.statusText);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 4 - Get user information
  static getUser = async () => {
    return await fetch(
      'http://10.0.2.2:3333/api/1.0.0/user/' + global.user.id,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': global.user.token,
        },
      },
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw Error(response.statusText);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 5 - Update user information
  static patchUser = async (body) => {
    return await fetch(
      'http://10.0.2.2:3333/api/1.0.0/user/' + global.user.id,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': global.user.token,
        },
        body: JSON.stringify(body),
      },
    )
      .then((response) => {
        if (response.status === 200) {
          return response;
        } else {
          throw Error(response.statusText);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 9 - Get a photo for a review
  static getLocationReviewPhoto = async (params) => {
    return await fetch(
      'http://10.0.2.2:3333/api/1.0.0/location/' +
        params.loc_id +
        '/review/' +
        params.rev_id +
        '/photo?t=' +
        Date.now(),
      {
        method: 'GET',
      },
    )
      .then((response) => {
        if (response.status === 200) {
          return {status: 200, url: response.url};
        } else if (response.status === 404) {
          return {status: 404};
        } else {
          throw Error(response.statusText);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 10 - Add a photo to a review
  static postLocationReviewPhoto = async (params) => {
    return await fetch(
      'http://10.0.2.2:3333/api/1.0.0/location/' +
        params.loc_id +
        '/review/' +
        params.rev_id +
        '/photo',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/octet-stream',
          'X-Authorization': global.user.token,
        },
      },
    )
      .then((response) => {
        if (response.status === 200) {
          return response;
        } else {
          throw Error(response.statusText);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 12 - Like a review
  static postLocationReviewLike = async (params) => {
    return await fetch(
      'http://10.0.2.2:3333/api/1.0.0/location/' +
        params.loc_id +
        '/review/' +
        params.rev_id +
        '/like',
      {
        method: 'POST',
        headers: {
          'X-Authorization': global.user.token,
        },
      },
    )
      .then((response) => {
        if (response.status === 200) {
          return response;
        } else {
          throw Error(response.statusText);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 13 - Remove a like from a review
  static deleteLocationReviewLike = async (params) => {
    return await fetch(
      'http://10.0.2.2:3333/api/1.0.0/location/' +
        params.loc_id +
        '/review/' +
        params.rev_id +
        '/like',
      {
        method: 'DELETE',
        headers: {
          'X-Authorization': global.user.token,
        },
      },
    )
      .then((response) => {
        if (response.status === 200) {
          return response;
        } else {
          throw Error(response.statusText);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 15 - Favourite a location
  static postLocationFavourite = async (params) => {
    return await fetch(
      'http://10.0.2.2:3333/api/1.0.0/location/' + params.loc_id + '/favourite',
      {
        method: 'POST',
        headers: {
          'X-Authorization': global.user.token,
        },
      },
    )
      .then((response) => {
        if (response.status === 200) {
          return response;
        } else {
          throw Error(response.statusText);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 16 - Unfavourite a location
  static deleteLocationFavourite = async (params) => {
    return await fetch(
      'http://10.0.2.2:3333/api/1.0.0/location/' + params.loc_id + '/favourite',
      {
        method: 'DELETE',
        headers: {
          'X-Authorization': global.user.token,
        },
      },
    )
      .then((response) => {
        if (response.status === 200) {
          return response;
        } else {
          throw Error(response.statusText);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 17 - Find locations
  static getFind = async (params) => {
    return await fetch(
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
          'Content-Type': 'application/json',
          'X-Authorization': global.user.token,
        },
      },
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw Error(response.statusText);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export default API;
