import React from 'react';

// Import bootstrap
import { Container, Col, Row, ListGroup, ListGroupItem } from 'reactstrap';

function Results() {
  return (
    <div className='mb-3'>
      <h5>Results</h5>
      <Col>
        <Row>
          <ListGroup
            style={{
              width: '100%'
            }}
          >
            <ListGroupItem color='info'>
              Which albums have the most tracks
            </ListGroupItem>
            <ListGroupItem color='info'>
              Which albums have the most track time?
            </ListGroupItem>
            <ListGroupItem color='info'>
              Which artists have the most track time?
            </ListGroupItem>
            <ListGroupItem color='info'>
              Which tracks appears on the most playlists?
            </ListGroupItem>
            <ListGroupItem color='info'>
              Which playlists have the most track time?
            </ListGroupItem>
          </ListGroup>
        </Row>
      </Col>
    </div>
  );
}

export default Results;
