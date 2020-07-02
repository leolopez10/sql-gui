import React, { Fragment } from 'react';

// Import BootStrap
import { Container } from 'reactstrap';

// Import Core components
import Header from '../components/Header';
import Footer from '../components/Footer';
import QueryName from '../components/QueryName';
import SqlEditor from '../components/SqlEditor';
import Results from '../components/Results';
import SavedQueries from '../components/SavedQueries';

function LandingPage() {
  return (
    <Fragment>
      <Header />
      <Container fluid={true}>
        <SavedQueries />
        <QueryName />
        <SqlEditor />
        <Results />
      </Container>
      <Footer />
    </Fragment>
  );
}

export default LandingPage;
