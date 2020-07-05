import React from 'react';

// Import bootstrap
import { Container, Row } from 'reactstrap';

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: 'rgb(23, 50, 75)',
        padding: '5px',
        width: '100%',
        zIndex: '4',
        bottom: '0',
        position: 'fixed'
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
