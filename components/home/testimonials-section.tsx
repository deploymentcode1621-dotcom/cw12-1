import Link from "next/link";
import {
  Stethoscope,
  ClipboardList,
  MessageSquareText,
  CalendarCheck,
  ShieldCheck,
  Lock,
  BookOpenCheck,
  FileText,
  CalendarPlus,
  Info,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";

/**
 * NMC-compliant replacement for the "Patient Stories" section.
 *
 * Why: NMC public notice (06 Oct 2026) restricts patient testimonials,
 * before/after images, outcome claims and solicitation. This section shows
 * only factual, verifiable information about HOW the clinic works.
 *
 * Before publishing: the clinic / Dr. Patil must confirm every statement
 * below is true for the clinic, and record written approval (see checklist).
 */

const journey = [
  {
    icon: Stethoscope,
    title: "Consultation and history",
    text: "The doctor listens to your concern, asks about your medical history, medicines and lifestyle, and examines your skin or hair.",
  },
  {
    icon: ClipboardList,
    title: "Investigations, if needed",
    text: "Tests are advised only when they are medically relevant to your condition, with the reason explained to you.",
  },
  {
    icon: MessageSquareText,
    title: "Your plan, explained",
    text: "Treatment options, expected course, possible risks, alternatives and charges are explained before you decide anything.",
  },
  {
    icon: CalendarCheck,
    title: "Review and follow-up",
    text: "Progress is reviewed at follow-up visits and the plan is adjusted as your condition needs.",
  },
];

const commitments = [
  {
    icon: Lock,
    title: "Your privacy is protected",
    text: "Your records and personal details are kept confidential. Photos or videos are never used for publicity.",
  },
  {
    icon: ShieldCheck,
    title: "Clinic hygiene practices",
    // CONFIRM WITH CLINIC before publishing
    text: "Instruments and procedure areas are cleaned and prepared following standard clinical practice.",
  },
  {
    icon: FileText,
    title: "Informed consent",
    text: "Procedures are carried out only after you understand them and have agreed to go ahead.",
  },
  {
    icon: BookOpenCheck,
    title: "Information you can rely on",
    text: "Our articles are for general health awareness and are not a substitute for a medical consultation.",
  },
];

export function TestimonialsSection() {
  return (
    <section
      id="our-approach"
      className="relative overflow-hidden py-24 sm:py-28 bg-[var(--color-bg-light)]"
    >
      {/* soft background shapes */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full bg-sky-200/40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-teal-200/40 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Our Approach"
          title="Care that starts with a proper diagnosis"
          description="Every visit begins with a consultation. Here is how your care is planned, explained and followed up at the clinic."
        />

        {/* Main split: statement + journey */}
        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          {/* Statement panel */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-600 via-sky-600 to-teal-500 p-8 text-white shadow-xl shadow-sky-500/20 sm:p-10 lg:col-span-2">
            <div
              aria-hidden
              className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10"
            />
            <div
              aria-hidden
              className="absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-white/10"
            />
            <div className="relative flex h-full flex-col">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/30">
                <Stethoscope className="h-6 w-6" aria-hidden />
              </span>
              <h3 className="mt-6 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                Understand the cause first, then plan the treatment.
              </h3>
              <p className="mt-4 max-w-md text-base leading-relaxed text-white/85">
                Skin, hair and cosmetic concerns can have different causes in
                different people. A careful examination helps the doctor
                advise what is right for you, including when no procedure is
                needed.
              </p>

              <div className="mt-auto pt-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-sky-700 shadow-lg transition hover:bg-sky-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-sky-600"
                >
                  <CalendarPlus className="h-4 w-4" aria-hidden />
                  Book a consultation
                </Link>
              </div>
            </div>
          </div>

          {/* Journey timeline (a real sequence, so numbering is meaningful) */}
          <ol className="relative space-y-5 lg:col-span-3">
            <div
              aria-hidden
              className="absolute left-[27px] top-6 bottom-6 hidden w-px bg-gradient-to-b from-sky-300 via-teal-300 to-transparent sm:block"
            />
            {journey.map((step, i) => {
              const Icon = step.icon;
              return (
                <li
                  key={step.title}
                  className="relative flex gap-5 rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm sm:p-6"
                >
                  <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-teal-500 text-white shadow-md shadow-sky-500/25">
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-sky-600">
                      Step {i + 1}
                    </p>
                    <h3 className="mt-0.5 text-lg font-semibold text-slate-900">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-slate-600">
                      {step.text}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Commitments */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {commitments.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200/70 bg-white/80 p-6 backdrop-blur"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-600 ring-1 ring-sky-100">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-base font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <div className="mx-auto mt-10 flex max-w-3xl items-start gap-3 rounded-2xl border border-sky-100 bg-white/70 px-5 py-4 text-sm leading-relaxed text-slate-600">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" aria-hidden />
          <p>
            The information on this website is for general awareness only and
            does not replace a consultation with a doctor. Every patient is
            different, and the advice and course of treatment depend on an
            individual examination.
          </p>
        </div>
      </div>
    </section>
  );
}