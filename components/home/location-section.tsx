"use client";

import { useEffect, useState } from "react";
import {
  MapPin,
  Navigation,
  Copy,
  Check,
  Phone,
  Car,
  Bike,
  Footprints,
  Bus,
  Map as MapIcon,
  Satellite,
  ExternalLink,
  type LucideIcon,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";

/* -------------------------------------------------------------------------- */
/*  CONFIG - verify every value with the clinic before publishing             */
/* -------------------------------------------------------------------------- */
const CLINIC_NAME = "Dr. Anand Patil Skin & Cosmetic Laser Clinic";
const ADDRESS_LINES = [
  "Opp. Bus Stand, Latur Main Road",
  "Ganj Golai, Latur - 413512",
  "Maharashtra, India",
];
const ADDRESS_ONE_LINE =
  "Opp. Bus Stand, Latur Main Road, Ganj Golai, Latur - 413512, Maharashtra, India";
const CLINIC_PHONE = "+91XXXXXXXXXX"; // TODO: replace with the real number

// CONFIRM: landmarks visible near the pin on the map. Edit to match reality.
const LANDMARKS = [
  { name: "Latur ST Bus Stand", note: "Clinic is opposite" },
  { name: "Latur Head Post Office", note: "Nearby" },
  { name: "Gandhi Market Road", note: "Nearby" },
  { name: "Hanuman Chowk", note: "Nearby" },
];

type Mode = { id: string; label: string; icon: LucideIcon };
const MODES: Mode[] = [
  { id: "driving", label: "Car", icon: Car },
  { id: "two-wheeler", label: "Bike", icon: Bike },
  { id: "walking", label: "Walk", icon: Footprints },
  { id: "transit", label: "Bus", icon: Bus },
];

/* -------------------------------------------------------------------------- */
/*  SECTION                                                                   */
/* -------------------------------------------------------------------------- */
export function LocationSection() {
  const [mode, setMode] = useState<string>("driving");
  const [view, setView] = useState<"map" | "satellite">("map");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const q = encodeURIComponent(ADDRESS_ONE_LINE);
  const embedSrc = `https://www.google.com/maps?q=${q}&z=17&t=${
    view === "map" ? "m" : "k"
  }&output=embed`;
  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${q}&travelmode=${mode}`;
  const openHref = `https://www.google.com/maps/search/?api=1&query=${q}`;

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(ADDRESS_ONE_LINE);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section
      id="location"
      className="relative overflow-hidden py-24 sm:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-40 h-96 w-96 rounded-full bg-sky-100/70 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-teal-100/60 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Find Us"
          title="Visit the clinic in Ganj Golai, Latur"
          description="Opposite the Latur bus stand on Latur Main Road. Choose how you are travelling and we will open the route for you."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          {/* ------------------------- Info panel ------------------------- */}
          <div className="order-2 flex flex-col gap-5 lg:order-1 lg:col-span-5">
            {/* Address card */}
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-lg shadow-sky-500/5 sm:p-7">
              <div className="flex items-start gap-4">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-teal-500 text-white shadow-md shadow-sky-500/25">
                  <MapPin className="h-6 w-6" aria-hidden />
                </span>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {CLINIC_NAME}
                  </h3>
                  <address className="mt-2 not-italic text-[15px] leading-relaxed text-slate-600">
                    {ADDRESS_LINES.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={copyAddress}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-sky-200 hover:text-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-teal-600" aria-hidden />
                  ) : (
                    <Copy className="h-4 w-4" aria-hidden />
                  )}
                  {copied ? "Address copied" : "Copy address"}
                </button>
                <a
                  href={`tel:${CLINIC_PHONE}`}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-sky-200 hover:text-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2"
                >
                  <Phone className="h-4 w-4" aria-hidden />
                  Call the clinic
                </a>
              </div>
              <p className="sr-only" role="status" aria-live="polite">
                {copied ? "Address copied to clipboard" : ""}
              </p>
            </div>

            {/* Route planner */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-600 via-sky-600 to-teal-500 p-6 text-white shadow-xl shadow-sky-500/20 sm:p-7">
              <div
                aria-hidden
                className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10"
              />
              <div className="relative">
                <h3 className="text-lg font-semibold">How are you coming?</h3>
                <div
                  role="radiogroup"
                  aria-label="Travel mode"
                  className="mt-4 grid grid-cols-4 gap-2"
                >
                  {MODES.map((m) => {
                    const Icon = m.icon;
                    const active = mode === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => setMode(m.id)}
                        className={`flex flex-col items-center gap-1.5 rounded-2xl px-2 py-3 text-xs font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                          active
                            ? "bg-white text-sky-700 shadow-md"
                            : "bg-white/15 text-white ring-1 ring-white/30 hover:bg-white/25"
                        }`}
                      >
                        <Icon className="h-5 w-5" aria-hidden />
                        {m.label}
                      </button>
                    );
                  })}
                </div>

                <a
                  href={directionsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-sky-700 shadow-lg transition hover:bg-sky-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-sky-600"
                >
                  <Navigation className="h-4 w-4" aria-hidden />
                  Get directions
                </a>
                <p className="mt-3 text-center text-xs text-white/80">
                  Opens in Google Maps with your current location as the start.
                </p>
              </div>
            </div>

            {/* Landmarks */}
            <div className="rounded-3xl border border-slate-200/80 bg-white/80 p-6 backdrop-blur sm:p-7">
              <h3 className="text-base font-semibold text-slate-900">
                Look out for these landmarks
              </h3>
              <ol className="relative mt-4 space-y-4 pl-6">
                <span
                  aria-hidden
                  className="absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-sky-300 to-teal-300"
                />
                {LANDMARKS.map((l) => (
                  <li key={l.name} className="relative">
                    <span
                      aria-hidden
                      className="absolute -left-6 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-sky-500 bg-white"
                    />
                    <p className="text-[15px] font-medium text-slate-800">
                      {l.name}
                    </p>
                    <p className="text-sm text-slate-500">{l.note}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* --------------------------- Map --------------------------- */}
          <div className="order-1 lg:order-2 lg:col-span-7">
            <div className="relative h-full min-h-[420px] overflow-hidden rounded-3xl bg-gradient-to-br from-sky-400 to-teal-400 p-1.5 shadow-xl shadow-sky-500/15 lg:min-h-[640px]">
              <div className="relative h-full min-h-[414px] overflow-hidden rounded-[1.35rem] bg-slate-100 lg:min-h-[634px]">
                <iframe
                  key={view}
                  title={`${CLINIC_NAME} location map`}
                  src={embedSrc}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                />

                {/* View toggle */}
                <div
                  role="group"
                  aria-label="Map view"
                  className="absolute right-3 top-3 flex rounded-full bg-white/95 p-1 shadow-lg ring-1 ring-slate-200 backdrop-blur"
                >
                  {(
                    [
                      { id: "map", label: "Map", icon: MapIcon },
                      { id: "satellite", label: "Satellite", icon: Satellite },
                    ] as const
                  ).map((v) => {
                    const Icon = v.icon;
                    const active = view === v.id;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setView(v.id)}
                        className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                          active
                            ? "bg-gradient-to-r from-sky-600 to-teal-500 text-white"
                            : "text-slate-600 hover:text-sky-700"
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" aria-hidden />
                        {v.label}
                      </button>
                    );
                  })}
                </div>

                {/* Open in Maps */}
                <a
                  href={openHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-slate-700 shadow-lg ring-1 ring-slate-200 backdrop-blur transition hover:text-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                >
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}