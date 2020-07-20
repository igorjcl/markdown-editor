import React from "react";

import "./styles.css";

const Header = ({ isSaving, newFile, removeFile }) => {
  return (
    <header className="header">
      <span className="saving">
        {isSaving === null ? "" : (isSaving ? "Salvando..." : "Salvo!")}
      </span>

      <nav>
        <ul className="menu">
          <li>Baixar</li>
          <li onClick={newFile}>Novo</li>
          <li onClick={removeFile}>Remover</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
