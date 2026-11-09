import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  FileText,
  Building,
  Navigation
} from 'lucide-react';
import {
  ContactFormData,
  validateContactForm,
  ValidationResult
} from '../utils/college-data';

interface ContactSectionProps {
  initialProgramInterest?: string;
}

export default function ContactSection({ initialProgramInterest }: ContactSectionProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    inquiryType: 'Admissions & Enrollment',
    programInterest: initialProgramInterest || 'BSIT',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState<string>('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result: ValidationResult = validateContactForm(formData);

    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      const generatedTicket = `GC-CCS-${Math.floor(100000 + Math.random() * 900000)}`;
      setTicketId(generatedTicket);
    }, 700);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      inquiryType: 'Admissions & Enrollment',
      programInterest: 'BSIT',
      message: '',
    });
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <section className="py-16 bg-slate-50/70 border-b border-slate-200 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 pb-6 border-b border-slate-200">
          <div className="text-xs font-mono uppercase tracking-wider text-orange-600 font-bold mb-1">
            Admissions Office & Department Inquiries
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-900 tracking-tight">
            Contact & Campus Admissions
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl font-body mt-2 leading-relaxed">
            Connect directly with our admissions coordinators, academic advisors, and department chairs. Visit our campus office at the Olongapo City Sports Complex.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Official Admissions & Campus Details */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Campus Info Card */}
            <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 space-y-5 shadow-sm">
              <div className="flex items-center space-x-2 text-xs font-mono text-orange-700 font-bold uppercase">
                <Building className="w-4 h-4" />
                <span>Gordon College CCS Dean's Office</span>
              </div>

              <div className="space-y-4 text-xs sm:text-sm font-body text-slate-700">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-semibold">Physical Address:</strong>
                    <span className="text-slate-600">
                      Olongapo City Sports Complex, East Tapinac, Olongapo City, Zambales 2200, Philippines
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-semibold">Official Inquiries:</strong>
                    <span className="text-slate-600 font-mono text-xs">info.ccs@gordoncollege.edu.ph</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-semibold">Direct Telephone:</strong>
                    <span className="text-slate-600 font-mono text-xs">(047) 224-2089 • Local 104</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-semibold">Consultation Hours:</strong>
                    <span className="text-slate-600">Monday – Friday: 8:00 AM – 5:00 PM PST</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Admissions Checklist Card */}
            <div className="rounded-2xl bg-orange-50/50 border border-orange-100 p-6 space-y-3">
              <div className="flex items-center space-x-2 text-xs font-mono text-orange-700 font-bold uppercase">
                <FileText className="w-4 h-4 text-orange-600" />
                <span>AY 2026–2027 Admissions Requirements</span>
              </div>
              <ul className="text-xs text-slate-700 space-y-2 font-body list-disc pl-4 leading-relaxed">
                <li>Senior High School Form 138 (Report Card) with passing general average</li>
                <li>Certificate of Good Moral Character from previous school head</li>
                <li>PSA Birth Certificate (Original & Photocopy)</li>
                <li>Certificate of Residency (for Olongapo City residents / Free Tuition priority)</li>
                <li>Two (2) identical 2x2 studio ID photos with white background</li>
              </ul>
            </div>

          </div>

          {/* Right Column: Clean Admissions Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm">
              
              {isSubmitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>

                  <div>
                    <h3 className="text-xl font-heading font-bold text-slate-900">
                      Inquiry Dispatched Successfully
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-body max-w-md mx-auto mt-1.5">
                      Your inquiry has been assigned ticket <strong className="text-orange-600 font-mono font-bold">{ticketId}</strong>. A department coordinator will reply to <span className="text-slate-900 font-semibold">{formData.email}</span> within 24–48 business hours.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 max-w-sm mx-auto text-left text-xs font-mono text-slate-700 space-y-1">
                    <div>Applicant: <span className="font-semibold">{formData.fullName}</span></div>
                    <div>Program: <span className="font-semibold">{formData.programInterest}</span></div>
                    <div>Topic: <span className="font-semibold">{formData.inquiryType}</span></div>
                  </div>

                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-heading font-semibold text-xs rounded-lg transition-colors shadow-xs"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h2 className="text-xl font-heading font-extrabold text-slate-900">
                      Submit an Admissions or Academic Inquiry
                    </h2>
                    <p className="text-xs text-slate-500 font-body mt-0.5">
                      All fields marked with an asterisk are required.
                    </p>
                  </div>

                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g., Juan Dela Cruz"
                      className={`w-full px-3.5 py-2.5 bg-white border rounded-lg text-slate-900 font-body text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:border-orange-500 transition-colors shadow-2xs ${
                        errors.fullName ? 'border-rose-500' : 'border-slate-300'
                      }`}
                    />
                    {errors.fullName && (
                      <span className="text-[11px] text-rose-600 font-body mt-1 block font-medium">
                        {errors.fullName}
                      </span>
                    )}
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g., juan.delacruz@gmail.com"
                        className={`w-full px-3.5 py-2.5 bg-white border rounded-lg text-slate-900 font-body text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:border-orange-500 transition-colors shadow-2xs ${
                          errors.email ? 'border-rose-500' : 'border-slate-300'
                        }`}
                      />
                      {errors.email && (
                        <span className="text-[11px] text-rose-600 font-body mt-1 block font-medium">
                          {errors.email}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Contact Mobile Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g., 0917-123-4567"
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 font-body text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:border-orange-500 transition-colors shadow-2xs"
                      />
                    </div>
                  </div>

                  {/* Inquiry Category & Program Interest */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Inquiry Category *
                      </label>
                      <select
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 font-body text-xs sm:text-sm focus:outline-none focus:border-orange-500 transition-colors shadow-2xs"
                      >
                        <option value="Admissions & Enrollment">Admissions & Enrollment</option>
                        <option value="Curriculum & Programs">Curriculum & Programs</option>
                        <option value="Free Tuition (RA 10931)">Free Tuition (RA 10931)</option>
                        <option value="Faculty Consultation">Faculty Consultation</option>
                        <option value="Industry & Research Alliance">Industry & Research Alliance</option>
                        <option value="Transcript & Records">Transcript & Records</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Program of Interest *
                      </label>
                      <select
                        name="programInterest"
                        value={formData.programInterest}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 font-body text-xs sm:text-sm focus:outline-none focus:border-orange-500 transition-colors shadow-2xs"
                      >
                        <option value="BSIT">BS in Information Technology (BSIT)</option>
                        <option value="BSCS">BS in Computer Science (BSCS)</option>
                        <option value="BSEMC">BS in Entertainment & Multimedia (BSEMC)</option>
                        <option value="ACT">Associate in Computer Tech (ACT - 2 Yr)</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Inquiry Details / Message *
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please specify your query regarding entrance exams, document requirements, or curriculum details..."
                      className={`w-full px-3.5 py-2.5 bg-white border rounded-lg text-slate-900 font-body text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:border-orange-500 transition-colors shadow-2xs ${
                        errors.message ? 'border-rose-500' : 'border-slate-300'
                      }`}
                    />
                    {errors.message && (
                      <span className="text-[11px] text-rose-600 font-body mt-1 block font-medium">
                        {errors.message}
                      </span>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white font-heading font-semibold text-sm rounded-lg shadow-sm transition-all flex items-center justify-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Transmitting to Admissions...' : 'Submit Official Inquiry'}</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
