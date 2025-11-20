import { cn } from '@/lib/utils';

type LoadingProps = {
  /** Size variant: 'sm', 'md', 'lg', or custom size */
  size?: 'sm' | 'md' | 'lg' | number;
  /** Show taglines below the logo */
  showTaglines?: boolean;
  /** Custom message to display */
  message?: string;
  /** Full screen overlay */
  fullScreen?: boolean;
  /** Custom className */
  className?: string;
};

/**
 * Loading component with animated 360° logo
 * Can be used throughout the application for consistent loading states
 */
export function Loading({ 
  size = 'md', 
  showTaglines = true, 
  message,
  fullScreen = false,
  className 
}: LoadingProps) {
  const brandOrange = '#E86F33';
  const brandBlack = '#0F0F0F';

  // Calculate sizes based on variant
  const getSize = () => {
    if (typeof size === 'number') return size;
    switch (size) {
      case 'sm':
        return 48;
      case 'lg':
        return 120;
      case 'md':
      default:
        return 80;
    }
  };

  const logoSize = getSize();
  const outerCircle = logoSize;
  const middleCircle = Math.round(logoSize * 0.75);
  const innerCircle = Math.round(logoSize * 0.5);
  const textSize = Math.round(logoSize * 0.25);

  const containerClasses = cn(
    'flex flex-col items-center justify-center',
    fullScreen && 'min-h-screen w-full',
    className
  );

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center gap-4">
        {/* Animated 360° Logo */}
        <div className="relative flex items-center justify-center" style={{ width: outerCircle, height: outerCircle }}>
          {/* Outer orange arc - rotating */}
          <div
            className="absolute rounded-full border-4"
            style={{
              width: outerCircle,
              height: outerCircle,
              borderColor: brandOrange,
              borderTopColor: 'transparent',
              borderRightColor: 'transparent',
              animation: 'spin-outer 2s linear infinite',
            }}
          />
          
          {/* Middle black arc - counter-rotating */}
          <div
            className="absolute rounded-full border-2"
            style={{
              width: middleCircle,
              height: middleCircle,
              borderColor: brandBlack,
              borderTopColor: 'transparent',
              borderRightColor: 'transparent',
              animation: 'spin-middle 1.5s linear infinite reverse',
            }}
          />
          
          {/* Inner orange arc - rotating */}
          <div
            className="absolute rounded-full border-2"
            style={{
              width: innerCircle,
              height: innerCircle,
              borderColor: brandOrange,
              borderBottomColor: 'transparent',
              borderLeftColor: 'transparent',
              animation: 'spin-inner 1s linear infinite',
            }}
          />
          
          {/* Center 360° text */}
          <div
            className="absolute flex items-center justify-center"
            style={{
              width: innerCircle * 0.8,
              height: innerCircle * 0.8,
            }}
          >
            <span
              className="font-bold"
              style={{
                fontSize: `${textSize}px`,
                color: brandBlack,
              }}
            >
              360°
            </span>
          </div>
        </div>

        {/* Taglines */}
        {showTaglines && (
          <div 
            className="flex items-center gap-3 text-orange font-semibold uppercase tracking-wider"
            style={{ fontSize: `${Math.max(8, logoSize * 0.1)}px` }}
          >
            <span>Expertis</span>
            <span>Equipment</span>
            <span>Experience</span>
          </div>
        )}

        {/* Optional message */}
        {message && (
          <p className="text-muted-foreground mt-4 text-sm md:text-base animate-pulse">
            {message}
          </p>
        )}
      </div>

      {/* Add keyframes for rotation animation */}
      <style>{`
        @keyframes spin-outer {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes spin-middle {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes spin-inner {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

/**
 * Full-screen loading overlay
 */
export function LoadingOverlay({ message, className }: { message?: string; className?: string }) {
  return (
    <div className={cn('fixed inset-0 z-50 bg-background/80 backdrop-blur-sm', className)}>
      <Loading size="lg" message={message} />
    </div>
  );
}

/**
 * Inline loading spinner (small, no taglines)
 */
export function LoadingSpinner({ size = 'sm', className }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  return <Loading size={size} showTaglines={false} className={className} />;
}

export default Loading;

