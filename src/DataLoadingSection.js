import React from 'react';

// DataLoadingSection component to display the loading status of datasets
const DataLoadingSection = ({ loadingStatus }) => {
  return (
    <div className="data-loading-section">
      <h2>Data Loading Section</h2>
      {loadingStatus.map((status, index) => (
        <div key={index}>
          {status ? (
            <div><span className="success">✔</span> Dataset {index + 1}</div>
              ) : (
            <div><span className="error">✖</span> Dataset {index + 1}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DataLoadingSection;
