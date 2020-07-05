import React from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import SignUpForm from '../components/SignUp';
import { Container } from 'reactstrap';

const SignUpPage = () => {
  return (
    <div>
      <Header />
      <Container>
        <SignUpForm />
      </Container>
      <Footer />
    </div>
  );
};

export default SignUpPage;
