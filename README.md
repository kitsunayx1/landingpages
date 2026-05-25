# GIL Landing Pages

Static product landing pages for Global Intelligence Laboratory LLC.

Deployed on **Cloudflare Pages** with subdomain-per-product routing via a Pages Functions middleware.

## Live URLs

Each product is served at its own subdomain of `gil.consulting`:

| Product | URL | File |
|---|---|---|
| GIL (main) | `gil.consulting` | `index.html` |
| BEACON | `beacon.gil.consulting` | `beacon.html` |
| Bifrost | `bifrost.gil.consulting` | `bifrost.html` |
| CallDesk | `calldesk.gil.consulting` | `calldesk.html` |
| CARBON | `carbon.gil.consulting` | `carbon.html` |
| Charter | `charter.gil.consulting` | `charter.html` |
| Chronicle | `chronicle.gil.consulting` | `chronicle.html` |
| CiviBridge | `civibridge.gil.consulting` | `civibridge.html` |
| Council | `council.gil.consulting` | `council.html` |
| FamilyCare | `familycare.gil.consulting` | `familycare.html` |
| Galley | `galley.gil.consulting` | `galley.html` |
| GHOST | `ghost.gil.consulting` | `ghost.html` |
| Hephaestus | `hephaestus.gil.consulting` | `hephaestus.html` |
| MakerOS | `maker.gil.consulting` | `maker.html` |
| MERIDIAN | `meridian.gil.consulting` | `meridian.html` |
| PreFlight | `preflight.gil.consulting` | `preflight.html` |
| PULSE | `pulse.gil.consulting` | `pulse.html` |
| SENTRI | `sentri.gil.consulting` | `sentri.html` |
| ShipDeck | `shipdeck.gil.consulting` | `shipdeck.html` |
| TeachingCraft | `teachingcraft.gil.consulting` | `teachingcraft.html` |
| UMBRA | `umbra.gil.consulting` | `umbra.html` |
| Veritas | `veritas.gil.consulting` | `veritas.html` |
| Veritas Platform | `veritas-platform.gil.consulting` | `veritas-platform.html` |
| Vouch | `vouch.gil.consulting` | `vouch.html` |
| Zanshin | `zanshin.gil.consulting` | `zanshin.html` |

## How it works

All subdomains are custom domains on a **single Cloudflare Pages project**. The `functions/_middleware.js` intercepts every root path request, reads the subdomain from the hostname, and serves the matching HTML file from the static assets.

```
request: council.gil.consulting/
middleware: host=council.gil.consulting → sub=council → /council.html
response: council.html served at edge
```

## Cloudflare Setup

### 1. Deploy to Cloudflare Pages

1. Connect this repo to a new Cloudflare Pages project
2. No build command — set **Build output directory** to `/` (root)
3. Deploy

### 2. Add custom domains

In the Pages project → **Custom domains**, add each subdomain:
- `gil.consulting`
- `beacon.gil.consulting`
- `bifrost.gil.consulting`
- `calldesk.gil.consulting`
- `carbon.gil.consulting`
- `charter.gil.consulting`
- `chronicle.gil.consulting`
- `civibridge.gil.consulting`
- `council.gil.consulting`
- `familycare.gil.consulting`
- `galley.gil.consulting`
- `ghost.gil.consulting`
- `hephaestus.gil.consulting`
- `maker.gil.consulting`
- `meridian.gil.consulting`
- `preflight.gil.consulting`
- `pulse.gil.consulting`
- `sentri.gil.consulting`
- `shipdeck.gil.consulting`
- `teachingcraft.gil.consulting`
- `umbra.gil.consulting`
- `veritas.gil.consulting`
- `veritas-platform.gil.consulting`
- `vouch.gil.consulting`
- `zanshin.gil.consulting`

Since your DNS is managed in Cloudflare, each custom domain addition auto-provisions a CNAME record and SSL certificate.

### 3. Activate FormSubmit

Beta signup forms use [FormSubmit](https://formsubmit.co). On first real submission to any page, FormSubmit sends a one-time confirmation email to `beta@gil.consulting`. Click the link once — all 24 forms go live.

## Beta signups

All forms submit to `beta@gil.consulting` via FormSubmit. Each email subject is prefixed with the product name for inbox filtering:

```
Beta Request — Council
Beta Request — CARBON
Beta Request — Zanshin
...
```

## Adding a new product page

1. Create `productname.html` in the root
2. Add an entry to `SUBDOMAIN_MAP` in `functions/_middleware.js`
3. Add the subdomain in Cloudflare Pages custom domains
4. Commit and push — Cloudflare Pages auto-deploys

## Contact

Global Intelligence Laboratory LLC — support@gil.consulting
