"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import {
  Plus,
  Search,
  X,
  CalendarClock,
  Stethoscope,
  ShieldCheck,
  HelpCircle,
  SearchX,
  Phone,
  MessageCircle,
  CalendarPlus,
  LifeBuoy,
  type LucideIcon,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  CONFIG - replace with the clinic's real details                           */
/* -------------------------------------------------------------------------- */
const CLINIC_PHONE = "+91XXXXXXXXXX"; // used for tel: link
const WHATSAPP_NUMBER = "91XXXXXXXXXX"; // digits only, with country code

/* -------------------------------------------------------------------------- */
/*  DATA - written to follow the NMC guidelines: factual, no superlatives,    */
/*  no guaranteed results, no offers, no patient stories.                     */
/*  Items marked CONFIRM must be verified by the clinic before publishing.    */
/* -------------------------------------------------------------------------- */
type FAQItem = { category: string; question: string; answer: string };

const FAQS: FAQItem[] = [
  // ---------- Visiting us ----------
  {
    category: "Visiting us",
    question: "Do I need an appointment or can I walk in?",
    answer:
      "Walk-ins are welcome. We recommend booking an appointment by call or WhatsApp so the doctor can set aside time for you, especially if you are coming for a procedure.",
  },
  {
    category: "Visiting us",
    question: "What are the consultation fees?",
    // Do not publish fixed numbers unless they are current and approved.
    answer:
      "Consultation fees are shared when you book and at the reception. If a test or procedure is advised, the charges are explained to you before you decide.",
  },
  {
    category: "Visiting us",
    question: "Where is the clinic, and what are the timings?",
    answer:
      "The clinic address, phone number and timings are listed on our Contact page. Please call before visiting if you want to confirm availability.",
  },
  {
    category: "Visiting us",
    question: "What should I bring to my first visit?",
    answer:
      "Bring any earlier prescriptions and reports, a list of medicines you take at present, and details of any known allergies. This helps the doctor understand your history.",
  },

  // ---------- Consultation & treatment ----------
  {
    category: "Consultation & treatment",
    question: "Will I always need a procedure?",
    answer:
      "No. After examining you, the doctor explains what is needed. Depending on the condition, this may be medicines, skin or hair care advice, a procedure, or follow-up only.",
  },
  {
    category: "Consultation & treatment",
    question: "Will I need tests before treatment?",
    answer:
      "Only when they are medically relevant to your condition. If a test is advised, the doctor explains why it is needed.",
  },
  {
    category: "Consultation & treatment",
    question: "Can results be guaranteed?",
    answer:
      "No. Response to treatment varies from person to person and depends on the condition, your skin or hair type and how closely advice is followed. The doctor explains what to expect and the possible risks beforehand.",
  },
  {
    category: "Consultation & treatment",
    question: "How many sessions will I need?",
    answer:
      "This depends on your condition and the treatment advised. The doctor gives an outline of the plan after examination and reviews it at follow-up visits.",
  },
  {
    category: "Consultation & treatment",
    question: "Do you see children with skin conditions?",
    // CONFIRM WITH CLINIC
    answer:
      "Yes, children with skin concerns can be examined by the doctor. A parent or guardian should accompany the child and give consent for any procedure.",
  },

  // ---------- Privacy & safety ----------
  {
    category: "Privacy & safety",
    question: "What safety practices does the clinic follow?",
    // CONFIRM WITH CLINIC
    answer:
      "Procedure areas and instruments are cleaned and prepared following standard clinical practice, and disposable items are used where appropriate. Procedures are carried out only after the risks are explained and you agree. You are welcome to ask about any step.",
  },
  {
    category: "Privacy & safety",
    question: "How is my privacy protected?",
    answer:
      "Your records and personal details are kept confidential. We do not use patient photographs, videos or personal details for publicity.",
  },
  {
    category: "Privacy & safety",
    question: "Is the information on this website medical advice?",
    answer:
      "No. The website is for general awareness only. It cannot diagnose your condition or replace an in-person consultation with a doctor.",
  },
];

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "Visiting us": CalendarClock,
  "Consultation & treatment": Stethoscope,
  "Privacy & safety": ShieldCheck,
};

const ALL = "All";

