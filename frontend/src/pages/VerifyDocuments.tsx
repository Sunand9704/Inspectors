import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/contexts/TranslationContext';
import { sendDocumentVerification } from '@/services/verifyDocuments';

export default function VerifyDocuments() {
  const { toast } = useToast();
  const { translations } = useTranslation();
  const t = translations?.pages?.verifyDocuments;

  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    location: '',
    company: '',
    jobTitle: '',
    comments: ''
  });

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      handleFiles(selectedFiles);
    }
  };

  const handleFiles = (newFiles: File[]) => {
    // Basic validation
    const validFiles = newFiles.filter(file => {
      const isValidType = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'].includes(file.type);
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB
      return isValidType && isValidSize;
    });

    if (validFiles.length !== newFiles.length) {
      toast({
        title: t?.toast?.invalidFiles || "Invalid files",
        description: t?.toast?.invalidFiles || "Some files were rejected. Please check file types and size limits.",
        variant: "destructive"
      });
    }

    setFiles(prev => [...prev, ...validFiles].slice(0, 5));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.location) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (files.length === 0) {
      toast({
        title: "No files uploaded",
        description: "Please upload at least one document.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await sendDocumentVerification(formData, files);
      
      toast({
        title: "Success",
        description: t?.toast?.success || "Your documents have been sent for verification.",
      });

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        location: '',
        company: '',
        jobTitle: '',
        comments: ''
      });
      setFiles([]);
    } catch (error) {
      console.error('Error submitting verification:', error);
      toast({
        title: "Error",
        description: t?.toast?.error || "Failed to send documents. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!t) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-[#1e2337] text-white py-20 relative overflow-hidden">
        <div className="container-responsive relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block bg-white/10 px-3 py-1 rounded-full text-sm font-medium mb-6">
              {t.hero.badge}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {t.hero.title}
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl">
              {t.hero.description}
            </p>
            <div className="flex items-center gap-6">
              <Button 
                onClick={() => document.getElementById('verification-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-[#1e2337] hover:bg-gray-100 font-semibold px-8 py-6 h-auto text-lg"
              >
                {t.hero.ctaButton}
              </Button>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Shield className="w-5 h-5 text-green-400" />
                {t.hero.securityNote}
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#2a3047] to-transparent opacity-50 pointer-events-none" />
      </div>

      <div className="container-responsive py-16" id="verification-form">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-2">{t.form.title}</h2>
              <p className="text-gray-500 mb-8">
                {t.form.description}
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">{t.form.labels.firstName}</Label>
                    <Input 
                      id="firstName" 
                      placeholder={t.form.placeholders.firstName} 
                      required 
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">{t.form.labels.lastName}</Label>
                    <Input 
                      id="lastName" 
                      placeholder={t.form.placeholders.lastName} 
                      required 
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">{t.form.labels.email}</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder={t.form.placeholders.email} 
                      required 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">{t.form.labels.location}</Label>
                    <Select 
                      value={formData.location} 
                      onValueChange={(value) => setFormData({ ...formData, location: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t.form.placeholders.location} />
                      </SelectTrigger>
                      <SelectContent>
                        {t?.form?.locations && Object.entries(t.form.locations).map(([key, label]) => (
                          <SelectItem key={key} value={key}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="company">{t.form.labels.company}</Label>
                    <Input 
                      id="company" 
                      placeholder={t.form.placeholders.company} 
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle">{t.form.labels.jobTitle}</Label>
                    <Input 
                      id="jobTitle" 
                      placeholder={t.form.placeholders.jobTitle} 
                      value={formData.jobTitle}
                      onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comments">{t.form.labels.comments}</Label>
                  <Textarea 
                    id="comments" 
                    placeholder={t.form.placeholders.comments} 
                    className="min-h-[100px]"
                    value={formData.comments}
                    onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>{t.form.upload.label}</Label>
                  <div 
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                      isDragging ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
                        <Upload className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{t.form.upload.dragDrop}</p>
                        <p className="text-sm text-gray-500 mt-1">{t.form.upload.fileInfo}</p>
                      </div>
                      <Input 
                        type="file" 
                        className="hidden" 
                        id="file-upload" 
                        multiple 
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={handleFileSelect}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('file-upload')?.click()}
                        className="mt-2 border-orange-500 text-orange-600 hover:bg-orange-50 hover:text-orange-700"
                      >
                        {t.form.upload.selectFiles}
                      </Button>
                    </div>
                    
                    {files.length > 0 && (
                      <div className="mt-6 space-y-2 text-left">
                        {files.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm">
                            <span className="truncate">{file.name}</span>
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="sm" 
                              className="h-auto p-1 text-red-500 hover:text-red-700"
                              onClick={() => setFiles(files.filter((_, i) => i !== index))}
                            >
                              {t.form.upload.remove}
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full btn-primary py-6 text-lg font-medium"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t.form.cta.submitting : t.form.cta.submit}
                </Button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Info Box */}
            <div className="bg-[#1e2337] text-white rounded-xl p-8">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mb-6">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-6">{t.sidebar.whatNext.title}</h3>
              <div className="space-y-6">
                {t.sidebar.whatNext.steps.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <span className="font-bold text-gray-400">{step.number}</span>
                    <div>
                      <h4 className="font-bold mb-1">{step.title}</h4>
                      <p className="text-sm text-gray-400 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Assistance Box */}
            <div className="bg-gray-50 rounded-xl border border-gray-200 p-8">
              <h3 className="text-lg font-bold mb-4">{t.sidebar.assistance.title}</h3>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                Need quick assistance? Email{" "}
                <a
                  href="mailto:Contact@inspectors360.com"
                  className="font-semibold text-orange-600 hover:underline"
                >
                  Contact@inspectors360.com
                </a>{" "}
                or call +44 7934 980214 mentioning "Verify Doc Portal" for
                priority routing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
