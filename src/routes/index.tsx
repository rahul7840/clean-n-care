import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  Calendar as CalendarIcon,
  Check,
  Clock3,
  House,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import heroImage from "@/assets/clean-home-hero.jpg";
import apartmentImage from "@/assets/apartment-cleaning.webp";
import bungalowImage from "@/assets/bungalow-cleaning.jpg";
import kitchenImage from "@/assets/kitchen-cleaning.jpg";
import bathroomImage from "@/assets/bathroom-cleaning.jpg";
import washroomImage from "@/assets/washroom-cleaning.jpg";
import sofaImage from "@/assets/sofa-cleaning.jpg";
import carpetImage from "@/assets/carpet-cleaning.jpg";
import mattressImage from "@/assets/mattress-cleaning.jpg";

type PropertyType = {
  id: string;
  tag: string;
  label: string;
  blurb: string;
  image: string;
  prices: Record<string, number>;
};

const propertyTypes: PropertyType[] = [
  {
    id: "flat",
    tag: "01 / Flat cleaning",
    label: "Apartments & Flats",
    blurb: "Complete home deep cleaning for 1 BHK to 5 BHK apartments.",
    image: apartmentImage,
    prices: { "1 BHK": 2499, "2 BHK": 3999, "3 BHK": 5999, "4 BHK": 8500, "5 BHK": 10999 },
  },
  {
    id: "bungalow",
    tag: "02 / Bungalow cleaning",
    label: "Bungalows",
    blurb: "Separate packages built for the scale and spaces of larger homes.",
    image: bungalowImage,
    prices: { "1 BHK": 4999, "2 BHK": 7999, "3 BHK": 13499, "4 BHK": 15499, "5 BHK": 18999 },
  },
  {
    id: "villa",
    tag: "03 / Villa cleaning",
    label: "Villas",
    blurb: "Multi-floor cleaning for villas, duplexes and independent houses.",
    image: sofaImage,
    prices: { "1 BHK": 5999, "2 BHK": 8999, "3 BHK": 14999, "4 BHK": 17999, "5 BHK": 20999 },
  },
  {
    id: "premium",
    tag: "04 / Premium cleaning",
    label: "Luxury Homes",
    blurb: "Detail-led deep cleaning for premium finishes and larger layouts.",
    image: carpetImage,
    prices: { "1 BHK": 6999, "2 BHK": 9999, "3 BHK": 16499, "4 BHK": 19499, "5 BHK": 22999 },
  },
];

const DEFAULT_PROPERTY_TYPE = propertyTypes[0]!;

const bhkOptions = ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5 BHK"];

const heroStats = [
  { value: 500, suffix: "+", label: "Homes cleaned" },
  { value: 400, suffix: "+", label: "Happy customers" },
  { value: 20, suffix: "+", label: "Localities served" },
  { value: 1000, suffix: "+", label: "Cleaning hours" },
];

const CONTACT_WHATSAPP_NUMBER = "919913375386";
const CONTACT_PHONE_TEL = "+919913375386";
const CONTACT_PHONE_DISPLAY = "+91 99133 75386";

