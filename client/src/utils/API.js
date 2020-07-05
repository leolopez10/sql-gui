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
};

// Authenticate the user after log in
export const authenticate = (data, next) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('jwt', JSON.stringify(data));
    // localStorage.setItem('data', JSON.stringify(data));
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
export const signout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('jwt');
  }
  return axios.get('/api/auth/signout');
};

// Delete Account
export const deleteAccount = (userId, token) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('jwt');
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  return axios.delete(`/api/auth/remove/${userId}`, config);
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

  return axios.post(`/api/sql_code/create/${userId}`, body, config);
};

// List all of user queries
export const getQueries = (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  return axios.get(`/api/sql_code/list/${userId}`, config);
};

// Get a single query to plug into front end
export const getQuery = (codeId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  return axios.get(`/api/sql_code/single/${codeId}`, config);
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

  return axios.put(`/api/sql_code/update/${codeId}/${userId}`, body, config);
};

// Delete a user's query
export const deleteQuery = (codeId, userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  return axios.delete(`/api/sql_code/remove/${codeId}/${userId}`, config);
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

  return axios.post('/api/sql_db', body, config);
};
