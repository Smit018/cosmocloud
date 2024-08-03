import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');
  const [limit, setLimit] = useState(10); // We can set our own limit
  const [offset, setOffset] = useState(0); 
  const headers = {
    projectid: '66aa8830f0b1983e001ffdbb',
    environmentid: '66aa8830f0b1983e001ffdbc'
  };

  useEffect(() => {
    axios.get('https://free-ap-south-1.cosmocloud.io/development/api/employee', {
      params: { limit, offset },
      headers: headers
    })
    .then(response => {
      console.log('Response:', response);
      if (Array.isArray(response.data.data)) {
        setEmployees(response.data.data);
      } else {
        setEmployees([]);
      }
    })
    .catch(error => {
      console.error('Error fetching employees:', error);
      setError('Error fetching employees. Please try again later.');
    });
  }, [limit, offset]);

  const handleDelete = (id) => {
    axios.request({
      url: `https://free-ap-south-1.cosmocloud.io/development/api/employee/${id}`,
      method: 'delete',
      headers: headers,
      data: {
        type: 'id'
      }
    })
    .then(() => setEmployees(employees.filter(employee => employee._id !== id)))
    .catch(error => console.error('Error deleting employee:', error));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-4 bg-white rounded shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Employee List</h1>
        <div className="flex justify-end mb-4">
          <Link to="/add" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Add Employee</Link>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {employees.length === 0 ? (
          <p className="text-center text-gray-600">No Employees in the system.</p>
        ) : (
          <ul className="space-y-4">
            {employees.map(employee => (
              <li key={employee._id} className="flex justify-between items-center p-4 bg-gray-50 rounded shadow-sm">
                <Link to={`/employee/${employee._id}`} className="text-blue-500 hover:underline">{employee.name}</Link>
                <button onClick={() => handleDelete(employee._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700">Delete</button>
              </li>
            ))}
          </ul>
        )}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => setOffset(offset - limit)}
            disabled={offset === 0}
            className={`px-4 py-2 rounded ${offset === 0 ? 'bg-gray-300' : 'bg-gray-500 text-white hover:bg-gray-700'}`}
          >
            Previous
          </button>
          <button
            onClick={() => setOffset(offset + limit)}
            disabled={employees.length < limit}
            className={`px-4 py-2 rounded ${employees.length < limit ? 'bg-gray-300' : 'bg-gray-500 text-white hover:bg-gray-700'}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
