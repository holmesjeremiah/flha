import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ConfigProvider, AuthProvider } from 'auth-library';

// Define your app configuration variables
const appName = "flha"; // Replace with your actual app name
const apiUrl = "https://mongapi.avacan.net/"; // Replace with your actual API URL

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ConfigProvider appName={appName} apiUrl={apiUrl}> {/* Wrap with ConfigProvider if using it */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </ConfigProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