function formatInr(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

const reviews = [
  {
    quote:
      "Service ekdum mast thi. Team time par aavi ane ghar ni proper deep cleaning kari. Kitchen ane bathroom especially bahu clean thai gaya.",
    name: "Hetal Shah",
    location: "Bopal, Ahmedabad",
  },
  {
    quote:
      "Bahuj saras service! Staff polite hato ane badhu properly clean kari aapyu. Ghar ekdum fresh lagi rahyu che.",
    name: "Jignesh Patel",
    location: "Satellite, Ahmedabad",
  },
  {
    quote:
      "We booked full home cleaning before Diwali. Team e ek-ek corner properly clean karyo. Overall very good experience.",
    name: "Riya Mehta",
    location: "Vastrapur, Ahmedabad",
  },
  {
    quote: "Mane service bahu game. Time par aavya, kaam pan fast ane properly karyu. Definitely recommended.",
    name: "Dhruv Joshi",
    location: "Thaltej, Ahmedabad",
  },
  {
    quote:
      "Ghar ghanu time thi deep clean karavanu hatu. Clean & Care ni team e really saras kaam karyu. Bathroom ane kitchen ekdum clean thai gaya.",
    name: "Pooja Patel",
    location: "Prahlad Nagar, Ahmedabad",
  },
  {
    quote:
      "Very good service and professional team. Booking thi lai ne cleaning sudhi badhu smooth hatu. Paisa vasool service.",
    name: "Karan Shah",
    location: "Chandkheda, Ahmedabad",
  },
  {
    quote: "Saras service che. Staff friendly hato ane koi jaldi ma kaam nathi karyu. Proper detailing sathe cleaning kari.",
    name: "Nisha Trivedi",
    location: "Sargasan, Gandhinagar",
  },
  {
    quote:
      "New house shift karta pela cleaning karavi hati. Team e complete house ekdum nicely clean kari didhu. Happy with the service.",
    name: "Meet Patel",
    location: "Kudasan, Gandhinagar",
  },
  {
    quote:
      "Honestly, ghar ni condition cleaning pachi completely different lagi. Team professional hati ane badhu neat & clean kari didhu.",
    name: "Krisha Shah",
    location: "Raysan, Gandhinagar",
  },
  {
    quote: "Bahu saras experience rahyo. Staff time par aavyo ane ghar ni deep cleaning properly kari. Highly satisfied.",
    name: "Harsh Desai",
    location: "Koba, Gandhinagar",
  },
];

const keyFeatures = [
  { icon: UserRoundCheck, title: "Professional Staff" },
  { icon: ShieldCheck, title: "Safe & Careful" },
  { icon: Clock3, title: "On-Time Service" },
  { icon: House, title: "All Home Types" },
];

const specialistServices = [
  { title: "Washroom Cleaning", blurb: "Deep sanitisation for tiles, fittings & grout", price: "₹799 onwards", image: washroomImage },
  { title: "Sofa Shampoo Cleaning", blurb: "Machine wash that lifts stains and odour", price: "₹999 onwards", image: sofaImage },
  { title: "Carpet Cleaning", blurb: "A deeper, dust-free clean for every fibre", price: "₹699 onwards", image: carpetImage },
  { title: "Kitchen Cleaning", blurb: "Degreasing for counters, hobs & cabinets", price: "₹799 onwards", image: kitchenImage },
  { title: "Mattress Cleaning", blurb: "Deep vacuum & sanitisation for better sleep", price: "₹599 onwards", image: mattressImage },
];

const faqs = [
  ["How much does 2 BHK flat cleaning cost?", "Flat cleaning for a 2 BHK is ₹3,999."],
  ["How much does 3 BHK flat cleaning cost?", "Flat cleaning for a 3 BHK is ₹5,999."],
  ["Do you clean bungalows?", "Yes. Bungalow cleaning packages are available based on home size, from 1 BHK to 4 BHK."],
  ["Do you provide sofa cleaning?", "Yes. Sofa shampoo cleaning starts from ₹999."],
  ["Do you provide kitchen cleaning?", "Yes. Kitchen cleaning starts from ₹799."],
  ["How can I book?", `Book online, on WhatsApp, or call us directly at ${CONTACT_PHONE_DISPLAY}.`],
];

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Home Cleaning Ahmedabad",
  description: "Professional deep cleaning for flats, apartments and bungalows in Ahmedabad.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "A/17 Mahashakti Nagar, Chanakyapuri, Ghatlodiya",
    addressLocality: "Ahmedabad",
    postalCode: "380061",
    addressRegion: "Gujarat",
    addressCountry: "IN",
  },
  areaServed: "Ahmedabad",
  makesOffer: [
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Flat Deep Cleaning" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Bungalow Deep Cleaning" } },
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Home Deep Cleaning in Ahmedabad | Flat & Bungalow Cleaning" },
      { name: "description", content: "Professional home deep cleaning in Ahmedabad for flats and bungalows. View transparent 1–4 BHK pricing and request your cleaning on WhatsApp." },
      { property: "og:title", content: "Professional Home Deep Cleaning in Ahmedabad" },
      { property: "og:description", content: "Clear flat and bungalow cleaning prices, professional home service, and easy WhatsApp booking in Ahmedabad." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(localBusinessSchema) }],
  }),
  component: HomePage,
});

function trackClick(action: string, detail: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("cleaning:conversion", { detail: { action, search: window.location.search, ...detail } }));
}

