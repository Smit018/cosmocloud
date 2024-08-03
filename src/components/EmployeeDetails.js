import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';


const EmployeeDetail = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState('');

  const headers = {
    projectid: '66aa8830f0b1983e001ffdbb',
    environmentid: '66aa8830f0b1983e001ffdbc'
  };

  useEffect(() => {
    axios.get(`https://free-ap-south-1.cosmocloud.io/development/api/employee/${id}`, {
      headers: headers
    })
    .then(response => setEmployee(response.data))
    .catch(error => {
      console.error('Error fetching employee:', error);
      setError('Error fetching employee. Please try again later.');
    });
  }, [id]);

  if (error) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <p className="text-red-500">{error}</p>
    </div>;
  }

  if (!employee) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <p>Loading...</p>
    </div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-6 bg-white rounded shadow-md">
        <h1 className="text-3xl font-bold mb-6">{employee.name}</h1>
        <div className="mb-4">
          <p className="font-semibold text-lg">Address:</p>
          <p>{employee.adress.line1}, {employee.adress.city}, {employee.adress.country}, {employee.adress.zip}</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold text-lg">Contact Methods:</p>
          <ul className="list-disc list-inside">
            {employee.contactmethods.map((method, index) => (
              <li key={index}>{method.contactmethod}: {method.value}</li>
            ))}
          </ul>
        </div>
        <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Back to List</Link>
      </div>
    </div>
  );
};

export default EmployeeDetail;
