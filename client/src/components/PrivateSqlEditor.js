import React, { useState, useEffect, Fragment } from 'react';
import {
  isAuthenticated,
  saveCode,
  getQueries,
  // updateQuery,
  getQuery,
  deleteQuery,
  signout,
  executeSql,
  deleteAccount
} from '../utils/API';

// Import Ace Code editor
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-sql';
import 'ace-builds/src-noconflict/mode-mysql';
import 'ace-builds/src-noconflict/mode-sqlserver';
import 'ace-builds/src-noconflict/theme-terminal';

// Import bootstrap
import {
  Button,
  Form,
  FormGroup,
  Input,
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Table
} from 'reactstrap';

function SqlEditor() {
  const [values, setValues] = useState({
    title: '',
    sql_code: '',
    error: false,
    loading: false,
    success: false
  });
  const [queries, setQueries] = useState([]);
  const [results, setResults] = useState([]);

  const { title, sql_code, loading, error, success } = values;

  const {
    user: { username, _id },
    token
  } = isAuthenticated();

  useEffect(() => {
    let loadQueries = () => {
      getQueries(_id, token)
        .then(res => {
          // console.log(res)
          setQueries(res.data);
        })
        .catch(err => console.log(err));
    };
    loadQueries();
  }, [_id, token]);

  const handleChange = event => {
    const { name, value } = event.target;
    setValues({
      ...values,
      success: false,
      [name]: value
    });
  };

  const handleEditorChange = newValue => {
    setValues({
      ...values,
      sql_code: newValue,
      success: false
    });
  };

  const handleSave = event => {
    event.preventDefault();
    if (!sql_code) {
      return alert('You need to type some code!!');
    } else if (!title) {
      return alert('You should probably give your search a title');
    }

    saveCode(values, _id, token)
      .then(res => {
        // console.log(res.data);
        setValues({
          ...values,
          success: true
        });
        loadQueries();
      })
      .catch(err => {
        console.log(err);
        setValues({
          ...values,
          error: 'Server Error 500 could not save data',
          success: false
        });
        alert(error);
      });
  };

  const handleRun = event => {
    event.preventDefault();
    const codeSnippet = { sql_code };
    setValues({
      ...values,
      loading: true
    });
    executeSql(codeSnippet)
      .then(res => {
        // console.log(res.data);
        setValues({
          ...values,
          loading: false,
          error: false
        });
        setResults(res.data);
      })
      .catch(err => {
        console.log(err);
        setValues({
          ...values,
          loading: false,
          error: true
        });
      });
  };

  const handleNew = () => {
    setValues({
      ...values,
      title: '',
      sql_code: 'SELECT',
      success: false
    });
    setResults([]);
  };

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

  let showSavedQuery = (codeId, token) => {
    getQuery(codeId, token)
      .then(res => {
        // console.log(res.data.title);
        setValues({
          ...values,
          title: res.data.title,
          sql_code: res.data.sql_code
        });
      })
      .catch(err => console.log(err));
  };

  let removeAccount = () => {
    // Protect the user from deleting the account accidentally
    let answer = window.confirm(
      'Are you sure you want to delete your account?\nThis will delete your user account and all your SQL queries.'
    );
    if (answer) {
      deleteAccount(_id, token)
        .then(res => {
          console.log(res);
          window.location.reload();
        })
        .catch(err => console.log(err));
    }
  };

  const showLoading = () =>
    loading && (
      <div className='alert alert-info'>
        <h2>Loading...</h2>
      </div>
    );

  const showError = () => (
    <div
      className='alert alert-danger'
      style={{
        display: error ? '' : 'none'
      }}
    >
      <p>
        SYNTAX ERROR, but you have to find where{' '}
        <span role='img' aria-label='devil'>
          😈
        </span>
      </p>
    </div>
  );

  const showSuccess = () => (
    <div
      className='alert alert-success'
      style={{ display: success ? '' : 'none' }}
    >
      <p>You Successfully saved your sql query</p>
    </div>
  );

  const SavedQueries = () => (
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
                  <ListGroupItem
                    id={query._id}
                    key={index}
                    tag='div'
                    onClick={() => showSavedQuery(query._id, token)}
                    action
                  >
                    {query.title}
                    <Button
                      close
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

  // Create table for results
  let renderTableHeaders = () => {
    let header = Object.keys(results[0]);
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };

  let renderTableData = () => {
    // console.log(results);
    return results.map((result, index) => {
      let data = Object.values(result);
      return (
        <tr key={index}>
          {data.map((datum, index) => {
            return <td key={index}>{datum}</td>;
          })}
        </tr>
      );
    });
  };

  // Work on dynmically getting results
  const Results = () => (
    <div className='mb-3 table-responsive'>
      <Row>
        <Col>
          {/* {JSON.stringify(results)} */}
          <h5>Results</h5>
          <Table
            dark
            className='table-responsive'
            style={{
              width: '100%'
            }}
          >
            <tbody>
              <tr>
                {results.length > 0 ? renderTableHeaders() : <td>No Data</td>}
              </tr>
              {results.length > 0 ? renderTableData() : <tr></tr>}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );

  return (
    <Fragment>
      {SavedQueries()}
      <Container>
        <Row>
          <Col className='ml-auto mr-auto'>
            {showSuccess()}
            <h2>Lets try looking up some information</h2>
            <Form>
              <FormGroup>
                <Row>
                  <Col>
                    <div style={{ display: 'flex' }}>
                      <Input
                        placeholder='Whats the title of your search?'
                        name='title'
                        type='text'
                        value={title}
                        onChange={handleChange}
                      />
                      <Button
                        className='ml-2'
                        outline
                        color='success'
                        size='sm'
                        onClick={handleNew}
                      >
                        +New
                      </Button>
                    </div>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col className='ml-auto mr-auto'>
                    <AceEditor
                      id='code-editor'
                      style={{ height: '30vh', width: '100%' }}
                      placeholder='Welcome, Please type some SQL Code to begin please'
                      mode='sql'
                      theme='terminal'
                      name='code-editor'
                      // onLoad={this.onLoad}
                      onChange={handleEditorChange}
                      fontSize={14}
                      showPrintMargin={true}
                      showGutter
                      highlightActiveLine={true}
                      value={sql_code} // Dynamically input text from database or user input
                      setOptions={{
                        showLineNumbers: true,
                        tabSize: 2
                      }}
                    />
                    <div className='d-flex mt-2'>
                      <Button color='success' size='md' onClick={handleSave}>
                        Save
                      </Button>
                      <Button
                        className='ml-2'
                        color='danger'
                        size='md'
                        onClick={handleRun}
                      >
                        Run
                      </Button>
                      <Button
                        outline
                        className='ml-auto'
                        color='primary'
                        size='md'
                        onClick={removeAccount}
                      >
                        Delete Account
                      </Button>
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Form>
            <Row>
              <Col className='ml-auto mr-auto'>
                {showError()}
                {showLoading()}
                {Results()}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default SqlEditor;
