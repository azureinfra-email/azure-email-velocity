# Sales Brochure Components

This directory contains modular React components for the AzureInfra.email sales brochure. The components are designed to be reusable, maintainable, and easy to update.

## Components Overview

### Main Container
- **`SalesBrochureContainer`** - Main wrapper that includes all sections in order

### Individual Sections
- **`SalesBrochureHeader`** - Brand header with key metrics and features
- **`ICPSection`** - Ideal Customer Profile with targeting criteria
- **`SuccessStoriesSection`** - Customer success stories and case studies
- **`WarmupStrategiesSection`** - Email warmup protocols and best practices
- **`CustomerTransformationSection`** - How we transform customer operations
- **`PricingROISection`** - Pricing information and ROI calculations
- **`ObjectionHandlingSection`** - Common objections and responses
- **`CompetitiveComparisonSection`** - Competitive positioning and battle cards
- **`SalesResourcesSection`** - Contact information and quick reference

### Utility Components
- **`SalesBrochureDemo`** - Interactive demo to view individual sections
- **`SalesBrochurePage`** - Complete page component with SEO

## Usage

### Using the Complete Brochure
```tsx
import { SalesBrochureContainer } from '../components/SalesBrochure';

function MyPage() {
  return <SalesBrochureContainer />;
}
```

### Using Individual Sections
```tsx
import { 
  ICPSection, 
  SuccessStoriesSection 
} from '../components/SalesBrochure';

function MyCustomPage() {
  return (
    <div>
      <ICPSection />
      <SuccessStoriesSection />
    </div>
  );
}
```

### Using the Interactive Demo
```tsx
import { SalesBrochureDemo } from '../components/SalesBrochure';

function DemoPage() {
  return <SalesBrochureDemo />;
}
```

## Design System

### Colors
- **Primary Blue**: `text-blue-600`, `bg-blue-600`
- **Secondary Blue**: `text-blue-700`, `border-blue-600`
- **Success Green**: `bg-green-50`, `text-green-800`
- **Warning Yellow**: `bg-yellow-50`, `text-yellow-800`
- **Background**: `bg-gray-50`, `bg-white`

### Typography
- **Headers**: `text-4xl font-bold` (h1), `text-2xl font-bold` (h2)
- **Subheaders**: `text-xl font-semibold` (h3), `text-lg font-semibold` (h4)
- **Body**: Default font size with `leading-relaxed`

### Layout
- **Container**: `max-w-4xl mx-auto bg-white shadow-xl`
- **Section Padding**: `p-10`
- **Card Spacing**: `space-y-4`, `space-y-6`, `space-y-8`
- **Grid**: `grid grid-cols-1 md:grid-cols-2 gap-6`

## Customization

### Adding New Sections
1. Create a new component file in the `SalesBrochure` directory
2. Follow the existing naming convention: `[SectionName]Section.tsx`
3. Export the component in `index.ts`
4. Add to `SalesBrochureContainer` if needed
5. Update the demo component if desired

### Modifying Content
Each section component contains its data as constants at the top of the file. Simply modify these arrays/objects to update content without changing the component structure.

### Styling Changes
All components use Tailwind CSS classes. Modify the className strings to change styling. The design system uses consistent spacing, colors, and typography patterns.

## File Structure
```
SalesBrochure/
├── index.ts                           # Export barrel
├── SalesBrochureContainer.tsx         # Main container
├── SalesBrochureHeader.tsx           # Header section
├── ICPSection.tsx                    # ICP content
├── SuccessStoriesSection.tsx         # Success stories
├── WarmupStrategiesSection.tsx       # Warmup strategies
├── CustomerTransformationSection.tsx # Customer transformation
├── PricingROISection.tsx             # Pricing and ROI
├── ObjectionHandlingSection.tsx      # Objection handling
├── CompetitiveComparisonSection.tsx  # Competitive comparison
├── SalesResourcesSection.tsx         # Sales resources
├── SalesBrochureDemo.tsx            # Interactive demo
└── README.md                         # This file
```

## Benefits of This Approach

1. **Modularity**: Each section can be used independently
2. **Maintainability**: Easy to update individual sections
3. **Reusability**: Components can be reused across pages
4. **Testability**: Each component can be tested in isolation
5. **Performance**: Can implement lazy loading for sections
6. **Flexibility**: Easy to reorder or conditionally render sections

## Integration with Existing Project

The components are designed to integrate seamlessly with your existing React project:
- Uses Tailwind CSS (already in your project)
- Follows React TypeScript best practices
- Compatible with your SEO component
- Responsive design using Tailwind breakpoints
