import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import heroImage from "@/assets/clean-home-hero.jpg";
import bungalowImage from "@/assets/bungalow-cleaning.jpg";
import kitchenImage from "@/assets/kitchen-cleaning.jpg";
import bathroomImage from "@/assets/bathroom-cleaning.jpg";

const flatPrices = [
  ["1 BHK", "₹2,499"],
  ["2 BHK", "₹3,999"],
  ["3 BHK", "₹5,999"],
  ["4 BHK", "₹8,500"],
];

const bungalowPrices = [
  ["1 BHK", "₹4,999"],
  ["2 BHK", "₹7,999"],
  ["3 BHK", "₹13,499"],
  ["4 BHK", "₹15,499"],
];

const specialistServices = [
  ["Washroom Cleaning", "₹799 onwards"],
  ["Sofa Shampoo Cleaning", "₹999 onwards"],
  ["Carpet Cleaning", "₹699 onwards"],
  ["Glass / Door Cleaning", "₹699 onwards"],
  ["Kitchen Cleaning", "₹799 onwards"],
];

const faqs = [
  ["How much does 2 BHK flat cleaning cost?", "Flat cleaning for a 2 BHK is ₹3,999."],
  ["How much does 3 BHK flat cleaning cost?", "Flat cleaning for a 3 BHK is ₹5,999."],
  ["Do you clean bungalows?", "Yes. Bungalow cleaning packages are available based on home size, from 1 BHK to 4 BHK."],
  ["Do you provide sofa cleaning?", "Yes. Sofa shampoo cleaning starts from ₹999."],
  ["Do you provide kitchen cleaning?", "Yes. Kitchen cleaning starts from ₹799."],
  ["How can I book?", "Contact the team through WhatsApp or phone. The booking numbers will be added here once confirmed."],
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

function trackClick(action: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("cleaning:conversion", { detail: { action, search: window.location.search } }));
}

function BookingLink({ className = "", label = "Book on WhatsApp" }: { className?: string; label?: string }) {
  return (
    <Button asChild size="lg" className={className}>
      <a href="#contact" data-track="whatsapp_click" onClick={() => trackClick("whatsapp_click")}>
        <MessageCircle aria-hidden="true" /> {label}
      </a>
    </Button>
  );
}

function PriceGrid({ prices, dark = false }: { prices: string[][]; dark?: boolean }) {
  return (
    <div className={`grid grid-cols-2 border-t md:grid-cols-4 ${dark ? "border-background/20" : "border-border"}`}>
      {prices.map(([size, price], index) => (
        <div key={size} className={`py-5 pr-3 md:py-7 ${index % 2 ? "border-l" : ""} ${index > 1 ? "border-t md:border-t-0" : ""} ${dark ? "border-background/20" : "border-border"} md:border-l md:first:border-l-0 md:pl-6`}>
          <p className={`text-xs font-bold uppercase ${dark ? "text-background/60" : "text-muted-foreground"}`}>{size}</p>
          <p className={`mt-2 text-2xl font-extrabold md:text-3xl ${dark ? "text-primary" : "text-foreground"}`}>{price}</p>
        </div>
      ))}
    </div>
  );
}

