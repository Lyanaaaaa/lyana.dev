import { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'inventory-dashboard',
    title: 'Inventory Management Dashboard',
    category: 'Workflow Automation',
    problem: 'Small e-commerce business was manually tracking 500+ SKUs in spreadsheets, leading to stockouts and over-ordering.',
    solution: 'Web-based dashboard that syncs with their sales platform, alerts when stock is low, and generates reorder reports automatically.',
    impact: [
      'Reduced stockouts by 60%',
      'Saved 10 hours/week of manual work',
      'Paid for itself in 2 months',
    ],
    tech: ['React', 'Node.js', 'MongoDB', 'REST APIs'],
  },
  // {
  //   id: 'marketplace-platform',
  //   title: 'Multi-Vendor Marketplace Platform',
  //   category: 'Product Development',
  //   problem: 'Local artisan community had no centralized place to sell online. Existing solutions were too expensive or complex.',
  //   solution: 'Custom marketplace with vendor onboarding, product listings, payment processing, and automated order management.',
  //   impact: [
  //     'Launched with 40 vendors in first month',
  //     'Processed $50k in transactions in 90 days',
  //     'Reduced vendor setup time from days to 15 minutes',
  //   ],
  //   tech: ['Next.js', 'Stripe Connect', 'PostgreSQL', 'Vercel'],
  // },
  {
    id: 'reporting-automation',
    title: 'Client Reporting Automation',
    category: 'Workflow Automation',
    problem: 'Agency was spending 20+ hours/month manually creating client performance reports from multiple data sources.',
    solution: 'Automated reporting system that pulls data from Google Analytics, Facebook Ads, and Shopify, then generates branded PDFs on schedule.',
    impact: [
      'Eliminated 20 hours of monthly manual work',
      'Reports now sent day 1 of each month (was day 7-10)',
      'Zero errors vs. 5-8% error rate before',
    ],
    tech: ['Python', 'Pandas', 'Google APIs', 'SendGrid'],
  },
]