function BookingLink({
  className = "",
  label = "Book now",
  shine = false,
  onClick,
}: {
  className?: string;
  label?: string;
  shine?: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      type="button"
      size="lg"
      className={shine ? `bg-background text-foreground hover:bg-background/88 ${className}` : className}
      onClick={() => {
        trackClick("whatsapp_click");
        onClick();
      }}
    >
      <MessageCircle aria-hidden="true" className={shine ? "text-foreground" : ""} />{" "}
      <span className={shine ? "text-shine-dark" : ""}>{label}</span>
    </Button>
  );
}

function CountUpStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || started.current) return;
        started.current = true;
        const duration = 1400;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.round(value * eased));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="py-2 text-center">
      <p className="text-2xl font-extrabold tabular-nums text-background md:text-3xl">
        {display.toLocaleString("en-IN")}
        {suffix}
      </p>
      <p className="mt-2 text-xs font-bold uppercase text-secondary-foreground/60">{label}</p>
    </div>
  );
}

function HeroStats() {
  return (
    <div className="grid grid-cols-2 gap-y-4 md:grid-cols-4">
      {heroStats.map((stat) => (
        <CountUpStat key={stat.label} {...stat} />
      ))}
    </div>
  );
}

function KeyFeaturesStrip() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[1312px] px-5 py-10 md:px-10 md:py-14 lg:px-16">
        <div className="grid grid-cols-2 gap-y-8 sm:grid-cols-4 sm:gap-y-0">
          {keyFeatures.map(({ icon: Icon, title }) => (
            <div key={title} className="flex flex-col items-center gap-3 px-4 text-center">
              <Icon className="size-6 text-foreground md:size-7" strokeWidth={1.5} aria-hidden="true" />
              <p className="text-xs font-bold uppercase tracking-wide text-foreground md:text-sm">{title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PropertyCarousel({
  types,
  onSelect,
}: {
  types: PropertyType[];
  onSelect: (type: PropertyType, index: number) => void;
}) {
  return (
    <Carousel opts={{ align: "start" }} className="mt-10">
      <CarouselContent>
        {types.map((type, index) => {
          const minPrice = Math.min(...Object.values(type.prices));
          return (
            <CarouselItem key={type.id} className="basis-[82%] sm:basis-1/2 lg:basis-1/3">
              <button
                type="button"
                onClick={() => onSelect(type, index)}
                className="group block w-full overflow-hidden border border-border bg-card text-left transition-colors hover:border-foreground"
              >
                <div className="overflow-hidden bg-muted">
                  <img
                    src={type.image}
                    alt={type.label}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs font-bold uppercase text-primary">{type.tag}</span>
                  <h4 className="mt-2 text-xl font-extrabold">{type.label}</h4>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{type.blurb}</p>
                  <p className="mt-4 flex items-center gap-1.5 text-sm font-bold text-foreground">
                    From {formatInr(minPrice)}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </p>
                </div>
              </button>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <div className="mt-6 flex justify-end gap-2">
        <CarouselPrevious className="static size-11 translate-y-0 rounded-none border-border" />
        <CarouselNext className="static size-11 translate-y-0 rounded-none border-border" />
      </div>
    </Carousel>
  );
}

function PropertyBookingDialog({
  initialType,
  open,
  onOpenChange,
}: {
  initialType: PropertyType | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [propertyId, setPropertyId] = useState(DEFAULT_PROPERTY_TYPE.id);
  const [bhk, setBhk] = useState<string | null>(null);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  useEffect(() => {
    if (!open) return;
    setPropertyId(initialType?.id ?? DEFAULT_PROPERTY_TYPE.id);
    setBhk(null);
    setDate(undefined);
    setCalendarOpen(false);
  }, [open, initialType]);

  const resetAndClose = () => {
    setBhk(null);
    setDate(undefined);
    setCalendarOpen(false);
    onOpenChange(false);
  };

  const type = propertyTypes.find((t) => t.id === propertyId) ?? DEFAULT_PROPERTY_TYPE;
  const price = bhk ? type.prices[bhk] : null;
  const canSubmit = Boolean(bhk && date);
  const dateLabel = date?.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) ?? "";

  const handleBookOnline = () => {
    if (!canSubmit) return;
    trackClick("online_booking", { property: type.id, bhk, date: dateLabel, price });
    toast.success("Booking request received", {
      description: `We’ll confirm your ${bhk} ${type.label.toLowerCase()} cleaning for ${dateLabel} shortly.`,
    });
    resetAndClose();
  };

  const handleWhatsApp = () => {
    if (!canSubmit) return;
    trackClick("whatsapp_click", { property: type.id, bhk, date: dateLabel, price });
    const message = `Hi, I'd like to book ${type.label} cleaning.\n\nProperty: ${type.label}\nHome size: ${bhk}\nPreferred date: ${dateLabel}\nEstimated price: ${price ? formatInr(price) : "-"}`;
    const whatsappUrl = `https://wa.me/${CONTACT_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    resetAndClose();
    if (typeof window !== "undefined") window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <Dialog open={open} onOpenChange={(next) => (next ? onOpenChange(next) : resetAndClose())}>
      <DialogContent className="max-h-[85vh] max-w-md overflow-y-auto rounded-2xl p-0 sm:rounded-2xl">
        <div className="p-5">
          <DialogHeader className="text-left">
            <DialogTitle className="text-xl font-extrabold">{type.label}</DialogTitle>
            <DialogDescription className="text-sm">{type.blurb}</DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            <p className="text-xs font-bold uppercase text-muted-foreground">1. Property type</p>
            <div className="mt-2 grid grid-cols-2 gap-1.5">
              {propertyTypes.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setPropertyId(option.id)}
                  className={`rounded-lg border px-3 py-2 text-xs font-bold uppercase transition-colors sm:text-sm ${propertyId === option.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-foreground hover:border-foreground"
                    }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <p className="text-xs font-bold uppercase text-muted-foreground">2. Home size</p>
            <div className="mt-2 grid grid-cols-5 gap-1.5">
              {bhkOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setBhk(option)}
                  className={`rounded-lg border py-2 text-xs font-bold uppercase transition-colors sm:text-sm ${bhk === option
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-foreground hover:border-foreground"
                    }`}
                >
                  {option.replace(" BHK", "")}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <p className="text-xs font-bold uppercase text-muted-foreground">3. Pick a date</p>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={`mt-2 flex w-full items-center justify-between rounded-lg border px-3 py-2.5 text-sm font-semibold transition-colors ${date ? "border-primary text-foreground" : "border-border text-muted-foreground hover:border-foreground"
                    }`}
                >
                  {date ? dateLabel : "Select date"}
                  <CalendarIcon className="size-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-auto rounded-xl p-2">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(value) => {
                    setDate(value);
                    setCalendarOpen(false);
                  }}
                  disabled={{ before: today }}
                  className="[--cell-size:2rem]"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="mt-4 flex items-center justify-between rounded-lg bg-muted px-3 py-2.5">
            <span className="text-xs font-bold uppercase text-muted-foreground">Est. price</span>
            <span className="text-xl font-extrabold text-primary">{price ? formatInr(price) : "Select BHK"}</span>
          </div>

          {!canSubmit && (
            <p className="mt-2 text-xs text-muted-foreground">Select a home size and date to continue.</p>
          )}

          <div className="mt-4 flex items-center gap-2">
            <Button size="lg" className="h-12 flex-1 rounded-full text-base" disabled={!canSubmit} onClick={handleBookOnline}>
              Book online
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="h-12 w-12 shrink-0 rounded-full"
              disabled={!canSubmit}
              onClick={handleWhatsApp}
              aria-label="Chat on WhatsApp"
              title="Chat on WhatsApp"
            >
              <MessageCircle />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ServiceRail({ services }: { services: { title: string; blurb: string; price: string; image: string }[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const distance = (card?.offsetWidth ?? 280) + 16;
    el.scrollBy({ left: direction * distance, behavior: "smooth" });
  };

  return (
    <div className="relative mt-12">
      <div
        ref={scrollerRef}
        className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2"
      >
        {services.map(({ title, blurb, price, image }) => (
          <article key={title} data-card className="group w-[68vw] shrink-0 snap-start sm:w-[280px]">
            <div className="overflow-hidden bg-muted">
              <img
                src={image}
                alt={title}
                loading="lazy"
                width={560}
                height={700}
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </div>
            <h3 className="mt-4 text-lg font-bold leading-snug">{title}</h3>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">{blurb}</p>
            <span className="mt-3 inline-block text-base font-extrabold text-primary">{price}</span>
          </article>
        ))}
      </div>
      <div className="mt-6 hidden justify-end gap-2 md:flex">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          aria-label="Scroll services left"
          className="grid size-11 place-items-center border border-border text-foreground transition-colors hover:border-foreground"
        >
          <ArrowLeft className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          aria-label="Scroll services right"
          className="grid size-11 place-items-center border border-border text-foreground transition-colors hover:border-foreground"
        >
          <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  );
}

function PricingCarousel({
  types,
  onSelect,
}: {
  types: PropertyType[];
  onSelect: (type: PropertyType) => void;
}) {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;
    const timer = window.setInterval(() => {
      api.scrollNext();
    }, 5000);
    const stop = () => window.clearInterval(timer);
    api.on("pointerDown", stop);
    return () => {
      window.clearInterval(timer);
      api.off("pointerDown", stop);
    };
  }, [api]);

  return (
    <section id="pricing" className="bg-background px-5 py-16 md:px-10 md:py-20 lg:px-16">
      <div className="mx-auto max-w-[1312px]">
        <Carousel setApi={setApi} opts={{ loop: true }} className="relative w-full">
          <CarouselContent className="ml-0">
            {types.map((type, index) => {
              const minPrice = Math.min(...Object.values(type.prices));
              return (
                <CarouselItem key={type.id} className="pl-0">
                  <button
                    type="button"
                    onClick={() => onSelect(type)}
                    className="group relative block h-[340px] w-full overflow-hidden rounded-2xl text-left sm:h-[400px] md:h-[460px]"
                  >
                    <img
                      src={type.image}
                      alt={type.label}
                      loading={index === 0 ? "eager" : "lazy"}
                      width={1600}
                      height={1008}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-secondary/60" />
                    <div className="relative flex h-full flex-col items-center justify-center px-5 py-10 text-center text-secondary-foreground md:px-10">
                      <span className="text-xs font-bold uppercase text-background/70">{type.tag}</span>
                      <h3 className="mt-3 max-w-2xl text-3xl font-extrabold leading-[0.98] md:text-5xl">{type.label}</h3>
                      <p className="mt-4 max-w-lg text-sm leading-6 text-secondary-foreground/75 md:text-base">{type.blurb}</p>
                      <p className="mt-5 flex items-center gap-2 text-xl font-extrabold md:text-2xl">
                        <span className="text-shine">From {formatInr(minPrice)}</span>
                        <ArrowRight className="size-5 text-background transition-transform group-hover:translate-x-1" />
                      </p>
                    </div>
                  </button>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <div className="mt-5 flex justify-end gap-2">
            <CarouselPrevious variant="outline" className="static size-11 translate-y-0 rounded-none border-border bg-transparent text-foreground" />
            <CarouselNext variant="outline" className="static size-11 translate-y-0 rounded-none border-border bg-transparent text-foreground" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const total = reviews.length;

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  useEffect(() => {
    if (!api) return;
    const timer = window.setInterval(() => {
      api.scrollNext();
    }, 7000);
    const stop = () => window.clearInterval(timer);
    api.on("pointerDown", stop);
    return () => {
      window.clearInterval(timer);
      api.off("pointerDown", stop);
    };
  }, [api]);

  return (
    <section className="border-t border-border bg-background py-20 md:py-28">
      <div className="mx-auto max-w-[1312px] px-5 md:px-10 lg:px-16">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-xs font-bold uppercase text-muted-foreground">What our customers say</p>
            <h2 className="mt-4 text-4xl font-extrabold leading-tight md:text-6xl">
              Clean homes.
              <br />
              Happy customers.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-6 text-muted-foreground">
              From apartments in Ahmedabad, our customers trust Clean &amp; Care for
              detailed, professional home cleaning.
            </p>
            <a
              href="#contact"
              onClick={() => trackClick("whatsapp_click", { source: "testimonials" })}
              className="mt-8 inline-flex items-center gap-1.5 text-sm font-bold text-primary transition-all hover:gap-2.5"
            >
              Book a cleaning <ArrowRight className="size-4" />
            </a>
          </div>

          <div className="lg:border-l lg:border-border lg:pl-16">
            <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
              <CarouselContent className="ml-0">
                {reviews.map((review) => (
                  <CarouselItem key={review.name} className="pl-0">
                    <span aria-hidden="true" className="text-6xl font-extrabold leading-none text-primary/25 md:text-7xl">
                      “
                    </span>
                    <p className="mt-4 max-w-xl break-words text-base font-medium leading-7 text-foreground sm:text-lg sm:leading-8 md:text-2xl md:leading-9">
                      {review.quote}
                    </p>
                    <div className="mt-8">
                      <p className="text-base font-bold text-foreground">{review.name}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{review.location}</p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            <div className="mt-10 flex items-center gap-5 text-sm font-semibold text-muted-foreground">
              <button
                type="button"
                aria-label="Previous review"
                onClick={() => api?.scrollPrev()}
                className="transition-colors hover:text-foreground"
              >
                <ArrowLeft className="size-4" />
              </button>
              <span className="tabular-nums">
                {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
              <button
                type="button"
                aria-label="Next review"
                onClick={() => api?.scrollNext()}
                className="transition-colors hover:text-foreground"
              >
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  const [selectedType, setSelectedType] = useState<PropertyType | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  const openBooking = (type: PropertyType | null = null) => {
    setSelectedType(type);
    setBookingOpen(true);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="absolute inset-x-0 top-0 z-30 text-background">
        <div className="mx-auto grid h-20 max-w-[1440px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 md:h-24 md:px-10 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:px-16">
          <a href="#top" className="flex min-w-0 items-center" aria-label="Clean & Care home">
            <span className="truncate text-lg font-extrabold uppercase tracking-tight">Clean &amp; Care</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-semibold lg:flex" aria-label="Main navigation">
            <a className="transition-colors hover:text-primary" href="#services">Services</a>
            <a className="transition-colors hover:text-primary" href="#pricing">Pricing</a>
            <a className="transition-colors hover:text-primary" href="#results">Before & After</a>
            <a className="transition-colors hover:text-primary" href="#about">Why us</a>
            <a className="transition-colors hover:text-primary" href="#contact">Contact</a>
          </nav>
          <a href="#pricing" className="flex size-10 items-center justify-center border border-background/40 md:hidden" aria-label="View pricing"><ArrowDownRight /></a>
        </div>
      </header>

      <main id="top">
        <section className="relative min-h-[780px] bg-secondary text-secondary-foreground md:min-h-[860px]">
          <img src={heroImage} alt="Professional cleaner working in a bright Ahmedabad apartment" width={1600} height={1008} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover object-[62%_center]" />
          <div className="absolute inset-0 bg-secondary/65" />
          <div className="relative mx-auto flex min-h-[780px] max-w-[1440px] flex-col justify-end px-5 pb-10 pt-32 md:min-h-[860px] md:px-10 md:pb-14 lg:px-16">
            <div className="max-w-3xl">
              <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase text-background/80"><MapPin className="size-4" /> Home cleaning in Ahmedabad</p>
              <h1 className="max-w-3xl text-5xl font-extrabold leading-[0.98] md:text-7xl lg:text-[5.8rem]">A cleaner home.<br />Without the hassle.</h1>
              <p className="mt-6 max-w-xl text-base font-medium leading-7 text-secondary-foreground/75 md:text-lg">Professional deep cleaning for flats, apartments and bungalows across Ahmedabad — delivered at your home by our cleaning team.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <BookingLink shine onClick={() => openBooking()} />
                <Button asChild size="lg" variant="outline" className="border-secondary-foreground/45 text-secondary-foreground hover:bg-background hover:text-foreground">
                  <a href={`tel:${CONTACT_PHONE_TEL}`} data-track="phone_click" onClick={() => trackClick("phone_click")}><Phone /> Call now</a>
                </Button>
              </div>
            </div>
            <div className="mt-12 max-w-3xl pt-5">
              <HeroStats />
            </div>
          </div>
        </section>

        <KeyFeaturesStrip />

        <PricingCarousel types={propertyTypes} onSelect={openBooking} />

        <TestimonialsSection />

        <section className="px-5 py-20 md:px-10 md:py-28 lg:px-16">
          <div className="mx-auto max-w-[1312px]">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-xs font-bold uppercase text-muted-foreground">Check availability</p>
                <h3 className="mt-3 text-3xl font-extrabold md:text-4xl">Pick your property, then book.</h3>
              </div>
              <p className="max-w-sm text-sm leading-6 text-muted-foreground">Choose a property type, select your home size, a slot and a date — see live availability before you book.</p>
            </div>
            <PropertyCarousel
              types={propertyTypes}
              onSelect={(type) => openBooking(type)}
            />
          </div>
        </section>

        <PropertyBookingDialog
          initialType={selectedType}
          open={bookingOpen}
          onOpenChange={setBookingOpen}
        />

        <section id="services" className="bg-muted py-20 md:py-28">
          <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
            <div className="grid items-end gap-5 md:grid-cols-2"><div><p className="text-xs font-bold uppercase text-muted-foreground">Professional home service</p><h2 className="mt-4 text-4xl font-extrabold leading-tight md:text-6xl">The work your home needs.</h2></div><p className="max-w-lg justify-self-end text-base leading-7 text-muted-foreground">From complete-home cleaning to focused kitchen, washroom and upholstery services.</p></div>
            <div className="mt-12 grid gap-5 md:grid-cols-12">
              <article className="group md:col-span-7"><div className="overflow-hidden"><img src={kitchenImage} alt="Professional kitchen deep cleaning" width={1408} height={1008} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" /></div><div className="grid grid-cols-[1fr_auto] items-start border-t border-foreground pt-4"><div><h3 className="text-2xl font-bold">Flat deep cleaning</h3><p className="mt-2 text-muted-foreground">A complete clean for apartments from 1 BHK to 4 BHK.</p></div><ArrowRight className="mt-1" /></div></article>
              <article className="group md:col-span-5"><div className="overflow-hidden"><img src={bathroomImage} alt="Professional washroom and glass cleaning" width={1408} height={1008} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" /></div><div className="grid grid-cols-[1fr_auto] items-start border-t border-foreground pt-4"><div><h3 className="text-2xl font-bold">Focused cleaning</h3><p className="mt-2 text-muted-foreground">Washrooms, kitchens, glass, doors, sofas and carpets.</p></div><span className="text-sm font-bold text-primary">From ₹699</span></div></article>
            </div>

            <div className="mt-16 flex items-end justify-between gap-6 border-t border-border pt-10">
              <div><p className="text-xs font-bold uppercase text-muted-foreground">Additional services</p><h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">Focused care,<br className="hidden sm:block" /> when you need it.</h2></div>
            </div>
            <ServiceRail services={specialistServices} />
          </div>
        </section>

        <section id="results" className="py-20 md:py-28">
          <div className="mx-auto max-w-[1312px] px-5 md:px-10 lg:px-16">
            <div className="grid items-end gap-6 md:grid-cols-2"><div><p className="text-xs font-bold uppercase text-muted-foreground">See the difference</p><h2 className="mt-4 text-4xl font-extrabold leading-tight md:text-6xl">Before. After.<br />Clearly cleaner.</h2></div><p className="max-w-lg justify-self-end text-sm leading-6 text-muted-foreground">The images below show the type of cleaning work offered. Replace them with verified customer project photographs when available.</p></div>
            <div className="mt-12 grid gap-4 md:grid-cols-2">
              <figure><div className="relative overflow-hidden bg-muted"><img src={kitchenImage} alt="Kitchen cleaning process reference" width={1408} height={1008} loading="lazy" className="aspect-[4/3] w-full object-cover saturate-[.65] brightness-[.72]" /><span className="absolute left-4 top-4 bg-secondary px-3 py-2 text-xs font-bold uppercase text-secondary-foreground">Before / process</span></div><figcaption className="mt-3 text-sm font-semibold">Kitchen surfaces</figcaption></figure>
              <figure><div className="relative overflow-hidden bg-muted"><img src={heroImage} alt="Freshly cleaned home reference" width={1600} height={1008} loading="lazy" className="aspect-[4/3] w-full object-cover" /><span className="absolute left-4 top-4 bg-primary px-3 py-2 text-xs font-bold uppercase text-primary-foreground">After / result</span></div><figcaption className="mt-3 text-sm font-semibold">Living spaces</figcaption></figure>
            </div>
          </div>
        </section>

        <section id="about" className="border-y border-border bg-card py-20 md:py-28">
          <div className="mx-auto grid max-w-[1312px] gap-16 px-5 md:px-10 lg:grid-cols-2 lg:px-16">
            <div><p className="text-xs font-bold uppercase text-primary">What we clean</p><h2 className="mt-4 text-4xl font-extrabold leading-tight md:text-6xl">A complete-home approach.</h2><div className="mt-10 grid grid-cols-2 border-t border-border">{["Bedrooms", "Living rooms", "Kitchens", "Bathrooms", "Floors", "Doors", "Windows", "Dust & cobwebs", "Common surfaces", "Other agreed areas"].map((item) => <div key={item} className="flex items-center gap-3 border-b border-border py-4 text-sm font-semibold"><Check className="size-4 text-primary" />{item}</div>)}</div></div>
            <div><p className="text-xs font-bold uppercase text-primary">Why choose us</p><div className="mt-6 divide-y divide-border border-y border-border">{[["01", "Professional team", "Cleaning staff handling the work in your home."], ["02", "Transparent pricing", "Clear package pricing available before booking."], ["03", "Home service", "The cleaning team comes to your property."], ["04", "Local Ahmedabad service", "Based in Ghatlodiya and serving Ahmedabad homes."], ["05", "Complete cleaning", "Built around full-home deep cleaning, with focused services available."]].map(([n, title, text]) => <div key={n} className="grid grid-cols-[2.5rem_1fr] gap-4 py-6"><span className="text-sm font-bold text-primary">{n}</span><div><h3 className="text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p></div></div>)}</div></div>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="mx-auto grid max-w-[1100px] gap-10 px-5 md:px-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center"><div><p className="text-xs font-bold uppercase text-muted-foreground">Common questions</p><h2 className="mt-4 text-4xl font-extrabold">Straight answers.</h2></div><Accordion type="single" collapsible className="border-t border-foreground">{faqs.map(([question, answer], i) => <AccordionItem value={`faq-${i}`} key={question}><AccordionTrigger className="py-6 text-left text-base font-bold hover:no-underline md:text-lg">{question}</AccordionTrigger><AccordionContent className="max-w-2xl pb-6 text-base leading-7 text-muted-foreground">{answer}</AccordionContent></AccordionItem>)}</Accordion></div>
        </section>

        <section id="contact" className="relative overflow-hidden bg-secondary text-secondary-foreground">
          <img src={heroImage} alt="Clean modern home in Ahmedabad" width={1600} height={1008} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-secondary/80" />
          <div className="relative mx-auto max-w-[1312px] px-5 py-20 md:px-10 md:py-28 lg:px-16">
            <div className="max-w-3xl"><p className="text-xs font-bold uppercase text-primary">Ready for a cleaner home?</p><h2 className="mt-4 text-5xl font-extrabold leading-tight md:text-7xl">Tell us your home size and location.</h2><p className="mt-6 max-w-xl text-lg leading-8 text-secondary-foreground/70">We’ll help you choose the right flat, bungalow or specialized cleaning service.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><BookingLink label="Book now" onClick={() => openBooking()} /><Button asChild size="lg" variant="outline" className="border-secondary-foreground/35 text-secondary-foreground"><a href={`tel:${CONTACT_PHONE_TEL}`} data-track="phone_click" onClick={() => trackClick("phone_click")}><Phone /> {CONTACT_PHONE_DISPLAY}</a></Button></div></div>
          </div>
        </section>
      </main>

      <footer className="bg-secondary px-5 pb-24 pt-16 text-secondary-foreground md:px-10 md:pb-10 lg:px-16">
        <div className="mx-auto max-w-[1312px]"><div className="grid gap-12 border-b border-secondary-foreground/20 pb-12 md:grid-cols-3"><div><span className="text-lg font-extrabold uppercase tracking-tight">Clean &amp; Care</span></div><nav className="grid grid-cols-2 gap-3 text-sm" aria-label="Footer navigation"><a href="#top">Home</a><a href="#services">Services</a><a href="#pricing">Pricing</a><a href="#results">Before & After</a><a href="#about">Why us</a><a href="#contact">Contact</a></nav><address className="not-italic"><p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase text-primary"><MapPin className="size-4" /> Office</p><p className="text-sm leading-6 text-secondary-foreground/70">A/17 Mahashakti Nagar,<br />Chanakyapuri, Ghatlodiya,<br />Ahmedabad – 380061</p><a href={`tel:${CONTACT_PHONE_TEL}`} onClick={() => trackClick("phone_click")} className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-secondary-foreground/70 transition-colors hover:text-background"><Phone className="size-4" /> {CONTACT_PHONE_DISPLAY}</a></address></div><div className="flex flex-col gap-3 pt-6 text-xs text-secondary-foreground/45 md:flex-row md:justify-between"><p>© 2026 Home Cleaning Ahmedabad</p><p>Business hours, Privacy Policy and Terms to be added when provided.</p></div></div>
      </footer>
    </div>
  );
}