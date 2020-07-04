import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../utils/API';
// Import BootStrap
import { Container, Col, Row, Button } from 'reactstrap';

// Import Core components
import Header from '../components/Header';
import Footer from '../components/Footer';
import SqlEditor from '../components/SqlEditor';
import SavedQueries from '../components/SavedQueries';

function LandingPage() {
  let renderQuery = () => {
    if (!isAuthenticated()) {
      return (
        <Row id='info-banner'>
          <Col className='mr-auto ml-auto'>
            <Button
              close
              onClick={() => {
                document.getElementById('info-banner').style.display = 'none';
              }}
            />
            <p
              style={{
                textAlign: 'center',
                backgroundColor: 'rgb(184, 184, 184)'
              }}
            >
              If you would like to save your queries please{' '}
              <Link to='/login' className='text-primary'>
                Log-In
              </Link>
            </p>
          </Col>
        </Row>
      );
    } else {
      return <SavedQueries />;
    }
  };
  return (
    <Fragment>
      <Header />
      <Container fluid={true}>
        {renderQuery()}
        <SqlEditor />
        <Footer />
      </Container>
    </Fragment>
  );
}

export default LandingPage;
