import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Import React
import {
  Container,
  Col,
  Row,
  ListGroup,
  ListGroupItem,
  Button
} from 'reactstrap';

function SavedQueries() {
  const [queries, setQueries] = useState([]);

  let getQueries = () => {
    axios
      .get('/api/sql_code/list/5efd3a0d029db047e428b663')
      .then(res => {
        setQueries(res.data);
      })
      .catch(err => {
        if (err) {
          console.log(err);
        }
      });
  };

  // let deleteQuery = (codeId, userId) => {
  //   axios
  //     .delete(`/api/sql_code/remove/${codeId}/${userId}`)
  //     .then(res => getQueries())
  //     .catch(err => console.log(err));
  // };

  useEffect(() => {
    getQueries();
  }, []);

  return (
    <div className='move-left'>
      <Container>
        <Col>
          <Row>
            <aside className='mr-auto ml-auto'>
              <h5>Your saved queries</h5>
              {JSON.stringify(queries)}
              <ListGroup>
                {queries.map((query, index) => (
                  <ListGroupItem key={index} tag='button' action>
                    {query.title}
                    <Button
                      close
                      // onClick={deleteQuery(query._id, query.user)}
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
