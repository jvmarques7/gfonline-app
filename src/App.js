import React from "react";
import { Router } from 'react-router-dom';
import Routes from './routes/routes';
import history from './config/services/history';
import { ToastContainer } from 'react-toastify';


function App() {


  return (
      <Router history={history}>
        <Routes />
        <ToastContainer />
      </Router>
  );
}
export default App;

