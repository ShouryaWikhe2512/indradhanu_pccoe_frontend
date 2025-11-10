import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReportForm from '../ReportForm';
import { I18nProvider } from '@/lib/i18n';

// Mock the i18n hook
jest.mock('@/lib/i18n', () => ({
  ...jest.requireActual('@/lib/i18n'),
  useI18n: () => ({
    t: (key: string) => key,
    language: 'en',
    setLanguage: jest.fn(),
  }),
}));

// Mock LocationPicker and PhotoUploader
jest.mock('../LocationPicker', () => {
  return function MockLocationPicker({ onChange }: any) {
    return (
      <div>
        <button
          onClick={() =>
            onChange({ lat: 18.5204, lon: 73.8567, ward: 'Ward 12' })
          }
        >
          Set Location
        </button>
      </div>
    );
  };
});

jest.mock('../PhotoUploader', () => {
  return function MockPhotoUploader({ onPhotosChange }: any) {
    return (
      <div>
        <button onClick={() => onPhotosChange(['url1', 'url2'])}>
          Add Photos
        </button>
      </div>
    );
  };
});

describe('ReportForm', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('renders all form fields', () => {
    render(
      <I18nProvider>
        <ReportForm onSubmit={mockOnSubmit} />
      </I18nProvider>
    );

    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/notes/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('validates required fields before submission', async () => {
    const user = userEvent.setup();
    render(
      <I18nProvider>
        <ReportForm onSubmit={mockOnSubmit} />
      </I18nProvider>
    );

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });

  it('submits form with valid data', async () => {
    const user = userEvent.setup();
    mockOnSubmit.mockResolvedValue(undefined);

    render(
      <I18nProvider>
        <ReportForm onSubmit={mockOnSubmit} />
      </I18nProvider>
    );

    // Select category
    const categorySelect = screen.getByLabelText(/category/i);
    await user.selectOptions(categorySelect, 'road_damage');

    // Set location
    const setLocationButton = screen.getByText('Set Location');
    await user.click(setLocationButton);

    // Add photos
    const addPhotosButton = screen.getByText('Add Photos');
    await user.click(addPhotosButton);

    // Add notes
    const notesTextarea = screen.getByLabelText(/notes/i);
    await user.type(notesTextarea, 'Test notes');

    // Submit
    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        category: 'road_damage',
        location: { lat: 18.5204, lon: 73.8567, ward: 'Ward 12' },
        photos: ['url1', 'url2'],
        notes: 'Test notes',
      });
    });
  });

  it('disables submit button when submitting', () => {
    render(
      <I18nProvider>
        <ReportForm onSubmit={mockOnSubmit} isSubmitting={true} />
      </I18nProvider>
    );

    const submitButton = screen.getByRole('button', { name: /submitting/i });
    expect(submitButton).toBeDisabled();
  });
});

