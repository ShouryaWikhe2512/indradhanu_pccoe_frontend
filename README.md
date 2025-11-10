# Citizen Reporting Web App

A responsive, accessible, Indian-government themed citizen-reporting web application built with Next.js (Page Router), TypeScript, and Tailwind CSS.

## Features

- 📸 **Easy Report Submission**: Upload photos, select category, and provide location details
- 📍 **Auto Location Detection**: Automatically detects your location using device GPS with manual fallback
- 🤖 **AI-Powered Classification**: Automatic validation and classification of reported issues
- 🌐 **Bilingual Support**: English and Hindi language toggle
- ♿ **Accessible**: Full keyboard navigation, ARIA labels, and WCAG compliance
- 📱 **Mobile-First**: Responsive design optimized for all devices
- 🎨 **Indian Government Theme**: Tricolor accents and official styling

## Tech Stack

- **Framework**: Next.js 14 (Page Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Testing**: Jest + React Testing Library
- **Fonts**: Mukta / Noto Sans (Google Fonts)

## Project Structure

```
src/
├── components/          # React components
│   ├── ClassificationCard.tsx
│   ├── Header.tsx
│   ├── LocationPicker.tsx
│   ├── PhotoUploader.tsx
│   └── ReportForm.tsx
├── lib/                # Utilities and helpers
│   ├── api.ts          # API client functions
│   └── i18n.tsx        # Internationalization
├── pages/              # Next.js pages
│   ├── api/            # API routes (proxies to backend)
│   │   ├── proxy/
│   │   │   └── validate.ts
│   │   ├── reports/
│   │   │   ├── [id].ts
│   │   │   ├── [id]/
│   │   │   │   └── feedback.ts
│   │   │   ├── escalate.ts
│   │   │   ├── index.ts
│   │   │   └── submit.ts
│   │   └── upload.ts
│   ├── report/
│   │   ├── index.tsx
│   │   └── result/
│   │       └── [report_id].tsx
│   ├── my-reports.tsx
│   ├── index.tsx
│   └── _app.tsx
├── styles/
│   └── globals.css     # Global styles (Tailwind imports only)
└── types/
    └── report.ts       # TypeScript interfaces
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Backend API running (or configure mock endpoints)

### Installation

1. Clone the repository and navigate to the project directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
BACKEND_API_URL=http://localhost:8000
```

Replace `BACKEND_API_URL` with your actual backend API URL.

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

### Running Tests

```bash
npm test
```

For watch mode:

```bash
npm run test:watch
```

## Backend API Integration

The application expects the following backend endpoints:

### Required Endpoints

1. **POST `/api/reports/submit`**
   - Accepts: `ReportSubmission` JSON
   - Returns: `{ report_id: string }`

2. **POST `/api/reports/validate`**
   - Accepts: `{ report_id: string }`
   - Returns: `ClassificationResult` JSON

3. **POST `/api/upload`**
   - Accepts: `multipart/form-data` with `image` field
   - Returns: `{ url: string }`

4. **GET `/api/reports/:id`**
   - Returns: `Report` JSON

5. **GET `/api/reports`**
   - Returns: `Report[]` JSON

6. **POST `/api/reports/escalate`**
   - Accepts: `{ report_id: string }`
   - Returns: `{ success: boolean }`

7. **POST `/api/reports/:id/feedback`**
   - Accepts: `{ confirmed: boolean, comment?: string }`
   - Returns: `{ success: boolean }`

### Environment Variables

Configure your backend URL in `.env.local`:

```env
BACKEND_API_URL=http://your-backend-url:port
```

The Next.js API routes in `src/pages/api/` act as proxies that forward requests to your backend.

## TypeScript Interfaces

### Report

```typescript
interface Report {
  report_id: string;
  category: string;
  photos: string[];
  location: Location;
  reported_at: string; // ISO 8601
  notes?: string;
}
```

### ClassificationResult

```typescript
interface ClassificationResult {
  is_real: boolean;
  category: string;
  subcategory: string;
  confidence: number; // 0.0 - 1.0
  reasoning: string;
  recommended_action: string;
  validated_at: string; // ISO 8601
}
```

## Canonical Categories

The AI classification system uses these categories:

- `drainage`
- `waste_dumping`
- `illegal_construction`
- `green_cover_loss`
- `air_quality`
- `road_damage`
- `street_lighting`
- `water_supply`
- `noise_pollution`
- `animal_menace`
- `other`

## Features in Detail

### Location Detection

- Automatically detects location using `navigator.geolocation`
- Falls back to manual entry if geolocation fails
- Shows latitude, longitude, and ward (if available)

### Photo Upload

- Multiple photo uploads (up to 5)
- File size validation (max 5MB)
- Image type validation
- Thumbnail preview
- Progress indicators

### AI Classification

- Automatic validation after report submission
- Polling with exponential backoff
- Displays confidence scores, reasoning, and recommended actions
- User can confirm or contest the classification

### Accessibility

- Full keyboard navigation
- ARIA labels on interactive elements
- High contrast colors
- Readable font sizes
- Focus indicators

## Styling Guidelines

- **No global CSS styling**: All visual styling is done through Tailwind classes in components
- **Tricolor theme**: Saffron (#FF9933), White (#FFFFFF), Green (#138808)
- **Typography**: Mukta or Noto Sans fonts for Indian readability
- **Mobile-first**: Responsive design starting from mobile breakpoints

## Testing

Unit tests are provided for:

- `ReportForm` component
- API client functions

Example test files:
- `src/components/__tests__/ReportForm.test.tsx`
- `src/lib/__tests__/api.test.ts`

## Troubleshooting

### Geolocation not working

- Ensure HTTPS (or localhost) for geolocation API
- Check browser permissions
- Use manual location entry as fallback

### Photo upload fails

- Check file size (max 5MB)
- Ensure backend upload endpoint is accessible
- Check CORS settings on backend

### API calls failing

- Verify `BACKEND_API_URL` in `.env.local`
- Check backend server is running
- Review browser console for CORS errors

## License

This project is part of the Citizen Reporting System.

## Contributing

1. Follow TypeScript best practices
2. Maintain accessibility standards
3. Write tests for new components
4. Use Tailwind classes for all styling
5. Keep components focused and reusable

