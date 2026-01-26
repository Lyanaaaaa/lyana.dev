# Portfolio Components Documentation

This document provides an overview of all the components created for the Lyana Aqilah portfolio website, inspired by modern design principles with clean, non-duplicated code.

## Component Structure

```
components/
├── Navbar.tsx              # Navigation header with smooth scrolling
├── Hero.tsx                # Landing section with typing animation
├── Overview.tsx            # Stats/expertise cards section
├── Experience.tsx          # Timeline of education and work experience
├── ProjectsSection.tsx     # Filterable projects showcase
├── TechStack.tsx          # Technology skills grid
├── Contact.tsx             # Contact form
└── Footer.tsx              # Footer with links and social media
```

## Components Overview

### 1. Navbar
**File:** `components/Navbar.tsx`
**Type:** Client Component

A sticky navigation bar that appears at the top of the page with smooth scrolling to sections.

**Features:**
- Fixed position with backdrop blur on scroll
- Smooth scroll to anchor links
- Mobile-responsive with hamburger menu
- Logo with hover animation
- CTA button for contact

**Props:** None

**Usage:**
```tsx
import Navbar from '@/components/Navbar'

<Navbar />
```

---

### 2. Hero
**File:** `components/Hero.tsx`
**Type:** Client Component

The main landing section with animated typing effect and gradient background.

**Features:**
- Typing animation that cycles through phrases
- Blinking cursor effect
- Gradient background with animated orbs
- Download CV button
- Responsive grid layout

**Props:** None

**Data:**
- Phrases array for typing effect (editable in component)

**Usage:**
```tsx
import Hero from '@/components/Hero'

<Hero />
```

---

### 3. Overview
**File:** `components/Overview.tsx`
**Type:** Server Component

Displays expertise cards showing key skills and stats.

**Features:**
- Grid of glassmorphism cards
- Icons from lucide-react
- Hover effects with scale transformation
- Responsive layout (1-4 columns)

**Props:** None

**Data Structure:**
```typescript
interface OverviewCard {
  icon: React.ReactNode
  title: string
  count?: string
  isLink?: boolean
}
```

**Customization:**
Edit the `overviewData` array in the component to change cards.

**Usage:**
```tsx
import Overview from '@/components/Overview'

<Overview />
```

---

### 4. Experience
**File:** `components/Experience.tsx`
**Type:** Server Component

Timeline view of education and work experience.

**Features:**
- Vertical timeline with alternating sides (desktop)
- Glassmorphism cards
- Icons for education vs work
- Tags for technologies
- Responsive (stacked on mobile)

**Props:** None

**Data:**
Import from `@/data/experience.ts`

**Data Structure:**
```typescript
interface ExperienceItem {
  type: 'education' | 'work'
  title: string
  organization: string
  period: string
  location?: string
  description: string[]
  tags?: string[]
}
```

**Customization:**
Edit `data/experience.ts` to add/modify experience entries.

**Usage:**
```tsx
import Experience from '@/components/Experience'

<Experience />
```

---

### 5. ProjectsSection
**File:** `components/ProjectsSection.tsx`
**Type:** Client Component

Filterable grid of project cards.

**Features:**
- Tab filtering (All, Website, Mobile)
- Project cards with glassmorphism
- Tech tags
- GitHub and Live demo links
- Hover effects

**Props:** None

**Data:**
Import from `@/data/portfolioProjects.ts`

**Data Structure:**
```typescript
interface PortfolioProject {
  id: string
  title: string
  description: string
  category: 'website' | 'mobile' | 'all'
  tech: string[]
  image?: string
  githubUrl?: string
  liveUrl?: string
  tags: string[]
}
```

**Customization:**
Edit `data/portfolioProjects.ts` to add/modify projects.

**Usage:**
```tsx
import ProjectsSection from '@/components/ProjectsSection'

<ProjectsSection />
```

---

### 6. TechStack
**File:** `components/TechStack.tsx`
**Type:** Server Component

