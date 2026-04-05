/** @jest-environment jsdom */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

const mockDatasets = [
  [{ id: 1, color: '#ff0000' }, { id: 2, color: '#00ff00' }],
  [{ id: 3, color: '#0000ff' }]
];

const mockFetchSuccess = () => {
  global.fetch = jest
    .fn()
    .mockResolvedValueOnce({
      json: () => Promise.resolve(mockDatasets[0])
    })
    .mockResolvedValueOnce({
      json: () => Promise.resolve(mockDatasets[1])
    });
};

describe('App', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('loads datasets and displays circles after successful fetch', async () => {
    mockFetchSuccess();

    render(<App />);

    await waitFor(() => {
      expect(screen.getAllByText('OK')).toHaveLength(2);
    });

    expect(screen.getByRole('button', { name: 'Filter color #ff0000' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Filter color #00ff00' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Filter color #0000ff' })).toBeInTheDocument();
  });

  test('filters a color and restores it when clear all is clicked', async () => {
    mockFetchSuccess();

    render(<App />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Filter color #ff0000' })).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: 'Filter color #ff0000' }));

    await waitFor(() => {
      expect(screen.queryByRole('button', { name: 'Filter color #ff0000' })).not.toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: 'Remove filter #ff0000' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Clear All' }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Filter color #ff0000' })).toBeInTheDocument();
    });
  });

  test('shows error status for failed dataset and allows removing a single filtered color', async () => {
    global.fetch = jest
      .fn()
      .mockRejectedValueOnce(new Error('network failed'))
      .mockResolvedValueOnce({
        json: () => Promise.resolve([{ id: 10, color: '#123456' }, { id: 11, color: '#abcdef' }])
      });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('ERR')).toBeInTheDocument();
      expect(screen.getByText('OK')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: 'Filter color #123456' }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Remove filter #123456' })).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: 'Remove filter #123456' }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Filter color #123456' })).toBeInTheDocument();
    });
  });
});
