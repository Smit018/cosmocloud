import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
import EmployeeAdd from './components/AddEmployee';
import EmployeeDetails from './components/EmployeeDetails';

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/add" element={<EmployeeAdd />} />
          <Route path="/employee/:id" element={<EmployeeDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
