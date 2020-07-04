import axios from 'axios';

// =========================================================================
// Logging in, Signing up, Authentication, Logging out, and Deleting account
// =========================================================================

// Sign up
export const signup = user => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify(user);

  return axios.post('/api/auth/signup', body, config);
  // .then(res => res)
  // .catch(err => console.log(err));
};

// Log in
export const signin = user => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify(user);

  return axios.post('/api/auth/signin', body, config);
  // .then(res => console.log(res))
  // .catch(err => console.log(err));
};

// Authenticate the user after log in
export const authenticate = (data, next) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('jwt', data);
    next();
  }
};

// make sure users are authenticated
export const isAuthenticated = () => {
  if (typeof window == 'undefined') {
    return false;
  }
  if (localStorage.getItem('jwt')) {
    return JSON.parse(localStorage.getItem('jwt'));
  } else {
    return false;
  }
};

// Log out
export const signout = next => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('jwt');
    next();
  }
  return axios.get('/api/auth/signout');
};

// Delete Account
export const deleteAccount = (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  axios
    .delete(`/api/auth/remove/${userId}`, config)
    .then(res => res)
    .catch(err => console.log(err));
};

// ====================================================
// Saving SQL Code
// ====================================================

// Create SQL code
export const saveCode = (values, userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify(values);

  axios
    .post(`/api/sql_code/create/${userId}`, body, config)
    .then(res => res)
    .catch(err => console.log(err));
};

// List all of user queries
export const getQueries = (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  axios
    .get(`/api/sql_code/list/${userId}`, config)
    .then(res => {
      return res;
    })
    .catch(err => {
      if (err) {
        console.log(err);
      }
    });
};

// Get a single query to plug into front end
export const getQuery = (codeId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  axios
    .get(`/api/sql_code/single/${codeId}`, config)
    .then(res => {
      return res;
    })
    .catch(err => {
      if (err) {
        console.log(err);
      }
    });
};

// Update a single query
export const updateQuery = (values, codeId, userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify(values);

  axios
    .put(`/api/sql_code/update/${codeId}/${userId}`, body, config)
    .then(res => res)
    .catch(err => console.log(err));
};

// Delete a user's query
export const deleteQuery = (codeId, userId) => {
  axios
    .delete(`/api/sql_code/remove/${codeId}/${userId}`)
    .then(res => res.data)
    .catch(err => console.log(err));
};

// ====================================================
// Executing SQL Code
// ====================================================
export const executeSql = sql => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify(sql);

  axios
    .post('/api/sql_db', body, config)
    .then(response => console.log(response.data))
    .catch(err => console.log(err));
};
