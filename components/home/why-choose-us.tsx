"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Stethoscope, Microscope, ClipboardList, Sparkle } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";

/**
 * Clinic information section (factual only), rewritten per the NMC ethical
 * advertising guidelines of 6 Oct 2026: no superiority/comparative claims,
 * no years-of-experience or patient-count claims, no outcome claims.
 *
 * The export name is kept so existing imports keep working. Consider renaming
 * the file/component to ClinicInfo later.
 *
 * Every statement below must be CONFIRMED IN WRITING by the clinic
 * (equipment list, conditions seen) before publishing.
 */
const INFO = [
  {
    icon: Stethoscope,
    title: "Clinical Assessment",
    description:
      "Consultations begin with a clinical assessment of the patient's skin or hair concern.",
  },
  {
    icon: Microscope,
    title: "In-House Equipment",
    description:
      "Equipment available at the clinic includes diode laser, Q-switched laser and phototherapy systems.",
  },
  {
    icon: ClipboardList,
    title: "Medical Dermatology",
    description:
      "Consultations are available for skin conditions such as psoriasis and vitiligo.",
  },
  {
    icon: Sparkle,
    title: "Cosmetic Dermatology",
    description:
      "Consultations are available for cosmetic skin concerns such as pigmentation.",
  },
];

export function WhyChooseUs() {
  const reduce = useReducedMotion();

  return (
    <section className="py-24 sm:py-28" aria-labelledby="clinic-info-heading">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Clinic Information"
          title="Consultations and facilities at the clinic"
          description="Factual information about the consultations and in-house facilities available at Dr. Anand Patil Skin & Cosmetic Laser Clinic, Latur."
        />

        <ul className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {INFO.map((item, i) => (
            <motion.li
              key={item.title}
              {...(reduce
                ? {}
                : {
                    initial: { y: 24 },
                    whileInView: { y: 0 },
                    viewport: { once: true, margin: "-60px" },
                    transition: { duration: 0.5, delay: i * 0.08 },
                  })}
              className="group rounded-2xl border border-slate-100 p-7 transition-all duration-300 hover:border-transparent hover:shadow-[var(--shadow-card)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-bg-light)] text-[var(--color-secondary)] transition-colors duration-300 group-hover:bg-gradient-clinic group-hover:text-white">
                <item.icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-[var(--color-ink)]">
                {item.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[var(--color-muted)]">
                {item.description}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}