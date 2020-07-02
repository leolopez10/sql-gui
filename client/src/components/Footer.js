import React from 'react';

// Import bootstrap
import { Container, Row } from 'reactstrap';

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: 'rgb(23, 50, 75)',
        bottom: '1',
        padding: '5px',
        width: '100%',
        zIndex: '4'
      }}
    >
      <Container>
        <Row>
          <div className='ml-auto mr-auto'>
            <span className='copyright' style={{ color: 'white' }}>
              © {new Date().getFullYear()}, Made by Leo Lopez
            </span>
          </div>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
