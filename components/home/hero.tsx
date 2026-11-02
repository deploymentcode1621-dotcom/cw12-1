"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight, Clock, MapPin, Phone } from "lucide-react";
import { SITE_CONFIG } from "@/data/site-config";

/**
 * Hero — "live" composition in the logo's navy / teal / cyan palette.
 * Gentle ambient motion with pointer parallax; all motion is disabled when
 * the visitor prefers reduced motion.
 *
 * Content is informational only (NMC ethical advertising guidelines,
 * 6 Oct 2026): no testimonials, ratings, statistics, superiority or outcome
 * claims, offers, patient images or doctor photograph.
 *
 * ACTIONS BEFORE PUBLISHING (see CLINIC_FACTS below):
 *  1. Set LOGO_SRC to your logo file in /public.
 *  2. Fill `qualifications` and `registration` ONLY with details verified
 *     against the doctor's registration documents. Empty = not shown.
 *  3. Fill `address` with the confirmed full address. Empty = city only.
 *  4. Have the clinic confirm `hours` and `closedDay` in writing.
 *  5. Record written clinic approval of the hero text, including STEPS.
 */
const LOGO_SRC = "/images/logo.png";

const CLINIC_FACTS = {
  doctorName: "Dr. Anand Patil",
  /** Verified, recognised qualification text exactly as on the registration certificate. */
  qualifications: "",
  /** Verified State Medical Council registration, e.g. "Maharashtra Medical Council – Reg. No. 00000". */
  registration: "",
  /** Confirmed full address of the clinic. */
  address: "",
  /** Existing site values — pending clinic confirmation. */
  hours: "11:00 AM – 6:00 PM",
  closedDay: "Sunday closed",
};

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7FE0EA]";

const STEPS = [
  { title: "Enquiry", copy: "Contact the clinic to ask about an appointment." },
  { title: "Clinical assessment", copy: "Your concern is examined by the doctor." },
  { title: "Discussion", copy: "Treatment options are explained to you." },
];

const HEADLINE: { word: string; accent?: boolean }[] = [
  { word: "Consultation" },
  { word: "for" },
  { word: "skin", accent: true },
  { word: "&", accent: true },
  { word: "hair", accent: true },
  { word: "concerns." },
];

/* ---------- small motion helpers ---------- */

function Layer({
  children,
  className,
  depth,
  sx,
  sy,
}: {
  children: React.ReactNode;
  className?: string;
  depth: number;
  sx: MotionValue<number>;
  sy: MotionValue<number>;
}) {
  const x = useTransform(sx, (v) => v * depth);
  const y = useTransform(sy, (v) => v * depth);
  return (
    <motion.div style={{ x, y }} className={className}>
      {children}
    </motion.div>
  );
}

