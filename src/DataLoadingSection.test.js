/** @jest-environment jsdom */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DataLoadingSection from './DataLoadingSection';

// Test suite for DataLoadingSection component
describe('DataLoadingSection', () => {
  // Test case to check if the component renders correctly with all datasets loaded
  test('renders correctly with all datasets loaded', () => {
    const loadingStatus = [true, true];

    render(<DataLoadingSection loadingStatus={loadingStatus} />);

    // Assert that the heading is rendered
    expect(screen.getByText('Data Loading Section')).toBeInTheDocument();

    // Assert that the tick marks are rendered for each dataset
    expect(screen.getByText('Dataset 1')).toBeInTheDocument();
    expect(screen.getByText('Dataset 2')).toBeInTheDocument();
  });
});
