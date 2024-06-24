import React, { useState, useEffect } from 'react';
import DataLoadingSection from './DataLoadingSection';
import FilteredColorsSection from './FilteredColorsSection';

// URLs to fetch data from
const DATA_URLS = [
  'https://gabriel2761.github.io/data/circles.json',
  'https://gabriel2761.github.io/data/circles2.json'
];

function App() {
  // State to store fetched data
  const [data, setData] = useState([]);
  // State to store loading status of each dataset
  const [loadingStatus, setLoadingStatus] = useState([false, false]);
  // State to store filtered colors
  const [filteredColors, setFilteredColors] = useState([]);

  // Effect to fetch data from provided URLs
  useEffect(() => {
    DATA_URLS.forEach((url, index) => {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          // Append fetched data to existing data
          setData(prevData => [...prevData, ...data]);
          // Update loading status to true for successful fetch
          setLoadingStatus(prevStatus => {
            const newStatus = [...prevStatus];
            newStatus[index] = true;
            return newStatus;
          });
        })
        .catch(() => {
          // Update loading status to false for failed fetch
          setLoadingStatus(prevStatus => {
            const newStatus = [...prevStatus];
            newStatus[index] = false;
            return newStatus;
          });
        });
    });
  }, []);

  // Function to handle circle click event
  const handleCircleClick = color => {
    // Add clicked color to filtered colors
    setFilteredColors([...filteredColors, color]);
  };

  // Function to handle filter removal
  const handleFilterRemove = color => {
    // Remove the specified color from filtered colors
    setFilteredColors(filteredColors.filter(c => c !== color));
  };

  // Function to clear all filters
  const handleClearAll = () => {
    // Reset filtered colors to an empty array
    setFilteredColors([]);
  };

  // Function to check if a color is filtered
  const isColorFiltered = color => filteredColors.includes(color);

  return (
    <div className="App">
      {/* Sidebar containing data loading and filtered colors sections */}
      <div className="sidebar">
        <DataLoadingSection loadingStatus={loadingStatus} />
        <FilteredColorsSection 
          filteredColors={filteredColors} 
          handleFilterRemove={handleFilterRemove} 
          handleClearAll={handleClearAll} 
        />
      </div>

      {/* Section containing circles */}
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
