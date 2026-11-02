"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  ClipboardList,
  LayoutGrid,
  Scissors,
  Sparkles,
  Stethoscope,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { TREATMENTS } from "@/data/treatments";

/**
 * Treatments index — light, colour-coded card mosaic (informational only).
 *
 * Follows the NMC ethical advertising guidelines (6 Oct 2026):
 *  - no photographs of patients/models undergoing procedures, no
 *    before-and-after style imagery (§6.1, §8.1 v);
 *  - no outcome or superiority wording (§8.1 iii, vi, ix);
 *  - no "featured" ordering that promotes some treatments over others.
 *
 * Only `slug`, `name`, `category` are shown. The `tagline` field in
 * @/data/treatments contains outcome claims and is intentionally NOT rendered
 * until the clinic and its adviser have rewritten and approved it.
 */

const ALL = "All";
const ALL_LIMIT = 12;

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700";

/** One soft colour per category so categories are easy to tell apart. */
const TONES = [
  { card: "bg-sky-50 border-sky-100 hover:border-sky-300", label: "text-sky-800", icon: "text-sky-700", mark: "text-sky-200/70" },
  { card: "bg-teal-50 border-teal-100 hover:border-teal-300", label: "text-teal-800", icon: "text-teal-700", mark: "text-teal-200/70" },
  { card: "bg-indigo-50 border-indigo-100 hover:border-indigo-300", label: "text-indigo-800", icon: "text-indigo-700", mark: "text-indigo-200/70" },
  { card: "bg-rose-50 border-rose-100 hover:border-rose-300", label: "text-rose-800", icon: "text-rose-700", mark: "text-rose-200/70" },
  { card: "bg-amber-50 border-amber-100 hover:border-amber-300", label: "text-amber-900", icon: "text-amber-700", mark: "text-amber-200/70" },
  { card: "bg-violet-50 border-violet-100 hover:border-violet-300", label: "text-violet-800", icon: "text-violet-700", mark: "text-violet-200/70" },
];

/** Decorative icon per category (keyword match, safe default). */
function iconFor(category: string): LucideIcon {
  const c = category.toLowerCase();
  if (c.includes("medical")) return Stethoscope;
  if (c.includes("cosmetic")) return Sparkles;
  if (c.includes("hair")) return Scissors;
  if (c.includes("laser")) return Zap;
  if (c.includes("procedure") || c.includes("surg")) return ClipboardList;
  return Sparkles;
}

export function TreatmentsShowcase() {
  const reduce = !!useReducedMotion();
  const [active, setActive] = useState<string>(ALL);

  const categories = useMemo(
    () => Array.from(new Set(TREATMENTS.map((t) => String(t.category)))),
    []
  );
  const tabs = useMemo(() => [ALL, ...categories], [categories]);

  const toneOf = (category: string) =>
    TONES[Math.max(0, categories.indexOf(category)) % TONES.length];

  const filtered = useMemo(
    () =>
      active === ALL
        ? TREATMENTS
        : TREATMENTS.filter((t) => String(t.category) === active),
    [active]
  );
  const visible = active === ALL ? filtered.slice(0, ALL_LIMIT) : filtered;

  return (
    <section
      aria-labelledby="treatments-heading"
      className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28"
    >
      {/* Faint static dot grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(#dbe4ee 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage:
            "linear-gradient(to bottom, black 0%, transparent 55%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, transparent 55%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* ------------------------ Heading row ------------------------ */}
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-16">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-sky-800">
              <LayoutGrid className="h-3.5 w-3.5" aria-hidden="true" />
              Treatment Information
            </p>
            <h2
              id="treatments-heading"
              className="mt-5 font-display text-4xl font-semibold leading-[1.06] tracking-tight text-[var(--color-ink)] sm:text-5xl lg:text-6xl"
            >
              Treatments &amp; procedures
              <span className="text-sky-600">.</span>
            </h2>
          </div>

          <div className="lg:pb-2">
            <p className="text-base leading-relaxed text-slate-600">
              Information about the treatments and procedures offered at the
              clinic. Whether a treatment is suitable is decided only after a
              clinical assessment by the doctor.
            </p>
            <Link
              href="/treatments"
              className={`group mt-5 inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[var(--color-ink)] px-6 text-sm font-semibold text-white transition-colors hover:bg-sky-800 ${focusRing}`}
            >
              View all treatments
              <ArrowUpRight
                className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>

        {/* ------------------------ Segmented tabs ------------------------ */}
        <div className="-mx-6 mt-12 overflow-x-auto px-6 pb-2 lg:mx-0 lg:px-0">
          <div
            role="group"
            aria-label="Filter treatments by category"
            className="inline-flex min-w-max gap-1 rounded-full border border-slate-200 bg-slate-100/80 p-1.5"
          >
            {tabs.map((cat) => {
              const selected = cat === active;
              return (
                <button
                  key={cat}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setActive(cat)}
                  className={`relative whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${focusRing} ${
                    selected
                      ? "text-[var(--color-ink)]"
                      : "text-slate-600 hover:text-[var(--color-ink)]"
                  }`}
                >
                  {selected ? (
                    <motion.span
                      layoutId="treatment-tab"
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full bg-white shadow-sm ring-1 ring-slate-200"
                      transition={
                        reduce
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 400, damping: 34 }
                      }
                    />
                  ) : null}
                  <span className="relative">{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        <p className="mt-5 text-sm text-slate-600" aria-live="polite">
          Showing {visible.length} of {filtered.length}{" "}
          {active === ALL ? "treatments" : `in ${active}`}
        </p>

        {/* ------------------------ Card mosaic ------------------------ */}
        <ul
          key={active}
          className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {visible.map((treatment, i) => {
            const category = String(treatment.category);
            const tone = toneOf(category);
            const Icon = iconFor(category);
            return (
              <motion.li
                key={treatment.slug}
                {...(reduce
                  ? {}
                  : {
                      initial: { y: 18 },
                      animate: { y: 0 },
                      transition: {
                        duration: 0.45,
                        delay: Math.min(i, 10) * 0.04,
                        ease: "easeOut" as const,
                      },
                    })}
              >
                <Link
                  href={`/treatments/${treatment.slug}`}
                  className={`group relative flex min-h-[190px] h-full flex-col justify-between overflow-hidden rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lifted)] ${tone.card} ${focusRing}`}
                >
                  {/* Large watermark icon */}
                  <Icon
                    aria-hidden="true"
                    strokeWidth={1.25}
                    className={`pointer-events-none absolute -bottom-6 -right-6 h-36 w-36 rotate-[-12deg] transition-transform duration-500 group-hover:rotate-0 group-hover:scale-110 ${tone.mark}`}
                  />

                  <div className="relative flex items-start justify-between">
                    <span
                      aria-hidden="true"
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-sm ${tone.icon}`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span
                      aria-hidden="true"
                      className="font-display text-sm font-semibold tabular-nums text-slate-500"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="relative mt-8">
                    <p className={`text-[11px] font-semibold uppercase tracking-wider ${tone.label}`}>
                      {category}
                    </p>
                    <p className="mt-1.5 flex items-end justify-between gap-3">
                      <span className="text-lg font-semibold leading-snug text-slate-900">
                        {treatment.name}
                        <span className="sr-only"> — read information</span>
                      </span>
                      <span
                        aria-hidden="true"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-slate-700 opacity-0 shadow-sm transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </p>
                  </div>
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}