Displays technology frameworks and languages in a grid.

**Features:**
- Gradient icon cards
- Categorized sections (Frameworks, Languages, Database)
- Filter tabs (Frontend, Backend, Database)
- Hover scale effects

**Props:** None

**Data:**
Hardcoded in component (can be moved to data file if needed)

**Customization:**
Edit the `techStackData` object in the component.

**Usage:**
```tsx
import TechStack from '@/components/TechStack'

<TechStack />
```

---

### 7. Contact
**File:** `components/Contact.tsx`
**Type:** Client Component

Contact form with validation and status messages.

**Features:**
- Form fields: name, email, message
- Client-side validation
- Loading and success states
- Glassmorphism inputs
- Alternative contact methods

**Props:** None

**State Management:**
- Uses React useState for form data and status

**Usage:**
```tsx
import Contact from '@/components/Contact'

<Contact />
```

---

### 8. Footer
**File:** `components/Footer.tsx`
**Type:** Client Component

Footer with navigation links, social media, and scroll-to-top button.

**Features:**
- Multi-column layout
- Social media icons
- Quick navigation links
- Scroll to top button with onClick handler
- Contact information

**Props:** None

**Usage:**
```tsx
import Footer from '@/components/Footer'

<Footer />
```

---

## Data Files

### `data/experience.ts`
Contains education and work history.

### `data/portfolioProjects.ts`
Contains project information for the projects section.

### `data/projects.ts` (legacy)
Original projects data for the old FeaturedWork component.

---

## Styling Approach

### Global Styles
**File:** `app/globals.css`

**Key Classes:**
- `.glass-card` - Glassmorphism card with hover effects
- `.btn-primary` - Primary gradient button
- `.btn-secondary` - Secondary transparent button
- `.badge-glass` - Small glassmorphism badge
- `.gradient-text` - Animated gradient text effect
- `.animate-blink` - Blinking cursor animation

### Tailwind Configuration
**File:** `tailwind.config.js`

**Custom Colors:**
- `primary` - Cyan/teal accent color
- `dark` - Dark blue shades for background
- `glass` - Opacity colors for glassmorphism

---

## Page Structure

**File:** `app/page.tsx`

The main page imports and renders all components:

```tsx
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Overview from '@/components/Overview'
import Experience from '@/components/Experience'
import ProjectsSection from '@/components/ProjectsSection'
import TechStack from '@/components/TechStack'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <div id="overview">
          <Overview />
        </div>
        <div id="experience">
          <Experience />
        </div>
        <div id="projects">
          <ProjectsSection />
        </div>
        <div id="tech-stack">
          <TechStack />
        </div>
        <div id="contact">
          <Contact />
        </div>
        <Footer />
      </main>
    </>
  )
}
```

---

## Development

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

---

## Best Practices

1. **Component Organization:** Each component has a single responsibility
2. **Data Separation:** Project and experience data are in separate files
3. **Type Safety:** TypeScript interfaces for all data structures
4. **Styling:** Consistent glassmorphism design with Tailwind CSS
5. **Accessibility:** Proper ARIA labels and semantic HTML
6. **Performance:** Server components by default, client components only when needed
7. **Responsiveness:** Mobile-first design with Tailwind breakpoints

---

## Customization Guide

### Change Colors
Edit `tailwind.config.js` to modify the color palette.

### Add New Projects
Edit `data/portfolioProjects.ts` and add a new object to the array.

### Add Experience
Edit `data/experience.ts` and add a new experience item.

### Modify Hero Text
Edit the `phrases` array in `components/Hero.tsx`.

### Update Contact Info
Edit the footer component and update email, phone, and social links.

---

## Dependencies

- **Next.js 14.2.3** - React framework
- **React 18.3.1** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 3.4.3** - Styling
- **Lucide React** - Icon library

---

## License

All rights reserved. This portfolio is created for Lyana Aqilah.
