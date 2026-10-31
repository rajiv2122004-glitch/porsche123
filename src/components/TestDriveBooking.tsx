import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Send, CheckCircle2, ShieldAlert, Download, Phone, Mail, User } from 'lucide-react';
import { PORSCHE_MODELS, INDIAN_PORSCHE_CENTRES } from '../data/porscheModels';
import { BookingFormData, PorscheModel } from '../types/porsche';

interface TestDriveBookingProps {
  preselectedModel?: PorscheModel | null;
}

export const TestDriveBooking: React.FC<TestDriveBookingProps> = ({ preselectedModel }) => {
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    email: '',
    phone: '',
    modelId: preselectedModel ? preselectedModel.id : PORSCHE_MODELS[0].id,
    city: 'Bengaluru',
    date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], // 2 days in future
    timeSlot: '11:00 AM - 01:00 PM',
    preferredDealer: 'Porsche Centre Bengaluru',
    message: '',
    agreedToTerms: true,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<{
    referenceId: string;
    submittedAt: string;
    details: BookingFormData;
    modelName: string;
  } | null>(null);

  // Sync preselected model if passed from other sections
  React.useEffect(() => {
    if (preselectedModel) {
      setFormData((prev) => ({ ...prev, modelId: preselectedModel.id }));
    }
  }, [preselectedModel]);

  const handleCityChange = (city: string) => {
    const centre = INDIAN_PORSCHE_CENTRES.find((c) => c.city === city);
    setFormData((prev) => ({
      ...prev,
      city,
      preferredDealer: centre ? centre.name : 'Porsche India VIP Concierge',
    }));
  };

  const validate = (): boolean => {
    const errs: Partial<Record<keyof BookingFormData, string>> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
      errs.fullName = 'Please enter your full legal name (minimum 3 characters)';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address for booking confirmation';
    }

    // Indian mobile number validation (+91 followed by 10 digits starting with 6, 7, 8, or 9)
    const cleanPhone = formData.phone.replace(/[\s-]/g, '');
    const phoneRegex = /^(?:\+91|91)?[6-9]\d{9}$/;
    if (!cleanPhone || !phoneRegex.test(cleanPhone)) {
      errs.phone = 'Please enter a valid 10-digit Indian mobile number (e.g., 9876543210)';
    }

    if (!formData.date) {
      errs.date = 'Please select a preferred test-drive date';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        errs.date = 'Test drive date must be today or a future date';
      }
    }

    if (!formData.agreedToTerms) {
      errs.agreedToTerms = 'You must acknowledge the terms to submit your inquiry';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate luxury concierge API dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      const chosenModel = PORSCHE_MODELS.find((m) => m.id === formData.modelId);
      const ref = `POR-IN-${Math.floor(100000 + Math.random() * 900000)}`;
      setConfirmation({
        referenceId: ref,
        submittedAt: new Date().toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        details: { ...formData },
        modelName: chosenModel?.name || 'Porsche',
      });
    }, 900);
  };

  // Generate calendar .ics file for customer appointment
  const handleDownloadCalendar = () => {
    if (!confirmation) return;
    const dateFormatted = confirmation.details.date.replace(/-/g, '');
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Porsche India//Test Drive Experience//EN',
      'BEGIN:VEVENT',
      `UID:${confirmation.referenceId}@porsche.in`,
      `DTSTAMP:${dateFormatted}T090000Z`,
      `DTSTART:${dateFormatted}T110000Z`,
      `DTEND:${dateFormatted}T130000Z`,
      `SUMMARY:Porsche Test Drive Experience – ${confirmation.modelName}`,
      `DESCRIPTION:Inquiry Reference: ${confirmation.referenceId}\\nDealer: ${confirmation.details.preferredDealer}\\nModel: ${confirmation.modelName}`,
      `LOCATION:${confirmation.details.preferredDealer}, ${confirmation.details.city}, India`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `Porsche_TestDrive_${confirmation.referenceId}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="test-drive" className="py-28 px-6 sm:px-8 bg-[#090a0d] border-t border-white/10 relative">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-bold tracking-[0.3em] uppercase text-[#d50000] mb-3">
            PORSCHE INDIA CONCIERGE
          </div>
          <h2
            className="text-3xl sm:text-5xl font-black text-white tracking-[-0.02em] uppercase leading-none"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            YOUR PORSCHE JOURNEY STARTS HERE.
          </h2>
          <p className="text-sm text-neutral-400 mt-4 leading-relaxed">
            Request an exclusive test drive appointment with an official Porsche product specialist across any authorized Porsche Centre in India.
          </p>
        </div>

        {/* Confirmation Modal / State */}
        {confirmation ? (
          <div className="bg-[#12141c] border border-emerald-500/40 p-8 sm:p-12 shadow-2xl animate-fade-in">
            <div className="flex flex-col items-center text-center max-w-xl mx-auto">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-6">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <span className="text-xs font-mono uppercase tracking-[0.2em] text-emerald-400 font-bold mb-1">
                INQUIRY REGISTERED SUCCESSFULLY
              </span>
              <h3
                className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-2"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                TEST DRIVE DOSSIER #{confirmation.referenceId}
              </h3>

              <p className="text-xs sm:text-sm text-neutral-300 mb-6 leading-relaxed">
                Thank you, <strong>{confirmation.details.fullName}</strong>. Your test drive request for the{' '}
                <span className="text-[#d50000] font-bold">{confirmation.modelName}</span> at{' '}
                <strong>{confirmation.details.preferredDealer}</strong> has been received by our India concierge desk.
              </p>

              {/* Inquiry Summary Grid */}
              <div className="w-full bg-black/40 border border-white/10 p-5 text-left text-xs space-y-2.5 mb-8">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-neutral-400">Model Requested:</span>
                  <span className="font-bold text-white">{confirmation.modelName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-neutral-400">Porsche Centre:</span>
                  <span className="font-bold text-white">{confirmation.details.preferredDealer} ({confirmation.details.city})</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-neutral-400">Preferred Date & Window:</span>
                  <span className="font-bold text-white">{confirmation.details.date} · {confirmation.details.timeSlot}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-neutral-400">Contact Number:</span>
                  <span className="font-mono text-white">+91 {confirmation.details.phone}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-neutral-400">Notification Dispatched To:</span>
                  <span className="font-mono text-[#d50000]">{confirmation.details.email}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                <button
                  onClick={handleDownloadCalendar}
                  className="px-6 py-3 text-xs font-bold tracking-wider uppercase text-black bg-white hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>ADD TO CALENDAR (.ICS)</span>
                </button>
                <button
                  onClick={() => setConfirmation(null)}
                  className="px-6 py-3 text-xs font-bold tracking-wider uppercase text-neutral-300 border border-white/20 hover:border-white hover:text-white transition-colors"
                >
                  SUBMIT ANOTHER INQUIRY
                </button>
              </div>

              {/* Disclaimer */}
              <p className="text-[11px] text-neutral-500 mt-8 max-w-md">
                * Note: This is an independent concept website inquiry demonstration. Test-drive vehicles are subject to dealer availability and valid Indian driving credentials.
              </p>
            </div>
          </div>
        ) : (
          /* Booking Inquiry Form */
          <form
            onSubmit={handleSubmit}
            className="bg-[#121319] border border-white/10 p-6 sm:p-10 shadow-2xl space-y-6"
            noValidate
          >
            {/* Row 1: Full Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5 mb-2">
                  <User className="w-3.5 h-3.5 text-[#d50000]" /> Full Legal Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rajiv Sharma"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className={`w-full bg-[#0d0e12] border ${
                    errors.fullName ? 'border-red-500' : 'border-white/20 focus:border-white'
                  } p-3 text-sm text-white focus:outline-none transition-colors`}
                />
                {errors.fullName && (
                  <p className="text-[11px] text-red-400 mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5 mb-2">
                  <Mail className="w-3.5 h-3.5 text-[#d50000]" /> Email Address *
                </label>
                <input
                  type="email"
                  placeholder="e.g. rajiv2122004@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full bg-[#0d0e12] border ${
                    errors.email ? 'border-red-500' : 'border-white/20 focus:border-white'
                  } p-3 text-sm text-white focus:outline-none transition-colors`}
                />
                {errors.email && (
                  <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Row 2: Mobile Number & Model Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5 mb-2">
                  <Phone className="w-3.5 h-3.5 text-[#d50000]" /> Mobile Number (+91 India) *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-sm font-semibold text-neutral-400">+91</span>
                  <input
                    type="tel"
                    placeholder="98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full bg-[#0d0e12] border ${
                      errors.phone ? 'border-red-500' : 'border-white/20 focus:border-white'
                    } pl-12 pr-3 py-3 text-sm text-white focus:outline-none transition-colors font-mono`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-300 block mb-2">
                  Select Porsche Model *
                </label>
                <select
                  value={formData.modelId}
                  onChange={(e) => setFormData({ ...formData, modelId: e.target.value })}
                  className="w-full bg-[#0d0e12] border border-white/20 p-3 text-sm text-white focus:outline-none focus:border-white transition-colors"
                >
                  {PORSCHE_MODELS.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.priceInr})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 3: Preferred Indian City & Centre */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5 mb-2">
                  <MapPin className="w-3.5 h-3.5 text-[#d50000]" /> Preferred Indian City *
                </label>
                <select
                  value={formData.city}
                  onChange={(e) => handleCityChange(e.target.value)}
                  className="w-full bg-[#0d0e12] border border-white/20 p-3 text-sm text-white focus:outline-none focus:border-white transition-colors"
                >
                  {INDIAN_PORSCHE_CENTRES.map((c) => (
                    <option key={c.city} value={c.city}>
                      {c.city}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-300 block mb-2">
                  Designated Porsche Centre
                </label>
                <input
                  type="text"
                  readOnly
                  value={formData.preferredDealer}
                  className="w-full bg-black/40 border border-white/10 p-3 text-sm text-neutral-300 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Row 4: Preferred Date & Preferred Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5 mb-2">
                  <Calendar className="w-3.5 h-3.5 text-[#d50000]" /> Preferred Date *
                </label>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className={`w-full bg-[#0d0e12] border ${
                    errors.date ? 'border-red-500' : 'border-white/20 focus:border-white'
                  } p-3 text-sm text-white focus:outline-none transition-colors`}
                />
                {errors.date && (
                  <p className="text-[11px] text-red-400 mt-1">{errors.date}</p>
                )}
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5 mb-2">
                  <Clock className="w-3.5 h-3.5 text-[#d50000]" /> Preferred Time Window *
                </label>
                <select
                  value={formData.timeSlot}
                  onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                  className="w-full bg-[#0d0e12] border border-white/20 p-3 text-sm text-white focus:outline-none focus:border-white transition-colors"
                >
                  <option value="10:00 AM - 12:00 PM">Morning (10:00 AM – 12:00 PM)</option>
                  <option value="12:00 PM - 02:00 PM">Midday (12:00 PM – 02:00 PM)</option>
                  <option value="02:00 PM - 04:00 PM">Afternoon (02:00 PM – 04:00 PM)</option>
                  <option value="04:00 PM - 06:00 PM">Evening (04:00 PM – 06:00 PM)</option>
                </select>
              </div>
            </div>

            {/* Additional Message */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-300 block mb-2">
                Additional Inquiries or Custom Preferences (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Mention specific packages (Weissach Package, Clubsport, PTS colors) or driving preferences..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-[#0d0e12] border border-white/20 p-3 text-sm text-white focus:outline-none focus:border-white transition-colors"
              />
            </div>

            {/* Terms Agreement */}
            <div className="pt-2">
              <label className="flex items-start gap-3 text-xs text-neutral-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.agreedToTerms}
                  onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                  className="mt-0.5 accent-[#d50000]"
                />
                <span>
                  I understand that test drives are conducted with authorized Porsche India personnel and require a valid Indian driver’s license. I agree to receive appointment coordination via phone and email.
                </span>
              </label>
              {errors.agreedToTerms && (
                <p className="text-[11px] text-red-400 mt-1">{errors.agreedToTerms}</p>
              )}
            </div>

            {/* Transparent Demo Inquiry Explanation */}
            <div className="p-4 bg-black/40 border border-white/10 text-xs text-neutral-400 flex items-start gap-3">
              <ShieldAlert className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-white font-medium">Concept Portal Notice: </span>
                This portal functions as an interactive concept test-drive booking inquiry. Submissions generate an authentic dossier reference and simulated concierge dispatch for review.
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-8 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-white bg-[#d50000] hover:bg-[#b00000] active:scale-[0.99] transition-all flex items-center justify-center gap-3 shadow-xl cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>TRANSMITTING TO CONCIERGE...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>REQUEST A TEST DRIVE</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
