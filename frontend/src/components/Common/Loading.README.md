# Loading Component

A reusable loading animation component featuring the animated 360° logo with taglines, designed for consistent loading states throughout the application.

## Features

- **Animated 360° Logo**: Rotating concentric circles with the 360° symbol
- **Taglines**: "Expertis", "Equipment", "Experience" in brand orange
- **Multiple Variants**: Different sizes and use cases
- **Customizable**: Message support and full-screen overlay option

## Usage

### Basic Loading

```tsx
import { Loading } from '@/components/Common/Loading';

// Full-screen loading
if (loading) {
  return <Loading size="lg" message="Loading..." fullScreen />;
}
```

### Inline Loading

```tsx
// Medium size with taglines
<Loading size="md" message="Loading content..." />

// Small size without taglines
<Loading size="sm" showTaglines={false} />
```

### Loading Overlay

```tsx
import { LoadingOverlay } from '@/components/Common/Loading';

// Full-screen overlay with backdrop
<LoadingOverlay message="Processing..." />
```

### Small Spinner

```tsx
import { LoadingSpinner } from '@/components/Common/Loading';

// Small inline spinner (no taglines)
<LoadingSpinner size="sm" />
```

## Props

### Loading Component

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg' \| number` | `'md'` | Size variant or custom pixel size |
| `showTaglines` | `boolean` | `true` | Show taglines below logo |
| `message` | `string` | `undefined` | Optional loading message |
| `fullScreen` | `boolean` | `false` | Full-screen layout |
| `className` | `string` | `undefined` | Additional CSS classes |

### Size Variants

- **sm**: 48px - Small inline loading
- **md**: 80px - Medium section loading (default)
- **lg**: 120px - Large full-page loading
- **Custom**: Any number for pixel size

## Examples

### Page Loading

```tsx
// In a page component
if (loading) {
  return (
    <Loading 
      size="lg" 
      message="Loading page content..." 
      fullScreen 
    />
  );
}
```

### Section Loading

```tsx
// In a component
{loading && (
  <div className="py-8">
    <Loading size="md" message="Loading data..." />
  </div>
)}
```

### Inline Loading

```tsx
// Small inline spinner
<div className="flex items-center gap-2">
  <LoadingSpinner size="sm" />
  <span>Processing...</span>
</div>
```

### Overlay Loading

```tsx
// Modal or form submission
{isSubmitting && (
  <LoadingOverlay message="Submitting form..." />
)}
```

## Implementation Notes

- The component uses CSS animations for smooth rotation
- Brand colors: Orange (#E86F33) and Black (#0F0F0F)
- Responsive and accessible
- No external dependencies beyond React and Tailwind CSS

## Migration Guide

Replace existing loading states:

**Before:**
```tsx
<div className="flex items-center justify-center">
  <Loader2 className="h-8 w-8 animate-spin" />
  <p>Loading...</p>
</div>
```

**After:**
```tsx
<Loading size="md" message="Loading..." />
```

