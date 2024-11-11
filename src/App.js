import React from 'react';
import Table from './components/Table';
import {BrowserRouter} from 'react-router-dom'
import { Routes, Route} from 'react-router-dom';
import Home from './components/Home.jsx';
const App = () => {
  const url = ['/user1', '/user2', '/user3', '/user4'];
  return (
    <div style={{ textAlign: 'center' }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          {url.map((u, index) => (
            <Route key={index} path={u} element={<Table />}/>
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
