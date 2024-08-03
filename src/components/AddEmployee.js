import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
  const [name, setName] = useState('');
  const [line1, setLine1] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [zip, setZip] = useState('');
  const [contactMethods, setContactMethods] = useState([{ contactmethod: 'EMAIL', value: '' }]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const headers = {
    projectid: '66aa8830f0b1983e001ffdbb',
    environmentid: '66aa8830f0b1983e001ffdbc'
  };

  const handleAddContactMethod = () => {
    setContactMethods([...contactMethods, { contactmethod: 'EMAIL', value: '' }]);
  };

  const handleRemoveContactMethod = (index) => {
    const newContactMethods = contactMethods.filter((_, i) => i !== index);
    setContactMethods(newContactMethods);
  };

  const handleChangeContactMethod = (index, key, value) => {
    const newContactMethods = contactMethods.map((method, i) => i === index ? { ...method, [key]: value } : method);
    setContactMethods(newContactMethods);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('https://free-ap-south-1.cosmocloud.io/development/api/employee', {
      name,
      adress: { line1, city, country, zip },
      contactmethods: contactMethods
    }, {
      headers: headers
    })
    .then(() => navigate('/'))
    .catch(error => {
      console.error('Error adding employee:', error);
      setError('Error adding employee. Please try again later.');
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded shadow-md">
        <h1 className="text-3xl font-bold mb-6">Add Employee</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg mb-2">Address Line 1</label>
            <input
              type="text"
              value={line1}
              onChange={e => setLine1(e.target.value)}
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg mb-2">City</label>
            <input
              type="text"
              value={city}
              onChange={e => setCity(e.target.value)}
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg mb-2">Country</label>
            <input
              type="text"
              value={country}
              onChange={e => setCountry(e.target.value)}
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg mb-2">ZIP Code</label>
            <input
              type="text"
              value={zip}
              onChange={e => setZip(e.target.value)}
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg mb-2">Contact Methods</label>
            {contactMethods.map((method, index) => (
              <div key={index} className="mb-4">
                <div className="flex gap-4">
                  <select
                    value={method.contactmethod}
                    onChange={e => handleChangeContactMethod(index, 'contactmethod', e.target.value)}
                    className="border rounded w-1/3 py-2 px-3 mb-2"
                  >
                    <option value="EMAIL">EMAIL</option>
                    <option value="PHONE">PHONE</option>
                  </select>
                  <input
                    type="text"
                    value={method.value}
                    onChange={e => handleChangeContactMethod(index, 'value', e.target.value)}
                    className="border rounded w-2/3 py-2 px-3 mb-2"
                    required
                  />
                </div>
                {contactMethods.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveContactMethod(index)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={handleAddContactMethod} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
              Add Contact Method
            </button>
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Add Employee</button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
