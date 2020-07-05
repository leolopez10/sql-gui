import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { executeSql } from '../utils/API';

// Import Ace Code editor
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-sql';
import 'ace-builds/src-noconflict/mode-mysql';
import 'ace-builds/src-noconflict/mode-sqlserver';
import 'ace-builds/src-noconflict/theme-terminal';

// Import bootstrap
import {
  Table,
  Button,
  Form,
  FormGroup,
  Container,
  Row,
  Col
} from 'reactstrap';

function SqlEditor() {
  const [values, setValues] = useState({
    sql_code: '',
    error: false,
    loading: false
  });

  const [results, setResults] = useState([]);

  const { sql_code, loading, error } = values;

  const handleEditorChange = newValue => {
    setValues({
      ...values,
      sql_code: newValue
    });
  };

  const handleRun = () => {
    const codeSnippet = { sql_code };
    setValues({
      ...values,
      loading: true
    });
    executeSql(codeSnippet)
      .then(res => {
        console.log(res.data);
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
      sql_code: ''
    });
    window.location.reload();
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

  const loginBanner = () => (
    <Container>
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
    </Container>
  );

  // Create table for results
  let renderTableHeaders = () => {
    let header = Object.keys(results[0]);
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };

  let renderTableData = () => {
    console.log(results);
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

  const Results = () => (
    <div className='mb-3'>
      <h5>Results</h5>
      <Row>
        <Col>
          {/* {JSON.stringify(results)} */}
          <Table
            dark
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
      {loginBanner()}
      <Container>
        <Row>
          <Col className='ml-auto mr-auto'>
            <h2>Lets try looking up some information</h2>
            <Form id='sql-form'>
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
                      value={sql_code || ''} // Dynamically input text from database or user input
                      setOptions={{
                        // enableBasicAutocompletion: false,
                        // enableLiveAutocompletion: false,
                        // enableSnippets: true,
                        showLineNumbers: true,
                        tabSize: 2
                      }}
                    />
                    <Button
                      className='mt-2'
                      outline
                      color='info'
                      size='md'
                      onClick={handleNew}
                    >
                      +New
                    </Button>
                    <Link to='/login'>
                      <Button className='mt-2 ml-2' color='success' size='md'>
                        Login
                      </Button>
                    </Link>
                    <Button
                      className='mt-2 ml-2'
                      color='danger'
                      size='md'
                      onClick={handleRun}
                    >
                      Run
                    </Button>
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
