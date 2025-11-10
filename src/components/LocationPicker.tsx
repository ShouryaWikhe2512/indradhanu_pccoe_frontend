import React, { useState, useEffect } from 'react';
import { Location } from '@/types/report';
import { useI18n } from '@/lib/i18n';

interface LocationPickerProps {
  value: Location | null;
  onChange: (location: Location) => void;
  onError?: (error: string) => void;
}

export default function LocationPicker({
  value,
  onChange,
  onError,
}: LocationPickerProps) {
  const { t } = useI18n();
  const [isDetecting, setIsDetecting] = useState(false);

  useEffect(() => {
    if (!value) {
      detectLocation();
    }
  }, []);

  const detectLocation = () => {
    if (!navigator.geolocation) {
      onError?.('Geolocation is not supported by your browser. Please enable location services.');
      return;
    }

    setIsDetecting(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location: Location = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        onChange(location);
        setIsDetecting(false);
      },
      (error) => {
        setIsDetecting(false);
        let errorMessage = 'Unable to detect your location. ';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage += 'Please allow location access in your browser settings.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage += 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage += 'Location request timed out. Please try again.';
            break;
          default:
            errorMessage += error.message || 'An unknown error occurred.';
        }
        onError?.(errorMessage);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  };

  if (isDetecting) {
    return (
      <div className="w-full py-6 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-saffron mb-3"></div>
        <p className="text-sm text-gray-600 font-medium">{t('report.location.auto')}</p>
        <p className="text-xs text-gray-500 mt-1">Please allow location access when prompted</p>
      </div>
    );
  }

  if (value) {
    return (
      <div className="w-full space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {t('report.location')}
        </label>
        <div className="p-4 bg-gradient-to-r from-green-50 to-saffron-50 rounded-lg border-2 border-green-200">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-0.5">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="flex-1 text-sm text-gray-700">
              <p className="font-semibold text-gray-900 mb-1">Location Detected</p>
              <p>
                <span className="font-medium">Latitude:</span> {value.lat.toFixed(6)}
              </p>
              <p>
                <span className="font-medium">Longitude:</span> {value.lon.toFixed(6)}
              </p>
              {value.ward && (
                <p className="mt-1">
                  <span className="font-medium">Ward:</span> {value.ward}
                </p>
              )}
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={detectLocation}
          className="text-sm text-indian-blue hover:underline font-medium focus:outline-none focus:ring-2 focus:ring-saffron rounded px-2 py-1"
          aria-label="Refresh location"
        >
          🔄 Refresh Location
        </button>
      </div>
    );
  }

  return (
    <div className="w-full py-4 text-center">
      <button
        type="button"
        onClick={detectLocation}
        className="px-4 py-2 bg-saffron text-white rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-saffron focus:ring-offset-2 transition-colors font-medium"
      >
        Detect Location
      </button>
    </div>
  );
}