/* -------------------------------------------------------------------------- */
/*  ACCORDION (search + topic tabs + animated panels)                         */
/* -------------------------------------------------------------------------- */
function FAQAccordion({ faqs }: { faqs: FAQItem[] }) {
  const uid = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [category, setCategory] = useState<string>(ALL);
  const [query, setQuery] = useState("");

  const categories = useMemo(() => {
    const seen: string[] = [];
    faqs.forEach((f) => {
      if (!seen.includes(f.category)) seen.push(f.category);
    });
    return seen;
  }, [faqs]);

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return faqs
      .map((f, i) => ({ ...f, i }))
      .filter((f) => category === ALL || f.category === category)
      .filter(
        (f) =>
          !q ||
          f.question.toLowerCase().includes(q) ||
          f.answer.toLowerCase().includes(q)
      );
  }, [faqs, category, query]);

  const countFor = (c: string) =>
    c === ALL ? faqs.length : faqs.filter((f) => f.category === c).length;

  return (
    <div>
      <div className="mb-6 space-y-4">
        {/* Search */}
        <div className="relative">
          <label htmlFor={`${uid}-search`} className="sr-only">
            Search questions
          </label>
          <Search
            aria-hidden
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
          />
          <input
            id={`${uid}-search`}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions, e.g. fees, tests, privacy"
            className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-12 pr-11 text-[15px] text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          )}
        </div>

        {/* Topic tabs */}
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by topic">
          {[ALL, ...categories].map((c) => {
            const active = category === c;
            return (
              <button
                key={c}
                type="button"
                aria-pressed={active}
                onClick={() => setCategory(c)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 ${
                  active
                    ? "border-transparent bg-gradient-to-r from-sky-600 to-teal-500 text-white shadow-md shadow-sky-500/25"
                    : "border-slate-200 bg-white text-slate-600 hover:border-sky-200 hover:text-sky-700"
                }`}
              >
                {c}
                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${
                    active ? "bg-white/25 text-white" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {countFor(c)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {items.length > 0 ? (
        <ul className="space-y-3">
          {items.map((item) => {
            const isOpen = openIndex === item.i;
            const btnId = `${uid}-btn-${item.i}`;
            const panelId = `${uid}-panel-${item.i}`;
            const Icon = CATEGORY_ICONS[item.category] || HelpCircle;

            return (
              <li key={item.i}>
                <div
                  className={`relative overflow-hidden rounded-2xl border transition-all duration-300 motion-reduce:transition-none ${
                    isOpen
                      ? "border-sky-200 bg-white shadow-lg shadow-sky-500/10"
                      : "border-slate-200/80 bg-white/70 hover:border-sky-200 hover:bg-white"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-sky-500 to-teal-400 transition-opacity duration-300 ${
                      isOpen ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <h3>
                    <button
                      type="button"
                      id={btnId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? null : item.i)}
                      className="flex w-full items-center gap-4 px-5 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-400 sm:px-6"
                    >
                      <span
                        className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
                          isOpen
                            ? "bg-gradient-to-br from-sky-500 to-teal-500 text-white"
                            : "bg-sky-50 text-sky-600"
                        }`}
                      >
                        <Icon className="h-5 w-5" aria-hidden />
                      </span>
                      <span className="flex-1 text-base font-semibold text-slate-900 sm:text-[17px]">
                        {item.question}
                      </span>
                      <span
                        className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 motion-reduce:transition-none ${
                          isOpen
                            ? "rotate-45 border-sky-200 bg-sky-50 text-sky-600"
                            : "border-slate-200 text-slate-500"
                        }`}
                      >
                        <Plus className="h-4 w-4" aria-hidden />
                      </span>
                    </button>
                  </h3>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    aria-hidden={!isOpen}
                    className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-6 pl-5 pr-6 text-[15px] leading-relaxed text-slate-600 sm:pl-[5rem] sm:pr-8">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white/70 px-6 py-12 text-center">
          <SearchX className="mx-auto h-8 w-8 text-slate-400" aria-hidden />
          <p className="mt-3 font-semibold text-slate-800">No matching questions</p>
          <p className="mt-1 text-sm text-slate-500">
            Try a different word, or contact the clinic and our staff will help.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory(ALL);
            }}
            className="mt-4 rounded-full bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700 transition hover:bg-sky-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            Clear search and filters
          </button>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  SECTION                                                                   */
/* -------------------------------------------------------------------------- */
export function FAQSection() {
  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-gradient-to-b from-white via-sky-50/60 to-white py-24 sm:py-28"
    >
      {/* subtle dot pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(#bae6fd_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-24 h-80 w-80 rounded-full bg-teal-200/40 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: heading + help card (sticky on desktop) */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <span className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white px-4 py-1.5 text-sm font-medium text-sky-700 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-teal-500" aria-hidden />
                Common questions
              </span>

              <h2 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl">
                Answers before
                <br className="hidden sm:block" /> you visit
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-slate-600">
                Appointments, fees, what to expect at a consultation and how we
                look after your privacy, all in one place.
              </p>

              {/* Help card */}
              <div className="relative mt-10 overflow-hidden rounded-3xl bg-gradient-to-br from-sky-600 via-sky-600 to-teal-500 p-7 text-white shadow-xl shadow-sky-500/20">
                <div
                  aria-hidden
                  className="absolute -right-14 -top-14 h-44 w-44 rounded-full bg-white/10"
                />
                <div
                  aria-hidden
                  className="absolute -bottom-16 -left-10 h-48 w-48 rounded-full bg-white/10"
                />
                <div className="relative">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/30">
                    <LifeBuoy className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-xl font-semibold">
                    Can&rsquo;t find your answer?
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/85">
                    Call or message the clinic and our staff will help you with
                    appointments and general information.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <a
                      href={`tel:${CLINIC_PHONE}`}
                      className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-sky-700 transition hover:bg-sky-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-sky-600"
                    >
                      <Phone className="h-4 w-4" aria-hidden />
                      Call the clinic
                    </a>
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-white/40 transition hover:bg-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden />
                      WhatsApp
                    </a>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-white/40 transition hover:bg-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      <CalendarPlus className="h-4 w-4" aria-hidden />
                      Book a consultation
                    </Link>
                  </div>
                </div>
              </div>

              <p className="mt-5 max-w-md text-xs leading-relaxed text-slate-500">
                This information is for general awareness and is not a
                substitute for a consultation. For any medical concern, please
                consult a doctor in person.
              </p>
            </div>
          </div>

          {/* Right: interactive accordion */}
          <div className="lg:col-span-7">
            <FAQAccordion faqs={FAQS} />
          </div>
        </div>
      </div>
    </section>
  );
}