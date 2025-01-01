import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

ReactDOM.createRoot(document.getElementById('root')).render(
  <I18nextProvider i18n={i18n} defaultNS={'translation'}>
    <App />
  </I18nextProvider>
) 
