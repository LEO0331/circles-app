/** @jest-environment jsdom */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FilteredColorsSection from './FilteredColorsSection';

// Mock functions for handleFilterRemove and handleClearAll
const handleFilterRemove = jest.fn();
const handleClearAll = jest.fn();

// Test suite for FilteredColorsSection component
describe('FilteredColorsSection', () => {
  // Test case to check if the component renders correctly with filtered colors
  test('renders correctly with filtered colors', () => {
    const filteredColors = ['#ff0000', '#800080'];

    render(
      <FilteredColorsSection 
        filteredColors={filteredColors} 
        handleFilterRemove={handleFilterRemove} 
        handleClearAll={handleClearAll} 
      />
    );

    // Assert that the heading is rendered
    expect(screen.getByText('Filtered Colours')).toBeInTheDocument();
  });

  // Test case to check if the handleClearAll function is called when the "Clear All" button is clicked
  test('calls handleClearAll when the "Clear All" button is clicked', () => {
    const filteredColors = ['#ff0000'];

    render(
      <FilteredColorsSection 
        filteredColors={filteredColors} 
        handleFilterRemove={handleFilterRemove} 
        handleClearAll={handleClearAll} 
      />
    );

    // Simulate a click event on the "Clear All" button
    fireEvent.click(screen.getByText('Clear All'));

    // Assert that the handleClearAll function is called
    expect(handleClearAll).toHaveBeenCalled();
  });
});
