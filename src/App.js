import React, {useState, useEffect} from 'react';

import marked from 'marked'
import hljs from 'highlight.js'  

import Header from './components/Header'
import Editor from './components/Editor'
import './App.css'

marked.setOptions({
  highlight: (code) => hljs.highlightAuto(code).value
})

const App = () => { 
  const [value, setValue] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => setValue(localStorage.getItem('md')), []);

  const handleChange = ({target: {value}}) =>{ 
    setValue(value)
    setIsSaving(true)
  };

  const handleKeyUp = (_) => {
    let interval;
    clearTimeout(interval);
    interval = setTimeout(() => {
      localStorage.setItem('md', value)
      setIsSaving(false)
    }, 1000);
  }

  const getMarkup = () => ( { __html: marked(value)} )
  
  const newFile = () => {
    setValue('');
    localStorage.clear()
  }

  return (
    <div className="container">
      <Header isSaving={isSaving} newFile={newFile}/>
      <Editor 
        handleChange={handleChange} 
        handleKeyUp={handleKeyUp} 
        getMarkup={getMarkup}
        value={value}
        />
    </div>
  )
}

export default App;