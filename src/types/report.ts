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

export interface ResourceAllocation {
  report_id: string;
  resources: Resource[];
  total_budget: number;
  estimated_duration_days: number;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  allocated_at?: string;
}

export interface Resource {
  resource_type: string;
  quantity: number;
  unit: string;
  cost_per_unit: number;
  total_cost: number;
  description?: string;
}

export interface WorkValidation {
  report_id: string;
  before_images: string[];
  after_images: string[];
  validation_status: 'pending' | 'validated' | 'rejected';
  validation_result?: {
    is_complete: boolean;
    confidence: number;
    improvements_detected: string[];
    issues_remaining: string[];
    verification_score: number;
    verified_at: string;
  };
  submitted_at: string;
}

export interface DataAnalysis {
  report_id?: string;
  analysis_type: 'overall' | 'category' | 'location' | 'time_period';
  charts: Chart[];
  insights: Insight[];
  generated_at: string;
}

export interface Chart {
  type: 'bar' | 'line' | 'pie' | 'area';
  title: string;
  data: ChartDataPoint[];
  x_axis_label?: string;
  y_axis_label?: string;
}

export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface Insight {
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  recommendation?: string;
}

export interface MunicipalityLeaderboard {
  municipality_id: string;
  municipality_name: string;
  total_reports: number;
  resolved_reports: number;
  resolution_rate: number;
  average_resolution_time_days: number;
  rank: number;
  score: number;
  badge?: 'gold' | 'silver' | 'bronze';
}

export interface CitizenIncentive {
  incentive_id: string;
  report_id: string;
  incentive_type: 'points' | 'cash' | 'badge' | 'recognition';
  amount?: number;
  points?: number;
  badge_name?: string;
  description: string;
  status: 'pending' | 'approved' | 'credited';
  earned_at: string;
  credited_at?: string;
}

export interface CitizenStats {
  total_reports: number;
  validated_reports: number;
  total_points: number;
  total_incentives: number;
  badges: string[];
  rank?: number;
}

