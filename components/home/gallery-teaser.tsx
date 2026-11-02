"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { GALLERY_IMAGES } from "@/data/gallery";

/**
 * Clinic premises gallery — informational only.
 *
 * Follows the NMC ethical advertising guidelines (6 Oct 2026): this section
 * may show factual views of the premises and facilities (§8.3 i, §9.1) and
 * nothing else. It must NOT show patients, procedures on patients,
 * before-and-after images, awards, reviews or any caption that claims quality
 * or results (§6.1, §8.1 iii, v, ix).
 *
 * Export name kept so existing imports keep working.
 *
 * CHECK BEFORE PUBLISHING (data/gallery.ts):
 *  - every photo is the clinic's own (not a third-party/Google upload);
 *  - no photo shows a patient or any identifiable person;
 *  - no photo carries a third-party brand watermark or advertising signage
 *    (one photo has a faint watermark; another shows a phone-shop sign);
 *  - each `alt` is a plain description of what is visible (e.g. "Waiting
 *    area with seating"), with no words like "advanced", "best", "luxury".
 */

const SHOWN = 5;

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700";

export function GalleryTeaser() {
  const reduce = !!useReducedMotion();
  const images = GALLERY_IMAGES.slice(0, SHOWN);
  const total = GALLERY_IMAGES.length;

  const [open, setOpen] = useState<number | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => {
    setOpen(null);
    triggerRef.current?.focus();
  }, []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setOpen((i) =>
        i === null ? i : (i + dir + images.length) % images.length
      ),
    [images.length]
  );

  // Lightbox: keyboard support and scroll lock
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close, step]);

  const rise = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { y: 24 },
          whileInView: { y: 0 },
          viewport: { once: true, margin: "-60px" },
          transition: { duration: 0.55, delay, ease: "easeOut" as const },
        };

  const current = open === null ? null : images[open];

  return (
    <section
      aria-labelledby="gallery-heading"
      className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28"
    >
      {/* Faint static dot grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage: "radial-gradient(#dbe4ee 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage: "linear-gradient(to bottom, black 0%, transparent 45%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 45%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* ------------------------ Heading ------------------------ */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-sky-800">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-teal-500" />
              Clinic Premises
            </p>
            <h2
              id="gallery-heading"
              className="mt-5 font-display text-4xl font-semibold leading-[1.06] tracking-tight text-[var(--color-ink)] sm:text-5xl lg:text-6xl"
            >
              Photographs of the clinic
              <span className="text-sky-600">.</span>
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">
              Views of the premises and facilities at Dr. Anand Patil Skin &amp;
              Cosmetic Laser Clinic, Latur.
            </p>
          </div>

          <Link
            href="/gallery"
            className={`group inline-flex min-h-[52px] shrink-0 items-center gap-2 self-start rounded-full bg-[var(--color-ink)] px-7 text-sm font-semibold text-white transition-colors hover:bg-sky-800 md:self-auto ${focusRing}`}
          >
            View full gallery
            <ArrowUpRight
              className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>

        {/* ------------------------ Mosaic ------------------------ */}
        <ul className="relative mt-12 grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[190px] sm:gap-4 md:grid-cols-4 lg:auto-rows-[215px]">
          {images.map((img, i) => (
            <motion.li
              key={img.id}
              {...rise(i * 0.07)}
              className={i === 0 ? "col-span-2 row-span-2" : ""}
            >
              {/* Offset outline frame behind the large photo (decorative) */}
              {i === 0 ? (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-3 -top-3 hidden h-[calc(2*215px+1rem)] w-[calc(50%-0.5rem)] rounded-[2rem] border border-sky-200 lg:block"
                />
              ) : null}

              <button
                type="button"
                onClick={(e) => {
                  triggerRef.current = e.currentTarget;
                  setOpen(i);
                }}
                aria-label={`View photograph ${i + 1} of ${images.length} larger: ${img.alt}`}
                className={`group relative block h-full w-full overflow-hidden rounded-3xl border-4 border-white bg-slate-100 shadow-[var(--shadow-card)] transition-shadow duration-300 hover:shadow-[var(--shadow-lifted)] ${focusRing}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-slate-900/45 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                <span
                  aria-hidden="true"
                  className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-800 opacity-0 shadow-md transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  <Expand className="h-4 w-4" />
                </span>
                <span
                  aria-hidden="true"
                  className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold tabular-nums text-slate-700 shadow-sm"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </button>
            </motion.li>
          ))}
        </ul>

        <p className="mt-6 text-sm text-slate-600">
          Showing {images.length} of {total} photographs. Select a photograph to
          view it larger.
        </p>
      </div>

      {/* ------------------------ Lightbox ------------------------ */}
      {current ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photograph viewer"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 p-4 sm:p-8"
          onClick={close}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Close photograph viewer"
            className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-8 sm:top-8"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Previous photograph"
            className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:left-6"
          >
            <ChevronLeft className="h-6 w-6" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Next photograph"
            className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-6"
          >
            <ChevronRight className="h-6 w-6" aria-hidden="true" />
          </button>

          <figure
            className="relative flex max-h-full w-full max-w-5xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[70vh] w-full overflow-hidden rounded-2xl bg-slate-900">
              <Image
                key={current.id}
                src={current.src}
                alt={current.alt}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>
            <figcaption className="mt-4 text-center text-sm text-slate-200">
              <span className="tabular-nums">
                {(open ?? 0) + 1} / {images.length}
              </span>
              {" · "}
              {current.alt}
            </figcaption>
          </figure>
        </div>
      ) : null}
    </section>
  );
}