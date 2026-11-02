"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Code2, ArrowUpRight, Navigation } from "lucide-react";
import { SITE_CONFIG } from "@/data/site-config";
import { FOOTER_TREATMENT_LINKS } from "@/data/faqs";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/ui/social-icons";

/**
 * Footer — NMC-compliant redesign (single file)
 *
 * Compliance notes (NMC public notice, 06 Oct 2026):
 *  - Only factual, verifiable information: address, contact, hours, links.
 *  - No superlatives, success claims, offers, patient photos or testimonials
 *    are introduced by this component.
 *  - General-awareness disclaimer shown in the legal bar.
 *  - Keep SITE_CONFIG.description factual (avoid "trusted", "best", etc.).
 */

const COMPANY = "Codewinx IT Solutions";
const COMPANY_URL = "https://codewinxitsolution.com";

/** Clinic hours (India time). Keep in sync with the Contact page. */
const OPEN_MINUTES = 10 * 60; // 10:00 AM
const CLOSE_MINUTES = 21 * 60; // 9:00 PM
const WEEK = [
  { short: "Mon", open: true },
  { short: "Tue", open: true },
  { short: "Wed", open: true },
  { short: "Thu", open: true },
  { short: "Fri", open: true },
  { short: "Sat", open: true },
  { short: "Sun", open: false },
] as const;

const QUICK_LINKS = [
  { href: "/about-clinic", label: "About the clinic" },
  { href: "/doctor", label: "About Dr. Anand Patil" },
  { href: "/treatments", label: "All treatments" },
  { href: "/gallery", label: "Gallery" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

/* ── Live open / closed status in India time ────────────────────────── */
function useClinicStatus() {
  const [status, setStatus] = useState<{ dayIndex: number; open: boolean } | null>(null);

  useEffect(() => {
    const compute = () => {
      const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        weekday: "short",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      }).formatToParts(new Date());
      const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
      const dayIndex = WEEK.findIndex((d) => d.short === get("weekday"));
      const minutes = (Number(get("hour")) % 24) * 60 + Number(get("minute"));
      const open =
        dayIndex >= 0 &&
        WEEK[dayIndex].open &&
        minutes >= OPEN_MINUTES &&
        minutes < CLOSE_MINUTES;
      setStatus({ dayIndex, open });
    };
    compute();
    const id = setInterval(compute, 60_000);
    return () => clearInterval(id);
  }, []);

  return status;
}

