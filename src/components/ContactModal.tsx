/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "motion/react";
import { X, MessageSquare, Send, CheckCircle, Mail } from "lucide-react";
import { trackEvent } from "../lib/analytics";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledPlan: string | null;
}

export default function ContactModal({
  isOpen,
  onClose,
  prefilledPlan,
}: ContactModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [plan, setPlan] = useState(
    prefilledPlan || "Professional Plan (₹28,000 / $349)",
  );
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [formError, setFormError] = useState("");

  // Reset all state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setName("");
      setEmail("");
      setPhone("");
      setPlan(prefilledPlan || "Professional Plan (₹28,000 / $349)");
      setMessage("");
      setSubmitted(false);
      setSending(false);
      setEmailSent(false);
      setEmailError("");
      setFormError("");
    }
  }, [isOpen, prefilledPlan]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name || !phone) {
      setFormError("Please provide your name and WhatsApp number.");
      return;
    }
    setFormError("");
    setSending(true);
    setEmailError("");

    let emailSuccess = false;
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: name,
          from_email: email || "Not provided",
          phone,
          plan,
          message: message || "I want to take my business online.",
        },
        EMAILJS_PUBLIC_KEY,
      );
      setEmailSent(true);
      emailSuccess = true;
    } catch {
      setEmailError("Email delivery failed. Please try again or reach us via WhatsApp.");
    }

    setSending(false);
    setSubmitted(true);
    trackEvent("lead_form_submit", { plan, email_sent: emailSuccess ? 1 : 0 });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(26,43,74,0.6)", backdropFilter: "blur(6px)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-bg-cream w-full max-w-lg rounded-2xl shadow-2xl border border-brand-navy/15 overflow-hidden"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-brand-navy p-5 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" style={{ color: "#38BDF8" }} />
                <h3 className="font-display text-lg font-bold">
                  Book a Free Consultation
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors border-none bg-transparent cursor-pointer"
                aria-label="Close modal"
              >
                <X className="h-5 w-5 text-white/75" />
              </button>
            </div>

            <div className="p-6 md:p-8">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="text-center py-6 space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                      <CheckCircle className="h-8 w-8 stroke-[2px]" />
                    </div>
                    <h4 className="font-display text-2xl font-bold text-brand-navy">
                      Request Sent!
                    </h4>

                    {emailSent && (
                      <div className="inline-flex items-center gap-2 text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold px-4 py-2 rounded-full">
                        <Mail className="h-3.5 w-3.5" />
                        Email confirmation sent
                      </div>
                    )}
                    {emailError && (
                      <p className="font-sans text-xs text-red-500">{emailError}</p>
                    )}

                    <p className="font-sans text-sm text-brand-navy/80 max-w-sm mx-auto leading-relaxed">
                      Thank you, <strong>{name}</strong>! We've received your request and will contact you on WhatsApp shortly.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                      <a
                        href="https://wa.me/919818726094"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 font-sans font-bold text-sm px-5 py-3 rounded-full border-none cursor-pointer"
                        style={{ background: "#25D366", color: "white" }}
                      >
                        Chat on WhatsApp
                      </a>
                      <button
                        onClick={onClose}
                        className="inline-flex items-center justify-center font-sans font-semibold text-sm px-5 py-3 rounded-full border border-brand-navy/20 bg-white text-brand-navy cursor-pointer hover:bg-brand-navy/5 transition-colors"
                      >
                        Done
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    onSubmit={handleSubmit}
                    className="space-y-4 text-left"
                  >
                    <p className="font-sans text-sm text-brand-navy/70 leading-relaxed mb-4">
                      Fill in your details and we'll reach out on WhatsApp. For instant chat, use the WhatsApp button below.
                    </p>

                    <div>
                      <label
                        htmlFor="fullname-input"
                        className="font-sans text-xs font-bold text-brand-navy uppercase tracking-wider block mb-1"
                      >
                        Full Name *
                      </label>
                      <motion.input
                        id="fullname-input"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="e.g. Ramesh Kumar"
                        value={name}
                        onChange={(e) => { setName(e.target.value); if (formError) setFormError(""); }}
                        whileFocus={{ scale: 1.01, boxShadow: "0 0 0 3px rgba(124, 58, 237, 0.15)" }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="w-full px-4 py-2.5 rounded-lg bg-white border border-brand-navy/15 text-sm font-semibold focus:outline-none focus:border-primary transition-colors font-sans"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone-input"
                        className="font-sans text-xs font-bold text-brand-navy uppercase tracking-wider block mb-1"
                      >
                        WhatsApp Number *
                      </label>
                      <motion.input
                        id="phone-input"
                        type="tel"
                        required
                        autoComplete="tel"
                        placeholder="e.g. +91 98765 12345"
                        value={phone}
                        onChange={(e) => { setPhone(e.target.value); if (formError) setFormError(""); }}
                        whileFocus={{ scale: 1.01, boxShadow: "0 0 0 3px rgba(124, 58, 237, 0.15)" }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="w-full px-4 py-2.5 rounded-lg bg-white border border-brand-navy/15 text-sm font-semibold focus:outline-none focus:border-primary transition-colors font-sans"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email-input"
                        className="font-sans text-xs font-bold text-brand-navy uppercase tracking-wider block mb-1"
                      >
                        Email Address
                      </label>
                      <motion.input
                        id="email-input"
                        type="email"
                        autoComplete="email"
                        placeholder="e.g. ramesh@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        whileFocus={{ scale: 1.01, boxShadow: "0 0 0 3px rgba(124, 58, 237, 0.15)" }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="w-full px-4 py-2.5 rounded-lg bg-white border border-brand-navy/15 text-sm focus:outline-none focus:border-primary transition-colors font-sans"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="plan-select"
                        className="font-sans text-xs font-bold text-brand-navy uppercase tracking-wider block mb-1"
                      >
                        Interested Plan
                      </label>
                      <select
                        id="plan-select"
                        value={plan}
                        onChange={(e) => setPlan(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg bg-white border border-brand-navy/15 text-sm font-semibold focus:outline-none focus:border-primary transition-all font-sans"
                      >
                        <option value="Starter Plan (₹12,000 / $149)">
                          Starter Plan (₹12,000 / $149)
                        </option>
                        <option value="Professional Plan (₹28,000 / $349)">
                          Professional Plan (₹28,000 / $349)
                        </option>
                        <option value="Business Pro Plan (₹55,000 / $699)">
                          Business Pro Plan (₹55,000 / $699)
                        </option>
                        <option value="General Query & Consultation">
                          General Query & Consultation
                        </option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="message-textarea"
                        className="font-sans text-xs font-bold text-brand-navy uppercase tracking-wider block mb-1"
                      >
                        Short Description
                      </label>
                      <motion.textarea
                        id="message-textarea"
                        rows={3}
                        placeholder="Tell us what you want to achieve..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        whileFocus={{ scale: 1.01, boxShadow: "0 0 0 3px rgba(124, 58, 237, 0.15)" }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="w-full px-4 py-2.5 rounded-lg bg-white border border-brand-navy/15 text-sm focus:outline-none focus:border-primary transition-colors font-sans"
                      />
                    </div>

                    {formError && (
                      <p className="text-xs text-red-500 font-semibold -mt-1" role="alert">{formError}</p>
                    )}

                    <button
                      type="submit"
                      disabled={sending}
                      className="btn-shine btn-gradient mt-6 w-full font-sans font-bold text-base py-4 rounded-full flex items-center justify-center gap-2 border-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {sending ? (
                        <>
                          <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          Send Booking Request
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
