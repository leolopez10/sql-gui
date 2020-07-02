import React from 'react';

function SqlEditor() {
  return (
    <div>
      <textarea name='code' id='' cols='30' rows='10'>
        SQL code editor goes here
      </textarea>
      <button>Run</button>
    </div>
  );
}

export default SqlEditor;
