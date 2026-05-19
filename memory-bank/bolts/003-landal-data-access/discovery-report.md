# Discovery Report: Landal Data Access

Status: completed-real-import-blocked
Updated: 2026-05-19T15:15:46Z

## Sources Checked

- Landal affiliate programme: https://www.landal.nl/algemeen/affiliates
- TradeTracker Landal.nl campaign: https://tradetracker.com/nl/campaigns/reizen-en-vakanties-26/landal-nl-20132/
- Landal general conditions: https://www.landal.nl/over-landal/algemene-voorwaarden
- Landal robots.txt: https://www.landal.nl/robots.txt
- Landal global robots.txt: https://www.landal.com/robots.txt
- TradeTracker API credential guidance via Affiliate Held docs: https://docs.affiliateheld.nl/api-koppelingen/koppelen-met-tradetracker/

## Findings

### Official/Affiliate Route

Landal's public affiliate page says the affiliate programme runs through TradeTracker. It also states that TradeTracker provides automatically updated offers, banners, deeplinks, and text links. This makes TradeTracker the preferred data-access route for this project.

The public TradeTracker Landal.nl campaign page confirms deeplinks can be created for Landal domains including:

- `https://www.landal.nl`
- `https://www.landalcamping.nl`
- `https://www.hofvansaksen.nl`
- `https://www.landal.com`

The public campaign URL ends in `landal-nl-20132`; treat `20132` as a candidate campaign identifier and confirm it inside the approved TradeTracker account before hardcoding it.

### API/Feed Availability

No public, unauthenticated Landal API or Landal-hosted data feed was found during public source verification on 2026-05-19.

TradeTracker webservice access appears to require:

- Approved TradeTracker publisher account.
- Approved website/media placement.
- Approval for the Landal campaign.
- TradeTracker customer ID.
- TradeTracker access key/passphrase.
- TradeTracker affiliate site ID.

Until those credentials and campaign approval exist, real feed/API import is blocked.

### Scraping and Terms

Landal's public general conditions state the site is for personal use only and that other use is not allowed unless written permission is obtained. For this project, that means scraping Landal pages for commercial affiliate use remains blocked unless Landal or TradeTracker campaign terms explicitly permit it in writing.

Robots.txt does not disallow most public pages for generic user agents, but it disallows `/sitecore` and `/check-nl-nl/` on `landal.nl`, disallows `/sitecore` on `landal.com`, and blocks specific crawlers such as MJ12bot and Screaming Frog SEO Spider. Robots.txt is not enough to override the commercial-use restriction.

## Decision

Use TradeTracker as the first real data source. Do not run a Landal scraper by default.

## Required Configuration Before Real Import

Use environment variables or encrypted deployment secrets for the eventual importer:

- `TRADETRACKER_CUSTOMER_ID`
- `TRADETRACKER_ACCESS_KEY`
- `TRADETRACKER_AFFILIATE_SITE_ID`
- `TRADETRACKER_LANDAL_CAMPAIGN_ID`
- `IMPORT_CRON_SECRET`

## Next Engineering Step

Build a protected import endpoint and TradeTracker adapter behind credential checks. The adapter may be implemented and tested with fixtures, but it must return a blocked import run when credentials or campaign approval are missing.

## Real Scraping Gate

A real scraper run may only become eligible when all are true:

- Robots.txt has been checked and recorded.
- Terms/campaign rules have been checked and recorded.
- `termsPermitCommercialUse` is true.
- A documented rate-limit policy exists.
- Manual approval is true.
- Approval notes include the permission basis.
