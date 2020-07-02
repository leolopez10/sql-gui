import React from 'react';

function Header() {
  let pageHeader = React.createRef();

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background:
            'linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),' +
            'url(' +
            require('../assets/img/technology-background.jpg') +
            ')',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          minHeight: '30vh'
        }}
        className='page-header mb-3'
        data-parallax={true}
        ref={pageHeader}
      >
        <h1
          style={{
            color: 'white',
            textAlign: 'center'
          }}
        >
          SQL Graphic User Interface
        </h1>
      </div>
    </>
  );
}

export default Header;
