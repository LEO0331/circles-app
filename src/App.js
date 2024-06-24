import React, { useState, useEffect } from 'react';
import './App.css';

const DATA_URLS = [
  'https://gabriel2761.github.io/data/circles.json',
  'https://gabriel2761.github.io/data/circles2.json'
];

function App() {
  const [data, setData] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState([false, false]);
  const [filteredColors, setFilteredColors] = useState([]);

  useEffect(() => {
    DATA_URLS.forEach((url, index) => {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          setData(prevData => [...prevData, ...data]);
          setLoadingStatus(prevStatus => {
            const newStatus = [...prevStatus];
            newStatus[index] = true;
            return newStatus;
          });
        })
        .catch(() => {
          setLoadingStatus(prevStatus => {
            const newStatus = [...prevStatus];
            newStatus[index] = false;
            return newStatus;
          });
        });
    });
  }, []);

  const handleCircleClick = color => {
    setFilteredColors([...filteredColors, color]);
  };

  const handleFilterRemove = color => {
    setFilteredColors(filteredColors.filter(c => c !== color));
  };

  const handleClearAll = () => {
    setFilteredColors([]);
  };

  const isColorFiltered = color => filteredColors.includes(color);

  return (
    <div className="App">
      <div className="data-loading-section">
        <h2>Data Loading Section</h2>
        {DATA_URLS.map((url, index) => (
          <div key={index}>
            {loadingStatus[index] ? (
              <span>✔ Dataset {index + 1}</span>
            ) : (
              <span>✖ Dataset {index + 1}</span>
            )}
          </div>
        ))}
      </div>

      <div className="filtered-colors-section">
        <h2>Filtered Colours</h2>
        {filteredColors.map(color => (
          <div key={color} className="filtered-color">
            <span
              className="color-circle"
              style={{ backgroundColor: color }}
              onClick={() => handleFilterRemove(color)}
            ></span>
          </div>
        ))}
        <button onClick={handleClearAll}>Clear All</button>
      </div>

      <div className="circles-section">
        {data.map(item => (
          !isColorFiltered(item.color) && (
            <span
              key={item.id}
              className="color-circle"
              style={{ backgroundColor: item.color }}
              onClick={() => handleCircleClick(item.color)}
            ></span>
          )
        ))}
      </div>
    </div>
  );
}

export default App;
