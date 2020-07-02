import React, { Fragment } from 'react';

// Import React
import { Container, Col, Row, ListGroup, ListGroupItem } from 'reactstrap';

function SavedQueries() {
  return (
    <div className='move-left'>
      <Container>
        <Col>
          <Row>
            <aside className='mr-auto ml-auto'>
              <h5>Your saved queries</h5>
              <ListGroup>
                <ListGroupItem active={true} tag='button' action>
                  Which albums have the most tracks?
                </ListGroupItem>
                <ListGroupItem tag='button' action>
                  Which albums have the most track time?
                </ListGroupItem>
                <ListGroupItem tag='button' action>
                  Which artists have the most track time?
                </ListGroupItem>
                <ListGroupItem tag='button' action>
                  Which tracks appears on the most playlists?
                </ListGroupItem>
                <ListGroupItem disabled tag='button' action>
                  Which playlists have the most track time?
                </ListGroupItem>
              </ListGroup>
            </aside>
          </Row>
        </Col>
      </Container>
    </div>
  );
}

export default SavedQueries;
