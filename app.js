import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(null);
  const [responseData, setResponseData] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    document.title = "Your Roll Number";
  }, []);

  const handleSubmit = () => {
    try {
      const jsonData = JSON.parse(inputValue);
      setError(null);
      fetchData(jsonData);
    } catch (error) {
      setError('Invalid JSON format');
    }
  };

  const fetchData = async (jsonData) => {
    try {
      const response = await axios.post('http://your-backend-url/api', jsonData);
      setResponseData(response.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const renderFilteredResponse = () => {
    // Your filtering logic here
  };

  return (
    <div>
      <h1>Frontend Application</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p>{error}</p>}
      {responseData.length > 0 && (
        <Select
          isMulti
          options={options}
          onChange={setSelectedOptions}
        />
      )}
      <div>{renderFilteredResponse()}</div>
    </div>
  );
};

export default App;
