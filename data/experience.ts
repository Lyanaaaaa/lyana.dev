export interface ExperienceItem {
  type: 'education' | 'work'
  title: string
  organization: string
  period: string
  location?: string
  description: string[]
  tags?: string[]
}

export const experienceData: ExperienceItem[] = [
  {
    type: 'education',
    title: "Bachelor's in Information Technology",
    organization: 'Sunway University',
    period: 'Jun 2020 - Dec 2023',
    description: [
      'Completed core subjects such as Frontend Engineering, Information Security, Penetration Testing, Web Dev, Mobile Dev, Flutter, Algorithm, Data Structure, Web Security, Cryptography and more.',
      'Build and proof of concept in Research and Development (R&D) such as implementing IOT and Neural Network systems.',
    ],
  },
  {
    type: 'work',
    title: 'Web Developer Intern',
    organization: 'Tech Startup Company',
    period: 'Jan 2023 - Mar 2023',
    description: [
      'Interned as a remote associate, specializing in C++, C# and .NET development.',
      'Build web API, Backend and handle production code, and SEO optimization.',
      'Develop both web application and mobile app.',
      'Responsible for actually explaining and interpreting data to the development team.',
      'Worked on experience with TFS and Azure, especially data to build and debug issues.',
    ],
    tags: ['C#', 'ASP.NET', 'TFS', 'Azure'],
  },
  {
    type: 'education',
    title: 'Australian Matriculation (AUSMAT)',
    organization: 'Sunway University',
    period: 'Mar 2020 - Nov 2020',
    location: 'Kuala Lumpur',
    description: [
      'Studied matriculation degree at Sunway University',
      'Had several learning including with PHP',
      'Developed in the field of E-Commerce',
    ],
    tags: ['PHP', 'E-Commerce'],
  },
]
