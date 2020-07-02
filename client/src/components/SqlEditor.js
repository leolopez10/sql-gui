import React, { Fragment } from 'react';

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
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from 'reactstrap';

function SqlEditor() {
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
                        // onChange={}
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
                      style={{ height: '30vh', width: '100%' }}
                      placeholder='Welcome, Please type some SQL Code to begin please'
                      mode='sql'
                      theme='terminal'
                      name='blah2'
                      // onLoad={this.onLoad}
                      // onChange={this.onChange}
                      fontSize={14}
                      showPrintMargin={true}
                      showGutter
                      highlightActiveLine={true}
                      value={`SELECT DISTINCT Name name 
FROM playlists 
ORDER BY name`} // Dynamically input text from database or user input
                      setOptions={{
                        enableBasicAutocompletion: false,
                        enableLiveAutocompletion: false,
                        enableSnippets: true,
                        showLineNumbers: true,
                        tabSize: 2
                      }}
                    />
                    <Button
                      className='mt-2'
                      color='danger'
                      size='lg'
                      // onClick={}
                    >
                      Save and Run
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
