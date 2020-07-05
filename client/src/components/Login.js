import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { signin, authenticate } from '../utils/API';

// Import reactstrap
import {
  Container,
  Col,
  Row,
  Form,
  FormGroup,
  Input,
  Button
} from 'reactstrap';

function Login() {
  const [values, setValues] = useState({
    username: '',
    password: '',
    error: false,
    loading: false,
    redirectToReferrer: false
  });

  const { username, password, error, loading, redirectToReferrer } = values;

  const handleChange = event => {
    const { name, value } = event.target;
    setValues({
      ...values,
      error: false,
      [name]: value
    });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({
      ...values,
      error: false,
      loading: true
    });
    // console.log(values);
    signin({ username, password })
      .then(res => {
        // console.log(res);
        authenticate(res.data, () => {
          setValues({
            ...values,
            redirectToReferrer: true
          });
        });
      })
      .catch(err => {
        console.log(err);
        setValues({
          ...values,
          error: true,
          loading: false
        });
      });
  };

  const showError = () => (
    <div
      className='alert alert-danger'
      style={{
        display: error ? '' : 'none'
      }}
    >
      <p>Whoops, probably an invalid username or password</p>
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className='alert alert-info'>
        <h2>Loading...</h2>
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferrer) {
      return <Redirect to='/' />;
    }
  };

  return (
    <div>
      {showLoading()}
      {showError()}
      {redirectUser()}
      <Container fluid className='mr-auto ml-auto'>
        <Col>
          <Row>
            <h1 className='large text-info'>Login</h1>
          </Row>
        </Col>
        <Col>
          <Row>
            <p className='lead'>Let's get your saved Queries</p>
          </Row>
        </Col>
        <Col className='mr-auto ml-auto'>
          <Row>
            <Form className='form'>
              <FormGroup>
                <Input
                  type='text'
                  placeholder='Username'
                  name='username'
                  // value={username}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type='password'
                  placeholder='Password'
                  name='password'
                  // value={password}
                  onChange={handleChange}
                  minLength='6'
                />
              </FormGroup>
              <Button
                type='submit'
                color='info'
                value='Login'
                onClick={clickSubmit}
              >
                Login
              </Button>
            </Form>
          </Row>
        </Col>
        <Col>
          <Row>
            <p>
              Already have an account?{' '}
              <Link to='/signup' className='text-primary'>
                Log-In
              </Link>
            </p>
          </Row>
        </Col>
      </Container>
    </div>
  );
}

export default Login;
