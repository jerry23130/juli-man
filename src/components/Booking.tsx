import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { CheckCircle, Calendar, MapPin, User, Mail, Phone, MessageSquare, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const serviceOptions = [
  "Photography", "Videography", "Audio Production", "Wedding & Events",
  "Portrait / Headshots", "Food & Product", "Studio Rental", "Full Production",
  "Baby Shoot", "Fashion Shoot", "Real Estate", "Graduation",
];

export const Booking = () => {
  const ref = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const booking = {
      full_name: (formData.get("full_name") as string).trim(),
      phone: (formData.get("phone") as string).trim(),
      email: (formData.get("email") as string).trim(),
      service_type: formData.get("service_type") as string,
      event_date: (formData.get("event_date") as string) || null,
      location: (formData.get("location") as string)?.trim() || null,
      message: (formData.get("message") as string)?.trim() || null,
    };

    try {
      console.log("Attempting to insert booking:", booking);
      const { data, error } = await supabase.from("bookings").insert([booking]);
      
      if (error) {
        console.error("Supabase error details:", {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw error;
      }
      
      console.log("Booking inserted successfully:", data);
      setSubmitted(true);
      toast.success("Booking request sent! We'll get back to you soon.");
    } catch (err: any) {
      console.error("Booking error:", err);
      toast.error(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = (field: string) =>
    `w-full bg-transparent border-b-2 px-0 py-4 text-foreground font-body placeholder:text-foreground/20 focus:outline-none transition-all duration-500 ${
      focusedField === field
        ? "border-primary"
        : "border-foreground/10 hover:border-foreground/20"
    }`;

  return (
    <section id="booking" className="relative py-32 md:py-48 px-8 md:px-12 overflow-hidden">
      <div ref={ref} className="max-w-[900px] mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-4"
        >
          <span className="text-[11px] uppercase tracking-[0.3em] text-primary font-body font-semibold">Get Started</span>
        </motion.div>

        <div className="overflow-hidden mb-6">
          <motion.h2
            initial={{ y: "100%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-7xl font-display font-bold text-foreground"
          >
            Book a <span className="italic text-primary">Session</span>
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-foreground/35 font-body text-lg mb-16 max-w-lg"
        >
          Let us bring your vision to life. Fill out the form and we'll be in touch within 24 hours.
        </motion.p>

        {submitted ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="py-24 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", bounce: 0.3 }}
            >
              <CheckCircle size={48} className="mx-auto text-primary mb-8" strokeWidth={1.5} />
            </motion.div>
            <h3 className="text-4xl font-display font-bold text-foreground mb-4">
              Request <span className="italic">Received</span>
            </h3>
            <p className="text-foreground/40 font-body text-lg">We'll contact you within 24 hours to confirm your session.</p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-10 text-primary text-sm font-body hover:text-coral-light transition-colors uppercase tracking-[0.15em]"
            >
              Submit another request
            </button>
          </motion.div>
        ) : (
          <motion.form
            ref={formRef}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            onSubmit={handleSubmit}
            className="space-y-2"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
              <div>
                <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-foreground/30 font-body pt-6">
                  <User size={12} className="text-primary" />
                  Full Name *
                </label>
                <input
                  required type="text" name="full_name" maxLength={100}
                  className={inputClasses("name")}
                  placeholder="Your full name"
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-foreground/30 font-body pt-6">
                  <Phone size={12} className="text-primary" />
                  Phone *
                </label>
                <input
                  required type="tel" name="phone" maxLength={20}
                  className={inputClasses("phone")}
                  placeholder="+251 9XX XXX XXX"
                  onFocus={() => setFocusedField("phone")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-foreground/30 font-body pt-6">
                <Mail size={12} className="text-primary" />
                Email *
              </label>
              <input
                required type="email" name="email" maxLength={255}
                className={inputClasses("email")}
                placeholder="you@example.com"
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
              <div>
                <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-foreground/30 font-body pt-6">
                  Service Type *
                </label>
                <select
                  required name="service_type"
                  className={`${inputClasses("service")} cursor-pointer`}
                  onFocus={() => setFocusedField("service")}
                  onBlur={() => setFocusedField(null)}
                >
                  <option value="" className="bg-background">Select a service</option>
                  {serviceOptions.map((s) => (
                    <option key={s} value={s} className="bg-background">{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-foreground/30 font-body pt-6">
                  <Calendar size={12} className="text-primary" />
                  Event Date
                </label>
                <input
                  type="date" name="event_date"
                  className={inputClasses("date")}
                  onFocus={() => setFocusedField("date")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-foreground/30 font-body pt-6">
                <MapPin size={12} className="text-primary" />
                Location
              </label>
              <input
                type="text" name="location" maxLength={200}
                className={inputClasses("location")}
                placeholder="Addis Ababa, Dubai, Paris..."
                onFocus={() => setFocusedField("location")}
                onBlur={() => setFocusedField(null)}
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-foreground/30 font-body pt-6">
                <MessageSquare size={12} className="text-primary" />
                Message
              </label>
              <textarea
                rows={3} name="message" maxLength={1000}
                className={`${inputClasses("message")} resize-none`}
                placeholder="Tell us about your vision..."
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
              />
            </div>

            <div className="pt-12">
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ x: loading ? 0 : 4 }}
                className="group flex items-center gap-4 text-primary font-body font-medium text-lg uppercase tracking-[0.15em] hover:text-coral-light transition-colors duration-500 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Request
                    <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-500" />
                  </>
                )}
              </motion.button>
              <div className="w-full h-px bg-foreground/10 mt-6" />
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
};