export interface Location {
  lat: number;
  lon: number;
  ward?: string;
}

export interface Report {
  report_id: string;           // e.g., "R12345"
  category: string;            // user-selected (may be reclassified)
  photos: string[];            // URLs from the backend after upload
  location: Location;
  reported_at: string;         // ISO 8601, timezone aware
  notes?: string;
}

export interface ClassificationResult {
  is_real: boolean;
  category: string;            // one of the canonical categories
  subcategory: string;
  confidence: number;          // 0.0 - 1.0
  reasoning: string;
  recommended_action: string;
  validated_at: string;        // ISO 8601
}

export type CanonicalCategory =
  | 'drainage'
  | 'waste_dumping'
  | 'illegal_construction'
  | 'green_cover_loss'
  | 'air_quality'
  | 'road_damage'
  | 'street_lighting'
  | 'water_supply'
  | 'noise_pollution'
  | 'animal_menace'
  | 'other';

export interface ReportSubmission {
  category: string;
  photos: string[];
  location: Location;
  notes?: string;
}

export interface ReportWithClassification extends Report {
  classification?: ClassificationResult;
}

