/**
 * Site-wide profile facts. Edit here, not in components.
 */
export const profile = {
  firstName: 'Lyana',
  fullName: 'Lyana Aqilah',
  role: 'Full-Stack Software Engineer',
  location: 'Malaysia',
  timeZone: 'Asia/Kuala_Lumpur',
  timeZoneLabel: 'MYT',
  email: 'nurlyanaaqilah@gmail.com',
  resume: '/lyana-resume.pdf',
  avatar: '/resources/avatar.jpg',
  /**
   * Looping hero video of Lyana. Drop an .mp4 into /public/resources and set the path,
   * e.g. '/resources/hero-lyana.mp4'. While empty, the hero shows `heroPoster` with a slow zoom.
   */
  heroVideo: '/resources/hero-lyana.mp4',
  heroPoster: '/resources/hero-lyana-poster.jpg',
  socials: {
    github: 'https://github.com/Lyanaaaaa',
    linkedin: 'https://linkedin.com/in/lyanaaqilah',
    instagram: 'https://www.instagram.com/lyana_qillah',
    whatsapp: 'https://wa.link/uqgo8y',
  },
} as const

export const navLinks = [
  { name: 'Home', href: '#top', id: 'top' },
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Experience', href: '#experience', id: 'experience' },
  { name: 'Projects', href: '#projects', id: 'projects' },
  { name: 'Skills', href: '#skills', id: 'skills' },
  { name: 'Contact', href: '#contact', id: 'contact' },
] as const
