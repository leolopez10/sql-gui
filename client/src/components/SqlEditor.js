import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

// Import Ace Code editor
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-sql';
import 'ace-builds/src-noconflict/mode-mysql';
import 'ace-builds/src-noconflict/mode-sqlserver';
import 'ace-builds/src-noconflict/theme-terminal';

// Import core element
import Results from './Results';

// Import bootstrap
import {
  Button,
  Form,
  FormGroup,
  Input,
  Container,
  Row,
  Col
} from 'reactstrap';

function SqlEditor() {
  const [values, setValues] = useState({
    title: '',
    sql_code: ''
    // error: '',
    // loading: false
  });

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

  const { title, sql_code, loading, error } = values;

  // Create an invisible text area that will take in the code
  const handleChange = event => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleEditorChange = newValue => {
    setValues({
      ...values,
      sql_code: newValue
    });
  };

  const handleSave = event => {
    event.preventDefault();
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    let body = JSON.stringify(values);

    axios
      .post('/api/sql_code/create/5efd3a0d029db047e428b663', body, config)
      .then(response => {
        console.log(response);
        getQueries();
        console.log(queries);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleRun = event => {
    event.preventDefault();
    const codeSnippet = { sql_code };
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify(codeSnippet);
    console.log(body);

    axios
      .post('/api/sql_db', body, config)
      .then(response => console.log(response.data))
      .catch(err => console.log(err));
  };

  return (
    <Fragment>
      <Container>
        <Row>
          <Col className='ml-auto mr-auto'>
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
                        onChange={handleChange}
                      />
                      <Button
                        className='ml-2'
                        outline
                        color='success'
                        size='sm'
                        // onClick={}
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
                        enableBasicAutocompletion: false,
                        enableLiveAutocompletion: false,
                        enableSnippets: true,
                        showLineNumbers: true,
                        tabSize: 2
                      }}
                    />
                    {/* <textarea
                      id='sql_code'
                      onChange={handleChange}
                      name='sql_code'
                      type='text'
                      value={sql_code}
                      cols='30'
                      rows='10'
                    ></textarea> */}
                    <Button
                      className='mt-2'
                      color='success'
                      size='md'
                      onClick={handleSave}
                    >
                      Save
                    </Button>
                    <Button
                      className='mt-2 ml-2'
                      type='submit'
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
                <Results />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default SqlEditor;
