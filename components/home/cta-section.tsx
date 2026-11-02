"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Phone, CalendarCheck, Stethoscope, ClipboardList, MessagesSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/data/site-config";

/**
 * CTASection — NMC-compliant redesign
 *
 * Compliance notes (NMC public notice, 06 Oct 2026):
 *  - No superlatives, guaranteed-result or success-rate claims          (§8.1(iii), §8.1(ix))
 *  - No discounts, free-consult offers, coupons or referral incentives  (§8.1(x))
 *  - No patient photos, testimonials or before/after imagery            (§6, §8.1(v))
 *  - Copy is factual and describes the process only; the treatment plan
 *    is framed as a decision made after examination, not a promise.
 *  - A plain-language disclaimer is shown under the CTA buttons.
 *
 * Copy lives in the arrays below so the clinic's reviewer can approve it
 * line by line (log the approval in the content-approval record).
 */

interface CTASectionProps {
  title?: string;
  description?: string;
}

const VISIT_STEPS = [
  {
    icon: CalendarCheck,
    title: "Book a slot",
    text: "Call the clinic or use the appointment form. Visits are by appointment.",
  },
  {
    icon: Stethoscope,
    title: "Meet Dr. Anand Patil",
    text: "Your skin, hair or nail concern is examined and your history is discussed.",
  },
  {
    icon: ClipboardList,
    title: "Discuss your options",
    text: "Suitable treatments, expected duration and costs are explained before you decide.",
  },
] as const;

const DISCLAIMER =
  "Information on this website is for general awareness and does not replace a medical consultation. Outcomes differ from person to person.";

const container: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.15, staggerChildren: 0.28 } },
};

const stepItem: Variants = {
  hidden: { opacity: 0, x: 18 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function CTASection({
  title = "Have a skin concern? Start with a conversation.",
  description = "Meet Dr. Anand Patil in Latur for an examination and a treatment plan suited to your skin. What you do next is always your decision.",
}: CTASectionProps) {
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="cta-heading"
      className="relative isolate overflow-hidden py-20 sm:py-28"
    >
      {/* ── Background ───────────────────────────────────────────── */}
      <div className="absolute inset-0 -z-20 bg-gradient-clinic" />
      <div className="absolute inset-0 -z-20 bg-clarity-grid opacity-20" />

      {/* Soft light pools */}
      <div className="absolute -top-32 -left-24 -z-10 h-[28rem] w-[28rem] rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-40 right-0 -z-10 h-[30rem] w-[30rem] rounded-full bg-cyan-300/20 blur-3xl" />

      {/* Concentric "laser pulse" rings — the one ambient moment */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10rem] top-1/2 -z-10 hidden h-0 w-0 lg:block"
      >
        {[0, 1, 2, 3].map((i) => (
          <motion.span
            key={i}
            className="absolute rounded-full border border-white/20"
            style={{
              width: 280 + i * 150,
              height: 280 + i * 150,
              left: -(140 + i * 75),
              top: -(140 + i * 75),
            }}
            animate={reduce ? undefined : { scale: [1, 1.06, 1], opacity: [0.55, 0.15, 0.55] }}
            transition={{ duration: 6, delay: i * 0.9, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* ── Content ──────────────────────────────────────────────── */}
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        {/* Left: message + actions */}
        <div className="text-center lg:text-left">
          <h2
            id="cta-heading"
            className="text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            {title}
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/85 lg:mx-0">
            {description}
          </p>

          <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row lg:justify-start justify-center">
            <Button
              href="/contact"
              variant="secondary"
              size="lg"
              icon={CalendarCheck}
              className="bg-white text-[var(--color-secondary)] shadow-xl shadow-black/10 transition-transform hover:-translate-y-0.5 hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Book appointment
            </Button>
            <Button
              href={`tel:${SITE_CONFIG.contact.phonePrimaryRaw}`}
              variant="outline"
              size="lg"
              icon={Phone}
              iconPosition="left"
              className="border-white/40 text-white hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Call {SITE_CONFIG.contact.phonePrimary}
            </Button>
          </div>

          <p className="mx-auto mt-8 flex max-w-md items-start gap-2 text-sm leading-relaxed text-white/70 lg:mx-0">
            <MessagesSquare aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{DISCLAIMER}</span>
          </p>
        </div>

        {/* Right: appointment-slip card with a drawn timeline */}
        <motion.div
          initial={{ opacity: 0, y: 28, rotate: reduce ? 0 : 1.5 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-md"
        >
          {/* glow behind the slip */}
          <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-white/15 blur-2xl" />

          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/30 bg-white/95 text-slate-800 shadow-2xl shadow-black/20 backdrop-blur">
            {/* header strip */}
            <div className="flex items-center justify-between gap-4 bg-[var(--color-secondary)] px-6 py-4 text-white">
              <div>
                <p className="text-base font-semibold leading-tight">Your first visit</p>
                <p className="text-sm text-white/75">Dr. Anand Patil, Latur</p>
              </div>
              <Stethoscope aria-hidden className="h-7 w-7 text-white/80" />
            </div>

            {/* perforation notches */}
            <div aria-hidden className="relative h-0">
              <span className="absolute -left-3 -top-3 h-6 w-6 rounded-full bg-[var(--color-secondary)]/0 ring-0" />
            </div>

            {/* steps */}
            <motion.ol
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="relative px-6 py-7"
            >
              {/* the line that draws itself */}
              <motion.span
                aria-hidden
                initial={{ scaleY: reduce ? 1 : 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.1, delay: 0.2, ease: "easeInOut" }}
                className="absolute left-[2.45rem] top-12 bottom-12 w-px origin-top bg-gradient-to-b from-sky-400 via-blue-500 to-teal-400"
              />

              {VISIT_STEPS.map(({ icon: Icon, title: stepTitle, text }, index) => (
                <motion.li
                  key={stepTitle}
                  variants={stepItem}
                  className={`relative flex gap-4 ${index !== VISIT_STEPS.length - 1 ? "pb-7" : ""}`}
                >
                  <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-teal-400 text-white shadow-md shadow-sky-500/30 ring-4 ring-white">
                    <Icon aria-hidden className="h-5 w-5" />
                  </span>
                  <div className="pt-0.5">
                    <p className="font-semibold leading-snug text-slate-900">
                      <span className="sr-only">Step {index + 1}: </span>
                      {stepTitle}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{text}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ol>

            {/* tear-off footer */}
            <div className="relative border-t border-dashed border-slate-300 px-6 py-4">
              <span
                aria-hidden
                className="absolute -left-3 -top-3 h-6 w-6 rounded-full bg-[#1d8fe6]"
              />
              <span
                aria-hidden
                className="absolute -right-3 -top-3 h-6 w-6 rounded-full bg-[#1d8fe6]"
              />
              <a
                href={`tel:${SITE_CONFIG.contact.phonePrimaryRaw}`}
                className="group flex items-center justify-between gap-3 rounded-lg text-sm font-medium text-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500"
              >
                <span>Prefer to talk first?</span>
                <span className="inline-flex items-center gap-2 font-semibold text-[var(--color-secondary)]">
                  <Phone aria-hidden className="h-4 w-4 transition-transform group-hover:-rotate-12" />
                  {SITE_CONFIG.contact.phonePrimary}
                </span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}