import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import SalePickFilters from './SalePickFilters';
import RentPickFilters from './RentPickFilters';
import NavigateToBrowse from './NavigateToBrowse';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import {Routes, Route, useNavigate} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// to make everything on different page:
 <Routes>
       <Route path="/" element={<App />} />
       <Route path='/sale' element={<SalePickFilters />} />
       <Route path='/rent' element={<RentPickFilters />} />
       <Route path='/browse' element={<NavigateToBrowse />} />
      </Routes>

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
