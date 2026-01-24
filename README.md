# High-Converting Software Developer Portfolio

A production-ready portfolio website designed to maximize hiring chances by focusing on business outcomes, proof of impact, and clear value propositions.

## Features

- **Business-focused messaging**: Emphasizes outcomes over tech stacks
- **Impact-driven case studies**: Shows measurable results for each project
- **Low-friction contact**: Simple 3-field form with multiple contact options
- **Fast performance**: Optimized for Lighthouse scores >90
- **Fully responsive**: Mobile-first design that works on all devices
- **Zero cost hosting**: Deployable to Vercel for free

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Hosting**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone or download this repository

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Customization Guide

### 1. Personal Information

**File: `app/layout.tsx`**
Update metadata:
```typescript
export const metadata: Metadata = {
  title: 'Your Name - Software Engineer',
  description: 'Your custom description here',
  // ... update other fields
}
```

**File: `components/Footer.tsx`**
- Update name, social links, email
- Replace GitHub, LinkedIn, email URLs

### 2. Projects

**File: `data/projects.ts`**
Edit the projects array with your own work:
```typescript
{
  id: 'unique-id',
  title: 'Project Name',
  category: 'Category',
  problem: 'What business problem existed?',
  solution: 'What did you build?',
  impact: [
    'Measurable outcome 1',
    'Measurable outcome 2',
    'Measurable outcome 3',
  ],
  tech: ['Tech', 'Stack', 'Used'],
  link: 'https://optional-link.com', // Optional
}
```

### 3. Skills

**File: `components/Skills.tsx`**
Update the skills array with your technologies

### 4. Contact Form

The form currently shows a success message without actual submission.

**To connect a real form backend:**

Option A - **Formspree** (Easiest, Free tier):
```typescript
// In components/Contact.tsx, replace the handleSubmit function:
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formState),
})
```

Option B - **Resend** (Email API):
1. Sign up at resend.com
2. Create API endpoint in `app/api/contact/route.ts`
3. Update form to POST to `/api/contact`

Option C - **Email link** (Simplest):
Remove form, use `mailto:` link only

### 5. Resume

Add your resume PDF to `/public/resume.pdf`

Update the filename if different in `components/Footer.tsx`:
```typescript
<a href="/your-custom-resume.pdf" download>
```

### 6. Colors

**File: `tailwind.config.js`**
Change the primary color scheme:
```javascript
colors: {
  primary: {
    // Update these hex values
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
  },
}
```

## Deployment (100% Free)

### Deploy to Vercel (Recommended)

1. Push your code to GitHub

2. Go to [vercel.com](https://vercel.com) and sign up

3. Click "New Project"

4. Import your GitHub repository

5. Vercel auto-detects Next.js - just click "Deploy"

6. Your site is live! (e.g., `your-portfolio.vercel.app`)

### Custom Domain (Optional - ~$10/year)

1. Buy domain from Namecheap or Porkbun ($8-12/year)

2. In Vercel dashboard → Settings → Domains

3. Add your custom domain

4. Update DNS records as instructed

5. SSL certificate auto-provisioned (HTTPS enabled)

### Alternative Hosting

- **Netlify**: Similar to Vercel, also free
- **GitHub Pages**: Requires export mode (already configured)
- **Cloudflare Pages**: Free tier available

## Performance Optimization

Already optimized for:
- ✅ Fast page loads (<1 second)
- ✅ Minimal JavaScript bundle
- ✅ Responsive images
- ✅ SEO-friendly meta tags
- ✅ Accessibility (WCAG AA)

## Project Structure

```
portfolio-site/
├── app/
│   ├── layout.tsx          # Root layout, metadata
│   ├── page.tsx            # Homepage
│   └── globals.css         # Global styles
├── components/
│   ├── Hero.tsx            # Above-fold section
│   ├── WhatIDo.tsx         # Value propositions
│   ├── FeaturedWork.tsx    # Project showcase
│   ├── ProjectCard.tsx     # Individual project
│   ├── HowIWork.tsx        # Process section
│   ├── Skills.tsx          # Tech stack
│   ├── Contact.tsx         # Contact form
│   └── Footer.tsx          # Footer with links
├── data/
│   └── projects.ts         # Project data
├── types/
│   └── index.ts            # TypeScript types
└── public/
    └── resume.pdf          # Your resume (add this)
```

## Content Strategy

### What Recruiters Look For

1. **5-second scan**: Can they understand your value immediately?
2. **Proof**: Have you done similar work before?
3. **Reliability**: Will you deliver without drama?
4. **Contact**: Can they reach you easily?

### Writing Project Case Studies

Use this template for each project:

**Problem**: What business pain existed? (1 sentence)
**Solution**: What you built in plain English (2-3 sentences)
**Impact**: Measurable outcomes (3 bullet points with metrics)
**Tech**: Stack used (keep concise)

**Example metrics:**
- Time saved: "Reduced manual work by 10 hours/week"
- Money: "Processed $50k in transactions"
- Efficiency: "Decreased errors from 8% to 0%"
- Speed: "Improved page load from 5s to 0.8s"

## Maintenance

**Update quarterly:**
- [ ] Add new projects (remove old ones)
- [ ] Refresh metrics if they improved
- [ ] Update resume
- [ ] Check all links work
- [ ] Verify contact form still receives emails

## Support

For issues or questions:
1. Check Next.js docs: https://nextjs.org/docs
2. Check Tailwind docs: https://tailwindcss.com/docs
3. Check Vercel docs: https://vercel.com/docs

## License

This is a template - use it freely for your own portfolio.

---

## Quick Deployment Checklist

Before going live:

- [ ] Updated all personal information
- [ ] Added 2-3 real projects with metrics
- [ ] Replaced placeholder email/social links
- [ ] Added resume.pdf to /public
- [ ] Connected contact form to real backend
- [ ] Tested on mobile device
- [ ] Checked all links work
- [ ] Verified fast load time (<2 seconds)
- [ ] Set up custom domain (optional)

**Time to deploy: ~30 minutes with Vercel**

Good luck with your job search!



# Resume PDF Instructions

Place your resume PDF file in this directory with the filename:

**resume.pdf**

If you use a different filename, update the link in:
- `components/Footer.tsx` (line with `/resume.pdf`)

## Resume Best Practices for Developers

### Format
- 1 page preferred (2 pages max)
- PDF format only
- Filename: FirstName-LastName-Resume.pdf
- ATS-friendly (no complex formatting)

### Content Structure
1. **Header**: Name, title, email, phone, LinkedIn, GitHub
2. **Summary**: 2-3 lines focusing on business value
3. **Experience**: Focus on impact and outcomes
4. **Projects**: Link to portfolio (this site)
5. **Skills**: Match job descriptions
6. **Education**: Brief, at bottom

### Impact-Focused Bullets
Instead of: "Built a dashboard using React"
Write: "Built analytics dashboard that reduced reporting time by 15 hours/week"

Always include:
- What you built
- Technologies used
- Measurable impact

### Keep Updated
- Update quarterly
- Match tech stack to jobs you want
- Add new projects as you complete them
- Remove outdated/irrelevant work

---

**Note**: This directory is gitignored, so your resume won't be committed to version control. Upload it directly to your hosting provider or add it manually to the /public folder after deployment.