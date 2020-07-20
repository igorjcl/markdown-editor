import React from 'react';

import "./styles.css"

const Editor = ({value, handleChange, handleKeyUp, getMarkup}) => { 
  return (
    <div className="editor">
      <textarea 
        className="textarea" 
        value={value} 
        onChange={handleChange} 
        autoFocus
        onKeyUp={handleKeyUp}>
      </textarea>
      <div className="view" dangerouslySetInnerHTML={getMarkup()} />
    </div>
  )
}

export default Editor;