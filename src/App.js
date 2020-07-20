import React, { useState, useRef, useEffect } from "react";

import marked from "marked";
import hljs from "highlight.js";
import { v4 } from "node-uuid";

import "./App.css";

import Header from "./components/Header";
import Editor from "./components/Editor";
import MarkdownFileList from "./components/MarkdownFileList";

marked.setOptions({
  highlight: code => hljs.highlightAuto(code).value,
});

const App = () => {
  const textarea = useRef();
  const [value, setValue] = useState("");
  const [isSaving, setIsSaving] = useState(null);
  const [id, setId] = useState(v4());
  const [files, setFiles] = useState([{}]);

  useEffect(() => {
    setFiles(listFiles());
  }, []);

  const listFiles = () => {
    const getFiles = Object.keys(localStorage);
    return getFiles.reduce(
      (acc, fileId) => ({
        ...acc,
        [fileId]: localStorage.getItem(fileId),
      }),
      {}
    );
  };

  const handleChange = ({ target: { value } }) => {
    setValue(value);
    setIsSaving(true);
  };

  const handleKeyUp = _ => {
    let interval;
    clearTimeout(interval);
    interval = setTimeout(() => {
      localStorage.setItem(id, value);
      setIsSaving(false);
    }, 1000);
  };

  const getMarkup = () => ({ __html: marked(value) });

  const clearState = () => {
    setValue("");
    setIsSaving(null);
    textarea.current.focus();
    setId(v4());
  };

  const newFile = () => {
    clearState();
    setFiles(listFiles());
  };

  const removeFile = () => {
    clearState();
    localStorage.removeItem(id);
    setFiles(listFiles());
  };

  const handleOpenFile = fileId => {
    setValue(files[fileId]);
    setId(fileId);
  };

  return (
    <div className="container">
      <Header isSaving={isSaving} newFile={newFile} removeFile={removeFile} />
      <Editor
        handleChange={handleChange}
        handleKeyUp={handleKeyUp}
        getMarkup={getMarkup}
        value={value}
        textarea={textarea}
      />
      <MarkdownFileList files={files} handleOpenFile={handleOpenFile} />
    </div>
  );
};

export default App;
