import { Link } from 'react-router-dom';

type LogoProps = {
	/** Overall height in pixels */
	height?: number;
	className?: string;
	withLink?: boolean;
};

/**
 * Vector/text logo: "INSPECTORS" in brand orange with a circular 360 emblem.
 * No image assets; scales crisply with the height prop.
 */
export function Logo({ height = 36, className = '', withLink = false }: LogoProps) {
	const brandOrange = '#E86F33';
    const wordFontSize = Math.max(12, Math.round(height * 0.58));
    const emblemSize = Math.max(16, Math.round(height * 0.9));

	const content = (
		<Link to="/services" className={`flex flex-col items-start `}>
		{/* Main Logo */}
		<div className={`flex items-center space-x-2 `}>
		  {/* CBM */}
		  <span className="font-bold sm:text-sm lg:text-2xl" style={{ color: '#E86F33' }}>INSPECTORS</span>
		  
		  {/* 360° Circle */}
		  <div className="relative">
			<div className="w-12 h-12 md:w-14 md:h-14 lg:w-14 lg:h-14 rounded-full border-2 flex items-center justify-center" style={{ borderColor: '#E86F33' }}>
			  <div className="w-10 h-10 md:w-12 md:h-12 lg:w-12 lg:h-12 rounded-full border flex items-center justify-center" style={{ borderColor: '#0F0F0F' }}>
				<div className="w-8 h-8 md:w-10 md:h-10 lg:w-10 lg:h-10 rounded-full border flex items-center justify-center" style={{ borderColor: '#E86F33' }}>
				  <span className="text-xs md:text-sm lg:text-l font-medium text-gray-600" >360°</span>
				</div>
			  </div>
			</div>
		  </div>
		  

		</div>
		
		{/* Tagline
		{showTagline && (
		  <div className={`text-gray-600 font-medium mt-1 ${taglineSizeClasses[size]}`}>
			Inspection Integrity Innovation
		  </div>
		)} */}
	  </Link>
	);

	if (withLink) {
		return (
			<Link to="/services" aria-label="INSPECTORS Home" className="inline-flex items-center">
				{content}
			</Link>
		);
	}

	return content;
}

export default Logo;


