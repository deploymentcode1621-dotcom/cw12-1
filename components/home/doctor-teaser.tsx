"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  BadgeCheck,
  Building2,
  Clock,
  GraduationCap,
  LayoutGrid,
  MapPin,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";
import { DOCTOR } from "@/data/doctor";
import { TREATMENTS } from "@/data/treatments";

/**
 * Doctor information — factual bento layout, informational only.
 *
 * Follows the NMC ethical advertising guidelines (6 Oct 2026):
 *  - the doctor's photo is shown only as a plain identification photo
 *    (no text, badges or filters on the picture) because §9.2 bars
 *    photographs that work as self-advertisement. This is the clinic's
 *    decision — confirm it with the clinic's legal adviser, and do not reuse
 *    the photo in promotional places (hero, ads, social posts);
 *  - no "years of experience", patient counts, "most trusted", result claims
 *    or promotional quote (§8.1 ii, iii, vi, ix);
 *  - qualifications and registration are shown as factual details (§3.2
 *    Explanations III/IV, §9.1).
 *
 * Read from @/data/doctor: `name` and `credentials` only. `title`,
 * `experience` and `intro` are NOT used because they contain promotional
 * wording ("most trusted", "results that hold up", "24+ years").
 *
 * ACTIONS BEFORE PUBLISHING:
 *  1. Verify `DOCTOR.credentials` against the registration certificate.
 *     Or set FACTS.qualifications to override it.
 *  2. Fill FACTS.registration with the State Medical Council registration.
 *  3. Clinic must confirm FACTS.hours in writing.
 * Empty values are hidden automatically.
 */
const DOCTOR_PHOTO = "/images/dr.png";

const FACTS = {
  /** Optional override; leave empty to use DOCTOR.credentials. */
  qualifications: "",
  /** e.g. "Maharashtra Medical Council – Reg. No. 00000". */
  registration: "",
  /** Memberships only if documented (e.g. a society certificate). */
  memberships: [] as string[],
  practice: "Dr. Anand Patil Skin & Cosmetic Laser Clinic",
  location: "Latur, Maharashtra",
  /** Existing site values — pending clinic confirmation. */
  hours: "11:00 AM – 6:00 PM · Sunday closed",
};

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700";

