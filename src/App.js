import React, { useState, useEffect, useRef } from "react";

import marked from "marked";
import hljs from "highlight.js";

import Header from "./components/Header";
import Editor from "./components/Editor";
import "./App.css";

marked.setOptions({
  highlight: (code) => hljs.highlightAuto(code).value,
});

const App = () => {
  const textarea = useRef();
  const [value, setValue] = useState("");
  const [isSaving, setIsSaving] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("md")) {
      setValue(localStorage.getItem("md"));
    } else {
      localStorage.setItem("md", "");
    }
  }, []);

  const handleChange = ({ target: { value } }) => {
    setValue(value);
    setIsSaving(true);
  };

  const handleKeyUp = (_) => {
    let interval;
    clearTimeout(interval);
    interval = setTimeout(() => {
      localStorage.setItem("md", value);
      setIsSaving(false);
    }, 1000);
  };

  const getMarkup = () => ({ __html: marked(value) });

  const newFile = () => {
    setValue("");
    setIsSaving(null);
    textarea.current.focus();
    localStorage.removeItem("md");
  };

  return (
    <div className="container">
      <Header isSaving={isSaving} newFile={newFile} />
      <Editor
        handleChange={handleChange}
        handleKeyUp={handleKeyUp}
        getMarkup={getMarkup}
        value={value}
        textarea={textarea}
      />
    </div>
  );
};

export default App;
