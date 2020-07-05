import React, { Fragment } from 'react';
import { isAuthenticated } from '../utils/API';
// Import BootStrap
import { Container } from 'reactstrap';

// Import Core components
import Header from '../components/Header';
import Footer from '../components/Footer';
import SqlEditor from '../components/SqlEditor';
import PrivateSqlEditor from '../components/PrivateSqlEditor';
// import SavedQueries from '../components/SavedQueries';

// make it where either a regular Sql editor or the private editor is shown.

function LandingPage() {
  let renderEditor = () => {
    if (isAuthenticated()) {
      return <PrivateSqlEditor />;
    } else {
      return <SqlEditor />;
    }
  };
  return (
    <Fragment>
      <Header />
      <Container fluid={true}>{renderEditor()}</Container>
      <Footer />
    </Fragment>
  );
}

export default LandingPage;
