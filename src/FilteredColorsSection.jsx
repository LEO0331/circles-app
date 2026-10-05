import React from 'react';

// FilteredColorsSection component to display and manage filtered colors
const FilteredColorsSection = ({ filteredColors, handleFilterRemove, handleClearAll }) => {
  return (
    <div className="filtered-colors-section">
      <div className="filtered-header">
        <h2>Filtered Colours</h2>
        <button type="button" onClick={handleClearAll}>Clear All</button>
      </div>
      {filteredColors.map(color => (
        <div key={color} className="filtered-color">
          <button
            type="button"
            className="color-circle"
            style={{ backgroundColor: color }}
            onClick={() => handleFilterRemove(color)}
            aria-label={`Remove filter ${color}`}
            title={`Remove filter ${color}`}
          ></button>
          <span className="filtered-color-code">{color}</span>
        </div>
      ))}
    </div>
  );
};

export default FilteredColorsSection;
