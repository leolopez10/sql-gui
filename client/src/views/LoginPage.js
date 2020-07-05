import React from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import LoginForm from '../components/Login';
import { Container } from 'reactstrap';

const SignUpPage = () => {
  return (
    <div>
      <Header />
      <Container>
        <LoginForm />
      </Container>
      <Footer />
    </div>
  );
};

export default SignUpPage;
