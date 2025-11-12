import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import CitizenLayout from "@/components/CitizenLayout";
import { submitReport, validateReport, uploadPhoto } from "@/lib/api";
import { Location } from "@/types/report";
import { useI18n } from "@/lib/i18n";

type ValidationStatus =
  | "idle"
  | "validating"
  | "validated"
  | "rejected"
  | "error";

export default function CitizenReportPage() {
  const router = useRouter();
  const { t } = useI18n();
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);
  const [location, setLocation] = useState<Location | null>(null);
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationStatus, setValidationStatus] =
    useState<ValidationStatus>("idle");
  const [reportId, setReportId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDetectingLocation, setIsDetectingLocation] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-detect location on mount
  useEffect(() => {
    detectLocation();
  }, []);

  // Cleanup photo URLs on unmount
  useEffect(() => {
    return () => {
      photoUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [photoUrls]);

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setError(
        "Geolocation is not supported by your browser. Please enable location services."
      );
      setIsDetectingLocation(false);
      return;
    }

    setIsDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const loc: Location = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        setLocation(loc);
        setIsDetectingLocation(false);
      },
      (error) => {
        setIsDetectingLocation(false);
        let errorMessage = "Unable to detect your location. ";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage +=
              "Please allow location access in your browser settings.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage += "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage += "Location request timed out. Please try again.";
            break;
          default:
            errorMessage += error.message || "An unknown error occurred.";
        }
        setError(errorMessage);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  };

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    if (imageFiles.length === 0) {
      setError("Please select image files only");
      return;
    }

    // Limit to 5 photos
    const newPhotos = [...photos, ...imageFiles].slice(0, 5);
    setPhotos(newPhotos);

    // Create preview URLs
    const newUrls = newPhotos.map((file) => URL.createObjectURL(file));
    setPhotoUrls(newUrls);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    const newUrls = photoUrls.filter((_, i) => i !== index);
    setPhotos(newPhotos);
    setPhotoUrls(newUrls);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (photos.length === 0) {
      setError("Please upload at least one photo");
      return;
    }

    if (!location) {
      setError("Please allow location access or try refreshing location");
      return;
    }

    if (!description.trim()) {
      setError("Please provide a description of the issue");
      return;
    }

    setIsSubmitting(true);
    setValidationStatus("validating");

    try {
      // Upload photos first
      const uploadedPhotoUrls: string[] = [];
      for (const photo of photos) {
        try {
          const url = await uploadPhoto(photo);
          uploadedPhotoUrls.push(url);
        } catch (uploadError) {
          throw new Error(
            `Failed to upload photo: ${
              uploadError instanceof Error
                ? uploadError.message
                : "Unknown error"
            }`
          );
        }
      }

      // Submit report
      const submittedReportId = await submitReport({
        category: "other", // Default category, AI will reclassify
        photos: uploadedPhotoUrls,
        location,
        notes: description.trim(),
      });

      setReportId(submittedReportId);

      // Validate report with AI
      try {
        const validationResult = await validateReport(submittedReportId);

        if (validationResult.is_real) {
          setValidationStatus("validated");
          // Backend will automatically send to admin dashboard if validated
          // Show success message
        } else {
          setValidationStatus("rejected");
        }
      } catch (validationError) {
        console.error("Validation error:", validationError);
        setValidationStatus("error");
        setError(
          "Report submitted but validation failed. Your report will be reviewed manually."
        );
      }
    } catch (err) {
      setValidationStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Failed to submit report. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CitizenLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-sustainable/20 mb-6">
            <svg
              className="w-10 h-10 text-[#2ebf54]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Citizen Report
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Help us build a better community. Report issues with photos,
            location, and description. Our AI system will validate your report
            and forward it to the appropriate department.
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-sustainable via-sustainable/80 to-sustainable/60"></div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Photo Upload Section */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                <span className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-sustainable"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Upload Photos
                  <span className="text-red-500">*</span>
                </span>
              </label>
              <p className="text-sm text-gray-600 mb-4">
                Upload up to 5 photos of the issue (Max 5MB each)
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoSelect}
                disabled={photos.length >= 5 || isSubmitting}
                className="hidden"
                id="photo-upload"
              />

              <label
                htmlFor="photo-upload"
                className={`inline-flex items-center gap-2 px-6 py-3 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
                  photos.length >= 5 || isSubmitting
                    ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                    : "border-sustainable/40 bg-sustainable/5 hover:bg-sustainable/10 hover:border-sustainable/60 text-sustainable font-medium"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                {photos.length >= 5
                  ? "Maximum 5 photos reached"
                  : "Choose Photos"}
              </label>

              {photos.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-6">
                  {photos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-100">
                        <img
                          src={photoUrls[index]}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        disabled={isSubmitting}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
                        aria-label={`Remove photo ${index + 1}`}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Location Section */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                <span className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-sustainable"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Location
                  <span className="text-red-500">*</span>
                </span>
              </label>

              {isDetectingLocation ? (
                <div className="p-6 bg-sustainable/10 border-2 border-sustainable/30 rounded-xl text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-sustainable mb-3"></div>
                  <p className="text-sm font-medium text-gray-700">
                    Detecting your location...
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Please allow location access when prompted
                  </p>
                </div>
              ) : location ? (
                <div className="p-6 bg-gradient-to-r from-sustainable/10 to-sustainable/5 border-2 border-sustainable/30 rounded-xl">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-10 h-10 rounded-full bg-sustainable/20 flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-sustainable"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 mb-2">
                        Location Detected
                      </p>
                      <div className="space-y-1 text-sm text-gray-700">
                        <p>
                          <span className="font-medium">Latitude:</span>{" "}
                          {location.lat.toFixed(6)}
                        </p>
                        <p>
                          <span className="font-medium">Longitude:</span>{" "}
                          {location.lon.toFixed(6)}
                        </p>
                        {location.ward && (
                          <p>
                            <span className="font-medium">Ward:</span>{" "}
                            {location.ward}
                          </p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={detectLocation}
                        disabled={isSubmitting}
                        className="mt-3 text-sm text-sustainable hover:text-sustainable/80 font-medium focus:outline-none focus:ring-2 focus:ring-sustainable rounded px-2 py-1 disabled:opacity-50"
                      >
                        🔄 Refresh Location
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 bg-yellow-50 border-2 border-yellow-200 rounded-xl text-center">
                  <p className="text-sm text-yellow-800 mb-3">
                    Location not available
                  </p>
                  <button
                    type="button"
                    onClick={detectLocation}
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-sustainable text-white rounded-lg hover:bg-sustainable/90 focus:outline-none focus:ring-2 focus:ring-sustainable focus:ring-offset-2 transition-colors font-medium disabled:opacity-50"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>

            {/* Description Section */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-gray-900 mb-3"
              >
                <span className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-sustainable"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Description
                  <span className="text-red-500">*</span>
                </span>
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sustainable focus:border-sustainable transition-colors resize-none"
                placeholder="Please provide a detailed description of the issue you're reporting..."
                required
                disabled={isSubmitting}
              />
              <p className="text-xs text-gray-500 mt-2">
                Be as specific as possible to help us understand and address the
                issue quickly.
              </p>
            </div>

            {/* Error Display */}
            {error && (
              <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                <p className="text-sm text-red-600 font-medium">{error}</p>
              </div>
            )}

            {/* Validation Status */}
            {validationStatus === "validating" && (
              <div className="p-6 bg-blue-50 border-2 border-blue-200 rounded-xl text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-3"></div>
                <p className="text-blue-800 font-medium">
                  Validating your report with AI...
                </p>
                <p className="text-sm text-blue-600 mt-1">
                  This may take a few moments
                </p>
              </div>
            )}

            {validationStatus === "validated" && (
              <div className="p-6 bg-sustainable/10 border-2 border-sustainable rounded-xl text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sustainable/20 mb-4">
                  <svg
                    className="w-8 h-8 text-sustainable"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Report Validated Successfully!
                </h3>
                <p className="text-gray-700 mb-4">
                  Your report has been validated and forwarded to the admin
                  dashboard for review and action.
                </p>
                {reportId && (
                  <p className="text-sm text-gray-600 mb-4">
                    Report ID:{" "}
                    <span className="font-mono font-semibold">{reportId}</span>
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => router.push("/my-reports")}
                  className="px-6 py-3 bg-sustainable text-white rounded-xl hover:bg-sustainable/90 focus:outline-none focus:ring-2 focus:ring-sustainable focus:ring-offset-2 transition-colors font-medium"
                >
                  View My Reports
                </button>
              </div>
            )}

            {validationStatus === "rejected" && (
              <div className="p-6 bg-yellow-50 border-2 border-yellow-200 rounded-xl text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 mb-4">
                  <svg
                    className="w-8 h-8 text-yellow-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Report Under Review
                </h3>
                <p className="text-gray-700">
                  Your report has been submitted but requires manual review.
                  We'll notify you once it's processed.
                </p>
                {reportId && (
                  <p className="text-sm text-gray-600 mt-4">
                    Report ID:{" "}
                    <span className="font-mono font-semibold">{reportId}</span>
                  </p>
                )}
              </div>
            )}

            {/* Submit Button */}
            {validationStatus !== "validated" && (
              <button
                type="submit"
                disabled={
                  isSubmitting ||
                  photos.length === 0 ||
                  !location ||
                  !description.trim()
                }
                className="w-full px-8 py-4 bg-gradient-to-r from-sustainable to-sustainable/90 text-white rounded-xl hover:from-sustainable/90 hover:to-sustainable/80 focus:outline-none focus:ring-2 focus:ring-sustainable focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold text-lg shadow-lg shadow-sustainable/25"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting Report...
                  </span>
                ) : (
                  "Submit Report"
                )}
              </button>
            )}
          </form>
        </div>

        {/* Info Section */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Your report will be automatically validated using AI. Validated
            reports are immediately forwarded to the admin dashboard for action.
          </p>
        </div>
      </div>
    </CitizenLayout>
  );
}