function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background pb-16 text-foreground md:pb-0">
      <header className="absolute inset-x-0 top-0 z-30 border-b border-background/25 text-background">
        <div className="mx-auto grid h-20 max-w-[1440px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 md:h-24 md:px-10 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:px-16">
          <a href="#top" className="flex min-w-0 items-center gap-3" aria-label="Home Cleaning Ahmedabad home">
            <span className="grid size-9 shrink-0 place-items-center rounded-sm bg-primary text-primary-foreground"><Sparkles className="size-5" /></span>
            <span className="truncate text-sm font-extrabold uppercase leading-tight">Home Cleaning<br/><span className="font-medium text-background/70">Ahmedabad</span></span>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-semibold lg:flex" aria-label="Main navigation">
            <a className="transition-colors hover:text-primary" href="#services">Services</a>
            <a className="transition-colors hover:text-primary" href="#pricing">Pricing</a>
            <a className="transition-colors hover:text-primary" href="#results">Before & After</a>
            <a className="transition-colors hover:text-primary" href="#about">Why us</a>
            <a className="transition-colors hover:text-primary" href="#contact">Contact</a>
          </nav>
          <BookingLink className="hidden md:inline-flex" />
          <a href="#pricing" className="flex size-10 items-center justify-center border border-background/40 md:hidden" aria-label="View pricing"><ArrowDownRight /></a>
        </div>
      </header>

      <main id="top">
        <section className="relative min-h-[780px] bg-secondary text-secondary-foreground md:min-h-[860px]">
          <img src={heroImage} alt="Professional cleaner working in a bright Ahmedabad apartment" width={1600} height={1008} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover object-[62%_center]" />
          <div className="absolute inset-0 bg-secondary/65" />
          <div className="relative mx-auto flex min-h-[780px] max-w-[1440px] flex-col justify-end px-5 pb-10 pt-32 md:min-h-[860px] md:px-10 md:pb-14 lg:px-16">
            <div className="max-w-3xl">
              <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase text-primary"><MapPin className="size-4" /> Home cleaning in Ahmedabad</p>
              <h1 className="max-w-3xl text-5xl font-extrabold leading-[0.98] md:text-7xl lg:text-[5.8rem]">A cleaner home.<br/>Without the hassle.</h1>
              <p className="mt-6 max-w-xl text-base font-medium leading-7 text-secondary-foreground/75 md:text-lg">Professional deep cleaning for flats, apartments and bungalows across Ahmedabad — delivered at your home by our cleaning team.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <BookingLink />
                <Button asChild size="lg" variant="outline" className="border-secondary-foreground/45 text-secondary-foreground hover:bg-background hover:text-foreground">
                  <a href="#contact" data-track="phone_click" onClick={() => trackClick("phone_click")}><Phone /> Call now</a>
                </Button>
              </div>
            </div>
            <div className="mt-12 max-w-3xl border-t border-secondary-foreground/30 pt-5">
              <p className="mb-4 text-xs font-bold uppercase text-secondary-foreground/60">Flat cleaning packages</p>
              <PriceGrid prices={flatPrices} dark />
            </div>
          </div>
        </section>

        <section id="pricing" className="px-5 py-20 md:px-10 md:py-28 lg:px-16">
          <div className="mx-auto max-w-[1312px]">
            <div className="grid gap-8 border-b border-border pb-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
              <div><p className="text-xs font-bold uppercase text-muted-foreground">Clear from the start</p><h2 className="mt-4 text-4xl font-extrabold leading-tight md:text-6xl">Flat or bungalow?<br/>There’s a difference.</h2></div>
              <p className="max-w-xl self-end text-lg leading-8 text-muted-foreground">Choose the pricing built for your property type. Flats and bungalows are shown separately, so you can understand the cost before you enquire.</p>
            </div>
            <div className="grid lg:grid-cols-2">
              <article className="py-10 lg:pr-12">
                <span className="text-xs font-bold uppercase text-primary">01 / Flat cleaning</span>
                <h3 className="mt-3 text-3xl font-extrabold">Apartments & flats</h3>
                <p className="mb-8 mt-3 max-w-md leading-7 text-muted-foreground">Complete home deep cleaning for 1 BHK to 4 BHK apartments.</p>
                <PriceGrid prices={flatPrices} />
              </article>
              <article className="border-t border-border py-10 lg:border-l lg:border-t-0 lg:pl-12">
                <span className="text-xs font-bold uppercase text-primary">02 / Bungalow cleaning</span>
                <h3 className="mt-3 text-3xl font-extrabold">Bungalows & larger homes</h3>
                <p className="mb-8 mt-3 max-w-md leading-7 text-muted-foreground">Separate packages for the scale and spaces of larger homes.</p>
                <PriceGrid prices={bungalowPrices} />
              </article>
            </div>
          </div>
        </section>

        <section id="services" className="bg-muted py-20 md:py-28">
          <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
            <div className="grid items-end gap-5 md:grid-cols-2"><div><p className="text-xs font-bold uppercase text-muted-foreground">Professional home service</p><h2 className="mt-4 text-4xl font-extrabold leading-tight md:text-6xl">The work your home needs.</h2></div><p className="max-w-lg justify-self-end text-base leading-7 text-muted-foreground">From complete-home cleaning to focused kitchen, washroom and upholstery services.</p></div>
            <div className="mt-12 grid gap-5 md:grid-cols-12">
              <article className="group md:col-span-7"><div className="overflow-hidden"><img src={kitchenImage} alt="Professional kitchen deep cleaning" width={1408} height={1008} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" /></div><div className="grid grid-cols-[1fr_auto] items-start border-t border-foreground pt-4"><div><h3 className="text-2xl font-bold">Flat deep cleaning</h3><p className="mt-2 text-muted-foreground">A complete clean for apartments from 1 BHK to 4 BHK.</p></div><ArrowRight className="mt-1" /></div></article>
              <article className="group md:col-span-5"><div className="overflow-hidden"><img src={bathroomImage} alt="Professional washroom and glass cleaning" width={1408} height={1008} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" /></div><div className="grid grid-cols-[1fr_auto] items-start border-t border-foreground pt-4"><div><h3 className="text-2xl font-bold">Focused cleaning</h3><p className="mt-2 text-muted-foreground">Washrooms, kitchens, glass, doors, sofas and carpets.</p></div><span className="text-sm font-bold text-primary">From ₹699</span></div></article>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-[1312px] px-5 md:px-10 lg:px-16">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
              <div><p className="text-xs font-bold uppercase text-primary">Flat deep cleaning</p><h2 className="mt-4 text-4xl font-extrabold leading-tight md:text-6xl">Made for your apartment.</h2><p className="mt-6 max-w-lg text-lg leading-8 text-muted-foreground">The team handles complete home deep cleaning across bedrooms, living rooms, kitchens, bathrooms, floors and shared surfaces.</p><div className="mt-10"><PriceGrid prices={flatPrices} /></div><BookingLink className="mt-8" label="Check flat availability" /></div>
              <div className="grid grid-cols-2 gap-3"><img src={kitchenImage} alt="Kitchen cleaning in an Ahmedabad apartment" width={1408} height={1008} loading="lazy" className="mt-16 aspect-[3/4] h-full max-h-[560px] w-full object-cover" /><img src={heroImage} alt="Freshly cleaned apartment living room" width={1600} height={1008} loading="lazy" className="aspect-[3/4] h-full max-h-[560px] w-full object-cover" /></div>
            </div>
          </div>
        </section>

        <section className="bg-secondary py-20 text-secondary-foreground md:py-28">
          <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
            <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
              <img src={bungalowImage} alt="Professional team cleaning a spacious Ahmedabad bungalow" width={1408} height={1008} loading="lazy" className="min-h-[430px] h-full w-full object-cover" />
              <div className="self-center"><p className="text-xs font-bold uppercase text-primary">Bungalow deep cleaning</p><h2 className="mt-4 text-4xl font-extrabold leading-tight md:text-6xl">More space.<br/>The right package.</h2><p className="mt-6 text-lg leading-8 text-secondary-foreground/65">A distinct service for bungalows, villas and larger homes — never confused with flat pricing.</p><div className="mt-10"><PriceGrid prices={bungalowPrices} dark /></div><BookingLink className="mt-8" label="Check bungalow availability" /></div>
            </div>
          </div>
        </section>

        <section id="results" className="py-20 md:py-28">
          <div className="mx-auto max-w-[1312px] px-5 md:px-10 lg:px-16">
            <div className="grid items-end gap-6 md:grid-cols-2"><div><p className="text-xs font-bold uppercase text-muted-foreground">See the difference</p><h2 className="mt-4 text-4xl font-extrabold leading-tight md:text-6xl">Before. After.<br/>Clearly cleaner.</h2></div><p className="max-w-lg justify-self-end text-sm leading-6 text-muted-foreground">The images below show the type of cleaning work offered. Replace them with verified customer project photographs when available.</p></div>
            <div className="mt-12 grid gap-4 md:grid-cols-2">
              <figure><div className="relative overflow-hidden bg-muted"><img src={kitchenImage} alt="Kitchen cleaning process reference" width={1408} height={1008} loading="lazy" className="aspect-[4/3] w-full object-cover saturate-[.65] brightness-[.72]" /><span className="absolute left-4 top-4 bg-secondary px-3 py-2 text-xs font-bold uppercase text-secondary-foreground">Before / process</span></div><figcaption className="mt-3 text-sm font-semibold">Kitchen surfaces</figcaption></figure>
              <figure><div className="relative overflow-hidden bg-muted"><img src={heroImage} alt="Freshly cleaned home reference" width={1600} height={1008} loading="lazy" className="aspect-[4/3] w-full object-cover" /><span className="absolute left-4 top-4 bg-primary px-3 py-2 text-xs font-bold uppercase text-primary-foreground">After / result</span></div><figcaption className="mt-3 text-sm font-semibold">Living spaces</figcaption></figure>
            </div>
          </div>
        </section>

        <section id="about" className="border-y border-border bg-card py-20 md:py-28">
          <div className="mx-auto grid max-w-[1312px] gap-16 px-5 md:px-10 lg:grid-cols-2 lg:px-16">
            <div><p className="text-xs font-bold uppercase text-primary">What we clean</p><h2 className="mt-4 text-4xl font-extrabold leading-tight md:text-6xl">A complete-home approach.</h2><div className="mt-10 grid grid-cols-2 border-t border-border">{["Bedrooms", "Living rooms", "Kitchens", "Bathrooms", "Floors", "Doors", "Windows", "Dust & cobwebs", "Common surfaces", "Other agreed areas"].map((item) => <div key={item} className="flex items-center gap-3 border-b border-border py-4 text-sm font-semibold"><Check className="size-4 text-primary" />{item}</div>)}</div></div>
            <div><p className="text-xs font-bold uppercase text-primary">Why choose us</p><div className="mt-6 divide-y divide-border border-y border-border">{[["01", "Professional team", "Cleaning staff handling the work in your home."], ["02", "Transparent pricing", "Clear package pricing available before booking."], ["03", "Home service", "The cleaning team comes to your property."], ["04", "Local Ahmedabad service", "Based in Ghatlodiya and serving Ahmedabad homes."], ["05", "Complete cleaning", "Built around full-home deep cleaning, with focused services available."]].map(([n,title,text]) => <div key={n} className="grid grid-cols-[2.5rem_1fr] gap-4 py-6"><span className="text-sm font-bold text-primary">{n}</span><div><h3 className="text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p></div></div>)}</div></div>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-[1312px] px-5 md:px-10 lg:px-16">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="text-xs font-bold uppercase text-muted-foreground">Additional services</p><h2 className="mt-4 text-4xl font-extrabold leading-tight md:text-5xl">Focused care,<br/>when you need it.</h2></div><div className="border-t border-foreground">{specialistServices.map(([service, price], index) => <div key={service} className="grid grid-cols-[2rem_minmax(0,1fr)_auto] items-center gap-3 border-b border-border py-5 md:py-6"><span className="text-xs font-bold text-muted-foreground">0{index + 1}</span><h3 className="min-w-0 text-base font-bold md:text-xl">{service}</h3><p className="text-right text-sm font-extrabold text-primary md:text-lg">{price}</p></div>)}</div></div>
          </div>
        </section>

        <section className="bg-muted py-20 md:py-24">
          <div className="mx-auto max-w-[1312px] px-5 md:px-10 lg:px-16"><div className="grid gap-8 md:grid-cols-[0.75fr_1.25fr]"><div><p className="text-xs font-bold uppercase text-muted-foreground">Customer reviews</p><h2 className="mt-4 text-4xl font-extrabold">Real words only.</h2></div><div className="border-l-2 border-primary pl-6 md:pl-10"><p className="max-w-2xl text-xl font-semibold leading-8">Verified customer reviews will appear here once supplied.</p><p className="mt-4 text-sm leading-6 text-muted-foreground">We do not publish made-up names, ratings or testimonials. This space is ready for genuine Google and customer feedback.</p></div></div></div>
        </section>

        <section className="py-20 md:py-28">
          <div className="mx-auto grid max-w-[1100px] gap-10 px-5 md:px-10 lg:grid-cols-[0.7fr_1.3fr]"><div><p className="text-xs font-bold uppercase text-muted-foreground">Common questions</p><h2 className="mt-4 text-4xl font-extrabold">Straight answers.</h2></div><Accordion type="single" collapsible className="border-t border-foreground">{faqs.map(([question, answer], i) => <AccordionItem value={`faq-${i}`} key={question}><AccordionTrigger className="py-6 text-left text-base font-bold hover:no-underline md:text-lg">{question}</AccordionTrigger><AccordionContent className="max-w-2xl pb-6 text-base leading-7 text-muted-foreground">{answer}</AccordionContent></AccordionItem>)}</Accordion></div>
        </section>

        <section id="contact" className="relative overflow-hidden bg-secondary text-secondary-foreground">
          <img src={heroImage} alt="Clean modern home in Ahmedabad" width={1600} height={1008} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-secondary/80" />
          <div className="relative mx-auto max-w-[1312px] px-5 py-20 md:px-10 md:py-28 lg:px-16">
            <div className="max-w-3xl"><p className="text-xs font-bold uppercase text-primary">Ready for a cleaner home?</p><h2 className="mt-4 text-5xl font-extrabold leading-tight md:text-7xl">Tell us your home size and location.</h2><p className="mt-6 max-w-xl text-lg leading-8 text-secondary-foreground/70">We’ll help you choose the right flat, bungalow or specialized cleaning service.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><BookingLink label="Book on WhatsApp" /><Button size="lg" variant="outline" disabled className="border-secondary-foreground/35 text-secondary-foreground"><Phone /> Phone number coming soon</Button></div><p className="mt-5 text-xs text-secondary-foreground/55">WhatsApp and phone numbers have not yet been provided. They will be activated here once confirmed.</p></div>
          </div>
        </section>
      </main>

      <footer className="bg-secondary px-5 pb-24 pt-16 text-secondary-foreground md:px-10 md:pb-10 lg:px-16">
        <div className="mx-auto max-w-[1312px]"><div className="grid gap-12 border-b border-secondary-foreground/20 pb-12 md:grid-cols-3"><div><div className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-sm bg-primary text-primary-foreground"><Sparkles className="size-5" /></span><span className="text-sm font-extrabold uppercase">Home Cleaning<br/><span className="font-medium text-secondary-foreground/55">Ahmedabad</span></span></div></div><nav className="grid grid-cols-2 gap-3 text-sm" aria-label="Footer navigation"><a href="#top">Home</a><a href="#services">Services</a><a href="#pricing">Pricing</a><a href="#results">Before & After</a><a href="#about">Why us</a><a href="#contact">Contact</a></nav><address className="not-italic"><p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase text-primary"><MapPin className="size-4" /> Office</p><p className="text-sm leading-6 text-secondary-foreground/70">A/17 Mahashakti Nagar,<br/>Chanakyapuri, Ghatlodiya,<br/>Ahmedabad – 380061</p></address></div><div className="flex flex-col gap-3 pt-6 text-xs text-secondary-foreground/45 md:flex-row md:justify-between"><p>© 2026 Home Cleaning Ahmedabad</p><p>Contact numbers, business hours, Privacy Policy and Terms to be added when provided.</p></div></div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-border bg-background p-2 md:hidden">
        <Button asChild className="rounded-none"><a href="#contact" data-track="whatsapp_click" onClick={() => trackClick("whatsapp_click")}><MessageCircle /> WhatsApp</a></Button>
        <Button variant="outline" asChild className="rounded-none border-l-0"><a href="#contact" data-track="phone_click" onClick={() => trackClick("phone_click")}><Phone /> Call</a></Button>
      </div>
    </div>
  );
}