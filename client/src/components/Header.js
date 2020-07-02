import React from 'react';

function Header() {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth < 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          'translate3d(0,' + windowScrollTop + 'px,0)';
      };
      window.addEventListener('scroll', updateScroll);
      return function cleanup() {
        window.removeEventListener('scroll', updateScroll);
      };
    }
  });
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
          width: '100%',
          height: '100%',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          minHeight: '30vh'
        }}
        className='page-header'
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
