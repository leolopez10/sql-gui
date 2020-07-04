import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {
  isAuthenticated,
  getQueries,
  getQuery,
  deleteQuery,
  signout
} from '../utils/API';

// Import React
import {
  Container,
  Col,
  Row,
  ListGroup,
  ListGroupItem,
  Button
} from 'reactstrap';

function SavedQueries({ savedQuery }) {
  const [queries, setQueries] = useState([]);

  const {
    user: { username, _id },
    token
  } = isAuthenticated();

  let loadQueries = () => {
    getQueries(_id, token)
      .then(res => {
        // console.log(res)
        setQueries(res.data);
      })
      .catch(err => console.log(err));
  };

  let removeQuery = (codeId, userId, token) => {
    deleteQuery(codeId, userId, token)
      .then(res => loadQueries())
      .catch(err => console.log(err));
  };

  let logout = () => {
    signout();
    window.location.reload();
  };

  useEffect(() => {
    loadQueries();
  }, []);

  return (
    <div className='move-left'>
      <Container>
        <Col>
          <Row>
            <aside className='mr-auto ml-auto'>
              {/* Add a button her for logging in and out */}
              <Row className='mb-2'>
                <Col className='d-flex'>
                  <Button
                    outline
                    color='primary'
                    size='sm'
                    className='mr-2'
                    type='submit'
                    onClick={logout}
                  >
                    Log-Out
                  </Button>
                  <h5>{username}'s queries</h5>
                </Col>
              </Row>
              {/* {JSON.stringify(queries)} */}
              <ListGroup>
                {queries.map((query, index) => (
                  <ListGroupItem key={index} tag='a' href='#' action>
                    {query.title}
                    <Button
                      close
                      // onClick={deleteQuery(query._id, query.user)}
                      onClick={() => removeQuery(query._id, _id, token)}
                    ></Button>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </aside>
          </Row>
        </Col>
      </Container>
    </div>
  );
}

export default SavedQueries;
