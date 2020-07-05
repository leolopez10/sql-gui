import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../utils/API';

import {
  Container,
  Col,
  Row,
  Form,
  FormGroup,
  Input,
  Button
} from 'reactstrap';

function SignUp() {
  const [values, setValues] = useState({
    username: '',
    password: '',
    password2: '',
    error: false,
    success: false
  });

  const { username, password, password2, error, success } = values;

  const handleChange = event => {
    const { name, value } = event.target;
    setValues({
      ...values,
      error: false,
      [name]: value
    });
  };

  const onSubmit = event => {
    event.preventDefault();
    if (password !== password2) {
      return alert('Passwords do not match');
    } else if (password.length < 6 && password2.length < 6) {
      return alert('Password must be at least 6 characters long');
    }
    signup({ username, password })
      .then(res => {
        // console.log(res);
        setValues({
          ...values,
          username: '',
          password: '',
          password2: '',
          error: false,
          success: true
        });
      })
      .catch(err => {
        console.log(err);
        setValues({
          ...values,
          error: true,
          success: false
        });
      });
  };

  const showSuccess = () => (
    <div
      className='alert alert-success'
      style={{ display: success ? '' : 'none' }}
    >
      New account is created. Please <Link to='/login'>Login</Link>
    </div>
  );

  const showError = () => (
    <div
      className='alert alert-danger'
      style={{
        display: error ? '' : 'none'
      }}
    >
      <p>Hmm seems like someone already took that username</p>
    </div>
  );

  return (
    <div>
      {showSuccess()}
      {showError()}
      <Container fluid className='mr-auto ml-auto'>
        <Col>
          <Row className='d-flex flex-column mr-auto ml-auto'>
            <h1 className='large text-primary'>Sign Up</h1>
            <p className='lead'>Create Your Account</p>
            <Col>
              <Row>
                <Form
                  className='form'
                  //   onSubmit={}
                >
                  <FormGroup>
                    <Input
                      type='text'
                      placeholder='Username'
                      name='username'
                      onChange={handleChange}
                      value={username}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type='password'
                      placeholder='Password'
                      name='password'
                      onChange={handleChange}
                      value={password}
                      minLength='6'
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type='password'
                      placeholder='Confirm Password'
                      name='password2'
                      onChange={handleChange}
                      value={password2}
                      minLength='6'
                    />
                  </FormGroup>
                  <Button
                    type='submit'
                    color='primary'
                    value='Register'
                    onClick={onSubmit}
                  >
                    Register
                  </Button>
                  <p>
                    Already have an account?{' '}
                    <Link to='/login' className='text-info'>
                      Log-In
                    </Link>
                  </p>
                </Form>
              </Row>
            </Col>
          </Row>
        </Col>
      </Container>
    </div>
  );
}

export default SignUp;
