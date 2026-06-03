# SmallBizCalcs — Small Business Compliance Calculators

Free, ad-supported calculator site for small business owners. Built with Next.js, Tailwind CSS, deployed on Netlify.

---

## QUICK START — Deploy in 10 Minutes

### Step 1: Get the code on your machine

If you downloaded this as a zip, unzip it. If you're cloning from GitHub, you already have it.

### Step 2: Install dependencies

Open a terminal in the project folder and run:

```bash
npm install
```

### Step 3: Test locally

```bash
npm run dev
```

Open http://localhost:3000 in your browser. You should see the full site with the working payroll tax calculator.

### Step 4: Push to GitHub

If this is a new repo:

```bash
git init
git add .
git commit -m "Initial commit - SmallBizCalcs"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

If the repo already exists, just:

```bash
git add .
git commit -m "Initial commit - SmallBizCalcs"
git push
```

### Step 5: Deploy on Netlify

1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub account and select this repo
4. Netlify auto-detects the settings from `netlify.toml`
5. Click "Deploy site"
6. Your site is live in ~60 seconds

### Step 6: Connect your domain

1. In Netlify, go to Site Settings → Domain Management
2. Click "Add custom domain"
3. Follow the instructions to update your DNS records at your registrar (Namecheap, Cloudflare, etc.)
4. Netlify provides free SSL automatically

---

## HOW TO ADD A NEW CALCULATOR

This is the process you'll repeat for every new calculator. Each one takes 15-30 minutes with AI.

### 1. Create the folder

```
src/app/calculators/YOUR-CALCULATOR-NAME/
```

### 2. Copy the template

Duplicate the payroll tax calculator files:
- `page.js` (the calculator itself)
- `layout.js` (SEO metadata)

### 3. Tell Codex what to change

Use this prompt template with Codex:

```
I have a Next.js calculator page template (see attached code from 
src/app/calculators/payroll-tax/page.js). 

Create a new calculator for [TOPIC]. 

Input fields needed: [LIST THEM]
Formula/logic: [DESCRIBE THE MATH]
Output: [WHAT RESULTS TO SHOW]

Keep the same styling, layout, AdSlot placements, FAQ section format,
and page structure. Use the same component imports.
```

### 4. Create the companion guide

Duplicate `src/app/guides/payroll-tax/page.js` and tell Codex:

```
Write a 1,200-word guide page about [TOPIC] for small business owners. 
Follow the same page structure as the payroll tax guide (see attached).
Include a callout box linking to the calculator. Include 
an AdSlot component in the middle of the content.
```

### 5. Add to homepage

In `src/app/page.js`, add your new calculator to the `calculators` array and set `available: true`.

### 6. Add to footer

In `src/app/layout.js`, add a link in the footer calculator list.

### 7. Deploy

```bash
git add .
git commit -m "Add [calculator name]"
git push
```

Netlify auto-deploys. Live in 60 seconds.

---

## ADSENSE SETUP

### Before applying (wait 30 days after launch):

1. Make sure you have 15+ pages of content
2. All legal pages (About, Contact, Privacy, Terms) are complete
3. Site has some organic traffic (even 10-20 daily visitors)

### After approval:

1. In `src/app/layout.js`, uncomment the AdSense script tag in `<head>` and replace `ca-pub-XXXXXXX` with your publisher ID

2. In `src/components/AdSlot.js`, replace the placeholder div with your actual AdSense ad unit code. Create different ad units in AdSense for each slot type (top, results, sidebar, article).

### Ad slot placements in this project:

| Slot      | Location                          | Format              |
|-----------|-----------------------------------|---------------------|
| `top`     | Above calculator / top of page    | Leaderboard / Auto  |
| `results` | Below calculator results          | Rectangle (highest value!) |
| `sidebar` | Desktop right column              | 300x250             |
| `article` | Within guide content              | In-article          |

---

## PROJECT STRUCTURE

```
src/
├── app/
│   ├── layout.js              ← Global layout (header, footer, AdSense script)
│   ├── page.js                ← Homepage with calculator directory
│   ├── not-found.js           ← 404 page
│   ├── globals.css            ← Global styles + Tailwind
│   ├── calculators/
│   │   └── payroll-tax/
│   │       ├── page.js        ← Working payroll tax calculator
│   │       └── layout.js      ← SEO metadata
│   ├── guides/
│   │   └── payroll-tax/
│   │       └── page.js        ← Companion guide article
│   ├── about/page.js          ← About page (PERSONALIZE THIS)
│   ├── contact/page.js        ← Contact form (Netlify Forms)
│   ├── privacy/page.js        ← Privacy policy (AdSense compliant)
│   └── terms/page.js          ← Terms of service + disclaimers
├── components/
│   └── AdSlot.js              ← Ad placement component
└── data/
    └── taxData.js             ← State tax rates + federal constants
```

---

## THINGS TO CUSTOMIZE BEFORE LAUNCH

1. **Domain**: Confirm `metadataBase` in `src/app/layout.js` is set to your production domain
2. **About page**: Keep your story current in `src/app/about/page.js`
3. **Privacy policy**: Confirm the domain in `src/app/privacy/page.js`
4. **Site name**: Confirm "SmallBizCalcs" appears consistently across the site
5. **Analytics**: Add Google Analytics 4 script to `layout.js` head section

---

## ANNUAL MAINTENANCE

Every January, update `src/data/taxData.js`:
- Social Security wage base (changes yearly)
- SUTA rates and wage bases (check each state's website)
- FUTA rate (rarely changes but verify)

Update the "Last updated" text on each calculator page.

---

## TECH STACK

- **Framework**: Next.js 14 (static export)
- **Styling**: Tailwind CSS
- **Hosting**: Netlify (free tier)
- **Forms**: Netlify Forms (free, no backend needed)
- **Monetization**: Google AdSense
- **Analytics**: Google Analytics 4 (add yourself)
