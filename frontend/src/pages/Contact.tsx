
import { HeroSection } from '@/components/Common/HeroSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  MessageCircle,
  FileText,
  Users,
  ArrowRight
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { fetchContactOffices, sendContactInquiry } from '@/services/contactOffices';
import { useToast } from '@/hooks/use-toast';

// Using dynamic offices data from contact-offices.ts

export default function Contact() {
  const [groups, setGroups] = useState<{ region_name: string; offices: any[] }[]>([]);
  const { toast } = useToast();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    industry: '',
    service: '',
    message: '',
    consent: false,
  });

  const [submitting, setSubmitting] = useState(false);
  const isValid = useMemo(() => {
    return (
      form.firstName.trim() !== '' &&
      form.lastName.trim() !== '' &&
      /.+@.+\..+/.test(form.email) &&
      form.company.trim() !== '' &&
      form.message.trim() !== '' &&
      form.consent === true
    );
  }, [form]);
  useEffect(() => {
    fetchContactOffices()
      .then(setGroups)
      .catch(() => {
        setGroups([]);
      });
  }, []);
  return (
    <div>
      {/* Hero Section */}
{/*       <HeroSection
        title="Get in Touch with Our Experts"
        subtitle="Contact Us"
        description="Ready to discuss your testing, inspection, or certification needs? Our global team of experts is here to help you succeed."
        primaryCTA={{
          text: "Send Message",
          href: "#contact-form"
        }}
        secondaryCTA={{
          text: "Find Office",
          href: "#offices"
        }}
      /> */}

      {/* Contact Methods */}
{/*        <section className="section">
       <div className="container-responsive">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">How Can We Help You?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose the best way to connect with our team based on your specific needs and urgency.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: MessageCircle,
                title: "General Inquiries",
                description: "Questions about our services, capabilities, or how we can help your business.",
                action: "Send Message",
                color: "bg-primary"
              },
              {
                icon: FileText,
                title: "Request Quote",
                description: "Get detailed pricing for specific testing, inspection, or certification services.",
                action: "Get Quote",
                color: "bg-accent"
              },
              {
                icon: Phone,
                title: "Urgent Support",
                description: "Need immediate assistance with an ongoing project or certification process.",
                action: "Call Now",
                color: "bg-tuv-blue-600"
              },
              {
                icon: Users,
                title: "Expert Consultation",
                description: "Schedule a consultation with our technical experts for complex requirements.",
                action: "Book Call", 
                color: "bg-tuv-gray-700"
              }
            ].map((method, index) => (
              <div key={index} className="text-center p-8 bg-tuv-gray-50 rounded-lg hover:shadow-lg transition-all group">
                <div className={`inline-flex p-4 ${method.color} rounded-full mb-6 group-hover:scale-110 transition-transform`}>
                  <method.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">{method.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{method.description}</p>
                <Button className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                  {method.action}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
 */}
      {/* Global Offices */}
      <section className="section" id="offices">
        <div className="container-responsive">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Our Global Offices</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              With locations worldwide, we're always close to you. Find your nearest 
              CBM office for local support and services.
            </p>
          </div>
          
          <div className="space-y-12">
            {groups.map((group, index) => (
              <div key={index}>
                <h3 className="text-2xl font-bold mb-8 text-center">{group.region_name}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {group.offices.map((office, officeIndex) => (
                    <div key={officeIndex} className="bg-white border border-border rounded-lg p-0 hover:shadow-lg transition-shadow overflow-hidden">
                      {/* Header like small tab */}
                      <div className="px-4 py-3 bg-tuv-gray-50 border-b flex items-center justify-between gap-4">
                        <div>
                          <h4 className="text-base font-semibold">{office.office_name}</h4>
                          {office.is_lab_facility && (
                            <p className="text-xs text-primary mt-1">laboratory facility</p>
                          )}
                        </div>
                        {office.image_url && (
                          <img
                            src={office.image_url}
                            alt={office.office_name}
                            className="h-14 w-24 object-cover rounded-md border"
                            loading="lazy"
                          />
                        )}
                      </div>
                      {/* Body rows */}
                      <div className="p-4 space-y-3 text-sm">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-primary mt-0.5" />
                          <p className="text-muted-foreground leading-6">{office.address}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-primary" />
                          <p className="text-muted-foreground">{office.phone}</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <Mail className="h-4 w-4 text-primary mt-0.5" />
                          <div className="space-y-1">
                            {office.emails.map((e, i) => (
                              <p key={i} className="text-muted-foreground">{e}</p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

            {/* Contact Form */}
      <section className="section bg-tuv-gray-50" id="contact-form">
        <div className="container-responsive">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="bg-white rounded-2xl p-8 lg:p-12">
              <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form below and our experts will get back to you within 24 hours.
              </p>
              
              <form className="space-y-6" onSubmit={async (e) => {
                e.preventDefault();
                if (!isValid) {
                  toast({ title: 'Please complete required fields', description: 'First name, last name, email, company, message, and consent are required.' });
                  return;
                }
                try {
                  setSubmitting(true);
                  await sendContactInquiry({
                    firstName: form.firstName.trim(),
                    lastName: form.lastName.trim(),
                    email: form.email.trim(),
                    phone: form.phone.trim() || undefined,
                    company: form.company.trim(),
                    industry: form.industry || undefined,
                    service: form.service || undefined,
                    message: form.message.trim(),
                    consent: form.consent,
                  });
                  toast({ title: 'Message sent', description: 'Thanks! Our team will get back to you within 24 hours.' });
                  setForm({ firstName: '', lastName: '', email: '', phone: '', company: '', industry: '', service: '', message: '', consent: false });
                } catch (err: any) {
                  const description = err?.response?.data?.error?.message || 'Failed to send your message. Please try again later.';
                  toast({ title: 'Sending failed', description });
                } finally {
                  setSubmitting(false);
                }
              }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" placeholder="John" className="mt-2" value={form.firstName} onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))} />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input id="lastName" placeholder="Doe" className="mt-2" value={form.lastName} onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))} />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" type="email" placeholder="john.doe@company.com" className="mt-2" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" className="mt-2" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="company">Company *</Label>
                  <Input id="company" placeholder="Your Company Name" className="mt-2" value={form.company} onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))} />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="industry">Industry</Label>
                    <Select value={form.industry} onValueChange={(v) => setForm((f) => ({ ...f, industry: v }))}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select Industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="automotive">Automotive</SelectItem>
                        <SelectItem value="healthcare">Healthcare & Medical</SelectItem>
                        <SelectItem value="energy">Energy & Utilities</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="construction">Construction</SelectItem>
                        <SelectItem value="food">Food & Agriculture</SelectItem>
                        <SelectItem value="aerospace">Aerospace & Defense</SelectItem>
                        <SelectItem value="technology">Technology & Electronics</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="service">Service Needed</Label>
                    <Select value={form.service} onValueChange={(v) => setForm((f) => ({ ...f, service: v }))}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select Service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="testing">Testing & Inspection</SelectItem>
                        <SelectItem value="certification">Certification Services</SelectItem>
                        <SelectItem value="consulting">Consulting & Advisory</SelectItem>
                        <SelectItem value="training">Training & Education</SelectItem>
                        <SelectItem value="digital">Digital Solutions</SelectItem>
                        <SelectItem value="other">Other Services</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Please describe your requirements, timeline, and any specific questions you have..."
                    className="mt-2 min-h-[120px]"
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  />
                </div>
                
                <div className="flex items-start space-x-2">
                  <input type="checkbox" id="consent" className="mt-1" checked={form.consent} onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))} />
                  <Label htmlFor="consent" className="text-sm text-muted-foreground">
                    I agree to CBM processing my personal data for the purpose of responding to my inquiry. 
                    I understand I can withdraw consent at any time.
                  </Label>
                </div>
                
                <Button size="lg" className="w-full btn-primary" type="submit" disabled={!isValid || submitting}>
                  {submitting ? 'Sending...' : 'Send Message'}
                  <Send className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </div>
            
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Get Direct Support</h2>
              <p className="text-muted-foreground mb-8">
                Prefer to speak directly? Our customer support team is available 
                to help you with immediate questions and urgent requests.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Phone Support</h3>
                    <p className="text-muted-foreground mb-2">
                      Speak with our customer service team
                    </p>
                    <p className="font-medium text-primary">+1 (800) 000-0000</p>
                    <p className="text-sm text-muted-foreground">Mon-Fri: 8:00 AM - 6:00 PM EST</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Email Support</h3>
                    <p className="text-muted-foreground mb-2">
                      Send detailed inquiries and documentation
                    </p>
                    <p className="font-medium text-primary">contact@cbm.com</p>
                    <p className="text-sm text-muted-foreground">Response within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Emergency Support</h3>
                    <p className="text-muted-foreground mb-2">
                      24/7 support for urgent certification issues
                    </p>
                    <p className="font-medium text-primary">+1 (800) 111-1111</p>
                    <p className="text-sm text-muted-foreground">Available 24/7 for emergencies</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 p-6 bg-tuv-blue-50 rounded-lg">
                <h3 className="font-bold mb-4">Quick Response Guarantee</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Phone inquiries answered within 3 rings</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Email responses within 24 hours</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Quote requests processed within 48 hours</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
