import React from "react";

import "./styles.css";

const MarkdownFileList = ({ handleOpenFile, files }) => {
  return (
    <div className="list">
      <ul>
        {Object.keys(files).map(fileId => (
          <li key={fileId}>
            <button onClick={() => handleOpenFile(fileId)}>{fileId}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MarkdownFileList;