function Tile({
  icon: Icon,
  label,
  className = "",
  children,
}: {
  icon: LucideIcon;
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-[var(--shadow-card)] ${className}`}
    >
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-700 transition-colors duration-300 group-hover:bg-sky-700 group-hover:text-white"
        >
          <Icon className="h-5 w-5" />
        </span>
        <p className="text-xs font-semibold uppercase tracking-wider text-sky-800">
          {label}
        </p>
      </div>
      <div className="mt-4 text-base font-medium leading-relaxed text-[var(--color-ink)]">
        {children}
      </div>
    </div>
  );
}

export function DoctorTeaser() {
  const reduce = !!useReducedMotion();

  const qualifications = FACTS.qualifications || DOCTOR.credentials || "";

  // Consultation areas come from the treatment categories already on the site.
  const areas = useMemo(
    () => Array.from(new Set(TREATMENTS.map((t) => String(t.category)))),
    []
  );

  const rise = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { y: 22 },
          whileInView: { y: 0 },
          viewport: { once: true, margin: "-60px" },
          transition: { duration: 0.6, delay, ease: "easeOut" as const },
        };

  return (
    <section
      aria-labelledby="doctor-heading"
      className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28"
    >
      {/* Faint static dot grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage: "radial-gradient(#dbe4ee 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage: "linear-gradient(to bottom, black 0%, transparent 50%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 50%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-start gap-14 lg:grid-cols-[5fr_6fr] lg:gap-16">
          {/* ------------------------ Photo composition ------------------------ */}
          <motion.div
            {...rise(0)}
            className="relative mx-auto w-full max-w-[450px] pl-8 pt-6 lg:sticky lg:top-28"
          >
            {/* Backdrop shapes (decorative, static) */}
            <div
              aria-hidden="true"
              className="absolute left-4 top-0 h-[70%] w-[72%] rounded-[2.5rem] bg-gradient-to-br from-sky-200 via-sky-100 to-teal-100"
            />
            <div
              aria-hidden="true"
              className="absolute right-[-14px] top-[42%] h-[34%] w-[40%] rounded-[2rem] opacity-70"
              style={{
                backgroundImage: "radial-gradient(#0369a1 1.5px, transparent 1.5px)",
                backgroundSize: "14px 14px",
              }}
            />
            <svg
              aria-hidden="true"
              focusable="false"
              viewBox="0 0 200 200"
              className="pointer-events-none absolute -right-6 -top-4 h-40 w-40"
              fill="none"
            >
              <circle
                cx="100"
                cy="100"
                r="90"
                stroke="#0EA5E9"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="190 600"
              />
              <path
                d="M30 40 C32 52 38 58 50 60 C38 62 32 68 30 80 C28 68 22 62 10 60 C22 58 28 52 30 40Z"
                fill="#0EA5E9"
              />
            </svg>

            {/* Vertical editorial label (decorative) */}
            <span
              aria-hidden="true"
              className="absolute left-0 top-[34%] select-none text-[11px] font-semibold uppercase tracking-[0.3em] text-sky-800"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              Dermatology Clinic &middot; Latur
            </span>

            {/* Photo — plain, nothing placed on top of it */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border-[6px] border-white bg-slate-100 shadow-[var(--shadow-lifted)]">
              <Image
                src={DOCTOR_PHOTO}
                alt="Dr. Anand Patil"
                fill
                sizes="(min-width: 1024px) 400px, 90vw"
                className="object-cover object-top"
              />
            </div>

            {/* Name plate — separate card below the photo, edge overlap only */}
            <div className="relative -mt-8 ml-8 rounded-2xl border border-slate-200 bg-white p-5 pl-7 shadow-[var(--shadow-lifted)]">
              <span
                aria-hidden="true"
                className="absolute inset-y-4 left-0 w-1.5 rounded-full bg-gradient-to-b from-sky-500 to-teal-500"
              />
              <h3 className="font-display text-2xl font-semibold leading-tight text-[var(--color-ink)]">
                {DOCTOR.name}
              </h3>
              {qualifications ? (
                <p className="mt-1 text-sm leading-snug text-slate-600">
                  {qualifications}
                </p>
              ) : null}
              {FACTS.registration ? (
                <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-sky-50 px-3.5 py-1.5 text-xs font-semibold text-sky-900">
                  <BadgeCheck className="h-4 w-4 text-sky-700" aria-hidden="true" />
                  {FACTS.registration}
                </p>
              ) : null}
            </div>
          </motion.div>

          {/* ------------------------ Bento details ------------------------ */}
          <motion.div {...rise(0.1)}>
            <p className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-sky-800">
              <Stethoscope className="h-3.5 w-3.5" aria-hidden="true" />
              Doctor Information
            </p>

            <h2
              id="doctor-heading"
              className="mt-5 font-display text-4xl font-semibold leading-[1.06] tracking-tight text-[var(--color-ink)] sm:text-5xl"
            >
              About the doctor<span className="text-sky-600">.</span>
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              {DOCTOR.name} consults at {FACTS.practice} in {FACTS.location}, for
              skin and hair concerns. Information about treatment options is
              given after a clinical assessment.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {qualifications ? (
                <Tile icon={GraduationCap} label="Qualifications">
                  {qualifications}
                </Tile>
              ) : null}

              <Tile icon={Building2} label="Practice">
                {FACTS.practice}
              </Tile>

              {FACTS.registration ? (
                <Tile icon={BadgeCheck} label="Registration" className="sm:col-span-2">
                  {FACTS.registration}
                  <span className="mt-1 block text-sm font-normal text-slate-600">
                    Can be checked with the State Medical Council or the NMC
                    register.
                  </span>
                </Tile>
              ) : null}

              {FACTS.memberships.length ? (
                <Tile icon={BadgeCheck} label="Memberships" className="sm:col-span-2">
                  {FACTS.memberships.join(", ")}
                </Tile>
              ) : null}

              {areas.length ? (
                <Tile icon={LayoutGrid} label="Consultation areas" className="sm:col-span-2">
                  <ul className="flex flex-wrap gap-2">
                    {areas.map((area) => (
                      <li
                        key={area}
                        className="rounded-full border border-sky-100 bg-sky-50 px-3.5 py-1.5 text-sm font-semibold text-sky-900"
                      >
                        {area}
                      </li>
                    ))}
                  </ul>
                </Tile>
              ) : null}

              {/* Hours: carried over from existing site; pending clinic confirmation */}
              <Tile icon={Clock} label="Clinic hours">
                {FACTS.hours}
              </Tile>

              <Tile icon={MapPin} label="Location">
                {FACTS.location}
              </Tile>
            </div>

            <Link
              href="/doctor"
              className={`group mt-8 inline-flex min-h-[52px] items-center gap-2 rounded-full bg-[var(--color-ink)] px-7 text-sm font-semibold text-white transition-colors hover:bg-sky-800 ${focusRing}`}
            >
              Doctor profile
              <ArrowUpRight
                className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}