"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  CalendarClock,
  ClipboardList,
  PhoneCall,
  Stethoscope,
} from "lucide-react";

/**
 * Consultation steps — informational only.
 *
 * Rewritten to follow the NMC ethical advertising guidelines (6 Oct 2026):
 *  - no promise of a plan, a "expected timeline" or any result (§8.1 iii, vi);
 *  - no "designed to respect your time" / quality-of-service claims;
 *  - the doctor is named exactly as elsewhere on the site.
 * The export name is kept so existing imports keep working.
 *
 * The wording of every step below is the site's own; the clinic must confirm
 * it matches how consultations really run, in writing, before publishing.
 */
const STEPS = [
  {
    icon: PhoneCall,
    title: "Appointment enquiry",
    description:
      "Contact the clinic by phone, WhatsApp or the contact form to ask about an appointment.",
    link: true,
  },
  {
    icon: ClipboardList,
    title: "Medical history",
    description:
      "A short intake records the concern, medical history and any earlier treatment.",
  },
  {
    icon: Stethoscope,
    title: "Clinical assessment",
    description:
      "Dr. Anand Patil examines the skin, hair or nails and explains the findings.",
  },
  {
    icon: CalendarClock,
    title: "Discussion of options",
    description:
      "Where required, treatment options and follow-up are discussed after the assessment.",
  },
];

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700";

export function PatientJourney() {
  const reduce = !!useReducedMotion();

  const rise = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { y: 24 },
          whileInView: { y: 0 },
          viewport: { once: true, margin: "-60px" },
          transition: { duration: 0.55, delay, ease: "easeOut" as const },
        };

  return (
    <section
      aria-labelledby="journey-heading"
      className="relative overflow-hidden bg-gradient-to-b from-white via-sky-50/70 to-sky-50 py-20 sm:py-24 lg:py-28"
    >
      {/* Decorative, static */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-24 h-[420px] w-[420px] rounded-full bg-teal-100/60 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-sky-200/50 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* ------------------------ Heading ------------------------ */}
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-16">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-sky-800 shadow-sm ring-1 ring-sky-100">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-teal-500" />
              Consultation Steps
            </p>
            <h2
              id="journey-heading"
              className="mt-5 font-display text-4xl font-semibold leading-[1.06] tracking-tight text-[var(--color-ink)] sm:text-5xl lg:text-6xl"
            >
              How a consultation works
              <span className="text-sky-600">.</span>
            </h2>
          </div>
          <p className="text-base leading-relaxed text-slate-600 lg:pb-2">
            The steps involved in a consultation at the clinic, from the first
            enquiry to the discussion that follows the clinical assessment.
          </p>
        </div>

        {/* ------------------------ Steps ------------------------ */}
        <div className="relative mt-14 lg:mt-16">
          {/* Desktop connector line — draws in once */}
          <motion.div
            aria-hidden="true"
            className="absolute left-[6%] right-[6%] top-[46px] hidden h-0.5 origin-left rounded-full bg-gradient-to-r from-sky-300 via-teal-300 to-sky-300 lg:block"
            {...(reduce
              ? {}
              : {
                  initial: { scaleX: 0 },
                  whileInView: { scaleX: 1 },
                  viewport: { once: true, margin: "-60px" },
                  transition: { duration: 1.2, delay: 0.2, ease: "easeOut" as const },
                })}
          />
          {/* Mobile connector line */}
          <div
            aria-hidden="true"
            className="absolute bottom-10 left-[31px] top-10 w-0.5 rounded-full bg-gradient-to-b from-sky-300 via-teal-300 to-sky-300 sm:left-[39px] lg:hidden"
          />

          <ol className="relative grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-6">
            {STEPS.map((step, i) => (
              <motion.li key={step.title} {...rise(i * 0.1)} className="relative">
                <div className="group relative h-full overflow-hidden rounded-3xl border border-white bg-white/80 p-6 pl-24 shadow-[var(--shadow-card)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lifted)] sm:pl-28 lg:p-7 lg:pl-7 lg:pt-[88px]">
                  {/* Large outlined step number (decorative) */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-4 right-3 select-none font-display text-[7rem] font-semibold leading-none text-transparent"
                    style={{ WebkitTextStroke: "1.5px rgba(14,165,233,0.25)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Icon tile sits on the connector line */}
                  <span
                    aria-hidden="true"
                    className="absolute left-4 top-5 flex h-[56px] w-[56px] items-center justify-center rounded-2xl bg-gradient-to-br from-sky-600 to-teal-500 text-white shadow-lg shadow-sky-500/25 ring-4 ring-white transition-transform duration-300 group-hover:scale-105 sm:left-6 lg:left-7 lg:top-[18px]"
                  >
                    <step.icon className="h-6 w-6" strokeWidth={1.75} />
                  </span>

                  <p className="text-xs font-semibold uppercase tracking-wider text-sky-800">
                    Step {i + 1}
                  </p>
                  <h3 className="mt-1.5 font-display text-xl font-semibold text-[var(--color-ink)]">
                    {step.title}
                  </h3>
                  <p className="relative mt-2.5 text-sm leading-relaxed text-slate-600">
                    {step.description}
                  </p>

                  {step.link ? (
                    <Link
                      href="/contact"
                      className={`relative mt-4 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-sky-800 underline-offset-4 hover:underline ${focusRing}`}
                    >
                      Contact the clinic
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  ) : null}
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        <p className="mt-10 max-w-3xl text-sm leading-relaxed text-slate-600">
          Steps may vary with the patient&rsquo;s concern. Whether a treatment is
          suitable is decided only after a clinical assessment by the doctor.
        </p>
      </div>
    </section>
  );
}