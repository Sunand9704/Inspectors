
import { Link } from 'react-router-dom';
import { ArrowRight, LucideIcon } from 'lucide-react';
import { useState } from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  link: string;
  features?: string[];
  imageUrl?: string;
}

export function ServiceCard({ title, description, icon: Icon, link, features, imageUrl }: ServiceCardProps) {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  return (
    <Link to={link} className="card-service block">
      {imageUrl && (
        <div className="w-full overflow-hidden rounded-md mb-4">
          <img
            src={imageUrl}
            alt=""
            className="w-full h-48 object-cover"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(false)}
          />
        </div>
      )}
      <div className="flex items-start space-x-4 mb-4">
        <div className="flex-shrink-0 p-3 bg-primary/10 rounded-lg">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2 transition-colors group-hover:text-primary">
            {title}
          </h3>
        </div>
      </div>
      
      <p className="mb-4 leading-relaxed text-muted-foreground">
        {description}
      </p>

      {features && features.length > 0 && (
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-center text-sm text-muted-foreground"
            >
              <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      )}

      <span 
        className="inline-flex items-center font-medium group text-primary hover:text-primary-hover"
      >
        Learn More
        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </span>
    </Link>
  );
}