/* ── Weekly hours: bars that grow once, today highlighted ───────────── */
function HoursChart() {
  const reduce = useReducedMotion();
  const status = useClinicStatus();

  const left = (OPEN_MINUTES / 1440) * 100;
  const width = ((CLOSE_MINUTES - OPEN_MINUTES) / 1440) * 100;

  return (
    <div>
      <div className="mb-4 flex items-center gap-2 text-sm" aria-live="polite">
        {status ? (
          <>
            <span className="relative flex h-2.5 w-2.5">
              {status.open && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
              )}
              <span
                className={`relative inline-flex h-2.5 w-2.5 rounded-full ${
                  status.open ? "bg-emerald-400" : "bg-slate-500"
                }`}
              />
            </span>
            <span className="font-medium text-white">
              {status.open ? "Open now, until 9:00 PM" : "Closed right now"}
            </span>
          </>
        ) : (
          <span className="h-5" />
        )}
      </div>

      <ul className="space-y-1.5">
        {WEEK.map((d, i) => {
          const isToday = status?.dayIndex === i;
          return (
            <li
              key={d.short}
              className={`flex items-center gap-3 rounded-lg px-2 py-1 text-xs transition-colors ${
                isToday ? "bg-white/10 text-white" : "text-white/55"
              }`}
            >
              <span className="w-8 font-medium">{d.short}</span>
              <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                {d.open && (
                  <motion.span
                    className="absolute inset-y-0 origin-left rounded-full bg-gradient-to-r from-sky-400 to-teal-300"
                    style={{ left: `${left}%`, width: `${width}%` }}
                    initial={{ scaleX: reduce ? 1 : 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1 + i * 0.09, ease: "easeOut" }}
                  />
                )}
              </span>
              <span className="w-[5.5rem] text-right tabular-nums">
                {d.open ? "10 AM – 9 PM" : "Closed"}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ── Codewinx credit + website copyright band ───────────────────────── */
function CodewinxCredit({ year }: { year: number }) {
  const reduce = useReducedMotion();

  return (
    <div className="relative overflow-hidden border-t border-white/10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.16),transparent_65%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-sky-400/70 to-transparent"
      />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 py-10 text-center">
        <p className="text-sm text-white/55">Website crafted with care by</p>

        <a
          href={COMPANY_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${COMPANY} website (opens in a new tab)`}
          className="group relative inline-flex overflow-hidden rounded-full p-[1.5px] transition-transform duration-300 hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400"
        >
          <span aria-hidden className="absolute inset-0 flex items-center justify-center">
            <motion.span
              className="block h-[26rem] w-[26rem] shrink-0"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0deg, transparent 220deg, #38bdf8 280deg, #2dd4bf 330deg, transparent 360deg)",
              }}
              animate={reduce ? undefined : { rotate: 360 }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            />
          </span>
          <span
            aria-hidden
            className="absolute inset-0 rounded-full border border-white/15 group-hover:border-sky-300/40"
          />
          <span className="relative flex items-center gap-3 rounded-full bg-[#0b1324] py-2.5 pl-2.5 pr-5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-teal-400 text-[#0b1324] shadow-lg shadow-sky-500/30">
              <Code2 aria-hidden className="h-5 w-5" strokeWidth={2.5} />
            </span>
            <motion.span
              className="bg-clip-text text-lg font-semibold tracking-tight text-transparent sm:text-xl"
              style={{
                backgroundImage:
                  "linear-gradient(90deg,#ffffff 0%,#7dd3fc 25%,#5eead4 50%,#7dd3fc 75%,#ffffff 100%)",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
              }}
              animate={reduce ? undefined : { backgroundPosition: ["0% 50%", "200% 50%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
              {COMPANY}
            </motion.span>
            <ArrowUpRight
              aria-hidden
              className="h-4 w-4 text-sky-300 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
        </a>

        <p className="max-w-xl text-xs leading-relaxed text-white/45">
          Website design, development and source code © {year} {COMPANY}. All rights
          reserved. Unauthorised copying or reuse is prohibited.
        </p>
      </div>
    </div>
  );
}

/* ── Footer ─────────────────────────────────────────────────────────── */
export function Footer() {
  const year = new Date().getFullYear();
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    SITE_CONFIG.address.full,
  )}`;

  const socials = [
    { href: SITE_CONFIG.social.facebook, label: "Facebook", Icon: FacebookIcon },
    { href: SITE_CONFIG.social.instagram, label: "Instagram", Icon: InstagramIcon },
    { href: SITE_CONFIG.social.youtube, label: "YouTube", Icon: YoutubeIcon },
  ];

  return (
    <footer className="relative isolate overflow-hidden bg-[var(--color-ink)] text-white">
      {/* background: faint grid, light pools, top hairline */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
      />
      <div aria-hidden className="absolute -left-40 top-20 -z-10 h-[26rem] w-[26rem] rounded-full bg-sky-500/15 blur-3xl" />
      <div aria-hidden className="absolute -right-40 top-[28rem] -z-10 h-[26rem] w-[26rem] rounded-full bg-teal-400/10 blur-3xl" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/60 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 pt-16">
        {/* ── Contact panel: one surface, three zones ── */}
        <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/[0.05] shadow-2xl shadow-black/30 backdrop-blur">
          {/* decorative rings echo the CTA section */}
          <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full border border-white/10" />
          <div aria-hidden className="pointer-events-none absolute -left-40 -top-40 h-[26rem] w-[26rem] rounded-full border border-white/5" />

          <div className="relative grid divide-y divide-white/10 lg:grid-cols-[1.5fr_1fr_1fr] lg:divide-x lg:divide-y-0">
            {/* Visit */}
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex gap-5 p-7 transition-colors hover:bg-white/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-sky-400 sm:p-9"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-teal-400 text-[#0b1324] shadow-lg shadow-sky-500/30">
                <MapPin aria-hidden className="h-6 w-6" />
              </span>
              <span>
                <span className="block text-sm text-white/55">Visit the clinic</span>
                <span className="mt-1 block text-lg font-medium leading-snug text-white">
                  {SITE_CONFIG.address.full}
                </span>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-sky-300">
                  <Navigation aria-hidden className="h-4 w-4" />
                  Get directions
                  <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </span>
            </a>

            {/* Call */}
            <div className="flex gap-5 p-7 sm:p-9">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-teal-400 text-[#0b1324] shadow-lg shadow-sky-500/30">
                <Phone aria-hidden className="h-6 w-6" />
              </span>
              <span>
                <span className="block text-sm text-white/55">Call the clinic</span>
                <a
                  href={`tel:${SITE_CONFIG.contact.phonePrimaryRaw}`}
                  className="mt-1 block text-lg font-medium text-white hover:text-sky-300"
                >
                  {SITE_CONFIG.contact.phonePrimary}
                </a>
                <a
                  href={`tel:${SITE_CONFIG.contact.phoneLandlineRaw}`}
                  className="mt-0.5 block text-base text-white/75 hover:text-sky-300"
                >
                  {SITE_CONFIG.contact.phoneLandline}
                </a>
              </span>
            </div>

            {/* Write */}
            <div className="flex gap-5 p-7 sm:p-9">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-teal-400 text-[#0b1324] shadow-lg shadow-sky-500/30">
                <Mail aria-hidden className="h-6 w-6" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm text-white/55">Write to us</span>
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="mt-1 block break-words text-base font-medium text-white hover:text-sky-300"
                >
                  {SITE_CONFIG.contact.email}
                </a>
              </span>
            </div>
          </div>
        </div>

        {/* ── Main columns ── */}
        <div className="grid grid-cols-1 gap-12 pb-4 pt-16 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1.1fr_1.2fr]">
          {/* Brand */}
          <div>
            <div className="mb-5 flex items-center gap-4">
              <div className="relative h-14 w-14 overflow-hidden rounded-xl bg-white p-1 shadow-md ring-4 ring-white/10">
                <Image
                  src="/images/logo.png"
                  alt="Dr. Anand Patil Skin Clinic Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="leading-tight">
                <p className="font-display text-xl font-bold tracking-tight text-white">
                  Dr. Anand Patil
                </p>
                <p className="text-sm text-white/60">Skin & Cosmetic Laser Clinic</p>
              </div>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-white/60">
              {SITE_CONFIG.description}
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 transition-all hover:-translate-y-0.5 hover:border-transparent hover:bg-gradient-to-br hover:from-sky-400 hover:to-teal-400 hover:text-[#0b1324] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <nav aria-label="Footer">
            <h3 className="font-display mb-5 text-base font-semibold text-white">Explore</h3>
            <ul className="space-y-3 text-sm">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group inline-flex items-center gap-2 text-white/70 transition-colors hover:text-white"
                  >
                    <span className="h-px w-0 bg-sky-400 transition-all duration-300 group-hover:w-4" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Treatments as chips */}
          <div>
            <h3 className="font-display mb-5 text-base font-semibold text-white">Treatments</h3>
            <ul className="flex flex-wrap gap-2">
              {FOOTER_TREATMENT_LINKS.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/treatments/${t.slug}`}
                    className="inline-block rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm text-white/80 transition-all hover:-translate-y-0.5 hover:border-sky-300/50 hover:bg-sky-400/15 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                  >
                    {t.shortName}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/treatments"
              className="group mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-sky-300"
            >
              See all treatments
              <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-display mb-5 flex items-center gap-2 text-base font-semibold text-white">
              <Clock aria-hidden className="h-4 w-4 text-sky-300" />
              Clinic hours
            </h3>
            <HoursChart />
          </div>
        </div>
      </div>

      {/* Oversized wordmark, faded into the page */}
      <div aria-hidden className="pointer-events-none mx-auto mt-6 max-w-7xl select-none overflow-hidden px-6">
        <p className="font-display bg-gradient-to-b from-white/[0.14] to-transparent bg-clip-text text-center text-[clamp(3rem,12.5vw,10.5rem)] font-bold leading-[0.85] tracking-tighter text-transparent">
          Dr. Anand Patil
        </p>
      </div>

      {/* Codewinx credit + website copyright */}
      <CodewinxCredit year={year} />

      {/* Clinic copyright, disclaimer and legal links */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-xs text-white/50 sm:flex-row">
          <div className="flex flex-col items-center gap-1.5 text-center sm:items-start sm:text-left">
            <p>
              © {year} {SITE_CONFIG.name}. All rights reserved.
            </p>
            <p className="max-w-xl text-white/40">
              Information on this website is for general awareness and does not replace a
              medical consultation. Outcomes differ from person to person.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}