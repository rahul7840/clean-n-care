# Premium Ahmedabad Home Cleaning Website

## Goal
Build a mobile-first, WhatsApp-led website that immediately communicates professional home deep cleaning in Ahmedabad, separates flat and bungalow pricing, and earns trust through clear scope, strong photography, and restrained editorial design.

## Page hierarchy
1. **Header** — compact navigation, prominent WhatsApp action, mobile menu.
2. **Hero** — “A cleaner home. Without the hassle.” over a large premium Indian-home photograph; Ahmedabad, service type, trust cues, WhatsApp and call actions, plus an immediate flat-price strip.
3. **Service split** — clear editorial comparison between flat and bungalow cleaning with distinct imagery and exact package pricing.
4. **Core services** — image-led showcase for flat, bungalow, washroom, sofa, carpet, glass/door, and kitchen cleaning.
5. **Flat cleaning feature** — apartment-focused visual, complete-home scope, 1–4 BHK pricing, and a before/after comparison.
6. **Bungalow cleaning feature** — more spacious visual treatment, larger-home positioning, and separate 1–4 BHK pricing.
7. **Before and after** — large paired transformation imagery with honest “sample photography” labeling until company photos are supplied.
8. **What we clean** — concise, scannable scope list using only supplied service details.
9. **Specialized services** — exact “onwards” prices in a clean editorial list.
10. **Why choose us** — professional team, transparent pricing, home service, Ahmedabad location, and complete cleaning without unsupported claims.
11. **Reviews** — understated empty state inviting real Google/customer reviews later; no invented testimonials or ratings.
12. **FAQ** — only questions answerable from the supplied information.
13. **Booking and footer** — WhatsApp-first conversion block, call placeholder state, office address, simple site links, and placeholders for unprovided contact details.

## Visual system
- Warm white and off-white foundations, charcoal/deep-black typography, soft gray separators, and `#F5B942` amber used selectively for actions and price emphasis.
- Large grotesk typography, tight headline line-height, strong numerals, subtle corners, minimal shadows, hard-working whitespace, and visible dividers.
- Full-width editorial photography rather than illustrations, decorative blobs, gradients, glass effects, or card-heavy layouts.
- Calm image reveals and button transitions with reduced-motion support.

## Images
Generate a cohesive set of realistic Indian-modern residential cleaning images: a bright premium apartment, a spacious bungalow, active professional cleaning, and matched before/after room transformations. Keep each image in a replaceable content structure and label temporary transformation imagery clearly so it is never presented as customer proof.

## Conversion and mobile behavior
- Reuse one primary “Book now” action and one secondary “Call now” action.
- Preserve incoming UTM parameters and expose consistent click hooks/data attributes for future Google Analytics, Google Ads, and Meta Pixel tracking.
- Add a compact sticky mobile WhatsApp/call bar, readable pricing tables, touch-friendly controls, and no horizontal overflow.
- Since no WhatsApp or phone number was provided, show honest contact placeholders and keep phone/WhatsApp actions non-misleading until real numbers are supplied.

## SEO and accessibility
- Add a unique homepage title, description, Open Graph fields, canonical URL, and LocalBusiness plus Service structured data using the supplied Ahmedabad address only.
- Use semantic headings, landmarks, descriptive image text, keyboard-accessible navigation/FAQ controls, strong contrast, and optimized local image assets.

## Technical implementation
- Build reusable data-driven sections in React while keeping the homepage at `/`.
- Establish semantic design tokens and typography in the global stylesheet before composing the page.
- Keep navigation links functional through in-page anchors; do not create thin extra pages at this stage.
- Verify the finished experience in the live preview at desktop and mobile sizes, checking interaction, overflow, console errors, and the primary booking path.
