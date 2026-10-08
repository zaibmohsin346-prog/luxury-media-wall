# Google Ads campaign — build sheet

Everything in this folder is ready to import. What follows is the part that
cannot live in a CSV: the settings, the assets, and the three things worth
doing *before* you spend anything.

---

## Do these three first

### 1. Conversion tracking — do not launch without it

The site currently has **no tracking of any kind**: no Analytics, no Ads
conversion tag, no pixel. Launching like this means you buy clicks and learn
nothing, and Google's bidding has no target to optimise toward.

Set up, in Google Ads → Goals → Conversions:

| Conversion | How it fires |
|---|---|
| WhatsApp click | Click on any `wa.me` link |
| Phone tap | Click on any `tel:` link |
| Form submit | Enquiry form on the contact section |

Create those three, then **send me the GA4 Measurement ID (`G-…`) and the
Ads conversion ID (`AW-…`) and labels** and I will wire the events into the
site. The links already carry the right attributes; they just need the tag.

### 2. Point the ads somewhere specific

Every ad in this campaign currently lands on the homepage, because that is
the only page there is. Someone searching "built in wardrobes dubai" arrives
at a media wall homepage.

Google scores that as weak ad relevance and weak landing page experience,
and **you pay more per click than a competitor with a matching page**. Ask
me to build a page per ad group — it is the cheapest way to lower your cost
per click.

### 3. Google Business Profile

Not just for organic. Once verified it unlocks **location assets** in your
ads, and puts you in the free map pack alongside the paid result. See
`../BACKLINKS.md`.

---

## Campaign settings

Create the campaign in the UI with these, then import the CSVs.

| Setting | Value | Why |
|---|---|---|
| Campaign type | Search | |
| Goal | Leads | |
| Networks | **Search only.** Turn OFF Display and Search Partners | Display spends fast and converts poorly for this trade |
| Locations | Dubai, Abu Dhabi, Sharjah | Matches what the site claims |
| Location option | **"Presence: people in or regularly in your targeted locations"** | The default is "presence or interest", which shows your ads to people merely *interested* in Dubai. This one setting wastes more budget than anything else on the page |
| Languages | English, Arabic | Targets the user's Google language, not the ad's |
| Bidding | **Maximise clicks with a max CPC limit** to start | Smart bidding needs conversion data you do not have yet. Switch to Maximise Conversions once you have ~30 |
| Budget | Your call | Start small enough that two weeks of learning is affordable |
| Ad rotation | Optimise | |
| Final URL expansion | **Off** | Stops Google sending traffic to pages you did not choose |
| Ad schedule | Start all hours | Narrow it once the data says when enquiries come in |

Do **not** use Broad match at launch. The CSV uses Phrase and Exact only.

---

## Import order

In Google Ads Editor (free download, far faster than the web UI):

1. Account → Import → From file → `keywords.csv`
2. Import `ads.csv`
3. Import `negatives.csv` (campaign-level negative list)
4. Review, then Post.

Check the ad previews before posting. Every headline and description in
`ads.csv` has been validated against Google's limits (30 characters for
headlines, 90 for descriptions, 15 for paths) — none are over.

---

## Assets (extensions) — add these in the UI

They are free, they raise Ad Rank, and most accounts under-use them.

**Call asset**
```
+971 56 718 5313
```

**Callout assets** — every one of these is a claim already on your site:
```
250+ Walls Delivered
12 Years of Joinery
Design, Build & Install
Made to Measure
In-House Fabrication
Dubai, Abu Dhabi & Sharjah
```

**Structured snippet** — header "Services":
```
Media Walls
TV Wall Units
Wall Panelling
Wardrobes
Kitchens
Entrance Joinery
```

**Sitelinks** — these want distinct pages, which you do not have yet. Until
then the section anchors work, weakly:
```
Our Projects     https://luxurymediawall.com/#projects
Services         https://luxurymediawall.com/#services
Entrance Joinery https://luxurymediawall.com/#entrances
Get a Quote      https://luxurymediawall.com/#contact
```

**Image assets** — upload project photographs. They are in
`assets/img/` as `showcase-*` and `project-*`.

**Location asset** — needs Google Business Profile first.

---

## A note on the claims in the ad copy

Every headline and description uses only what the site already says:
250+ walls delivered, 12 years of joinery, design/fabrication/installation
in house, the material list, and the service areas. Nothing was invented.

If any of those figures is out of date, tell me — they appear on the site
as well as in these ads, and Google does check landing pages against ad
copy.

---

## What this campaign does not include

- **Performance Max.** It will spend your budget across YouTube, Gmail and
  Display with little visibility. Not for a first campaign with no
  conversion history.
- **Broad match keywords.** Added later, once negatives are proven.
- **Bidding on your own brand name.** Worth it only once competitors start
  bidding on it.
