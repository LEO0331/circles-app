import React from 'react';

// DataLoadingSection component to display the loading status of datasets
const DataLoadingSection = ({ loadingStatus }) => {
  return (
    <div className="data-loading-section">
      <h2>Data Loading Section</h2>
      {loadingStatus.map((status, index) => (
        <div key={index} className="status-row">
          <span className={status ? 'success' : 'error'}>
            {status ? 'OK' : 'ERR'}
          </span>
          <span className="status-label">Dataset {index + 1}</span>
        </div>
      ))}
    </div>
  );
};

export default DataLoadingSection;
