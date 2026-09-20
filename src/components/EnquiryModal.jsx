import React, { useState } from 'react';
import { X, CheckCircle2, Calendar, Phone, Mail, User, Building, MessageSquare, ArrowRight } from 'lucide-react';

export default function EnquiryModal({ isOpen, onClose, initialResidence = '' }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    residence: initialResidence || 'Signature Villa',
    visitDate: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid email is required';
    if (!formData.visitDate) errs.visitDate = 'Please select a preferred date';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setSubmitted(true);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      residence: 'Signature Villa',
      visitDate: '',
      message: ''
    });
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-brand-cream rounded-3xl overflow-hidden shadow-2xl border border-brand-stone/60">
        {/* Modal Header */}
        <div className="px-8 py-6 bg-brand-ivory border-b border-brand-stone/60 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-brand-bronze-dark block mb-1">
              Private Concierge
            </span>
            <h3 className="font-serif text-2xl font-light text-brand-charcoal">
              Request a Private Viewing
            </h3>
          </div>

          <button
            onClick={resetAndClose}
            className="w-10 h-10 rounded-full bg-brand-cream border border-brand-stone flex items-center justify-center text-brand-charcoal hover:bg-brand-charcoal hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form or Success Screen */}
        {!submitted ? (
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-widest font-semibold text-brand-charcoal flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-brand-bronze" />
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Eleanor Vance"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl bg-brand-ivory border text-sm text-brand-charcoal focus:outline-none transition-colors ${
                    errors.fullName ? 'border-red-400' : 'border-brand-stone focus:border-brand-bronze'
                  }`}
                />
                {errors.fullName && <p className="text-[10px] text-red-500 font-medium">{errors.fullName}</p>}
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-widest font-semibold text-brand-charcoal flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-brand-bronze" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl bg-brand-ivory border text-sm text-brand-charcoal focus:outline-none transition-colors ${
                    errors.phone ? 'border-red-400' : 'border-brand-stone focus:border-brand-bronze'
                  }`}
                />
                {errors.phone && <p className="text-[10px] text-red-500 font-medium">{errors.phone}</p>}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-widest font-semibold text-brand-charcoal flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-brand-bronze" />
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="eleanor@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl bg-brand-ivory border text-sm text-brand-charcoal focus:outline-none transition-colors ${
                    errors.email ? 'border-red-400' : 'border-brand-stone focus:border-brand-bronze'
                  }`}
                />
                {errors.email && <p className="text-[10px] text-red-500 font-medium">{errors.email}</p>}
              </div>

              {/* Residence Selection */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-widest font-semibold text-brand-charcoal flex items-center gap-2">
                  <Building className="w-3.5 h-3.5 text-brand-bronze" />
                  Interested Residence
                </label>
                <select
                  value={formData.residence}
                  onChange={(e) => setFormData({ ...formData, residence: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-brand-ivory border border-brand-stone text-sm text-brand-charcoal focus:outline-none focus:border-brand-bronze transition-colors"
                >
                  <option value="Garden Residence">01 — Garden Residence</option>
                  <option value="Signature Villa">02 — Signature Villa</option>
                  <option value="Grand Penthouse">03 — Grand Penthouse</option>
                  <option value="All Residences">All Residences Overview</option>
                </select>
              </div>

              {/* Visit Date */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs uppercase tracking-widest font-semibold text-brand-charcoal flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-brand-bronze" />
                  Preferred Visit Date *
                </label>
                <input
                  type="date"
                  value={formData.visitDate}
                  onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl bg-brand-ivory border text-sm text-brand-charcoal focus:outline-none transition-colors ${
                    errors.visitDate ? 'border-red-400' : 'border-brand-stone focus:border-brand-bronze'
                  }`}
                />
                {errors.visitDate && <p className="text-[10px] text-red-500 font-medium">{errors.visitDate}</p>}
              </div>

              {/* Message */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs uppercase tracking-widest font-semibold text-brand-charcoal flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5 text-brand-bronze" />
                  Message / Special Requirements
                </label>
                <textarea
                  rows="3"
                  placeholder="Share any preferred time slots, chauffeur requirements, or specific floorplan questions..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-brand-ivory border border-brand-stone text-sm text-brand-charcoal focus:outline-none focus:border-brand-bronze transition-colors"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-4 bg-brand-charcoal text-brand-cream hover:bg-brand-bronze hover:text-brand-charcoal text-xs uppercase tracking-[0.2em] font-semibold rounded-full flex items-center justify-center gap-3 transition-all duration-300 shadow-elevated"
              >
                <span>Request Private Viewing</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        ) : (
          /* Polished Success Receipt State */
          <div className="p-10 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-brand-bronze/10 text-brand-bronze border border-brand-bronze/30 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-brand-bronze-dark block">
                Appointment Confirmed
              </span>
              <h4 className="font-serif text-3xl font-light text-brand-charcoal">
                Thank You, {formData.fullName}
              </h4>
              <p className="text-sm text-brand-charcoal-light font-light max-w-md mx-auto leading-relaxed">
                Your private viewing request for <span className="font-semibold text-brand-charcoal">{formData.residence}</span> on <span className="font-semibold text-brand-charcoal">{formData.visitDate}</span> has been logged with our senior estate concierge.
              </p>
            </div>

            <div className="bg-brand-ivory p-4 rounded-xl border border-brand-stone text-xs text-brand-charcoal-muted max-w-sm mx-auto space-y-1">
              <div>Confirmation ID: <span className="font-mono text-brand-charcoal">GW-2026-{Math.floor(1000 + Math.random() * 9000)}</span></div>
              <div>A concierge representative will call {formData.phone} within 2 hours.</div>
            </div>

            <button
              onClick={resetAndClose}
              className="px-8 py-3 bg-brand-charcoal text-brand-cream text-xs uppercase tracking-widest font-semibold rounded-full hover:bg-brand-bronze hover:text-brand-charcoal transition-colors"
            >
              Done & Return
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
