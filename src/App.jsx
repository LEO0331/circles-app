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
      <div className="ambient-glow ambient-glow-left"></div>
      <div className="ambient-glow ambient-glow-right"></div>

      <main className="demo-layout">
        <header className="hero">
          <p className="hero-kicker">Interactive Demo</p>
          <h1 className="hero-title">Chromatic Pulse Board</h1>
          <p className="hero-subtitle">
            Click any circle to filter that color out. Remove filters from the panel.
          </p>
        </header>

        {/* Sidebar containing data loading and filtered colors sections */}
        <section className="sidebar">
          <div className="panel-card panel-card-delay-1">
            <DataLoadingSection loadingStatus={loadingStatus} />
          </div>
          <div className="panel-card panel-card-delay-2">
            <FilteredColorsSection
              filteredColors={filteredColors}
              handleFilterRemove={handleFilterRemove}
              handleClearAll={handleClearAll}
            />
          </div>
        </section>

        {/* Section containing circles */}
        <section className="circles-shell panel-card panel-card-delay-3">
          <div className="circles-header">
            <h2>Color Field</h2>
            <p>Select to filter</p>
          </div>
          <div className="circles-section">
            {data.map(item => (
              !isColorFiltered(item.color) && (
                <button
                  key={item.id}
                  type="button"
                  className="color-circle"
                  style={{ backgroundColor: item.color }}
                  onClick={() => handleCircleClick(item.color)}
                  aria-label={`Filter color ${item.color}`}
                  title={`Filter color ${item.color}`}
                ></button>
              )
            ))}
          </div>
        </section>
      </main>

      <div className="scanline-overlay"></div>
      <div className="grain-overlay"></div>
    </div>
  );
}

export default App;
