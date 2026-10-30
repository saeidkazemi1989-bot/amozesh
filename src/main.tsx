import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource-variable/vazirmatn';
import '@fontsource-variable/manrope';
import './styles.css';
import './styles-accessibility.css';
import './styles-maintenance.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><App/></React.StrictMode>,
);