function Float({
  children,
  className,
  amp = 8,
  duration = 6,
  delay = 0,
  reduce,
}: {
  children: React.ReactNode;
  className?: string;
  amp?: number;
  duration?: number;
  delay?: number;
  reduce: boolean;
}) {
  return (
    <motion.div
      className={className}
      animate={reduce ? undefined : { y: [-amp, amp] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

function Sparkle({
  className,
  size,
  delay,
  reduce,
}: {
  className: string;
  size: number;
  delay: number;
  reduce: boolean;
}) {
  return (
    <motion.svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 40 40"
      width={size}
      height={size}
      className={className}
      animate={
        reduce
          ? undefined
          : { scale: [0.7, 1.15, 0.7], opacity: [0.5, 1, 0.5], rotate: [0, 18, 0] }
      }
      transition={{ duration: 3.4, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <path
        d="M20 0 C21 12 28 19 40 20 C28 21 21 28 20 40 C19 28 12 21 0 20 C12 19 19 12 20 0Z"
        fill="#7FE0EA"
      />
    </motion.svg>
  );
}

function Aurora({
  className,
  dx,
  dy,
  duration,
  reduce,
}: {
  className: string;
  dx: number;
  dy: number;
  duration: number;
  reduce: boolean;
}) {
  return (
    <motion.div
      aria-hidden="true"
      className={`absolute rounded-full blur-3xl ${className}`}
      animate={
        reduce ? undefined : { x: [0, dx], y: [0, dy], scale: [1, 1.18] }
      }
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }}
    />
  );
}

/* ---------- Hero ---------- */

export function Hero() {
  const prefersReduced = useReducedMotion();
  const reduce = !!prefersReduced;

  // Pointer parallax (-1 … 1), smoothed with a spring.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 55, damping: 18 });
  const sy = useSpring(my, { stiffness: 55, damping: 18 });

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };
  const onPointerLeave = () => {
    mx.set(0);
    my.set(0);
  };

  // One-time entrance. Opacity is never animated, so content is always visible.
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { y: 18 },
          animate: { y: 0 },
          transition: { duration: 0.7, delay, ease: "easeOut" as const },
        };

  const { doctorName, qualifications, registration, address, hours, closedDay } =
    CLINIC_FACTS;

  return (
    <section
      aria-labelledby="hero-heading"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative overflow-hidden bg-[#06182E] pt-[var(--header-height)] text-white"
    >
      {/* Section-wide drifting light */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Aurora
          reduce={reduce}
          dx={90}
          dy={50}
          duration={14}
          className="-left-40 top-10 h-[520px] w-[520px] bg-[#0A8F8A]/25"
        />
        <Aurora
          reduce={reduce}
          dx={-80}
          dy={-40}
          duration={17}
          className="-right-32 bottom-0 h-[560px] w-[560px] bg-[#0A6FB8]/30"
        />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="grid items-center gap-14 lg:grid-cols-[11fr_9fr] lg:gap-10">
          {/* ========================= Text ========================= */}
          <div className="max-w-[680px]">
            <motion.p
              {...rise(0)}
              className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#7FE0EA]"
            >
              <span aria-hidden="true" className="h-px w-8 bg-[#7FE0EA]" />
              Dermatology Clinic &middot; Latur
            </motion.p>

            <h1
              id="hero-heading"
              className="mt-6 font-display font-semibold tracking-tight"
              style={{
                fontSize: "clamp(2.5rem, 1.1rem + 5vw, 5.25rem)",
                lineHeight: 1.03,
              }}
            >
              {HEADLINE.map(({ word, accent }, i) => (
                <motion.span
                  key={`${word}-${i}`}
                  {...rise(0.08 + i * 0.07)}
                  className={`mr-[0.22em] inline-block ${
                    accent ? "text-[#7FE0EA]" : ""
                  }`}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              {...rise(0.5)}
              className="mt-7 max-w-[34rem] text-base leading-relaxed text-[#C9D8E6] sm:text-lg"
            >
              Consultations for skin and hair concerns, with information about
              treatment options following a clinical assessment.
            </motion.p>

            {/* Doctor identification — factual details, shown only when verified */}
            <motion.div
              {...rise(0.56)}
              className="mt-7 border-l-2 border-[#5FD6D0] pl-4"
            >
              <p className="text-lg font-semibold leading-tight">{doctorName}</p>
              {qualifications ? (
                <p className="mt-1 text-sm text-[#C9D8E6]">{qualifications}</p>
              ) : null}
              {registration ? (
                <p className="mt-0.5 text-sm text-[#C9D8E6]">{registration}</p>
              ) : null}
            </motion.div>

            <motion.div
              {...rise(0.62)}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Link
                href="/contact"
                className={`group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-[#5FD6D0] px-8 text-base font-semibold text-[#06182E] transition-colors hover:bg-[#8CE6E1] ${focusRing}`}
              >
                Appointment Enquiry
                <ArrowUpRight
                  className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
              <a
                href={`tel:${SITE_CONFIG.contact.phonePrimaryRaw}`}
                className={`inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-white/40 px-8 text-base font-semibold text-white transition-colors hover:border-white hover:bg-white/10 ${focusRing}`}
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Contact Clinic
                <span className="sr-only"> by phone</span>
              </a>
            </motion.div>
          </div>

          {/* ========================= Orb ========================= */}
          <div className="relative mx-auto aspect-square w-full max-w-[480px]">
            {/* Aurora behind the logo */}
            <Layer sx={sx} sy={sy} depth={10} className="absolute inset-0">
              <Aurora
                reduce={reduce}
                dx={30}
                dy={-24}
                duration={8}
                className="inset-[8%] bg-[#0A8F8A]/45"
              />
              <Aurora
                reduce={reduce}
                dx={-34}
                dy={28}
                duration={10}
                className="inset-[18%] bg-[#00B4D0]/30"
              />
            </Layer>

            {/* Rings and crescent arcs */}
            <Layer sx={sx} sy={sy} depth={16} className="absolute inset-0">
              <svg
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 500 500"
                className="absolute inset-0 h-full w-full"
                fill="none"
              >
                <defs>
                  <linearGradient id="hero-arc-a" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#00B4D0" />
                    <stop offset="100%" stopColor="#0A6FB8" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="hero-arc-b" x1="1" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5FD6D0" />
                    <stop offset="100%" stopColor="#0A8F8A" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <circle cx="250" cy="250" r="246" stroke="#7FE0EA" strokeOpacity="0.10" />
                <circle cx="250" cy="250" r="206" stroke="#7FE0EA" strokeOpacity="0.08" />
              </svg>

              <motion.svg
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 500 500"
                className="absolute inset-0 h-full w-full"
                fill="none"
                style={{ transformOrigin: "50% 50%" }}
                animate={reduce ? undefined : { rotate: 360 }}
                transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
              >
                <circle
                  cx="250"
                  cy="250"
                  r="236"
                  stroke="url(#hero-arc-a)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="620 900"
                />
              </motion.svg>

              <motion.svg
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 500 500"
                className="absolute inset-0 h-full w-full"
                fill="none"
                style={{ transformOrigin: "50% 50%" }}
                animate={reduce ? undefined : { rotate: -360 }}
                transition={{ duration: 95, repeat: Infinity, ease: "linear" }}
              >
                <circle
                  cx="250"
                  cy="250"
                  r="206"
                  stroke="url(#hero-arc-b)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="380 920"
                />
              </motion.svg>
            </Layer>

            {/* Logo disc */}
            <Layer sx={sx} sy={sy} depth={28} className="absolute inset-[20%]">
              <Float reduce={reduce} amp={8} duration={6} className="h-full w-full">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-white p-[9%] shadow-[0_0_90px_-10px_rgba(95,214,208,0.6)]">
                  <Image
                    src={LOGO_SRC}
                    alt="Dr. Anand Patil Skin & Cosmetic Laser Clinic logo"
                    width={400}
                    height={400}
                    priority
                    sizes="(min-width: 1024px) 220px, 180px"
                    className="h-full w-full object-contain"
                  />
                </div>
              </Float>
            </Layer>

            {/* Sparkles (echo the logo) */}
            <Sparkle
              reduce={reduce}
              size={34}
              delay={0}
              className="absolute right-[10%] top-[12%]"
            />
            <Sparkle
              reduce={reduce}
              size={20}
              delay={1.1}
              className="absolute right-[3%] top-[28%]"
            />
            <Sparkle
              reduce={reduce}
              size={24}
              delay={2}
              className="absolute bottom-[26%] left-[6%]"
            />

            {/* Factual info chips */}
            <Layer sx={sx} sy={sy} depth={44} className="absolute inset-0">
              {/* Hours — carried over from existing site; pending clinic confirmation */}
              <Float
                reduce={reduce}
                amp={6}
                duration={5}
                delay={0.4}
                className="absolute bottom-[2%] left-0"
              >
                <div className="flex items-center gap-3 rounded-2xl border border-[#1F4A73] bg-[#0D2A4A] px-4 py-3 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.7)]">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0B7F7B]">
                    <Clock className="h-4 w-4 text-white" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[#9FB6CC]">
                      Clinic hours
                    </p>
                    <p className="text-sm font-semibold leading-tight">{hours}</p>
                    <p className="text-xs text-[#C9D8E6]">{closedDay}</p>
                  </div>
                </div>
              </Float>

              <Float
                reduce={reduce}
                amp={6}
                duration={5.6}
                delay={1.2}
                className="absolute right-0 top-[44%]"
              >
                <div className="flex max-w-[250px] items-center gap-3 rounded-2xl border border-[#1F4A73] bg-[#0D2A4A] px-4 py-3 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.7)]">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0A6FB8]">
                    <MapPin className="h-4 w-4 text-white" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[#9FB6CC]">
                      {address ? "Address" : "Location"}
                    </p>
                    <p className="text-sm font-semibold leading-tight">
                      {address || "Latur, Maharashtra"}
                    </p>
                  </div>
                </div>
              </Float>
            </Layer>
          </div>
        </div>

        {/* ===================== Consultation steps ===================== */}
        <div className="relative mt-14 lg:mt-16">
          <motion.div
            aria-hidden="true"
            className="absolute left-0 right-0 top-0 h-px origin-left bg-gradient-to-r from-[#5FD6D0] via-[#5FD6D0]/40 to-transparent"
            initial={reduce ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.3, delay: 0.6, ease: "easeOut" }}
          />
          <p className="pt-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#7FE0EA]">
            How a consultation works
          </p>
          <ol className="mt-5 grid gap-6 sm:grid-cols-3 sm:gap-8">
            {STEPS.map((step, i) => (
              <motion.li
                key={step.title}
                {...rise(0.8 + i * 0.1)}
                className="flex gap-4"
              >
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#5FD6D0]/60 text-sm font-semibold text-[#7FE0EA]"
                >
                  {i + 1}
                </span>
                <div>
                  <p className="text-base font-semibold">{step.title}</p>
                  <p className="mt-1 text-sm leading-snug text-[#C9D8E6]">
                    {step.copy}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}