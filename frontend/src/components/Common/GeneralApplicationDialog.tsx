import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { submitJobApplication, JobApplicationData } from '@/utils/api';
import { ArrowRight, Upload, X } from 'lucide-react';
import { useTranslation } from '@/contexts/TranslationContext';

interface GeneralApplicationDialogProps {
  children: React.ReactNode;
}

export function GeneralApplicationDialog({ children }: GeneralApplicationDialogProps) {
  const { translations } = useTranslation();
  const t = translations?.pages?.careers?.generalApplication;
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<JobApplicationData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    experience: '',
    coverLetter: ''
  });
  
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: t?.toasts?.invalidFileType || "Invalid file type",
          description: t?.toasts?.invalidFileTypeDesc || "Please upload PDF, DOC, or DOCX files only.",
          variant: "destructive",
        });
        return;
      }
      
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: t?.toasts?.fileTooLarge || "File too large",
          description: t?.toasts?.fileTooLargeDesc || "File size must be less than 5MB.",
          variant: "destructive",
        });
        return;
      }
      
      setResumeFile(file);
    }
  };

  const handleInputChange = (field: keyof JobApplicationData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!resumeFile) {
      toast({
        title: t?.toasts?.resumeRequired || "Resume required",
        description: t?.toasts?.resumeRequiredDesc || "Please upload your resume/CV.",
        variant: "destructive",
      });
      return;
    }

    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'position', 'department', 'experience', 'coverLetter'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof JobApplicationData]);
    
    if (missingFields.length > 0) {
      toast({
        title: t?.toasts?.missingInfo || "Missing information",
        description: `${t?.toasts?.missingInfoDesc || "Please fill in: "}${missingFields.join(', ')}`,
        variant: "destructive",
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: t?.toasts?.invalidEmail || "Invalid email",
        description: t?.toasts?.invalidEmailDesc || "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const result = await submitJobApplication(formData, resumeFile);
      
      if (result.success) {
        toast({
          title: t?.toasts?.successTitle || "Application submitted!",
          description: t?.toasts?.successDesc || "Thank you for your application. We'll be in touch soon.",
        });
        setOpen(false);
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          position: '',
          department: '',
          experience: '',
          coverLetter: ''
        });
        setResumeFile(null);
      } else {
        throw new Error(result.message || 'Failed to submit application');
      }
    } catch (error: any) {
      toast({
        title: t?.toasts?.failureTitle || "Submission failed",
        description: error.response?.data?.message || error.message || t?.toasts?.failureDesc || "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      position: '',
      department: '',
      experience: '',
      coverLetter: ''
    });
    setResumeFile(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{t?.title || "General Application"}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t?.personalInfo?.title || "Personal Information"}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">{t?.personalInfo?.firstName || "First Name *"}</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">{t?.personalInfo?.lastName || "Last Name *"}</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">{t?.personalInfo?.email || "Email *"}</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">{t?.personalInfo?.phone || "Phone *"}</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Position Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t?.positionInfo?.title || "Position Information"}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="position">{t?.positionInfo?.desiredPosition || "Desired Position *"}</Label>
                <Input
                  id="position"
                  placeholder={t?.positionInfo?.desiredPositionPlaceholder || "e.g., Senior Test Engineer"}
                  value={formData.position}
                  onChange={(e) => handleInputChange('position', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="department">{t?.positionInfo?.preferredDepartment || "Preferred Department *"}</Label>
                <Select value={formData.department} onValueChange={(value) => handleInputChange('department', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t?.positionInfo?.preferredDepartmentPlaceholder || "Select department"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Engineering">{t?.positionInfo?.departments?.engineering || "Engineering"}</SelectItem>
                    <SelectItem value="Healthcare">{t?.positionInfo?.departments?.healthcare || "Healthcare"}</SelectItem>
                    <SelectItem value="Technology">{t?.positionInfo?.departments?.technology || "Technology"}</SelectItem>
                    <SelectItem value="Manufacturing">{t?.positionInfo?.departments?.manufacturing || "Manufacturing"}</SelectItem>
                    <SelectItem value="Environmental">{t?.positionInfo?.departments?.environmental || "Environmental"}</SelectItem>
                    <SelectItem value="Sales">{t?.positionInfo?.departments?.sales || "Sales"}</SelectItem>
                    <SelectItem value="Marketing">{t?.positionInfo?.departments?.marketing || "Marketing"}</SelectItem>
                    <SelectItem value="Finance">{t?.positionInfo?.departments?.finance || "Finance"}</SelectItem>
                    <SelectItem value="Human Resources">{t?.positionInfo?.departments?.humanResources || "Human Resources"}</SelectItem>
                    <SelectItem value="Operations">{t?.positionInfo?.departments?.operations || "Operations"}</SelectItem>
                    <SelectItem value="Other">{t?.positionInfo?.departments?.other || "Other"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div>
            <Label htmlFor="experience">{t?.experience?.label || "Years of Experience *"}</Label>
            <Select value={formData.experience} onValueChange={(value) => handleInputChange('experience', value)}>
              <SelectTrigger>
                <SelectValue placeholder={t?.experience?.placeholder || "Select experience level"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-1">{t?.experience?.options?.zeroToOne || "0-1 years"}</SelectItem>
                <SelectItem value="2-3">{t?.experience?.options?.twoToThree || "2-3 years"}</SelectItem>
                <SelectItem value="4-5">{t?.experience?.options?.fourToFive || "4-5 years"}</SelectItem>
                <SelectItem value="6-8">{t?.experience?.options?.sixToEight || "6-8 years"}</SelectItem>
                <SelectItem value="9-12">{t?.experience?.options?.nineToTwelve || "9-12 years"}</SelectItem>
                <SelectItem value="13+">{t?.experience?.options?.thirteenPlus || "13+ years"}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Resume Upload */}
          <div>
            <Label htmlFor="resume">{t?.resume?.label || "Resume/CV *"}</Label>
            <div className="mt-2">
              {resumeFile ? (
                <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/50">
                  <div className="flex items-center space-x-2">
                    <Upload className="h-4 w-4" />
                    <span className="text-sm">{resumeFile.name}</span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setResumeFile(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    {t?.resume?.uploadText || "Click to upload your resume (PDF, DOC, DOCX)"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t?.resume?.maxSize || "Maximum file size: 5MB"}
                  </p>
                  <Input
                    id="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => document.getElementById('resume')?.click()}
                  >
                    {t?.resume?.chooseFile || "Choose File"}
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Cover Letter */}
          <div>
            <Label htmlFor="coverLetter">{t?.coverLetter?.label || "Cover Letter *"}</Label>
            <Textarea
              id="coverLetter"
              placeholder={t?.coverLetter?.placeholder || "Tell us about your background, skills, and why you're interested in joining CBM..."}
              value={formData.coverLetter}
              onChange={(e) => handleInputChange('coverLetter', e.target.value)}
              rows={6}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={resetForm}
              disabled={isSubmitting}
            >
              {t?.actions?.reset || "Reset"}
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
            >
              {isSubmitting ? (
                <>
                  {t?.actions?.submitting || "Submitting..."}
                  <div className="ml-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                </>
              ) : (
                <>
                  {t?.actions?.submit || "Submit Application"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}



