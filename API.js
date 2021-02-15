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
        'Content-Type': 'application/json',
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
