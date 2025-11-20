import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { getCareerById, CareerDto } from '@/services/careersService';
import { useTranslation } from '@/contexts/TranslationContext';
import { JobApplicationDialog } from '@/components/Common/JobApplicationDialog';
import { Loading } from '@/components/Common/Loading';
import { 
  MapPin, 
  Clock, 
  Briefcase, 
  GraduationCap,
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';

export default function CareerDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentLanguage } = useTranslation();
  const prevLanguageRef = useRef(currentLanguage);
  const [career, setCareer] = useState<CareerDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Redirect to careers page when language changes
  useEffect(() => {
    if (prevLanguageRef.current !== currentLanguage && id) {
      navigate('/careers');
    }
    prevLanguageRef.current = currentLanguage;
  }, [currentLanguage, id, navigate]);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      if (!id) return;
      try {
        setLoading(true);
        setError(null);
        const data = await getCareerById(id, currentLanguage);
        if (isMounted) {
          setCareer(data);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err?.message || 'Failed to load career details');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, [id, currentLanguage]);

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    });
  };

  if (!id) {
    return (
      <section className="section">
        <div className="container-responsive text-center">
          <p className="text-muted-foreground mb-6">Invalid career ID.</p>
          <Button asChild>
            <Link to="/careers">Back to Careers</Link>
          </Button>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="section">
        <div className="container-responsive">
          <Loading size="md" message="Loading career details..." />
        </div>
      </section>
    );
  }

  if (error || !career) {
    return (
      <section className="section">
        <div className="container-responsive text-center">
          <p className="text-muted-foreground mb-6">
            {error || 'Career not found.'}
          </p>
          <Button asChild>
            <Link to="/careers">Back to Careers</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <div>
      <section className="section pb-0">
        <div className="container-responsive">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/careers">Careers</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/careers/${id}`}>{career.title}</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-responsive max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button 
              variant="ghost" 
              className="mb-6" 
              onClick={() => navigate('/careers')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Careers
            </Button>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{career.title}</h1>
            
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center space-x-2">
                <Briefcase className="h-4 w-4" />
                <span>{career.department}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>{career.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{career.type}</span>
              </div>
              {career.level && (
                <div className="flex items-center space-x-2">
                  <GraduationCap className="h-4 w-4" />
                  <span>{career.level}</span>
                </div>
              )}
            </div>

            {career.postedAt && (
              <p className="text-sm text-muted-foreground mb-6">
                Posted: {formatDate(career.postedAt)}
                {career.closingAt && ` • Closing: ${formatDate(career.closingAt)}`}
              </p>
            )}

            <JobApplicationDialog job={career}>
              <Button size="lg" className="btn-primary">
                Apply Now
              </Button>
            </JobApplicationDialog>
          </div>

          {/* Description */}
          {career.description && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Job Description</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                {career.description.split('\n').map((paragraph, index) => (
                  paragraph.trim() ? (
                    <p key={index} className="mb-4 leading-relaxed">{paragraph}</p>
                  ) : null
                ))}
              </div>
            </div>
          )}

          {/* Responsibilities */}
          {career.responsibilities && career.responsibilities.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Key Responsibilities</h2>
              <ul className="space-y-3">
                {career.responsibilities.map((responsibility, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Requirements */}
          {career.requirements && career.requirements.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Requirements</h2>
              <ul className="space-y-3">
                {career.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Benefits */}
          {career.benefits && career.benefits.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Benefits</h2>
              <ul className="space-y-3">
                {career.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Work Arrangement */}
          {career.workArrangement && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Work Arrangement</h2>
              <p className="text-muted-foreground">{career.workArrangement}</p>
            </div>
          )}

          {/* Tags */}
          {career.tags && career.tags.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {career.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Apply Button at Bottom */}
          <div className="mt-12 pt-8 border-t">
            <JobApplicationDialog job={career}>
              <Button size="lg" className="btn-primary w-full md:w-auto">
                Apply for this Position
              </Button>
            </JobApplicationDialog>
          </div>
        </div>
      </section>
    </div>
  );
}

