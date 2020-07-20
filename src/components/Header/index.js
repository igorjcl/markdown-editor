import React from 'react';

import './styles.css';

const Header = ({isSaving, newFile}) => {
  return (
    <header className="header">
      <span className="saving">
        { isSaving ? 'Salvando...': 'Salvo!'}
      </span>
      
      <nav>
        <ul className="menu">
          <li>Baixar</li>
          <li onClick={newFile}>Novo Documento</li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;

